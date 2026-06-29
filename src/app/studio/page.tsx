"use client";

import React, { useState } from 'react';
import { Cpu, Code, Rocket, CheckCircle2, Loader2, ArrowRight, ShieldAlert } from 'lucide-react';

export default function TokenStudioPage() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  
  const [deployStep, setDeployStep] = useState(0);
  
  // Dynamic Fee calculation based on initial supply
  // Base 1,000 PLUS. If supply > 1 Billion, add 4,000 PLUS.
  const calculateFee = () => {
    if (!totalSupply) return 1000;
    const supply = Number(totalSupply);
    if (supply > 1000000000) return 5000;
    return 1000;
  };

  const handleDeploy = () => {
    if (deployStep !== 0) return;
    
    setDeployStep(1);
    setTimeout(() => {
      setDeployStep(2);
      setTimeout(() => {
        setDeployStep(3);
        setTimeout(() => {
          setDeployStep(4);
        }, 2000);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-gray-900 flex items-center justify-center space-x-3">
            <Cpu className="text-amber-500" size={40} />
            <span>PLUS Token Studio</span>
          </h1>
          <p className="text-lg text-gray-500 mt-3">
            Launch your own PRC-20 token on the PLUS Mainnet in 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Token Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Token Name</label>
                <input 
                  type="text" 
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g. Mega Metaverse Token"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-bold focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Token Symbol</label>
                <input 
                  type="text" 
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  placeholder="e.g. MMT"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-bold focus:border-amber-500 focus:outline-none transition-colors uppercase"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Initial Supply</label>
                <input 
                  type="number" 
                  value={totalSupply}
                  onChange={(e) => setTotalSupply(e.target.value)}
                  placeholder="e.g. 1000000000"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-bold focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Fee Box */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-bold text-sm">Deployment Fee</span>
                <span className="text-amber-600 font-black text-xl">{calculateFee().toLocaleString()} PLUS</span>
              </div>
              <p className="text-xs text-gray-500">
                * Fee dynamically scales based on initial supply to ensure network sustainability.
              </p>
            </div>

            <button 
              onClick={handleDeploy}
              disabled={deployStep !== 0 || !tokenName || !tokenSymbol || !totalSupply}
              className={`mt-6 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${deployStep === 0 && tokenName && tokenSymbol && totalSupply ? 'bg-gray-900 hover:bg-black text-white shadow-lg active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {deployStep === 0 && <><Rocket size={20} /> <span>Deploy Token</span></>}
              {deployStep === 1 && <><Loader2 size={20} className="animate-spin" /> <span>Confirming Transaction...</span></>}
              {deployStep === 2 && <><Loader2 size={20} className="animate-spin" /> <span>Compiling Contract...</span></>}
              {deployStep === 3 && <><Loader2 size={20} className="animate-spin" /> <span>Broadcasting to Mainnet...</span></>}
              {deployStep === 4 && <><CheckCircle2 size={20} className="text-green-400" /> <span className="text-green-500">Deployment Successful</span></>}
            </button>

            {deployStep === 4 && (
              <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-2">
                <h3 className="text-green-800 font-black flex items-center space-x-2 mb-2">
                  <CheckCircle2 size={20} />
                  <span>Success!</span>
                </h3>
                <p className="text-sm text-green-700 mb-3">
                  Your token <strong>{tokenName} ({tokenSymbol.toUpperCase()})</strong> is live.
                </p>
                <button className="w-full py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm">
                  <span>View on Explorer</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Code Preview & Security */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[400px]">
              <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm font-mono text-gray-300 font-bold">
                  <Code size={18} />
                  <span>{tokenName.replace(/\s+/g, '') || 'CustomToken'}.sol</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-auto bg-[#0d1117]">
                <pre className="font-mono text-sm leading-relaxed text-blue-300">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ${tokenName || 'CustomToken'}
 * @dev Deployed securely via PLUS Token Studio
 */
contract ${tokenName.replace(/\s+/g, '') || 'CustomToken'} is ERC20 {
    constructor() ERC20("${tokenName || 'Token'}", "${tokenSymbol.toUpperCase() || 'SYM'}") {
        _mint(msg.sender, ${totalSupply || '0'} * 10 ** decimals());
    }
}`}
                </pre>
              </div>
            </div>

            {/* Scam Warning Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6">
              <div className="flex items-start space-x-4">
                <ShieldAlert className="text-amber-500 shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="text-amber-900 font-black text-lg mb-2">Anti-Scam Protocol Active</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Tokens deployed via the studio are completely decentralized and permissionless. However, to protect DEX users from impersonation and scam tokens, <strong>your token will not be searchable by name on the PLUS DEX until it passes Foundation Verification.</strong>
                  </p>
                  <p className="text-amber-700 text-sm leading-relaxed mt-2">
                    Users can still trade your token by pasting the raw contract address, but a Scam Warning will be displayed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
