import React from 'react';
import { Code2, Bug, Rocket, Terminal, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function DeveloperGrants() {
  const quests = [
    {
      id: 1,
      title: 'PLUS NFT Marketplace',
      desc: 'Build a fully functional EVM-compatible NFT Marketplace on the PLUS Mainnet. Must include minting, listing, and trading features.',
      reward: '150,000 PLUS',
      icon: <Rocket className="text-amber-500" size={24} />,
      color: 'amber',
      status: 'OPEN'
    },
    {
      id: 2,
      title: 'Lending Protocol',
      desc: 'Develop a decentralized lending and borrowing protocol supporting USDT and PLUS as collateral.',
      reward: '200,000 PLUS',
      icon: <Code2 className="text-blue-500" size={24} />,
      color: 'blue',
      status: 'OPEN'
    },
    {
      id: 3,
      title: 'Critical Bug Bounty',
      desc: 'Identify and report a critical vulnerability in the core Swap or Staking smart contracts.',
      reward: 'Up to 50,000 PLUS',
      icon: <Bug className="text-red-500" size={24} />,
      color: 'red',
      status: 'ALWAYS OPEN'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Network Info Banner */}
      <div className="bg-panel border border-panel-border rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand/5 blur-[50px] rounded-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-background border border-panel-border rounded-xl flex items-center justify-center">
              <Terminal className="text-text-muted" size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-tight">Mainnet Connection Details</h3>
              <p className="text-xs text-text-muted">Use these settings to deploy your Smart Contracts via Hardhat or Foundry.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-background border border-panel-border px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <span className="text-xs text-text-muted font-bold">RPC URL:</span>
              <span className="text-xs font-mono text-white">https://rpc.plusmain.net</span>
            </div>
            <div className="bg-background border border-panel-border px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <span className="text-xs text-text-muted font-bold">Chain ID:</span>
              <span className="text-xs font-mono text-white">8080</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grants Board */}
      <div className="bg-panel border border-panel-border rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-black text-white flex items-center space-x-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Ecosystem Grants</span>
            <span>& Bounties</span>
          </h3>
          <p className="text-sm text-text-muted mt-1">Build the future of decentralized finance on PLUS Mainnet and get rewarded.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quests.map((quest) => (
            <div key={quest.id} className="bg-background border border-panel-border hover:border-brand/30 transition-all rounded-xl p-5 flex flex-col relative group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${quest.color}-500/10`}>
                  {quest.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full border border-${quest.color}-500/30 text-${quest.color}-500 bg-${quest.color}-500/5`}>
                  {quest.status}
                </span>
              </div>
              <h4 className="text-white font-bold mb-2">{quest.title}</h4>
              <p className="text-xs text-text-muted mb-6 flex-1 leading-relaxed">
                {quest.desc}
              </p>
              
              <div className="border-t border-panel-border pt-4 mt-auto">
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Reward</p>
                <p className={`text-lg font-black text-${quest.color}-500 mb-4`}>{quest.reward}</p>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-panel hover:bg-gray-800 border border-panel-border text-white py-2.5 rounded-lg text-sm font-bold transition-colors group-hover:border-brand/30">
                  <span>Apply Now</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
