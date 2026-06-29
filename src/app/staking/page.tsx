"use client";
import React, { useState } from 'react';

export default function StakingPage() {
  const [stakeAmount, setStakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState('stake');

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            PLUS Staking Bank
          </h1>
          <p className="text-gray-400 text-lg">
            Lock your PLUS tokens to secure the Zero-Gas Mainnet and earn a fixed 20% APY.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-1">Total Value Locked (TVL)</p>
            <p className="text-3xl font-bold text-white">$12,450,000</p>
            <p className="text-sm text-emerald-400 mt-2">+ 1.2M PLUS this week</p>
          </div>
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-1">Current APY</p>
            <p className="text-3xl font-bold text-emerald-400">20.00%</p>
            <p className="text-sm text-gray-500 mt-2">Fixed Rate Guaranteed</p>
          </div>
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-1">Your Total Staked</p>
            <p className="text-3xl font-bold text-blue-400">0.00 PLUS</p>
            <p className="text-sm text-gray-500 mt-2">≈ $0.00 USD</p>
          </div>
        </div>

        {/* Main Staking Interface */}
        <div className="max-w-xl mx-auto bg-gray-800/60 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-gray-900/50 rounded-xl p-1 mb-8">
            <button 
              onClick={() => setActiveTab('stake')} 
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeTab === 'stake' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Stake
            </button>
            <button 
              onClick={() => setActiveTab('unstake')} 
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${activeTab === 'unstake' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Unstake
            </button>
          </div>

          {/* Input Area */}
          <div className="bg-gray-900/80 rounded-2xl p-4 border border-gray-700/50 mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Amount to {activeTab === 'stake' ? 'Stake' : 'Unstake'}</span>
              <span>Available: 0.00 PLUS</span>
            </div>
            <div className="flex justify-between items-center">
              <input 
                type="text"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-3xl text-white outline-none w-full font-mono"
              />
              <button className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-600/40 transition-colors ml-4">
                MAX
              </button>
            </div>
          </div>

          {/* Info Rows */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Est. Monthly Reward</span>
              <span className="text-emerald-400 font-bold">+ {(parseFloat(stakeAmount || '0') * 0.20 / 12).toFixed(2)} PLUS</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Lock-up Period</span>
              <span className="text-white">None (Flexible)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-emerald-400 font-bold">0 Gwei (Zero-Gas)</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            Connect Wallet to {activeTab === 'stake' ? 'Stake' : 'Unstake'}
          </button>
        </div>
      </div>
    </div>
  );
}
