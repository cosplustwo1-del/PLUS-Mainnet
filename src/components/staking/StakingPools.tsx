"use client";

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { NativeConnectButton } from '../layout/NativeConnectButton';
import { useAccount } from 'wagmi';

const POOLS = [
  {
    id: 'silver',
    name: 'Silver Pool',
    duration: '30 Days',
    apr: 15,
    color: 'from-gray-400 to-gray-600',
    shadow: 'shadow-gray-500/20'
  },
  {
    id: 'gold',
    name: 'Gold Pool',
    duration: '90 Days',
    apr: 25,
    color: 'from-yellow-400 to-amber-600',
    shadow: 'shadow-amber-500/20'
  },
  {
    id: 'diamond',
    name: 'Diamond VIP',
    duration: '365 Days',
    apr: 50,
    color: 'from-blue-400 to-indigo-600',
    shadow: 'shadow-blue-500/30',
    recommended: true
  }
];

export default function StakingPools() {
  const { isConnected } = useAccount();
  const [activePool, setActivePool] = useState('diamond');
  const [amount, setAmount] = useState('');

  const selectedPool = POOLS.find(p => p.id === activePool)!;

  return (
    <div className="bg-panel border border-panel-border rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-panel-border bg-black/20">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Lock className="mr-2 text-brand" size={24} /> 
          Select Lock-up Pool
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Pool Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {POOLS.map(pool => (
            <button
              key={pool.id}
              onClick={() => setActivePool(pool.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center ${
                activePool === pool.id 
                  ? `border-transparent bg-gradient-to-br ${pool.color} ${pool.shadow} scale-105 z-10` 
                  : 'border-panel-border bg-background hover:border-gray-600'
              }`}
            >
              {pool.recommended && activePool !== pool.id && (
                <div className="absolute -top-3 bg-brand text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Best APY
                </div>
              )}
              <span className={`text-sm font-bold uppercase tracking-wider mb-1 ${activePool === pool.id ? 'text-white/90' : 'text-text-muted'}`}>
                {pool.name}
              </span>
              <span className={`text-2xl font-black mb-1 ${activePool === pool.id ? 'text-white' : 'text-gray-300'}`}>
                {pool.apr}% APR
              </span>
              <span className={`text-xs font-semibold ${activePool === pool.id ? 'text-white/80' : 'text-gray-500'}`}>
                Lock: {pool.duration}
              </span>
            </button>
          ))}
        </div>

        {/* Staking Input */}
        <div className="bg-background rounded-xl p-6 border border-panel-border">
           <div className="flex justify-between text-sm mb-2">
             <span className="text-text-muted font-semibold">Amount to Stake</span>
             <span className="text-gray-400 font-semibold">Balance: <span className="text-white">0.00 PLUS</span></span>
           </div>
           <div className="relative">
             <input 
               type="number"
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               placeholder="1000.00"
               className="w-full bg-panel border border-panel-border rounded-lg px-4 py-4 text-2xl font-bold text-white focus:border-brand focus:outline-none transition-colors"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
               <span className="text-text-muted font-bold mr-2">PLUS</span>
               <button className="bg-brand/20 hover:bg-brand/40 text-brand text-xs font-bold py-1.5 px-3 rounded-md transition-colors">
                 MAX
               </button>
             </div>
           </div>

           <div className="mt-6">
             {!isConnected ? (
               <NativeConnectButton />
             ) : (
               <button className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all shadow-lg active:scale-[0.98] flex items-center justify-center space-x-2 bg-gradient-to-r ${selectedPool.color} opacity-90 hover:opacity-100`}>
                 <span>Approve & Stake to {selectedPool.name}</span>
                 <ArrowRight size={20} />
               </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
