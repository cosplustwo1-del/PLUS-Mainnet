"use client";

import React, { useState, useEffect } from 'react';
import { Search, Box, Activity, Clock, Zap, FileText } from 'lucide-react';

interface Block {
  number: string;
  hash: string;
  timestamp: string;
  transactions: any[];
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
}

export default function ScanPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentBlock, setCurrentBlock] = useState<string>('0');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data fetching to simulate live AWS Core Node connection
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // In a real scenario, this fetches from the Vercel RPC proxy /api/rpc
        // For demo purposes, we'll generate realistic mock data
        setTimeout(() => {
          const mockBlocks = Array.from({ length: 6 }).map((_, i) => ({
            number: (128456 + i).toString(),
            hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
            timestamp: `${i * 3} secs ago`,
            transactions: Array(Math.floor(Math.random() * 5) + 1).fill({})
          })).reverse();
          
          const mockTxs = Array.from({ length: 6 }).map(() => ({
            hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
            from: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
            to: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
            value: (Math.random() * 100).toFixed(4)
          }));

          setBlocks(mockBlocks);
          setTransactions(mockTxs);
          setCurrentBlock('128461');
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    
    fetchNetworkData();
    
    // Simulate live block updates every 5 seconds
    const interval = setInterval(fetchNetworkData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header / Search Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-3">
              <Box className="text-blue-400" size={36} /> 
              PLUS Mainnet Scan
            </h1>
            <p className="text-slate-400 mt-2">The official block explorer of the Zero-Gas PLUS Ecosystem</p>
          </div>
          
          <div className="w-full md:w-[450px] relative">
            <input 
              type="text"
              placeholder="Search by Address / Txn Hash / Block..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl text-sm font-medium transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Network Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Activity className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Latest Block</p>
              <p className="text-2xl font-bold text-white">{loading ? '---' : currentBlock}</p>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Zap className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Gas Price</p>
              <p className="text-2xl font-bold text-green-400">0 Gwei <span className="text-xs text-green-500/70 ml-1">(Free)</span></p>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Clock className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Block Time</p>
              <p className="text-2xl font-bold text-white">3.0s</p>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <FileText className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Network</p>
              <p className="text-2xl font-bold text-white">Mainnet</p>
            </div>
          </div>
        </div>

        {/* Data Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Latest Blocks */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Box size={20} className="text-blue-400" /> 
                Latest Blocks
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {blocks.map((block, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-700/50 text-slate-300 p-3 rounded-xl">
                          <Box size={18} />
                        </div>
                        <div>
                          <div className="text-blue-400 font-bold hover:underline cursor-pointer">
                            {block.number}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {block.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          <span className="text-slate-400">Fee Recipient:</span> <span className="text-blue-400 cursor-pointer">aws-core-node</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {block.transactions.length} txns
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Latest Transactions */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText size={20} className="text-emerald-400" /> 
                Latest Transactions
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {transactions.map((tx, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-700/50 text-slate-300 p-3 rounded-full">
                          <FileText size={18} />
                        </div>
                        <div>
                          <div className="text-blue-400 font-mono text-sm hover:underline cursor-pointer">
                            {tx.hash}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 font-mono flex items-center gap-1">
                            From <span className="text-blue-400 cursor-pointer">{tx.from}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-slate-700/50 text-slate-200 px-3 py-1 rounded-lg text-sm font-bold">
                          {tx.value} PLUS
                        </div>
                        <div className="text-xs text-green-400 mt-1 font-medium">
                          Fee: 0 Gwei
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
