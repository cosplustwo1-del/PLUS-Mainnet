"use client";

import React, { useEffect, useState } from 'react';

interface PriceLevel {
  price: number;
  size: number;
}

interface OrderBookData {
  bids: PriceLevel[];
  asks: PriceLevel[];
}

export default function OrderBook() {
  const [data, setData] = useState<OrderBookData>({ bids: [], asks: [] });

  // Simulate high-frequency trading for PLUS/USDT
  useEffect(() => {
    const interval = setInterval(() => {
      const basePrice = 0.0712;
      const newBids = Array.from({ length: 15 }).map((_, i) => ({
        price: Number((basePrice - (i + 1) * 0.0001).toFixed(4)),
        size: Math.floor(Math.random() * 500000) + 50000,
      }));
      const newAsks = Array.from({ length: 15 }).map((_, i) => ({
        price: Number((basePrice + (i + 1) * 0.0001).toFixed(4)),
        size: Math.floor(Math.random() * 500000) + 50000,
      })).reverse(); // High to low visually

      setData({ bids: newBids, asks: newAsks });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const displayBids = data.bids;
  const displayAsks = data.asks;

  const maxTotal = displayBids.length > 0 ? Math.max(
    ...displayBids.map(b => b.size),
    ...displayAsks.map(a => a.size),
    1
  ) : 1000000;

  return (
    <div className="w-80 bg-panel border-l border-panel-border flex flex-col shrink-0 h-full z-10 relative shadow-2xl">
      <div className="p-4 border-b border-panel-border flex justify-between items-center shrink-0">
        <h3 className="font-semibold text-white">Order Book</h3>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden text-sm">
        <div className="flex px-4 py-2 text-text-muted text-xs">
          <div className="flex-1">Price</div>
          <div className="flex-1 text-right">Size</div>
          <div className="flex-1 text-right">Total</div>
        </div>

        {/* Asks (留ㅻ룄 ?멸?, ?꾩뿉?쒕????꾨옒濡?媛덉닔濡?媛寃⑹씠 ??븘吏?- ?ㅼ젣濡쒕뒗 reverse ?뚮뜑留??꾩슂) */}
        <div className="flex-1 overflow-y-auto flex flex-col-reverse custom-scrollbar border-b border-panel-border">
          {displayAsks.map((ask, i) => {
            const width = (ask.size / maxTotal) * 100;
            return (
              <div key={i} className="flex px-4 py-1.5 relative hover:bg-panel-border cursor-pointer group transition-colors">
                <div className="absolute top-0 right-0 h-full bg-short/10 z-0 transition-all duration-100" style={{ width: `${width}%` }}></div>
                <div className="flex-1 text-short font-medium z-10">{ask.price.toFixed(4)}</div>
                <div className="flex-1 text-right text-white z-10">{ask.size.toLocaleString()}</div>
                <div className="flex-1 text-right text-text-muted z-10">{ask.size.toLocaleString()}</div>
              </div>
            );
          })}
        </div>

        {/* Spread / Mid Price (媛????? 留ㅻ룄?멸?? 媛???믪? 留ㅼ닔?멸???以묒븰媛? */}
        <div className="py-3 px-4 bg-background/80 text-center shrink-0 shadow-inner">
          <span className="text-lg font-bold text-white tracking-wider">
            {displayAsks.length > 0 && displayBids.length > 0 
              ? ((displayAsks[displayAsks.length - 1].price + displayBids[0].price) / 2).toFixed(4) 
              : '---'}
          </span>
        </div>

        {/* Bids (留ㅼ닔 ?멸?) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar border-t border-panel-border">
          {displayBids.map((bid, i) => {
            const width = (bid.size / maxTotal) * 100;
            return (
              <div key={i} className="flex px-4 py-1.5 relative hover:bg-panel-border cursor-pointer group transition-colors">
                <div className="absolute top-0 right-0 h-full bg-long/10 z-0 transition-all duration-100" style={{ width: `${width}%` }}></div>
                <div className="flex-1 text-long font-medium z-10">{bid.price.toFixed(4)}</div>
                <div className="flex-1 text-right text-white z-10">{bid.size.toLocaleString()}</div>
                <div className="flex-1 text-right text-text-muted z-10">{bid.size.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
