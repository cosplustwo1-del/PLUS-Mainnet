"use client";
import React, { useState } from 'react';

export default function AirdropPage() {
  const [step, setStep] = useState(1);

  const missions = [
    { id: 1, title: 'Join Official Telegram', points: 50, completed: step > 1 },
    { id: 2, title: 'Follow on Twitter (X)', points: 50, completed: step > 2 },
    { id: 3, title: 'Connect Web3 Wallet', points: 100, completed: step > 3 }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-purple-600/20 to-transparent blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-500/10 border border-purple-500/30 px-4 py-1.5 rounded-full text-purple-400 font-bold text-sm mb-6 animate-pulse">
            🚀 LIMITED TIME EVENT
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 mb-6">
            Genesis Airdrop
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Complete simple social missions to claim your share of 10,000,000 PLUS tokens. Early adopters will receive massive rewards.
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.1)]">
          
          {/* Mission Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-xl font-bold text-white">Your Missions</h2>
              <span className="text-purple-400 font-bold">{step - 1} / 3 Completed</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mission List */}
          <div className="space-y-4 mb-10">
            {missions.map((mission) => (
              <div 
                key={mission.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${mission.completed ? 'bg-purple-900/20 border-purple-500/30' : mission.id === step ? 'bg-gray-800/80 border-gray-600 shadow-lg scale-[1.02]' : 'bg-gray-900/40 border-gray-800 opacity-50'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${mission.completed ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                    {mission.completed ? '✓' : mission.id}
                  </div>
                  <div>
                    <h3 className={`font-bold ${mission.completed ? 'text-purple-300' : 'text-gray-200'}`}>{mission.title}</h3>
                    <p className="text-sm text-gray-500">Reward: +{mission.points} PLUS</p>
                  </div>
                </div>
                <div>
                  {!mission.completed && mission.id === step ? (
                    <button 
                      onClick={() => setStep(step + 1)}
                      className="bg-white text-black font-bold px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Start
                    </button>
                  ) : mission.completed ? (
                    <span className="text-purple-400 font-bold text-sm bg-purple-500/10 px-3 py-1 rounded-lg">Done</span>
                  ) : (
                    <span className="text-gray-600 font-bold text-sm">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Final Claim Section */}
          <div className="text-center p-8 bg-black/40 border border-gray-800 rounded-2xl">
            <p className="text-gray-400 mb-2">Total Earned</p>
            <p className="text-5xl font-extrabold text-white mb-6 font-mono">
              {step > 1 ? (step - 1) * 50 + (step > 3 ? 50 : 0) : 0} <span className="text-xl text-purple-400">PLUS</span>
            </p>
            <button 
              disabled={step <= 3}
              className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg transition-all ${step > 3 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              {step > 3 ? 'Claim Tokens' : 'Complete Missions to Claim'}
            </button>
            <p className="text-xs text-gray-500 mt-4">
              * Airdropped tokens are subject to a 10% monthly vesting schedule to ensure ecosystem stability.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
