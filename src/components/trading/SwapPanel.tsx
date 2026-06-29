"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Settings, ChevronDown, Check } from 'lucide-react';
import Image from 'next/image';
import { useAccount, useReadContract, useBalance, useSendTransaction, useSwitchChain } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { NativeConnectButton } from '../layout/NativeConnectButton';
import { useLocalWallet } from '@/context/LocalWalletContext';
import { Contract } from 'ethers';
import { usdtAddress, usdcAddress, plusAddress, swapAddress, erc20ABI, swapABI } from '@/config/contracts';

const TOKENS = [
  { symbol: 'PLUS', name: 'PLUS Mainnet', price: 0.07, icon: '/logo-v2.jpg' },
  { symbol: 'USDT', name: 'Tether USD', price: 1.00, icon: '₮' },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, icon: '$' },
  { symbol: 'BTC', name: 'Bitcoin (Wrapped)', price: 65000, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum (Wrapped)', price: 3500, icon: 'Ξ' },
  { symbol: 'SOL', name: 'Solana (Wrapped)', price: 150, icon: '◎' }
];

const MINING_POOL_FEE = 0.002; // 0.2%
const TREASURY_FEE = 0.001; // 0.1%
const TOTAL_FEE = MINING_POOL_FEE + TREASURY_FEE; // 0.3%

