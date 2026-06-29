"use client";

import React, { useState, useEffect } from 'react';
import { Play, Code, Terminal, Bot, FolderTree, FileJson, FileCode2, Wallet, Plus, DownloadCloud, Settings, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Web3IDE() {
  const [activeTab, setActiveTab] = useState('MyToken.sol');
  const [isDeploying, setIsDeploying] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[System] PLUS Web3 IDE Initialized.']);
  const [faucetClaimed, setFaucetClaimed] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([
    { role: 'ai', text: 'Hello! I am your PLUS AI Copilot. Do you need help writing a smart contract?' }
  ]);

  const codeContent = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`;

  const handleDeploy = () => {
    setIsDeploying(true);
    setLogs(prev => [...prev, '> Compiling MyToken.sol...']);
    
    setTimeout(() => {
      setLogs(prev => [...prev, '> Compilation successful. ABI generated.']);
      setTimeout(() => {
        setLogs(prev => [...prev, '> Deploying to PLUS Mainnet...']);
        setTimeout(() => {
          setLogs(prev => [...prev, `> Success! Contract Address: 0x${Math.random().toString(16).substr(2, 40)}`]);
          setIsDeploying(false);
        }, 1500);
      }, 1000);
    }, 1000);
  };

  const handleFaucet = () => {
    setFaucetClaimed(true);
    setLogs(prev => [...prev, '> Requesting 10,000 WPLUS from Faucet...']);
    setTimeout(() => {
      setLogs(prev => [...prev, '> 10,000 WPLUS successfully deposited to Sandbox Wallet.']);
    }, 1000);
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if(!chatInput) return;
    
    setChatHistory(prev => [...prev, {role: 'user', text: chatInput}]);
    const query = chatInput;
    setChatInput('');
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, {role: 'ai', text: `Here is a code snippet for: "${query}". I've optimized it for the PLUS Mainnet's low gas fees.`}]);
    }, 1000);
  };

  return (
    <div className="h-screen w-full bg-[#0d1117] text-gray-300 font-sans flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <div className="h-12 bg-[#161b22] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-amber-500 font-black text-xl tracking-tight">
            PLUS<span className="text-white">.IDE</span>
          </Link>
          <div className="h-4 w-px bg-gray-700"></div>
          <div className="flex space-x-1 text-sm">
            <button className="px-3 py-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">File</button>
            <button className="px-3 py-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">Edit</button>
            <button className="px-3 py-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">Run</button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!faucetClaimed ? (
            <button 
              onClick={handleFaucet}
              className="bg-gray-800 hover:bg-gray-700 text-amber-500 text-xs font-bold px-3 py-1.5 rounded flex items-center space-x-1 border border-amber-500/30 transition-colors"
            >
              <DownloadCloud size={14} />
              <span>Get Test PLUS</span>
            </button>
          ) : (
            <div className="text-xs font-mono bg-green-500/10 text-green-400 px-3 py-1.5 rounded border border-green-500/20">
              10,000 WPLUS
            </div>
          )}
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center space-x-1 transition-colors">
            <Wallet size={14} />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Explorer) */}
        <div className="w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col shrink-0">
          <div className="p-3 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
            <span>Explorer</span>
            <div className="flex space-x-2">
              <Plus size={14} className="hover:text-white cursor-pointer" />
              <FolderTree size={14} className="hover:text-white cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-800 rounded cursor-pointer text-sm">
                <ChevronRight size={14} />
                <FolderTree size={14} className="text-blue-400" />
                <span>contracts</span>
              </div>
              <div className="pl-6 space-y-1">
                <div 
                  onClick={() => setActiveTab('MyToken.sol')}
                  className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer text-sm ${activeTab === 'MyToken.sol' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800/50'}`}
                >
                  <FileCode2 size={14} className="text-amber-500" />
                  <span>MyToken.sol</span>
                </div>
                <div 
                  onClick={() => setActiveTab('NFT.sol')}
                  className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer text-sm ${activeTab === 'NFT.sol' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800/50'}`}
                >
                  <FileCode2 size={14} className="text-amber-500" />
                  <span>NFT.sol</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-800 rounded cursor-pointer text-sm mt-2">
                <ChevronRight size={14} />
                <FolderTree size={14} className="text-green-400" />
                <span>scripts</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-800 rounded cursor-pointer text-sm">
                <FileJson size={14} className="text-yellow-200" />
                <span>package.json</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center (Editor + Terminal) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0d1117]">
          {/* Tabs */}
          <div className="h-10 bg-[#0d1117] flex shrink-0">
            <div className="flex items-center space-x-2 px-4 bg-[#161b22] border-t-2 border-amber-500 text-white text-sm">
              <FileCode2 size={14} className="text-amber-500" />
              <span>{activeTab}</span>
            </div>
          </div>
          
          {/* Editor Area */}
          <div className="flex-1 overflow-auto p-4 bg-[#0d1117]">
             <pre className="font-mono text-[13px] leading-relaxed text-gray-300">
                <code dangerouslySetInnerHTML={{ __html: codeContent
                  .replace(/\/\/.*$/gm, match => `<span class='text-gray-500'>${match}</span>`)
                  .replace(/\b(pragma|solidity|contract|is|constructor|public|view|returns|require|mapping|address|uint256|string|memory|external)\b/g, "<span class='text-pink-500'>$1</span>")
                  .replace(/\b(ERC20|Ownable)\b/g, "<span class='text-green-400'>$1</span>")
                  .replace(/"(.*?)"/g, "<span class='text-yellow-300'>&quot;$1&quot;</span>")
                }} />
             </pre>
          </div>

          {/* Terminal / Output Area */}
          <div className="h-48 border-t border-gray-800 bg-[#0d1117] flex flex-col shrink-0">
             <div className="h-8 bg-[#161b22] flex items-center px-4 space-x-4 text-xs font-mono uppercase text-gray-500">
                <span className="text-white border-b border-white pb-1 mt-1">Terminal</span>
                <span className="hover:text-white cursor-pointer">Output</span>
                <span className="hover:text-white cursor-pointer">Problems</span>
             </div>
             <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1">
                {logs.map((log, idx) => (
                  <div key={idx} className={log.includes('Success') ? 'text-green-400' : 'text-gray-400'}>
                    {log}
                  </div>
                ))}
                {isDeploying && <div className="text-amber-500 animate-pulse">_</div>}
             </div>
          </div>
        </div>

        {/* Right Sidebar (AI Copilot & Deploy) */}
        <div className="w-80 bg-[#161b22] border-l border-gray-800 flex flex-col shrink-0">
          {/* AI Copilot */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-3 border-b border-gray-800 flex items-center space-x-2 text-white font-bold">
              <Bot size={18} className="text-amber-500" />
              <span>AI Copilot</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-800">
              <form onSubmit={handleChat} className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask AI to write code..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-500">
                  <Play size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Deploy Action */}
          <div className="p-4 border-t border-gray-800 bg-[#0d1117]">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Deployment</h3>
            <button 
              onClick={handleDeploy}
              disabled={isDeploying}
              className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center space-x-2 transition-all ${isDeploying ? 'bg-amber-500/20 text-amber-500/50 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-gray-900'}`}
            >
              {isDeploying ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              <span>{isDeploying ? 'Deploying...' : 'Deploy to Mainnet'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
