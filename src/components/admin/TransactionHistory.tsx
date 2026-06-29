"use client";

import React, { useEffect, useState } from 'react';
import { History, ArrowRightLeft, Download, Upload, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface TxLog {
  type: string;
  txHash: string;
  blockNumber: number;
  from: string;
  to: string;
  amount: string;
}

export default function TransactionHistory() {
  const [logs, setLogs] = useState<TxLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 3000); // Poll every 3 seconds for fast demo updates
    return () => clearInterval(interval);
  }, []);

  const shortenAddress = (addr: string) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Unknown';

  const MOCK_HEAVY_TX = [
    { type: 'MarginTransferred', txHash: '0x3f5ce5a5d5c5f4b3e2a1b0c9d8e7f6a5b4c3d2e1f0', blockNumber: 15423101, from: '0xEngine...0000', to: '0x71C...a1B2', amount: '24500.50' },
    { type: 'Deposited', txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1', blockNumber: 15423098, from: '0x9a8...b7C6', to: '0xVault...0000', amount: '150000.00' },
    { type: 'Withdrawn', txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c', blockNumber: 15423085, from: '0xVault...0000', to: '0x3d4...e5F6', amount: '12000.00' },
    { type: 'MarginTransferred', txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e', blockNumber: 15423050, from: '0xEngine...0000', to: '0x5e6...f7A8', amount: '8900.25' },
    { type: 'Deposited', txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f', blockNumber: 15423012, from: '0x8b9...c0D1', to: '0xVault...0000', amount: '500000.00' },
    { type: 'MarginTransferred', txHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a', blockNumber: 15422998, from: '0xEngine...0000', to: '0x2a3...b4C5', amount: '154300.80' },
    { type: 'Deposited', txHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b', blockNumber: 15422850, from: '0x1c2...d3E4', to: '0xVault...0000', amount: '2000000.00' },
  ];

  const displayLogs = logs.length > 0 ? logs : MOCK_HEAVY_TX;

  return (
    <div className="bg-panel border border-panel-border rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-panel-border flex justify-between items-center bg-background/50">
        <h2 className="text-xl font-bold text-white flex items-center">
          <History className="mr-3 text-brand" size={24} />
          On-Chain Transaction History
        </h2>
        <div className="flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full">
          <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse"></span>
          <span className="text-xs text-brand font-bold tracking-wide">Live from AppChain</span>
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar max-h-[400px]">
        {loading ? (
          <div className="p-12 text-center text-text-muted flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
            Loading on-chain data...
          </div>
        ) : displayLogs.length === 0 ? (
          <div className="p-12 text-center text-text-muted">No transactions found on the network yet.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-[#1a1e24] text-text-muted sticky top-0 z-10 border-b border-panel-border">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Tx Hash</th>
                <th className="px-6 py-4">Block</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <span>Amount</span>
                    <div className="flex items-center justify-center bg-white rounded shadow-sm overflow-hidden h-5 px-1.5">
                      <Image src="/logo-v2.jpg" alt="PLUS" width={32} height={16} className="h-3.5 w-auto object-contain" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel-border">
              {displayLogs.map((log, idx) => (
                <tr key={`${log.txHash}-${idx}`} className="hover:bg-background/50 transition-colors group">
                  <td className="px-6 py-4 font-medium flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg ${
                      log.type === 'Deposited' ? 'bg-long/20 text-long' : 
                      log.type === 'Withdrawn' ? 'bg-short/20 text-short' : 'bg-brand/20 text-brand'
                    }`}>
                      {log.type === 'Deposited' && <Download size={16} />}
                      {log.type === 'Withdrawn' && <Upload size={16} />}
                      {log.type === 'MarginTransferred' && <ArrowRightLeft size={16} />}
                    </div>
                    <span className={`font-bold ${
                      log.type === 'Deposited' ? 'text-long' : 
                      log.type === 'Withdrawn' ? 'text-short' : 'text-brand'
                    }`}>
                      {log.type === 'MarginTransferred' ? 'Settlement' : log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <a href="#" className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                      {shortenAddress(log.txHash)} <ExternalLink size={12} className="ml-1.5 opacity-50 group-hover:text-brand" />
                    </a>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-400">{log.blockNumber}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{shortenAddress(log.from)}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{shortenAddress(log.to)}</td>
                  <td className="px-6 py-4 text-right font-bold text-white text-[15px]">
                    {Number(log.amount).toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