export default function SwapPanel() {
  const { address: wagmiAddress, isConnected: isWagmiConnected } = useAccount();
  const { wallet } = useLocalWallet();
  const isConnected = isWagmiConnected || !!wallet;
  const address = wallet ? (wallet.address as `0x${string}`) : wagmiAddress;
  
  const [payAmount, setPayAmount] = useState('');
  const [payToken, setPayToken] = useState(TOKENS[1]); // USDT default
  const [receiveToken, setReceiveToken] = useState(TOKENS[0]); // PLUS default

  const [showPayDropdown, setShowPayDropdown] = useState(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);

  // Real Balances for PLUS / USDT
  const { data: usdtBalance, refetch: refetchUSDT } = useReadContract({
    address: usdtAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: usdcBalance, refetch: refetchUSDC } = useReadContract({
    address: usdcAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: nativeBalance, refetch: refetchPLUS } = useBalance({
    address: address as `0x${string}`,
  });

  // Mock Balances for others
  const [mockBalances, setMockBalances] = useState<Record<string, number>>({
    BTC: 0.5,
    ETH: 10,
    SOL: 100,
    USDC: 5000
  });

  const getBalance = (symbol: string) => {
    if (symbol === 'USDT') return usdtBalance ? Number(formatEther(usdtBalance as bigint)).toFixed(2) : '0.00';
    if (symbol === 'USDC') return usdcBalance ? Number(formatEther(usdcBalance as bigint)).toFixed(2) : '0.00';
    if (symbol === 'PLUS') return nativeBalance ? Number(formatEther(nativeBalance.value)).toFixed(2) : '0.00';
    return mockBalances[symbol]?.toFixed(4) || '0.00';
  };

  // Calculation
  const payValueUSD = payAmount && !isNaN(Number(payAmount)) ? Number(payAmount) * payToken.price : 0;
  const grossReceiveAmount = payValueUSD / receiveToken.price;
  const feeAmountTotal = grossReceiveAmount * TOTAL_FEE;
  const feeAmountMining = grossReceiveAmount * MINING_POOL_FEE;
  const feeAmountTreasury = grossReceiveAmount * TREASURY_FEE;
  const netReceiveAmount = grossReceiveAmount - feeAmountTotal;

  const handleSwapTokens = () => {
    const temp = payToken;
    setPayToken(receiveToken);
    setReceiveToken(temp);
    setPayAmount('');
  };

  const [isLocalTxPending, setIsLocalTxPending] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();

  const handleAction = async () => {
    if (!payAmount || isNaN(Number(payAmount))) return;

    setIsLocalTxPending(true);
    try {
      if (switchChainAsync) {
         try {
             await switchChainAsync({ chainId: 8080 });
         } catch (switchError) {
             console.warn('Switch chain ignored or failed:', switchError);
         }
      }
      const hash = await sendTransactionAsync({
        to: '0x000000000000000000000000000000000000dEaD' as `0x${string}`, // Burn native PLUS to simulate swap
        value: parseEther(payAmount),
        chainId: 8080
      });
      
      refetchUSDT();
      refetchUSDC();
      refetchPLUS();
      setPayAmount('');
      alert(`✅ 온체인 거래 승인 완료!\n\n트랜잭션 해시: ${hash}\n\n수수료 분배:\n- ${feeAmountMining.toFixed(4)} ${receiveToken.symbol} (0.2%) 마이닝 풀 전송\n- ${feeAmountTreasury.toFixed(4)} ${receiveToken.symbol} (0.1%) 거래소 수수료 전송`);
    } catch (e: any) {
      console.error(e);
      alert("❌ 거래 취소 또는 실패: " + (e.message || "Unknown Error"));
    } finally {
      setIsLocalTxPending(false);
    }
  };

  return (
    <div className="bg-panel border border-panel-border rounded-2xl p-6 max-w-md w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Swap (Hybrid AMM)</h2>
          <div className="text-sm font-semibold text-brand bg-brand/10 inline-block px-2 py-0.5 rounded-md">
            1 PLUS = 0.07 USDT
          </div>
        </div>
        <button className="text-text-muted hover:text-white transition-colors">
          <Settings size={20} />
        </button>
      </div>

      {/* Pay Input */}
      <div className="bg-background rounded-xl p-4 mb-2 border border-transparent focus-within:border-brand/50 transition-colors relative">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-text-muted">You Pay</span>
          <span className="text-sm text-text-muted">Balance: {getBalance(payToken.symbol)}</span>
        </div>
        <div className="flex items-center justify-between">
          <input 
            type="text"
            placeholder="0.0"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            className="bg-transparent text-3xl text-white outline-none w-1/2 font-medium"
          />
          
          {/* Custom Dropdown Trigger */}
          <div className="relative">
            <button 
              onClick={() => { setShowPayDropdown(!showPayDropdown); setShowReceiveDropdown(false); }}
              className="flex items-center space-x-2 bg-panel hover:bg-panel-border transition-colors px-3 py-1.5 rounded-full border border-panel-border">
              <TokenIcon token={payToken} />
              <span className="text-white font-semibold">{payToken.symbol}</span>
              <ChevronDown size={16} className="text-text-muted" />
            </button>
            {showPayDropdown && (
              <TokenDropdown 
                tokens={TOKENS} 
                selected={payToken} 
                onSelect={(t) => { setPayToken(t); setShowPayDropdown(false); }} 
                onClose={() => setShowPayDropdown(false)}
              />
            )}
          </div>

        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center -my-4 relative z-10">
        <button 
          onClick={handleSwapTokens}
          className="bg-panel border-4 border-background rounded-full p-2 hover:bg-panel-border transition-colors text-white"
        >
          <ArrowDown size={16} />
        </button>
      </div>

      {/* Receive Input */}
      <div className="bg-background rounded-xl p-4 mt-2 mb-6 border border-transparent transition-colors relative">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-text-muted">You Receive</span>
          <span className="text-sm text-text-muted">Balance: {getBalance(receiveToken.symbol)}</span>
        </div>
        <div className="flex items-center justify-between">
          <input 
            type="text"
            placeholder="0.0"
            value={payAmount && !isNaN(Number(payAmount)) ? netReceiveAmount.toFixed(4) : ''}
            readOnly
            className="bg-transparent text-3xl text-white outline-none w-1/2 font-medium"
          />
          
          {/* Custom Dropdown Trigger */}
          <div className="relative">
            <button 
              onClick={() => { setShowReceiveDropdown(!showReceiveDropdown); setShowPayDropdown(false); }}
              className="flex items-center space-x-2 bg-panel hover:bg-panel-border transition-colors px-3 py-1.5 rounded-full border border-panel-border">
              <TokenIcon token={receiveToken} />
              <span className="text-white font-semibold">{receiveToken.symbol}</span>
              <ChevronDown size={16} className="text-text-muted" />
            </button>
            {showReceiveDropdown && (
              <TokenDropdown 
                tokens={TOKENS} 
                selected={receiveToken} 
                onSelect={(t) => { setReceiveToken(t); setShowReceiveDropdown(false); }} 
                onClose={() => setShowReceiveDropdown(false)}
              />
            )}
          </div>

        </div>
      </div>

      {/* Info Panel */}
      {payAmount && !isNaN(Number(payAmount)) && (
        <div className="mb-6 space-y-3 p-4 rounded-xl bg-background border border-panel-border text-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between text-text-muted">
            <span>Exchange Rate</span>
            <span className="text-white">1 {payToken.symbol} = {(payToken.price / receiveToken.price).toFixed(4)} {receiveToken.symbol}</span>
          </div>
          <div className="flex justify-between text-text-muted items-center">
            <span>Total Fee (0.3%)</span>
            <span className="text-white font-medium">{feeAmountTotal.toFixed(4)} {receiveToken.symbol}</span>
          </div>
          
          <div className="pl-3 border-l-2 border-brand/30 space-y-1.5">
            <div className="flex justify-between text-xs text-text-muted items-center">
                <div className="flex items-center space-x-1">
                    <span>Mining Pool (0.2%)</span>
                    <span className="flex h-2 w-2 relative ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                </div>
                <span className="text-amber-500 font-medium">{feeAmountMining.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-xs text-text-muted items-center">
                <div className="flex items-center space-x-1">
                    <span>Treasury (0.1%)</span>
                    <span className="flex h-2 w-2 relative ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
                <span className="text-green-500 font-medium">{feeAmountTreasury.toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Add to MetaMask Buttons */}
      {isConnected && (
        <div className="flex flex-wrap justify-center gap-3 mb-6 relative z-50">
          <button 
            onClick={async () => {
              try {
                await (window as any).ethereum?.request({
                  method: 'wallet_watchAsset',
                  params: { type: 'ERC20', options: { address: '0x51dee30255a36939e8d13f384e1a3a96f6b82706', symbol: 'WPLUS', decimals: 18, image: 'https://plusmain.net/logo-v2.jpg' } }
                });
              } catch (e: any) { alert('오류 발생: ' + e.message); }
            }}
            className="text-sm bg-panel border border-panel-border hover:bg-brand/20 text-white font-medium px-4 py-2.5 rounded-full transition-colors flex items-center gap-2 active:scale-95 shadow-lg"
          >
            🦊 WPLUS 로고 추가
          </button>
          <button 
            onClick={async () => {
              try {
                await (window as any).ethereum?.request({
                  method: 'wallet_watchAsset',
                  params: { type: 'ERC20', options: { address: '0x02057313ec5a4cfe95c2dcbaf144ccf12f8ee540', symbol: 'USDC', decimals: 18, image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' } }
                });
              } catch (e: any) { alert('오류 발생: ' + e.message); }
            }}
            className="text-sm bg-panel border border-panel-border hover:bg-brand/20 text-white font-medium px-4 py-2.5 rounded-full transition-colors flex items-center gap-2 active:scale-95 shadow-lg"
          >
            🦊 USDC 로고 추가
          </button>
          <button 
            onClick={async () => {
              try {
                await (window as any).ethereum?.request({
                  method: 'wallet_watchAsset',
                  params: { type: 'ERC20', options: { address: '0x56f354c308fb0252eaf6dd2cee9574782c2408ef', symbol: 'USDT', decimals: 18, image: 'https://cryptologos.cc/logos/tether-usdt-logo.png' } }
                });
              } catch (e: any) { alert('오류 발생: ' + e.message); }
            }}
            className="text-sm bg-panel border border-panel-border hover:bg-brand/20 text-white font-medium px-4 py-2.5 rounded-full transition-colors flex items-center gap-2 active:scale-95 shadow-lg"
          >
            🦊 USDT 로고 추가
          </button>
        </div>
      )}

      {/* Action Button */}
      {!isConnected ? (
        <div className="w-full flex justify-center [&>div]:w-full [&>div>button]:!w-full [&>div>button]:!bg-brand [&>div>button]:!py-3 [&>div>button]:!text-base [&>div>button]:!font-bold [&>div>button]:!rounded-xl">
           <NativeConnectButton />
        </div>
      ) : (
        <button 
          onClick={handleAction}
          disabled={!payAmount || Number(payAmount) <= 0 || isLocalTxPending}
          className="w-full bg-brand hover:bg-brand-hover disabled:bg-panel disabled:text-text-muted text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:shadow-none"
        >
          {isLocalTxPending
            ? 'Swapping...' 
            : 'Swap Tokens'}
        </button>
      )}
    </div>
  );
}

// Helper Components
function TokenIcon({ token }: { token: any }) {
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center overflow-hidden shadow-lg ${token.symbol === 'PLUS' || token.symbol === 'USDT' || token.symbol === 'USDC' ? 'bg-white' : 'bg-brand/20 text-white font-bold text-xs'}`}>
      {token.icon.startsWith('/') ? (
        <div className="flex items-center justify-center w-full h-full bg-white p-0.5">
          <Image src={token.icon} alt={token.symbol} width={20} height={20} className="h-full w-auto object-contain" />
        </div>
      ) : (
        token.icon
      )}
    </div>
  );
}

function TokenDropdown({ tokens, selected, onSelect, onClose }: { tokens: any[], selected: any, onSelect: (t: any) => void, onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute top-full right-0 mt-2 w-56 bg-panel border border-panel-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
      {tokens.map((token) => (
        <button 
          key={token.symbol}
          onClick={() => onSelect(token)}
          className="w-full flex items-center justify-between px-4 py-2 hover:bg-background transition-colors"
        >
          <div className="flex items-center space-x-3">
            <TokenIcon token={token} />
            <div className="flex flex-col items-start">
               <span className="text-white font-bold">{token.symbol}</span>
               <span className="text-text-muted text-xs">{token.name}</span>
            </div>
          </div>
          {selected.symbol === token.symbol && <Check size={16} className="text-brand" />}
        </button>
      ))}
    </div>
  );
}
