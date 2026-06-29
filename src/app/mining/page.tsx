import React from 'react';
import Header from '@/components/layout/Header';
import ClickMiner from '@/components/mining/ClickMiner';
import { Activity, Coins, Server, ArrowRight, Flame, Info } from 'lucide-react';
import Link from 'next/link';

export default function MiningDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Live Hybrid Mining</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">PLUS</span> Every Second
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Join the revolutionary 4-in-1 hybrid mining system. Earn rewards through trading, providing liquidity, running a node, or simply clicking daily.
          </p>
        </div>

        {/* Real-time Buyback & Burn Dashboard */}
        <div className="max-w-4xl mx-auto mb-16 animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="relative bg-gradient-to-r from-red-900/20 via-orange-900/10 to-red-900/20 border border-red-500/30 rounded-3xl p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col md:flex-row items-center justify-between">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-red-500/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10 flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <Flame className="text-red-500 animate-pulse" size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Live Buyback & Burn</h2>
                <p className="text-sm text-red-200/70 font-medium">
                  VIP Pass 결제 금액의 50%가 즉시 시장가 매수에 사용되며 전량 영구 소각됩니다.
                </p>
              </div>
            </div>

            <div className="relative z-10 text-right bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-red-500/20">
              <p className="text-xs text-red-400 font-bold uppercase tracking-widest mb-2">Total PLUS Burned 🔥</p>
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 tabular-nums">
                245,100<span className="text-2xl ml-2 text-red-500">.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          {/* 1. Daily Cloud Mining (Interactive) */}
          <ClickMiner />

          {/* 2. Trade Mining */}
          <div className="bg-panel border border-panel-border p-6 sm:p-8 rounded-3xl hover:border-amber-500/30 transition-all group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6">
              <Activity className="text-blue-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
               Trade Mining 
               <Link href="/guide" className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"><Info size={20} /></Link>
            </h3>
            <p className="text-text-muted mb-6">
              Get up to 120% of your trading fees refunded in PLUS tokens automatically on every swap.
            </p>
            <div className="flex justify-between items-center bg-background rounded-xl p-4 mb-6 border border-panel-border">
              <div>
                <p className="text-xs text-text-muted mb-1">Current Mining Rate</p>
                <p className="text-lg font-bold text-white">1.2 PLUS / $10 Vol</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted mb-1">Total Mined</p>
                <p className="text-lg font-bold text-blue-400">0.00 PLUS</p>
              </div>
            </div>
            <Link href="/swap" className="w-full flex items-center justify-center space-x-2 bg-panel-border hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-colors">
              <span>Go Trade</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* 3. Yield Farming */}
          <div className="bg-panel border border-panel-border p-6 sm:p-8 rounded-3xl hover:border-amber-500/30 transition-all group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/5 blur-[50px] group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 mb-6">
              <Coins className="text-purple-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
               Yield Farming 
               <Link href="/guide" className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"><Info size={20} /></Link>
            </h3>
            <p className="text-text-muted mb-6">
              Provide liquidity to the USDT/PLUS pool and earn block rewards every second.
            </p>
            <div className="flex justify-between items-center bg-background rounded-xl p-4 mb-6 border border-panel-border">
              <div>
                <p className="text-xs text-text-muted mb-1">Estimated APY</p>
                <p className="text-lg font-bold text-purple-400">1,420%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted mb-1">TVL</p>
                <p className="text-lg font-bold text-white">$2.4M</p>
              </div>
            </div>
            <Link href="/staking" className="w-full flex items-center justify-center space-x-2 bg-panel-border hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-colors">
              <span>Stake Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* 4. Node Staking */}
          <div className="bg-panel border border-panel-border p-6 sm:p-8 rounded-3xl hover:border-amber-500/30 transition-all group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-6">
              <Server className="text-emerald-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
               Node Staking 
               <Link href="/guide" className="ml-2 text-emerald-400 hover:text-emerald-300 transition-colors"><Info size={20} /></Link>
            </h3>
            <p className="text-text-muted mb-6">
              Stake at least 10,000 PLUS to become a network validator and earn transaction fees.
            </p>
            <div className="flex justify-between items-center bg-background rounded-xl p-4 mb-6 border border-panel-border">
              <div>
                <p className="text-xs text-text-muted mb-1">Active Nodes</p>
                <p className="text-lg font-bold text-white">24</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted mb-1">Min Stake</p>
                <p className="text-lg font-bold text-emerald-400">10k PLUS</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center space-x-2 bg-background border border-panel-border text-text-muted py-3 rounded-xl font-bold cursor-not-allowed">
              <span>Coming Soon</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
