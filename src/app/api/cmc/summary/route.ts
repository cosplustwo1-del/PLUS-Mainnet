import { NextResponse } from 'next/server';

// SECURITY: Read-only GET request.
export async function GET() {
  // For CoinMarketCap Summary API
  // Using a simulated price defense engine to maintain $1.00 - $1.05 during early launch phase.
  const basePrice = 1.02;
  const variation = (Math.random() * 0.03).toFixed(4);
  const currentPrice = (basePrice + parseFloat(variation)).toFixed(4);

  const mockData = {
    trading_pairs: "PLUS_USDT",
    last_price: currentPrice,
    lowest_ask: (parseFloat(currentPrice) + 0.001).toFixed(4),
    highest_bid: (parseFloat(currentPrice) - 0.001).toFixed(4),
    base_volume: "2500000.00", // 2.5M PLUS traded
    quote_volume: "2550000.00", // 2.55M USDT traded
    price_change_percent_24h: "+2.5%",
    highest_price_24h: "1.0500",
    lowest_price_24h: "0.9950"
  };

  return NextResponse.json([
    mockData
  ], {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  });
}
