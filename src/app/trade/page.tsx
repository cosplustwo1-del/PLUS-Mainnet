"use client";
import React, { useState, useEffect } from 'react';

export default function TradePage() {
  const [price, setPrice] = useState('1.0200');
  const [amount, setAmount] = useState('');
  
  // Mock orderbook data
  const asks = Array.from({length: 10}, (_, i) => ({
    price: (1.0200 + ((9-i) * 0.005)).toFixed(4),
    amount: (Math.random() * 5000 + 100).toFixed(2),
    total: (Math.random() * 50000 + 1000).toFixed(2)
  }));
  
  const bids = Array.from({length: 10}, (_, i) => ({
    price: (1.0200 - (i * 0.005)).toFixed(4),
    amount: (Math.random() * 5000 + 100).toFixed(2),
    total: (Math.random() * 50000 + 1000).toFixed(2)
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">PLUS / USDT</h1>
            <span className="text-2xl text-green-400 font-mono">$1.0200</span>
            <span className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">+2.5%</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <div>
              <p>24h High</p>
              <p className="text-white font-mono">1.0500</p>
            </div>
            <div>
              <p>24h Low</p>
              <p className="text-white font-mono">0.9950</p>
            </div>
            <div>
              <p>24h Volume(PLUS)</p>
              <p className="text-white font-mono">2,500,000</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2 xl:col-span-2 bg-gray-800/40 border border-gray-700 rounded-xl p-4 flex flex-col min-h-[500px]">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Price Chart</h2>
            <div className="flex-1 flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700/50 relative overflow-hidden">
               {/* Mock Chart Visualization */}
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
               <svg className="w-full h-full opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,100 L0,50 Q25,30 50,60 T100,40 L100,100 Z" fill="url(#chart-grad)" />
                  <path d="M0,50 Q25,30 50,60 T100,40" fill="none" stroke="#3b82f6" strokeWidth="1" />
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-blue-400 animate-pulse">Live TradingView Chart Connecting...</span>
               </div>
            </div>
          </div>

          {/* Orderbook Area */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Price(USDT)</span>
              <span>Amount(PLUS)</span>
              <span>Total</span>
            </div>
            
            {/* Asks (Sells) */}
            <div className="space-y-1 mb-4">
              {asks.map((ask, idx) => (
                <div key={`ask-${idx}`} className="flex justify-between text-sm font-mono relative cursor-pointer hover:bg-gray-700/50 px-1">
                  <div className="absolute right-0 top-0 bottom-0 bg-red-500/10" style={{width: `${Math.random() * 100}%`}}></div>
                  <span className="text-red-400 z-10">{ask.price}</span>
                  <span className="text-gray-300 z-10">{ask.amount}</span>
                  <span className="text-gray-500 z-10">{ask.total}</span>
                </div>
              ))}
            </div>

            <div className="py-2 border-y border-gray-700 flex items-center justify-between">
               <span className="text-xl font-bold text-green-400">1.0200</span>
               <span className="text-xs text-gray-400">$1.02</span>
            </div>

            {/* Bids (Buys) */}
            <div className="space-y-1 mt-4">
              {bids.map((bid, idx) => (
                <div key={`bid-${idx}`} className="flex justify-between text-sm font-mono relative cursor-pointer hover:bg-gray-700/50 px-1">
                  <div className="absolute right-0 top-0 bottom-0 bg-green-500/10" style={{width: `${Math.random() * 100}%`}}></div>
                  <span className="text-green-400 z-10">{bid.price}</span>
                  <span className="text-gray-300 z-10">{bid.amount}</span>
                  <span className="text-gray-500 z-10">{bid.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Entry Area */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4">
            <div className="flex space-x-2 mb-6">
              <button className="flex-1 bg-green-500/20 text-green-400 border border-green-500/50 py-2 rounded-lg font-bold">Buy</button>
              <button className="flex-1 bg-gray-900 text-gray-400 border border-gray-700 py-2 rounded-lg font-bold hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-colors">Sell</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Price (USDT)</label>
                <div className="flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <input 
                    type="text" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-transparent text-white px-3 py-2 w-full outline-none font-mono"
                  />
                  <span className="px-3 py-2 text-gray-500 bg-gray-800">USDT</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Amount (PLUS)</label>
                <div className="flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <input 
                    type="text" 
                    value={amount}
                    placeholder="0.00"
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-white px-3 py-2 w-full outline-none font-mono"
                  />
                  <span className="px-3 py-2 text-gray-500 bg-gray-800">PLUS</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white font-mono">{(parseFloat(price || '0') * parseFloat(amount || '0')).toFixed(2)} USDT</span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-green-500/20 transition-all transform hover:scale-[1.02]">
                  Connect Wallet to Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
