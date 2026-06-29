"use client";
import React, { useState } from 'react';

export default function SwapPage() {
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPayAmount(val);
    if (val) {
      // Mock rate: 1 PLUS = 1.02 USDT
      const rate = isFlipped ? 1 / 1.02 : 1.02;
      setReceiveAmount((parseFloat(val) * rate).toFixed(4));
    } else {
      setReceiveAmount('');
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setPayAmount(receiveAmount);
    setReceiveAmount(payAmount);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-16 px-4 font-sans relative overflow-hidden">
      {/* Ambient glowing background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] translate-x-1/4"></div>

      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-4 sm:p-6 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Swap</h1>
          <button className="text-gray-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014-8.81c-2.28 1.093-4.846 1.894-7.536 2.18m11.412 0c-2.69-.286-5.256-1.087-7.536-2.18m-7.536 2.18c-2.69.286-5.256 1.087-7.536 2.18m11.412 0c2.69.286 5.256 1.087 7.536 2.18" />
            </svg>
          </button>
        </div>

        {/* Pay Input */}
        <div className="bg-gray-900/80 rounded-2xl p-4 mb-1 border border-gray-700/50 hover:border-gray-600 transition-colors">
          <p className="text-sm text-gray-400 mb-2">You pay</p>
          <div className="flex justify-between items-center">
            <input 
              type="text"
              value={payAmount}
              onChange={handlePayChange}
              placeholder="0"
              className="bg-transparent text-3xl text-white outline-none w-full font-mono"
            />
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full border border-gray-600 transition-colors shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${!isFlipped ? 'bg-blue-500' : 'bg-green-500'}`}>
                {!isFlipped ? 'P' : 'U'}
              </div>
              <span className="text-white font-semibold">{!isFlipped ? 'PLUS' : 'USDT'}</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Balance: 0.00</p>
        </div>

        {/* Flip Button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button 
            onClick={handleFlip}
            className="bg-gray-800 p-2 rounded-xl border border-gray-600 hover:bg-gray-700 transition-transform hover:rotate-180 duration-300 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
          </button>
        </div>

        {/* Receive Input */}
        <div className="bg-gray-900/80 rounded-2xl p-4 mt-1 border border-gray-700/50 hover:border-gray-600 transition-colors">
          <p className="text-sm text-gray-400 mb-2">You receive</p>
          <div className="flex justify-between items-center">
            <input 
              type="text"
              value={receiveAmount}
              readOnly
              placeholder="0"
              className="bg-transparent text-3xl text-white outline-none w-full font-mono cursor-not-allowed"
            />
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full border border-gray-600 transition-colors shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${!isFlipped ? 'bg-green-500' : 'bg-blue-500'}`}>
                {!isFlipped ? 'U' : 'P'}
              </div>
              <span className="text-white font-semibold">{!isFlipped ? 'USDT' : 'PLUS'}</span>
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50 font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            Connect Wallet
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-gray-900/50 rounded-xl border border-gray-800">
           <div className="flex justify-between text-sm text-gray-400 mb-1">
             <span>Rate</span>
             <span>1 PLUS = 1.02 USDT</span>
           </div>
           <div className="flex justify-between text-sm text-gray-400">
             <span>Network Fee (Zero-Gas)</span>
             <span className="text-green-400 font-bold">0 Gwei</span>
           </div>
        </div>
      </div>
    </div>
  );
}
