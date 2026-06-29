"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Activity } from 'lucide-react';

export default function ExplorerHeader() {
  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm z-50 relative">
      <div className="flex items-center space-x-8">
        <Link href="/scan" className="flex items-center z-50">
          <Image src="/logo-v2.jpg" alt="PLUS Scan Logo" width={100} height={30} className="h-8 w-auto object-contain invert mix-blend-screen opacity-90" priority />
          <span className="ml-3 text-white font-black tracking-widest text-lg">SCAN</span>
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-bold text-gray-400">
          <Link href="/scan" className="hover:text-amber-500 transition-colors">Blocks</Link>
          <Link href="/scan/transactions" className="hover:text-amber-500 transition-colors">Transactions</Link>
          <Link href="/scan/validators" className="hover:text-amber-500 transition-colors">Validators</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden lg:flex items-center bg-gray-800 rounded-full px-4 py-1.5 border border-gray-700">
          <Activity size={14} className="text-green-400 mr-2 animate-pulse" />
          <span className="text-xs text-gray-300 font-mono">Mainnet: 1.00s</span>
        </div>
        <Link href="/" className="text-xs text-gray-400 hover:text-white font-bold transition-colors">
          Back to Mainnet
        </Link>
      </div>
    </header>
  );
}
