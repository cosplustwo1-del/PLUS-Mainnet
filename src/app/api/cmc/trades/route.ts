import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker_id = searchParams.get('ticker_id') || 'PLUS_USDT';

  const basePrice = 1.02;
  const trades = [];

  for (let i = 0; i < 50; i++) {
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const priceDiff = (Math.random() * 0.01) - 0.005;
    
    trades.push({
      trade_id: `tx_${Date.now() - (i * 1000)}_${i}`,
      price: (basePrice + priceDiff).toFixed(4),
      base_volume: (Math.random() * 1000 + 10).toFixed(2),
      quote_volume: (Math.random() * 1000 * basePrice).toFixed(2),
      timestamp: Date.now() - (i * 5000),
      type
    });
  }

  return NextResponse.json(trades, {
    headers: {
      'Cache-Control': 's-maxage=10',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
