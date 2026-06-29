import { useState, useEffect } from 'react';

export interface Order {
  price: number;
  amount: number;
  total: number;
}

export interface Trade {
  id: string;
  price: number;
  amount: number;
  time: Date;
  type: 'buy' | 'sell';
}

export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function useMarketMaker() {
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [chartData, setChartData] = useState<CandlestickData[]>([]);
  const [lastCandle, setLastCandle] = useState<CandlestickData | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0.0700);

  // Initialize Orderbook & Chart
  useEffect(() => {
    const initialAsks: Order[] = [];
    const initialBids: Order[] = [];
    
    // Asks: 0.0701 ~ 0.0720
    for (let i = 0; i < 20; i++) {
      const price = 0.0701 + (i * 0.0001);
      const amount = Math.floor(Math.random() * 50000) + 10000;
      initialAsks.unshift({ price, amount, total: price * amount });
    }

    // Bids: 0.0680 ~ 0.0699
    for (let i = 0; i < 20; i++) {
      const price = 0.0699 - (i * 0.0001);
      const amount = Math.floor(Math.random() * 50000) + 10000;
      initialBids.push({ price, amount, total: price * amount });
    }

    setAsks(initialAsks);
    setBids(initialBids);

    // Initial Chart Data (Simulating past 60 candles - 1 min candles)
    const initialChart: CandlestickData[] = [];
    let simulatedPrice = 0.0700;
    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    // Start 60 minutes ago
    const startTime = now - (60 * 60);
    
    for (let i = 0; i < 60; i++) {
      const open = simulatedPrice;
      simulatedPrice += (Math.random() - 0.5) * 0.0010;
      if (simulatedPrice < 0.0685) simulatedPrice += 0.0005;
      if (simulatedPrice > 0.0715) simulatedPrice -= 0.0005;
      const close = simulatedPrice;
      const high = Math.max(open, close) + (Math.random() * 0.0005);
      const low = Math.min(open, close) - (Math.random() * 0.0005);
      
      initialChart.push({
        time: startTime + (i * 60),
        open: Number(open.toFixed(4)),
        high: Number(high.toFixed(4)),
        low: Number(low.toFixed(4)),
        close: Number(close.toFixed(4))
      });
    }
    setChartData(initialChart);
    setLastCandle(initialChart[initialChart.length - 1]);
    setCurrentPrice(initialChart[initialChart.length - 1].close);

  }, []);

  // MM Bot Loop
  useEffect(() => {
    if (asks.length === 0 || bids.length === 0) return;

    const interval = setInterval(() => {
      // Determine trade direction (buy or sell)
      // Push price towards middle (0.070) if it gets too close to edges
      let probabilityBuy = 0.5;
      if (currentPrice < 0.0685) probabilityBuy = 0.8;
      if (currentPrice > 0.0715) probabilityBuy = 0.2;

      const isBuy = Math.random() < probabilityBuy;
      const amount = Math.floor(Math.random() * 15000) + 1000;
      
      let executedPrice = currentPrice;
      
      if (isBuy) {
        // Randomly pick a price from the lowest asks
        const index = Math.floor(Math.random() * 3) + 17; // towards the bottom of asks array (which is sorted high to low)
        executedPrice = asks[index]?.price || (currentPrice + 0.0001);
      } else {
        // Randomly pick a price from the highest bids
        const index = Math.floor(Math.random() * 3); // top of bids array
        executedPrice = bids[index]?.price || (currentPrice - 0.0001);
      }

      // Bound the price just in case
      if (executedPrice < 0.068) executedPrice = 0.068;
      if (executedPrice > 0.072) executedPrice = 0.072;

      const newTrade: Trade = {
        id: crypto.randomUUID(),
        price: executedPrice,
        amount: amount,
        time: new Date(),
        type: isBuy ? 'buy' : 'sell'
      };

      setCurrentPrice(executedPrice);

      // Update Trades (keep last 20)
      setRecentTrades(prev => [newTrade, ...prev].slice(0, 20));

      // Update Chart (Candlestick logic)
      const nowSeconds = Math.floor(Date.now() / 1000);
      const currentMinute = nowSeconds - (nowSeconds % 60);
      
      setLastCandle(prev => {
        if (!prev) return null;
        if (prev.time === currentMinute) {
          // Update current candle
          return {
            ...prev,
            close: executedPrice,
            high: Math.max(prev.high, executedPrice),
            low: Math.min(prev.low, executedPrice)
          };
        } else {
          // New candle
          return {
            time: currentMinute,
            open: prev.close,
            high: Math.max(prev.close, executedPrice),
            low: Math.min(prev.close, executedPrice),
            close: executedPrice
          };
        }
      });

      // Slightly jitter the orderbook to simulate real activity
      setAsks(prev => prev.map(ask => ({
        ...ask,
        amount: Math.floor(Math.random() * 50000) + 10000
      })));
      setBids(prev => prev.map(bid => ({
        ...bid,
        amount: Math.floor(Math.random() * 50000) + 10000
      })));

    }, Math.floor(Math.random() * 1500) + 1000); // Trigger every 1~2.5s

    return () => clearInterval(interval);
  }, [asks, bids, currentPrice]);

  return { asks, bids, recentTrades, chartData, lastCandle, currentPrice };
}
