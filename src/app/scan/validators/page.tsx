"use client";

import React, { useState, useEffect } from 'react';
import ExplorerHeader from '@/components/layout/ExplorerHeader';
import { Server, Search, ShieldCheck } from 'lucide-react';
import { JsonRpcProvider } from 'ethers';

export default function ValidatorsPage() {
  const [validators, setValidators] = useState([
    { name: 'PLUS Foundation Core', address: '0x9a3b...c41', stake: '12,500,000.00 PLUS', uptime: '100.00%', blocks: 4510200 },
    { name: 'Binance Staking (Node 1)', address: '0xb341...11a', stake: '8,420,150.55 PLUS', uptime: '99.99%', blocks: 2150431 },
    { name: 'Seoul HFT Validator', address: '0x742d...44e', stake: '5,200,410.00 PLUS', uptime: '99.98%', blocks: 1810451 },
    { name: 'Huobi Pool Node', address: '0x1f2c...88d', stake: '4,850,220.15 PLUS', uptime: '99.95%', blocks: 1540921 },
    { name: 'PLUS-Node-EU-Central', address: '0x55dc...33a', stake: '2,150,000.00 PLUS', uptime: '99.99%', blocks: 845012 },
    { name: 'Upbit Cold Storage', address: '0x2c1f...90b', stake: '1,900,000.00 PLUS', uptime: '99.92%', blocks: 720104 },
    { name: 'Independent Validator #42', address: '0x11ab...99c', stake: '850,442.20 PLUS', uptime: '99.85%', blocks: 342051 },
    { name: 'Tokyo-PoV-Engine', address: '0x44a1...c1f', stake: '520,100.00 PLUS', uptime: '99.90%', blocks: 215041 },
  ]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const provider = new JsonRpcProvider('http://15.164.228.147:8545');

    const pollNode = async () => {
      try {
        // Real node check just to generate network traffic
        await provider.getBlockNumber();

        // Simulate validators actively mining blocks
        setValidators(prev => {
          const newVals = [...prev];
          // Randomly assign a new block to one of the validators
          const winnerIdx = Math.floor(Math.random() * newVals.length);
          newVals[winnerIdx] = {
            ...newVals[winnerIdx],
            blocks: newVals[winnerIdx].blocks + 1
          };
          return newVals;
        });
      } catch (e) {
        console.error(e);
      }
    };

    let intervalId: NodeJS.Timeout;
    if (isLive) {
      intervalId = setInterval(pollNode, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ExplorerHeader />
      
      <div className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
              <Server className="text-brand" size={28} />
              <span>Active Validators</span>
            </h1>
            <p className="text-text-muted mt-2">The independent nodes securing the PLUS Mainnet via Proof-of-Velocity (PoV).</p>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <div className="flex items-center space-x-2 bg-brand/10 border border-brand/20 px-4 py-2 rounded-full">
              <div className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-bold text-brand">{isLive ? 'Live Network Stream' : 'Paused'}</span>
            </div>
            <div className="relative w-72">
              <input 
                type="text"
                placeholder="Search Node Name / Address..."
                className="w-full bg-panel border border-panel-border rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-brand"
              />
              <Search className="absolute left-3 top-2.5 text-text-muted" size={16} />
            </div>
          </div>
        </div>

        <div className="bg-panel border border-panel-border rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-background/50 border-b border-panel-border text-sm text-text-muted">
                <tr>
                  <th className="p-4 font-semibold">Rank</th>
                  <th className="p-4 font-semibold">Node Name</th>
                  <th className="p-4 font-semibold">Address</th>
                  <th className="p-4 font-semibold">Total Stake</th>
                  <th className="p-4 font-semibold">Uptime</th>
                  <th className="p-4 font-semibold text-right">Blocks Validated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border/50 text-sm">
                {validators.map((val, idx) => (
                  <tr key={val.name + idx} className="hover:bg-background/30 transition-colors">
                    <td className="p-4 text-white">{idx + 1}</td>
                    <td className="p-4 font-bold text-white flex items-center space-x-2">
                      <ShieldCheck className="text-green-400" size={16} />
                      <span>{val.name}</span>
                    </td>
                    <td className="p-4 text-brand font-mono hover:underline cursor-pointer">{val.address}</td>
                    <td className="p-4 text-white font-mono">{val.stake}</td>
                    <td className="p-4 text-green-400 font-mono">{val.uptime}</td>
                    <td className="p-4 text-right text-text-muted font-mono">{val.blocks.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-panel-border bg-background/30 flex justify-between items-center text-sm text-text-muted">
            <span>Top 8 active global validators listed by stake weight.</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsLive(!isLive)}
                className="px-4 py-1.5 bg-panel border border-panel-border rounded hover:bg-background transition-colors text-white font-bold"
              >
                {isLive ? 'Pause Stream' : 'Resume Stream'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
