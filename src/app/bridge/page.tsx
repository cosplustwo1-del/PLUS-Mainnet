"use client";
import React, { useState, useEffect } from 'react';

export default function BridgePage() {
  const [ethAmount, setEthAmount] = useState('');
  const [plusAmount, setPlusAmount] = useState('');
  const [ethPrice, setEthPrice] = useState(3500); // Mock Oracle price
  const plusPrice = 1.02;
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success'>('idle');

  // Calculate PLUS amount based on ETH input
  useEffect(() => {
    if (ethAmount && !isNaN(Number(ethAmount))) {
      const ethValueInUsd = Number(ethAmount) * ethPrice;
      const plusReceived = ethValueInUsd / plusPrice;
      setPlusAmount(plusReceived.toFixed(2));
    } else {
      setPlusAmount('');
    }
  }, [ethAmount, ethPrice]);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleSwap = () => {
    if (!ethAmount || Number(ethAmount) <= 0) return;
    setTxStatus('pending');
    setTimeout(() => {
      setTxStatus('success');
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Cross-Chain Bridge
          </h1>
          <p className="text-gray-400">
            Purchase native PLUS directly with Ethereum
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-2xl">
          {/* Network Indicator */}
          <div className="flex items-center justify-between mb-6 p-3 bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#627EEA] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M15.925 23.969l-9.819-5.794L15.925 32l9.831-13.825-9.831 5.794zM16.075 0L6.256 16.35l9.819 5.8 9.844-5.8L16.075 0z"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-200">Ethereum Mainnet</span>
            </div>
            <div className="w-6 h-6 text-gray-500 flex items-center justify-center">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-cyan-400">PLUS Mainnet</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="bg-gray-950 rounded-2xl p-4 mb-2 border border-gray-800 focus-within:border-cyan-500/50 transition-colors">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>You Pay (ETH)</span>
              <span>Balance: {isConnected ? '2.45' : '0.00'}</span>
            </div>
            <div className="flex items-center">
              <input 
                type="number"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-3xl text-white outline-none"
              />
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                <span className="text-white font-medium">ETH</span>
              </div>
            </div>
          </div>

          {/* Rate Info */}
          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-gray-800 border border-gray-700 p-2 rounded-xl text-cyan-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gray-950 rounded-2xl p-4 mt-2 mb-6 border border-gray-800">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>You Receive (PLUS)</span>
              <span>Price: $1.02</span>
            </div>
            <div className="flex items-center">
              <input 
                type="text"
                value={plusAmount}
                readOnly
                placeholder="0.0"
                className="w-full bg-transparent text-3xl text-gray-300 outline-none cursor-not-allowed"
              />
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                <span className="text-white font-medium">PLUS</span>
              </div>
            </div>
          </div>

          {/* Exchange Rate Details */}
          {ethAmount && (
            <div className="flex justify-between text-xs text-gray-500 mb-6 px-2">
              <span>1 ETH = ${ethPrice.toLocaleString()}</span>
              <span>Est. Receive: {plusAmount} PLUS</span>
            </div>
          )}

          {/* Action Button */}
          {!isConnected ? (
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full py-4 bg-[#627EEA] hover:bg-[#526cdc] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isConnecting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Connect Ethereum Wallet'
              )}
            </button>
          ) : (
            <button 
              onClick={handleSwap}
              disabled={!ethAmount || Number(ethAmount) <= 0 || txStatus === 'pending' || txStatus === 'success'}
              className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2
                ${txStatus === 'success' 
                  ? 'bg-green-500 text-white' 
                  : txStatus === 'pending'
                    ? 'bg-cyan-500/50 text-white cursor-wait'
                    : !ethAmount || Number(ethAmount) <= 0
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                }
              `}
            >
              {txStatus === 'success' ? (
                <><span>Bridge Successful!</span><span>🎉</span></>
              ) : txStatus === 'pending' ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span>Bridging...</span></>
              ) : (
                'Bridge to PLUS Mainnet'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
