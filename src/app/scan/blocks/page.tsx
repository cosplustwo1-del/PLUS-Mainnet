"use client";
import React from 'react';
import Link from 'next/link';

export default function BlocksPage() {
  // Mock Blocks Data for Explorer
  const recentBlocks = Array.from({ length: 15 }, (_, i) => ({
    height: 12450892 - i,
    age: `${i * 3 + 2} secs ago`,
    txn: Math.floor(Math.random() * 200) + 15,
    validator: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    gasUsed: "0 Gwei",
    reward: "0 PLUS"
  }));

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Blocks
          </h1>
          <p className="text-gray-400">
            The most recent blocks produced on the PLUS Mainnet.
          </p>
        </div>

        {/* Data Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Total of 12,450,892 blocks</h2>
            <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Real-time updates
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Block</th>
                  <th className="p-4 font-medium">Age</th>
                  <th className="p-4 font-medium">Txn</th>
                  <th className="p-4 font-medium">Validator (Miner)</th>
                  <th className="p-4 font-medium">Gas Used</th>
                  <th className="p-4 font-medium">Reward</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-gray-800/50">
                {recentBlocks.map((block, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-4">
                      <Link href={`/scan/blocks/${block.height}`} className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors">
                        {block.height}
                      </Link>
                    </td>
                    <td className="p-4 text-sm">{block.age}</td>
                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs font-bold">
                        {block.txn}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/scan/address/${block.validator.split('...')[0]}`} className="text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors">
                        {block.validator}
                      </Link>
                    </td>
                    <td className="p-4 font-mono text-sm">
                      <span className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-md">
                        {block.gasUsed}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm">
                      {block.reward}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex justify-between items-center text-sm">
            <span className="text-gray-400">Showing 1 to 15 of 12,450,892 entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-800 text-gray-500 rounded cursor-not-allowed">First</button>
              <button className="px-3 py-1 bg-gray-800 text-gray-500 rounded cursor-not-allowed">Prev</button>
              <span className="px-3 py-1 bg-cyan-500 text-white rounded font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]">1</span>
              <button className="px-3 py-1 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded transition-colors">2</button>
              <button className="px-3 py-1 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded transition-colors">3</button>
              <span className="text-gray-500 px-2">...</span>
              <button className="px-3 py-1 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded transition-colors">Next</button>
              <button className="px-3 py-1 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded transition-colors">Last</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
