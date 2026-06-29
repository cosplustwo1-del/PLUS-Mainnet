import { NextResponse } from 'next/server';
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { hardhat } from 'viem/chains';
import { plusVaultAddress, plusVaultABI } from '@/config/contracts';

// 정산 봇(Operator)의 프라이빗 키 (로컬 Hardhat Account #0)
// 실제 환경에서는 절대 소스코드에 하드코딩하지 않고 환경변수(.env)로 관리합니다.
const operatorAccount = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
});

const walletClient = createWalletClient({
  account: operatorAccount,
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { maker, taker, price, size } = body;

    if (!maker || !taker || !price || !size) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 데모용 정산: 체결이 일어날 때마다 테이커(Taker)의 마진 1 PLUS를 메이커(Maker)에게 지급합니다.
    // (실제 거래소에서는 진입 가격과 청산 가격을 비교하여 PnL을 정확히 계산합니다.)
    const settlementAmount = parseEther("1"); 

    console.log(`[Settlement Worker] Executing on-chain settlement for Trade... Maker: ${maker}, Taker: ${taker}`);

    const hash = await walletClient.writeContract({
      address: plusVaultAddress as `0x${string}`,
      abi: plusVaultABI,
      functionName: 'transferMargin',
      args: [taker, maker, settlementAmount] // 테이커 잔고에서 메이커 잔고로 이동
    });

    console.log(`[Settlement Worker] Transaction Hash: ${hash}`);

    // Rust 엔진의 논블로킹 처리를 위해 트랜잭션 채굴(Receipt)을 기다리지 않고 즉시 응답
    return NextResponse.json({ success: true, hash });
  } catch (error) {
    console.error("[Settlement Worker] Error:", error);
    return NextResponse.json({ error: "Settlement failed" }, { status: 500 });
  }
}
