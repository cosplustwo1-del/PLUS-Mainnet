"use client";

import React, { useState, useEffect } from 'react';
import { Pickaxe, Sparkles, CheckCircle2, Crown, Zap, Info } from 'lucide-react';
import Link from 'next/link';

export default function ClickMiner() {
  const [isMining, setIsMining] = useState(false);
  const [minedAmount, setMinedAmount] = useState(0);
  const [hasMinedToday, setHasMinedToday] = useState(false);
  const [isVIP, setIsVIP] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const DAILY_LIMIT = isVIP ? 2.0 : 0.2;

  useEffect(() => {
    // Check local storage for today's mining status
    const lastMined = localStorage.getItem('lastMinedDate');
    const today = new Date().toDateString();
    const vipStatus = localStorage.getItem('isVIP') === 'true';
    setIsVIP(vipStatus);
    
    if (lastMined === today) {
      setHasMinedToday(true);
      setMinedAmount(Number(localStorage.getItem('minedAmount')) || (vipStatus ? 2.0 : 0.2));
    }
  }, []);

  const handleMine = () => {
    if (hasMinedToday) return;
    
    setIsMining(true);
    
    // Simulate mining process
    let counter = 0;
    const interval = setInterval(() => {
      counter += isVIP ? 0.2 : 0.02;
      setMinedAmount(Number(counter.toFixed(2)));
      if (counter >= DAILY_LIMIT) {
        clearInterval(interval);
        setIsMining(false);
        setHasMinedToday(true);
        localStorage.setItem('lastMinedDate', new Date().toDateString());
        localStorage.setItem('minedAmount', DAILY_LIMIT.toString());
      }
    }, 50);
  };

  const handleUpgradeVIP = async () => {
    if(isVIP) return;
    setIsUpgrading(true);
    try {
      // Simulate USDT payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsVIP(true);
      localStorage.setItem('isVIP', 'true');
      alert("VIP Upgrade Successful! 10 USDT paid. Your daily limit is now 10x higher (2.0 PLUS/day).");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className={`border ${isVIP ? 'border-amber-500/50 bg-gradient-to-br from-panel via-amber-900/10 to-background' : 'border-panel-border bg-gradient-to-br from-panel to-background'} p-6 sm:p-8 rounded-3xl shadow-xl transition-all relative overflow-hidden group`}>
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none transition-colors ${isVIP ? 'bg-amber-500/10 group-hover:bg-amber-500/20' : 'bg-gray-500/5 group-hover:bg-gray-500/10'}`}></div>
      
      {isVIP && (
        <div className="absolute -right-12 top-6 bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest py-1 px-12 rotate-45 shadow-lg">
          VIP Pass Active
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${isVIP ? 'bg-amber-500/20 border-amber-500/40' : 'bg-panel-border/50 border-panel-border'}`}>
            {isVIP ? <Crown className="text-amber-500" size={28} /> : <Pickaxe className="text-text-muted" size={28} />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center">
               Daily Cloud Mining 
               <Link href="/guide" className="ml-2 text-amber-400 hover:text-amber-300 transition-colors"><Info size={18} /></Link>
               {isVIP && <span className="ml-2 text-xs bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded uppercase font-black">10x Boost</span>}
            </h3>
            <p className="text-sm text-text-muted">Click once a day to earn free PLUS</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
          <p className="text-sm text-text-muted uppercase tracking-wider font-bold mb-1">Your Balance</p>
          <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${isVIP ? 'from-amber-400 to-yellow-600' : 'from-gray-300 to-gray-500'}`}>
            {minedAmount.toFixed(2)} <span className={`text-xl font-bold ${isVIP ? 'text-amber-500' : 'text-text-muted'}`}>PLUS</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        {!isVIP && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-3 sm:mb-0">
              <h4 className="text-amber-500 font-bold flex items-center space-x-2">
                 <Crown size={16} />
                 <span>Upgrade to VIP Mining Pass</span>
              </h4>
              <p className="text-xs text-text-muted mt-1">Pay 10 USDT to unlock 10x faster mining (2.0 PLUS/day).</p>
            </div>
            <button 
              onClick={handleUpgradeVIP}
              disabled={isUpgrading}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50"
            >
              {isUpgrading ? 'Processing...' : 'Pay 10 USDT & Upgrade'}
            </button>
          </div>
        )}

        {hasMinedToday ? (
          <button 
            disabled
            className="w-full bg-green-500/10 border border-green-500/30 text-green-500 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all"
          >
            <CheckCircle2 size={24} />
            <span>Mining Complete ({DAILY_LIMIT.toFixed(1)} PLUS)</span>
          </button>
        ) : (
          <button 
            onClick={handleMine}
            disabled={isMining}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg ${isMining ? 'bg-panel-border cursor-not-allowed text-white' : isVIP ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-gray-900 hover:scale-[1.02]' : 'bg-white hover:bg-gray-200 text-gray-900 hover:scale-[1.02]'}`}
          >
            {isMining ? (
              <>
                <Pickaxe className="animate-spin" size={24} />
                <span>Extracting PLUS...</span>
              </>
            ) : (
              <>
                {isVIP ? <Sparkles size={24} /> : <Pickaxe size={24} />}
                <span>Start Mining ({DAILY_LIMIT.toFixed(1)} PLUS)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {isMining && (
        <div className="mt-4 h-2 bg-panel-border rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-75 ${isVIP ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gray-400'}`}
            style={{ width: `${(minedAmount / DAILY_LIMIT) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
