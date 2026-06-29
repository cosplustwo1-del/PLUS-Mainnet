"use client";

import React, { useState } from 'react';
import { useLocalWallet } from '@/context/LocalWalletContext';
import { Wallet, LogOut, ArrowDownToLine, ArrowUpFromLine, QrCode, X, Copy, CheckCircle2 } from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  priceUsd: number;
  logoColor: string;
}

const ASSETS: Asset[] = [
  { symbol: 'PLUS', name: 'PLUS Mainnet', balance: 1450.5, priceUsd: 1.25, logoColor: 'bg-amber-500' },
  { symbol: 'USDT', name: 'Tether USD', balance: 8420.0, priceUsd: 1.00, logoColor: 'bg-green-500' },
  { symbol: 'wBTC', name: 'Wrapped BTC', balance: 0.15, priceUsd: 67145.20, logoColor: 'bg-orange-500' },
  { symbol: 'wETH', name: 'Wrapped Ether', balance: 2.4, priceUsd: 3450.80, logoColor: 'bg-blue-500' },
];

export default function SpotWalletDashboard() {
  const { wallet, disconnect } = useLocalWallet();
  const [copied, setCopied] = useState(false);
  
  const [depositAsset, setDepositAsset] = useState<Asset | null>(null);
  const [withdrawAsset, setWithdrawAsset] = useState<Asset | null>(null);
  
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!wallet) return null;

  const totalUsdValue = ASSETS.reduce((sum, asset) => sum + (asset.balance * asset.priceUsd), 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Withdrawal request submitted to the PLUS network.');
      setIsSubmitting(false);
      setWithdrawAsset(null);
      setWithdrawAddress('');
      setWithdrawAmount('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Profile */}
      <div className="bg-panel border border-panel-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center space-x-6 mb-6 md:mb-0">
          <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-hover rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0">
            <Wallet size={32} className="text-white" />
          </div>
          <div>
            <p className="text-text-muted text-sm font-bold uppercase tracking-widest mb-1">Estimated Balance</p>
            <h2 className="text-4xl font-black text-white">
              ${totalUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-3 w-full md:w-auto">
          <div className="bg-background border border-panel-border rounded-xl px-4 py-2 flex items-center space-x-3 w-full md:w-auto">
            <span className="text-sm text-text-muted font-mono truncate w-48 md:w-auto">
              {wallet.address}
            </span>
            <button onClick={handleCopy} className="text-brand hover:text-brand-hover transition-colors">
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <button 
            onClick={disconnect}
            className="flex items-center space-x-2 text-sm font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Disconnect</span>
          </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-panel border border-panel-border rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-panel-border">
          <h3 className="text-xl font-bold text-white">Spot Wallet Assets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 text-text-muted text-xs uppercase tracking-widest">
                <th className="p-4 font-semibold">Asset</th>
                <th className="p-4 font-semibold">Balance</th>
                <th className="p-4 font-semibold">Value (USD)</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border">
              {ASSETS.map(asset => (
                <tr key={asset.symbol} className="hover:bg-background/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${asset.logoColor}`}>
                        <span className="text-white font-bold text-xs">{asset.symbol[0]}</span>
                      </div>
                      <div>
                        <div className="text-white font-bold">{asset.symbol}</div>
                        <div className="text-xs text-text-muted">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-bold">{asset.balance.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">${(asset.balance * asset.priceUsd).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => setDepositAsset(asset)}
                        className="bg-brand/10 hover:bg-brand/20 text-brand border border-brand/20 px-3 py-1.5 rounded-lg font-bold text-sm transition-colors flex items-center space-x-1"
                      >
                        <ArrowDownToLine size={14} />
                        <span>Deposit</span>
                      </button>
                      <button 
                        onClick={() => setWithdrawAsset(asset)}
                        className="bg-background hover:bg-panel-border text-white border border-panel-border px-3 py-1.5 rounded-lg font-bold text-sm transition-colors flex items-center space-x-1"
                      >
                        <ArrowUpFromLine size={14} />
                        <span>Withdraw</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      {depositAsset && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-panel border border-panel-border rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-panel-border flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Deposit {depositAsset.symbol}
              </h3>
              <button onClick={() => setDepositAsset(null)} className="text-text-muted hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="w-48 h-48 bg-white rounded-2xl p-4 mb-6 flex items-center justify-center shadow-inner relative">
                {/* Fake QR Code Pattern */}
                <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1 opacity-80">
                  {Array.from({length: 25}).map((_, i) => (
                    <div key={i} className={`bg-gray-900 ${Math.random() > 0.5 ? 'rounded-sm' : 'rounded-full'}`}></div>
                  ))}
                </div>
                <QrCode size={64} className="text-white relative z-10 mix-blend-difference" />
              </div>
              <p className="text-sm text-text-muted mb-2 text-center">
                Send only <strong className="text-white">{depositAsset.symbol}</strong> to this address over the <strong className="text-brand">PRC-20</strong> Network.
              </p>
              <div className="w-full bg-background border border-panel-border rounded-xl p-3 flex items-center justify-between mb-4">
                <span className="text-xs text-white font-mono break-all pr-4">{wallet.address}</span>
                <button onClick={handleCopy} className="text-brand hover:text-brand-hover shrink-0">
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500/80 text-xs p-3 rounded-lg w-full text-center">
                Minimum deposit: 0.000001 {depositAsset.symbol}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {withdrawAsset && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-panel border border-panel-border rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-panel-border flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Withdraw {withdrawAsset.symbol}
              </h3>
              <button onClick={() => setWithdrawAsset(null)} className="text-text-muted hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleWithdrawSubmit} className="p-6 space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-muted">Available Balance</span>
                <span className="text-white font-bold">{withdrawAsset.balance} {withdrawAsset.symbol}</span>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
                  Network
                </label>
                <div className="w-full bg-background/50 border border-brand/50 text-brand rounded-xl px-4 py-3 mb-4 font-bold">
                  PRC-20 (PLUS Mainnet)
                </div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Destination Address</label>
                <input 
                  type="text" 
                  required
                  value={withdrawAddress}
                  onChange={e => setWithdrawAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-background border border-panel-border text-white rounded-xl px-4 py-3 outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Amount</label>
                <div className="relative">
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="any"
                    max={withdrawAsset.balance}
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-background border border-panel-border text-white rounded-xl px-4 py-3 outline-none focus:border-brand pr-16"
                  />
                  <button 
                    type="button"
                    onClick={() => setWithdrawAmount(withdrawAsset.balance.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand hover:text-brand-hover"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting || !withdrawAddress || !withdrawAmount}
                  className="w-full bg-brand hover:bg-brand-hover disabled:bg-panel disabled:text-text-muted text-white py-3.5 rounded-xl font-bold text-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:shadow-none"
                >
                  {isSubmitting ? 'Processing...' : 'Submit Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
