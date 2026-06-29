"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import { useMarketMaker } from '@/hooks/useMarketMaker';
import { createChart, ColorType, ISeriesApi } from 'lightweight-charts';
import { ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';

export default function ExchangePage() {
  const { asks, bids, recentTrades, chartData, lastCandle, currentPrice } = useMarketMaker();
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const candleSeriesRef = React.useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [orderSide, setOrderSide] = React.useState<'buy'|'sell'>('buy');
  const [orderSize, setOrderSize] = React.useState<string>('');
  const [usdtBalance, setUsdtBalance] = React.useState<number>(8420.00);
  const [plusBalance, setPlusBalance] = React.useState<number>(1450.50);

  const handleTradeSubmit = () => {
    const size = parseFloat(orderSize);
    if (isNaN(size) || size <= 0) return alert('Please enter a valid size.');
    
    const totalCost = size * currentPrice;

    if (orderSide === 'buy') {
      if (usdtBalance < totalCost) return alert('Insufficient USDT balance.');
      setUsdtBalance(prev => prev - totalCost);
      setPlusBalance(prev => prev + size);
      alert(`Successfully bought ${size} PLUS for ${totalCost.toFixed(4)} USDT!`);
    } else {
      if (plusBalance < size) return alert('Insufficient PLUS balance.');
      setPlusBalance(prev => prev - size);
      setUsdtBalance(prev => prev + totalCost);
      alert(`Successfully sold ${size} PLUS for ${totalCost.toFixed(4)} USDT!`);
    }
    setOrderSize('');
  };

  React.useEffect(() => {
    if (!chartContainerRef.current) return;
    if (chartData.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9ca3af',
      },
      grid: {
        vertLines: { color: '#1f2937' },
        horzLines: { color: '#1f2937' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#374151',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22c55e', 
      downColor: '#ef4444', 
      borderVisible: false,
      wickUpColor: '#22c55e', 
      wickDownColor: '#ef4444',
    });

    // Convert custom CandlestickData to lightweight-charts format
    const formattedData = chartData.map(d => ({
      time: d.time as any,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close
    }));

    // Remove duplicates by time if any exist
    const uniqueData = Array.from(new Map(formattedData.map(item => [item.time, item])).values());
    // Sort by time
    uniqueData.sort((a, b) => a.time - b.time);

    candleSeries.setData(uniqueData);
    chart.timeScale().fitContent();

    candleSeriesRef.current = candleSeries;

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
  }, [chartData]); // Initialize only when chartData is first loaded

  React.useEffect(() => {
    if (candleSeriesRef.current && lastCandle) {
      candleSeriesRef.current.update({
        time: lastCandle.time as any,
        open: lastCandle.open,
        high: lastCandle.high,
        low: lastCandle.low,
        close: lastCandle.close
      });
    }
  }, [lastCandle]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col h-screen overflow-hidden">
      <Header />
      
      {/* Top Bar */}
      <div className="h-16 border-b border-panel-border bg-panel flex items-center px-6 shrink-0">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white text-xs">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-lg leading-tight">PLUS / USDT</span>
              <span className="text-xs text-brand underline cursor-pointer">PRC-20 (PLUS Mainnet)</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-text-muted">24h Price</span>
            <span className={`font-bold text-lg ${currentPrice >= 0.0700 ? 'text-long' : 'text-short'}`}>
              {currentPrice.toFixed(4)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-text-muted">24h High</span>
            <span className="font-bold text-white">0.0720</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-text-muted">24h Low</span>
            <span className="font-bold text-white">0.0680</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-text-muted">24h Volume(PLUS)</span>
            <span className="font-bold text-white">{(4523891).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chart */}
        <div className="flex-1 flex flex-col border-r border-panel-border">
          <div className="p-4 border-b border-panel-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity size={16} className="text-brand" /> 
              Live Market Chart
            </h2>
            <div className="flex space-x-2">
              <span className="text-xs bg-panel border border-panel-border px-2 py-1 rounded text-white">1s</span>
              <span className="text-xs bg-brand/20 text-brand border border-brand/50 px-2 py-1 rounded">Live</span>
            </div>
          </div>
          <div className="flex-1 p-0 bg-background relative">
            {chartData.length === 0 ? (
               <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                  Loading Chart Data...
               </div>
            ) : (
               <div ref={chartContainerRef} className="absolute inset-0 w-full h-full" />
            )}
          </div>
        </div>

        {/* Middle: Orderbook */}
        <div className="w-80 flex flex-col border-r border-panel-border bg-panel shrink-0">
          <div className="p-3 border-b border-panel-border">
            <h2 className="text-sm font-bold text-white">Orderbook</h2>
          </div>
          <div className="flex text-xs text-text-muted p-2">
            <div className="flex-1">Price(USDT)</div>
            <div className="flex-1 text-right">Size(PLUS)</div>
            <div className="flex-1 text-right">Total</div>
          </div>
          
          {/* Asks (Red) */}
          <div className="flex-1 overflow-hidden flex flex-col-reverse">
             <div className="px-2">
              {asks.slice(-15).map((ask, i) => (
                <div key={i} className="flex text-xs py-0.5 hover:bg-background/50 cursor-pointer relative group">
                  <div className="absolute inset-y-0 right-0 bg-short/10 z-0" style={{ width: `${(ask.amount / 60000) * 100}%`}}></div>
                  <div className="flex-1 text-short z-10">{ask.price.toFixed(4)}</div>
                  <div className="flex-1 text-right text-white z-10">{ask.amount.toLocaleString()}</div>
                  <div className="flex-1 text-right text-text-muted z-10">{ask.total.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                </div>
              ))}
             </div>
          </div>

          {/* Current Price Divider */}
          <div className="py-2 border-y border-panel-border text-center flex items-center justify-center space-x-2 bg-background/50">
             <span className={`text-xl font-bold ${currentPrice >= 0.0700 ? 'text-long' : 'text-short'}`}>
               {currentPrice.toFixed(4)}
             </span>
             {currentPrice >= 0.0700 ? <ArrowUpRight className="text-long" size={20} /> : <ArrowDownRight className="text-short" size={20} />}
          </div>

          {/* Bids (Green) */}
          <div className="flex-1 overflow-hidden">
             <div className="px-2">
              {bids.slice(0, 15).map((bid, i) => (
                <div key={i} className="flex text-xs py-0.5 hover:bg-background/50 cursor-pointer relative group">
                  <div className="absolute inset-y-0 right-0 bg-long/10 z-0" style={{ width: `${(bid.amount / 60000) * 100}%`}}></div>
                  <div className="flex-1 text-long z-10">{bid.price.toFixed(4)}</div>
                  <div className="flex-1 text-right text-white z-10">{bid.amount.toLocaleString()}</div>
                  <div className="flex-1 text-right text-text-muted z-10">{bid.total.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                </div>
              ))}
             </div>
          </div>
        </div>

        {/* Right: Recent Trades & Order Entry */}
        <div className="w-80 flex flex-col bg-panel shrink-0">
          {/* Real Order Entry */}
          <div className="p-4 border-b border-panel-border">
            <div className="flex bg-background rounded-lg p-1 mb-4">
              <button 
                onClick={() => setOrderSide('buy')} 
                className={`flex-1 rounded-md py-1.5 text-sm font-bold transition-all ${orderSide === 'buy' ? 'bg-long text-white shadow-md' : 'text-text-muted hover:text-white'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setOrderSide('sell')} 
                className={`flex-1 rounded-md py-1.5 text-sm font-bold transition-all ${orderSide === 'sell' ? 'bg-short text-white shadow-md' : 'text-text-muted hover:text-white'}`}
              >
                Sell
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Avail</span>
                <span className="text-white font-mono cursor-pointer hover:text-brand" onClick={() => setOrderSize(orderSide === 'buy' ? (usdtBalance / currentPrice).toFixed(2) : plusBalance.toString())}>
                  {orderSide === 'buy' ? `${usdtBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USDT` : `${plusBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} PLUS`}
                </span>
              </div>
              <div className="bg-background border border-panel-border rounded-lg flex px-3 py-2">
                <span className="text-text-muted text-sm w-12">Price</span>
                <input type="text" value={currentPrice.toFixed(4)} readOnly className="bg-transparent text-white text-right w-full outline-none font-mono text-sm" />
                <span className="text-text-muted text-sm ml-2">USDT</span>
              </div>
              <div className="bg-background border border-panel-border focus-within:border-brand rounded-lg flex px-3 py-2 transition-colors">
                <span className="text-text-muted text-sm w-12">Size</span>
                <input 
                  type="number" 
                  min="0" 
                  step="any"
                  placeholder="0.00" 
                  value={orderSize}
                  onChange={(e) => setOrderSize(e.target.value)}
                  className="bg-transparent text-white text-right w-full outline-none font-mono text-sm" 
                />
                <span className="text-text-muted text-sm ml-2">PLUS</span>
              </div>
              
              <div className="flex justify-between text-xs text-text-muted px-1">
                <span>Total Cost</span>
                <span className="text-white">{(parseFloat(orderSize || '0') * currentPrice).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 4})} USDT</span>
              </div>

              <button 
                onClick={handleTradeSubmit}
                disabled={!orderSize || parseFloat(orderSize) <= 0}
                className={`w-full text-white font-bold py-3 rounded-xl mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  orderSide === 'buy' 
                  ? 'bg-long hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                  : 'bg-short hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                }`}
              >
                {orderSide === 'buy' ? 'Buy PLUS' : 'Sell PLUS'}
              </button>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-panel-border bg-background/50">
              <h2 className="text-sm font-bold text-white">Market Trades</h2>
            </div>
            <div className="flex text-xs text-text-muted p-2">
              <div className="flex-1">Price</div>
              <div className="flex-1 text-right">Amount</div>
              <div className="flex-1 text-right">Time</div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 pb-4">
              <div className="space-y-0.5">
                {recentTrades.map(trade => (
                  <div key={trade.id} className="flex text-xs py-1 animate-in fade-in zoom-in-95 duration-200">
                    <div className={`flex-1 font-bold ${trade.type === 'buy' ? 'text-long' : 'text-short'}`}>
                      {trade.price.toFixed(4)}
                    </div>
                    <div className="flex-1 text-right text-white">{trade.amount.toLocaleString()}</div>
                    <div className="flex-1 text-right text-text-muted">
                      {trade.time.toLocaleTimeString([], { hour12: false })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
