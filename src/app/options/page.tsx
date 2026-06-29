"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Zap, TrendingUp, TrendingDown, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function LightningOptionsPage() {
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [timeLeft, setTimeLeft] = useState(299); // 5 minutes
  const [btcPrice, setBtcPrice] = useState(67145.20);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down'>('up');

  const [betAmount, setBetAmount] = useState('100');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulated Pool Data
  const upPool = 45200;
  const downPool = 38900;
  const totalPool = upPool + downPool;
  const platformFee = totalPool * 0.03; // 3% Platform Fee
  const rewardPool = totalPool - platformFee;

  // Dynamic Payout Ratios
  const upPayout = (rewardPool / upPool).toFixed(2);
  const downPayout = (rewardPool / downPool).toFixed(2);

  // Timer & Price Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 299));
      
      // Simulate BTC price jitter
      const jitter = (Math.random() - 0.5) * 10;
      setBtcPrice(prev => {
        const newPrice = prev + jitter;
        setPriceDirection(newPrice > prev ? 'up' : 'down');
        return newPrice;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleBet = async (direction: 'UP' | 'DOWN') => {
    if (!betAmount || !isConnected) return;
    setIsSubmitting(true);
    
    try {
      const orderMessage = `\nPLUS Mainnet - Lightning Options Prediction\n\nAction: Place Prediction\nTarget: BTC/USDT\nPrediction: ${direction}\nBet Amount: ${betAmount} USDT\n\n* Notice: 3% of the total prize pool is deducted as platform fee before distribution.\n\nTimestamp: ${Date.now()}\nNonce: ${crypto.randomUUID()}\n`;

      const signature = await signMessageAsync({ message: orderMessage });
      
      if (signature) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
      alert("Prediction cancelled or signature failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 bg-brand/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(245,158,11,0.5)]">
            <CheckCircle2 className="text-brand" size={48} />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Prediction Locked!</h2>
          <p className="text-xl text-brand font-bold mb-6">Your {betAmount} USDT has been placed.</p>
          <div className="bg-panel border border-panel-border rounded-2xl p-6 text-center max-w-md w-full">
            <p className="text-text-muted text-sm mb-2">Platform Fee Deducted (Total Pool)</p>
            <p className="text-2xl font-bold text-white">3.0%</p>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col items-center">
        
        {/* Header Branding */}
        <div className="text-center mb-8 animate-in slide-in-from-top-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
            <ShieldCheck className="text-blue-400" size={16} />
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Powered by PLUS Decentralized Oracle</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
            <Zap className="inline-block text-amber-500 mr-2 -mt-1" size={40} />
            Lightning Options
          </h1>
          <p className="text-text-muted text-lg">Predict whether BTC will go UP or DOWN in the next 5 minutes.</p>
        </div>

        {/* Full-Width Chart Area */}
        <div className="w-full max-w-6xl mb-8 animate-in zoom-in-95 duration-700">
           <div className="w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-brand/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] bg-panel">
              <iframe 
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=BINANCE:BTCUSDT&interval=1&hidesidetoolbar=1&symboledit=0&saveimage=0&toolbarbg=0a0a0a&theme=dark&style=1&timezone=Asia%2FSeoul"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowTransparency={true} 
                scrolling="no" 
              />
           </div>
        </div>

        {/* Central Dashboard */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in zoom-in-95 duration-700">
          
          {/* Left Column: UP Pool */}
          <div className="order-2 lg:order-1 bg-gradient-to-t from-panel to-green-900/10 border border-panel-border rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
             <div className="absolute -left-10 -top-10 w-40 h-40 bg-green-500/10 blur-[50px] rounded-full pointer-events-none"></div>
             <div>
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-green-500 font-black tracking-widest text-xl">UP POOL</h3>
                 <TrendingUp className="text-green-500" size={24} />
               </div>
               <div className="text-3xl font-black text-white mb-1">{upPool.toLocaleString()} <span className="text-lg text-text-muted">USDT</span></div>
               <p className="text-sm text-green-400/80 font-bold mb-8">Payout: {upPayout}x</p>
             </div>
             <div className="space-y-3">
               <div className="bg-background/50 border border-panel-border rounded-xl px-4 py-3 flex justify-between focus-within:border-green-500 transition-colors">
                 <input 
                   type="number" 
                   value={betAmount}
                   onChange={(e) => setBetAmount(e.target.value)}
                   className="bg-transparent text-white outline-none w-full font-bold text-lg"
                   placeholder="Amount"
                 />
                 <span className="text-text-muted font-bold">USDT</span>
               </div>
               {!isConnected ? (
                 <div className="[&>div]:w-full [&>div>button]:!w-full [&>div>button]:!bg-panel-border [&>div>button]:!rounded-xl">
                   <ConnectButton />
                 </div>
               ) : (
                 <button 
                   onClick={() => handleBet('UP')}
                   disabled={isSubmitting}
                   className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-xl tracking-wider transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50"
                 >
                   ENTER UP
                 </button>
               )}
             </div>
          </div>

          {/* Center Column: Live Oracle & Timer */}
          <div className="order-1 lg:order-2 lg:col-span-2 bg-panel border-2 border-brand/50 rounded-3xl p-6 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden">
             <div className="absolute inset-0 bg-brand/5 animate-pulse pointer-events-none"></div>
             
             <div className="bg-background border border-panel-border rounded-full px-6 py-2 flex items-center space-x-3 mb-8">
               <Clock className="text-amber-500 animate-spin-slow" size={20} />
               <span className="text-2xl font-black text-white tabular-nums tracking-widest">{formatTime(timeLeft)}</span>
             </div>

             <p className="text-text-muted font-bold uppercase tracking-widest text-sm mb-2">Live BTC/USDT Oracle</p>
             <div className={`text-5xl font-black tabular-nums tracking-tight mb-2 flex items-center ${priceDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
             <p className="text-xs text-text-muted mb-6">Updates every second</p>



             <div className="w-full bg-background border border-panel-border rounded-2xl p-4 text-center">
               <p className="text-xs text-text-muted uppercase font-bold mb-1">Total Prize Pool</p>
               <p className="text-2xl font-black text-white mb-2">{totalPool.toLocaleString()} <span className="text-sm text-text-muted">USDT</span></p>
               <div className="flex items-center justify-between text-xs bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
                 <span className="text-amber-500/70">Platform Fee (3%)</span>
                 <span className="text-amber-500 font-bold">{platformFee.toLocaleString()} USDT</span>
               </div>
             </div>
          </div>

          {/* Right Column: DOWN Pool */}
          <div className="order-3 lg:order-3 bg-gradient-to-t from-panel to-red-900/10 border border-panel-border rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/10 blur-[50px] rounded-full pointer-events-none"></div>
             <div>
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-red-500 font-black tracking-widest text-xl">DOWN POOL</h3>
                 <TrendingDown className="text-red-500" size={24} />
               </div>
               <div className="text-3xl font-black text-white mb-1">{downPool.toLocaleString()} <span className="text-lg text-text-muted">USDT</span></div>
               <p className="text-sm text-red-400/80 font-bold mb-8">Payout: {downPayout}x</p>
             </div>
             <div className="space-y-3">
               <div className="bg-background/50 border border-panel-border rounded-xl px-4 py-3 flex justify-between focus-within:border-red-500 transition-colors">
                 <input 
                   type="number" 
                   value={betAmount}
                   onChange={(e) => setBetAmount(e.target.value)}
                   className="bg-transparent text-white outline-none w-full font-bold text-lg"
                   placeholder="Amount"
                 />
                 <span className="text-text-muted font-bold">USDT</span>
               </div>
               {!isConnected ? (
                 <div className="[&>div]:w-full [&>div>button]:!w-full [&>div>button]:!bg-panel-border [&>div>button]:!rounded-xl">
                   <ConnectButton />
                 </div>
               ) : (
                 <button 
                   onClick={() => handleBet('DOWN')}
                   disabled={isSubmitting}
                   className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-black text-xl tracking-wider transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50"
                 >
                   ENTER DOWN
                 </button>
               )}
             </div>
          </div>

        </div>

        {/* Information Bottom */}
        <div className="mt-12 text-center max-w-2xl text-sm text-text-muted space-y-2 animate-in fade-in duration-1000 delay-500">
          <p>By placing a prediction, you are interacting with the PLUS Mainnet Smart Contract.</p>
          <p>A 3% platform fee is deducted from the total prize pool before payouts are distributed to the winning side.</p>
        </div>

      </main>
    </div>
  );
}
