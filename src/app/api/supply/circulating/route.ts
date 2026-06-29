import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  // For now, let's assume 1 Billion PLUS is circulating (rest is locked/staked)
  // CoinMarketCap & CoinGecko requires plain text response
  return new NextResponse('1000000000', {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/plain',
    },
  });
}
