import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker_id = searchParams.get('ticker_id') || 'PLUS_USDT';
  const depth = searchParams.get('depth') || '10';

  const basePrice = 1.02;
  const asks = [];
  const bids = [];

  for (let i = 0; i < parseInt(depth); i++) {
    asks.push([
      (basePrice + (i * 0.005)).toFixed(4), // price
      (Math.random() * 5000 + 100).toFixed(2) // volume
    ]);
    bids.push([
      (basePrice - (i * 0.005)).toFixed(4), // price
      (Math.random() * 5000 + 100).toFixed(2) // volume
    ]);
  }

  return NextResponse.json({
    ticker_id,
    timestamp: Date.now(),
    bids,
    asks
  }, {
    headers: {
      'Cache-Control': 's-maxage=10',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
