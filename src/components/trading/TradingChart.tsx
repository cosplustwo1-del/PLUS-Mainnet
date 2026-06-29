"use client";

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import Image from 'next/image';

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#111114' },
        textColor: '#a1a1aa',
      },
      grid: {
        vertLines: { color: '#27272a' },
        horzLines: { color: '#27272a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Generate dummy data for PLUS/USDT
    const data = [];
    let time = Math.floor(Date.now() / 1000) - 86400 * 30; // 30 days ago
    let lastClose = 0.068;
    
    for (let i = 0; i < 100; i++) {
      const open = lastClose + (Math.random() - 0.5) * 0.002;
      const close = open + (Math.random() - 0.5) * 0.002;
      const high = Math.max(open, close) + Math.random() * 0.001;
      const low = Math.min(open, close) - Math.random() * 0.001;
      
      data.push({ time: time as any, open, high, low, close });
      lastClose = close;
      time += 86400; // 1 day
    }
    
    candlestickSeries.setData(data);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="flex-1 bg-panel border-r border-panel-border flex flex-col">
      <div className="h-12 border-b border-panel-border flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-lg">PLUS / USDT</span>
            <span className="text-brand text-xs font-semibold bg-brand/10 px-2 py-0.5 rounded border border-brand/20">Mainnet Spot</span>
          </div>
          <div className="text-2xl font-bold text-long tabular-nums">0.0712</div>
        </div>
        <div className="flex space-x-1 text-xs text-text-muted">
          {['1m', '5m', '15m', '1h', '4h', '1D'].map((tf) => (
            <button key={tf} className={`px-2 py-1 rounded hover:bg-panel-border transition-colors ${tf === '1h' ? 'text-white bg-panel-border font-medium' : ''}`}>
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="flex-1 w-full relative">
        <div className="absolute top-4 left-4 text-xs text-text-muted/50 select-none pointer-events-none z-10 flex flex-col">
          <Image src="/logo-v2.jpg" alt="PLUS" width={120} height={36} className="h-10 w-auto object-contain opacity-20 mix-blend-screen mb-1" />
          <span>TRADINGVIEW CANDLE CHART</span>
        </div>
      </div>
    </div>
  );
}
