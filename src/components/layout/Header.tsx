"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NativeConnectButton } from './NativeConnectButton';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocalWallet } from '@/context/LocalWalletContext';
import { Wallet } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wallet, disconnect } = useLocalWallet();

  const links = [
    { href: '/trade', label: 'Trade' },
    { href: '/swap', label: 'Swap' },
    { href: '/exchange', label: 'Spot' },
    { href: '/staking', label: 'Stake' },
    { href: '/airdrop', label: 'Airdrop' },
    { href: '/wallet', label: 'Wallet' },
    { href: '/scan', label: 'Scan' },
    { href: '/', label: 'Mainnet' }
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm z-50 relative">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center z-50">
          <Image src="/logo-v2.jpg" alt="PLUS Logo" width={120} height={36} className="h-9 w-auto object-contain" priority />
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-extrabold">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={`${pathname === link.href ? 'text-gray-900' : 'text-gray-500'} hover:text-amber-500 transition-colors`}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        {wallet ? (
          <div className="flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded-xl">
            <Wallet size={16} className="text-brand" />
            <span className="text-sm font-bold text-gray-900 hidden md:block">
              {wallet.address.substring(0, 6)}...{wallet.address.substring(38)}
            </span>
            <button onClick={disconnect} className="text-xs text-red-500 font-bold ml-2 hover:underline">
              Logout
            </button>
          </div>
        ) : (
          <NativeConnectButton />
        )}
        <button className="md:hidden p-2 text-gray-600 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 flex flex-col space-y-4 z-40">
          {links.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-lg font-bold ${pathname === link.href ? 'text-amber-500' : 'text-gray-700'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
