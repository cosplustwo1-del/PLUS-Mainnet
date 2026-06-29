import { NextResponse } from 'next/server';
import { createPublicClient, http, parseAbiItem, formatEther } from 'viem';
import { hardhat } from 'viem/chains';
import { plusVaultAddress } from '@/config/contracts';

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
});

export async function GET() {
  try {
    const depositedLogs = await publicClient.getLogs({
      address: plusVaultAddress,
      event: parseAbiItem('event Deposited(address indexed user, uint256 amount)'),
      fromBlock: 'earliest',
      toBlock: 'latest'
    });

    const withdrawnLogs = await publicClient.getLogs({
      address: plusVaultAddress,
      event: parseAbiItem('event Withdrawn(address indexed user, uint256 amount)'),
      fromBlock: 'earliest',
      toBlock: 'latest'
    });

    const marginTransferredLogs = await publicClient.getLogs({
      address: plusVaultAddress,
      event: parseAbiItem('event MarginTransferred(address indexed from, address indexed to, uint256 amount)'),
      fromBlock: 'earliest',
      toBlock: 'latest'
    });

    const formatLogs = (logs: any[], type: string) => logs.map(log => ({
      type,
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      from: log.args.from || log.args.user,
      to: log.args.to || (type === 'Deposited' ? plusVaultAddress : log.args.user),
      amount: formatEther(log.args.amount || BigInt(0))
    }));

    let allLogs = [
      ...formatLogs(depositedLogs, 'Deposited'),
      ...formatLogs(withdrawnLogs, 'Withdrawn'),
      ...formatLogs(marginTransferredLogs, 'MarginTransferred')
    ];

    allLogs.sort((a, b) => b.blockNumber - a.blockNumber);
    // Limit to latest 50 logs for demo
    allLogs = allLogs.slice(0, 50);

    return NextResponse.json(allLogs);
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
