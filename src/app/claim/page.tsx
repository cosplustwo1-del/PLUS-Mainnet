"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ClaimPage() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  // Mock Vesting Data
  const totalAllocated = 100000;
  const totalUnlocked = hasClaimed ? 20000 : 0;
  const availableToClaim = hasClaimed ? 0 : 20000;
  const lockedAmount = 80000;
  const progressPercent = ((totalUnlocked + availableToClaim) / totalAllocated) * 100;

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setHasClaimed(true);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 md:p-10 bg-gray-950 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Token Vesting Portal
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Securely claim your unlocked PLUS tokens according to the global standard vesting schedule. 
            Your remaining allocation is safely locked in the Genesis Smart Contract.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Vesting Stats & Action */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Stats Card */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Your Allocation</h2>
                  <div className="text-sm text-gray-500">Connected: 0x7F5...3b9A</div>
                </div>
                <div className="bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700">
                  <span className="text-2xl font-black text-white">{totalAllocated.toLocaleString()} </span>
                  <span className="text-cyan-400 font-bold">PLUS</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Vesting Progress</span>
                  <span className="text-cyan-400 font-bold">{progressPercent}% Unlocked</span>
                </div>
                <div className="w-full h-4 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800/50">
                  <div className="text-gray-500 text-sm mb-1">Claimed</div>
                  <div className="text-xl font-bold text-white">{totalUnlocked.toLocaleString()}</div>
                </div>
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800/50">
                  <div className="text-gray-500 text-sm mb-1">Locked (Vesting)</div>
                  <div className="text-xl font-bold text-gray-400">{lockedAmount.toLocaleString()}</div>
                </div>
                <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/30">
                  <div className="text-cyan-400 text-sm mb-1">Available to Claim</div>
                  <div className="text-2xl font-black text-cyan-400">{availableToClaim.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleClaim}
                disabled={availableToClaim === 0 || isClaiming || hasClaimed}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex justify-center items-center gap-3
                  ${hasClaimed 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[1.02]'
                  }
                `}
              >
                {isClaiming ? (
                  <><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing Contract...</>
                ) : hasClaimed ? (
                  <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Successfully Claimed</>
                ) : (
                  `Claim ${availableToClaim.toLocaleString()} PLUS (Initial 20%)`
                )}
              </button>
              
              {hasClaimed && (
                <div className="text-center mt-4 text-sm text-green-400 font-medium">
                  Tokens have been successfully transferred to your wallet. You can now trade them on the DEX.
                </div>
              )}
            </div>

            {/* Vesting Schedule Table */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Vesting Schedule (Next Unlocks)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gray-950/50 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">1</div>
                    <div>
                      <div className="font-bold text-white">TGE (Token Generation Event)</div>
                      <div className="text-sm text-gray-500">Initial 20% Unlock</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-cyan-400">20,000 PLUS</div>
                    <div className="text-xs text-green-400">Unlocked</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-950/50 rounded-xl border border-gray-800 opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-bold">2</div>
                    <div>
                      <div className="font-bold text-white">Month 1 (July 2026)</div>
                      <div className="text-sm text-gray-500">Linear Vesting (10%)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-400">10,000 PLUS</div>
                    <div className="text-xs text-orange-400">Locked</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-950/50 rounded-xl border border-gray-800 opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-bold">3</div>
                    <div>
                      <div className="font-bold text-white">Month 2 (August 2026)</div>
                      <div className="text-sm text-gray-500">Linear Vesting (10%)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-400">10,000 PLUS</div>
                    <div className="text-xs text-orange-400">Locked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Promotional Carrot (Staking) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="bg-gray-950 rounded-[22px] p-6 h-full relative z-10">
                <div className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold rounded-full mb-4 animate-pulse">
                  🔥 HOT PROMOTION
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Don't Sell. Multiply.</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Instead of dumping your initial 20% on the DEX, stake it now to earn astronomical returns.
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center mb-6">
                  <div className="text-sm text-gray-400 mb-1">Current APY</div>
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                    300%
                  </div>
                </div>
                <Link href="/staking">
                  <button className="w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-bold text-white transition-colors">
                    Go to Staking Bank →
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Why Vesting?
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Global top-tier exchanges require strict token circulation control to prevent market manipulation. Our Smart Contract-based vesting ensures long-term value protection for all genuine holders.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
