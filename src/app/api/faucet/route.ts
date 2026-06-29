import { NextResponse } from 'next/server';
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { hardhat } from 'viem/chains';
import { usdtAddress, plusAddress, erc20ABI } from '@/config/contracts';

// Hardhat Account #0 (Minting Authority)
const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
});

const walletClient = createWalletClient({
  account,
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
});

export async function POST(req: Request) {
  try {
    const { address } = await req.json();
    if (!address || !address.startsWith('0x')) {
      return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
    }

    const amount = parseEther('100000'); // 100,000 tokens

    // Mint USDT
    await walletClient.writeContract({
      address: usdtAddress as `0x${string}`,
      abi: erc20ABI,
      functionName: 'mint',
      args: [address as `0x${string}`, amount],
    });

    // Mint PLUS
    await walletClient.writeContract({
      address: plusAddress as `0x${string}`,
      abi: erc20ABI,
      functionName: 'mint',
      args: [address as `0x${string}`, amount],
    });

    // Send 1 ETH for gas (optional, but good for staking/swap testing later)
    await walletClient.sendTransaction({
      to: address as `0x${string}`,
      value: parseEther('1')
    });

    return NextResponse.json({ success: true, message: 'Tokens minted successfully' });
  } catch (error) {
    console.error('Faucet error:', error);
    return NextResponse.json({ error: 'Faucet failed' }, { status: 500 });
  }
}
