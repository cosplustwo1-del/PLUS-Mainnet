"use client";
import React, { useState } from 'react';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'tokens' | 'activity'>('tokens');
  
  // Mock Wallet Data
  const walletAddress = "0x7F5...3b9A";
  const totalBalanceUsd = "245,600.00";
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center bg-gray-950 p-4 md:p-8">
      {/* Mobile App Container (MetaMask style) */}
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col h-[750px] max-h-full">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-4 flex justify-between items-center bg-gray-900/90 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-gray-800">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-bold text-white text-lg">PLUS Network</span>
          </div>
          <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300 font-mono flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Connected
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
          {/* Account Overview */}
          <div className="flex flex-col items-center justify-center pt-4 pb-8">
            <div className="bg-gray-800/50 px-4 py-1.5 rounded-2xl text-sm text-cyan-400 font-mono mb-4 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
              {walletAddress}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            
            <div className="text-5xl font-black text-white tracking-tight mb-2">
              ${totalBalanceUsd}
            </div>
            <div className="text-gray-400 font-medium">
              Total Balance
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 px-6 mb-8">
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </button>
              <span className="text-cyan-400 font-semibold text-sm">Send</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
              <span className="text-cyan-400 font-semibold text-sm">Receive</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </button>
              <span className="text-gray-300 font-medium text-sm">Swap</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-2">
            <button 
              onClick={() => setActiveTab('tokens')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'tokens' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Tokens
            </button>
            <button 
              onClick={() => setActiveTab('activity')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'activity' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="px-4">
            {activeTab === 'tokens' ? (
              <div className="flex flex-col gap-2">
                {/* PLUS Token */}
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-2xl hover:bg-gray-800/60 transition-colors cursor-pointer border border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <div>
                      <div className="font-bold text-white">PLUS</div>
                      <div className="text-xs text-cyan-400">$1.02</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">100,000.00</div>
                    <div className="text-xs text-gray-400">$102,000.00</div>
                  </div>
                </div>

                {/* USDT Token */}
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-2xl hover:bg-gray-800/60 transition-colors cursor-pointer border border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#26A17B] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">₮</span>
                    </div>
                    <div>
                      <div className="font-bold text-white">USDT</div>
                      <div className="text-xs text-gray-400">$1.00</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">143,600.00</div>
                    <div className="text-xs text-gray-400">$143,600.00</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Activity Item 1 */}
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-2xl border border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </div>
                    <div>
                      <div className="font-bold text-white">Receive PLUS</div>
                      <div className="text-xs text-green-400">Confirmed • 2m ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">+10,000.00</div>
                    <div className="text-xs text-gray-400">$10,200.00</div>
                  </div>
                </div>
                
                {/* Activity Item 2 */}
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-2xl border border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>
                    <div>
                      <div className="font-bold text-white">Swap USDT for PLUS</div>
                      <div className="text-xs text-gray-400">Confirmed • 1h ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">-5,000.00 USDT</div>
                    <div className="text-xs text-cyan-400">+4,901.96 PLUS</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-900 border-t border-gray-800 flex justify-around items-center px-6">
          <div className="flex flex-col items-center gap-1 text-cyan-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            <span className="text-[10px] font-bold">Wallet</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[10px] font-bold">Explorer</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-[10px] font-bold">Settings</span>
          </div>
        </div>

      </div>
    </div>
  );
}
