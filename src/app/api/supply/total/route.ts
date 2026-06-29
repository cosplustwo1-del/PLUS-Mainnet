import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  // CoinMarketCap & CoinGecko requires plain text response for supply APIs
  return new NextResponse('10000000000', {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/plain',
    },
  });
}
