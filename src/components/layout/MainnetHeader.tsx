"use client";

import React, { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function MainnetHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Ecosystem' },
    { href: '/whitepaper', label: 'Whitepaper' },
    { href: '/developers', label: 'Developers' },
    { href: '/guide', label: 'Guide' },
    { href: '/scan', label: 'Explorer' }
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
          <Link href="/studio" className="text-amber-600 hover:text-amber-700 transition-colors flex items-center space-x-1">
            <Cpu size={16} />
            <span>Token Studio</span>
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={async () => {
            if (typeof (window as any).ethereum !== 'undefined') {
              try {
                await (window as any).ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: '0x1f90', // 8080
                    chainName: 'PLUS Mainnet',
                    nativeCurrency: { name: 'PLUS', symbol: 'PLUS', decimals: 18 },
                    rpcUrls: ['https://plusmain.net/api/rpc'],
                    blockExplorerUrls: ['https://plusmain.net/scan']
                  }]
                });
              } catch (error) { console.error(error); }
            } else {
              if (/android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
                window.location.href = 'metamask://dapp/plusmain.net';
              } else {
                alert('PC 브라우저에 메타마스크 확장 프로그램을 설치해주세요!');
              }
            }
          }}
          className="flex items-center space-x-2 bg-[#f6851b]/10 hover:bg-[#f6851b]/20 text-[#f6851b] border border-[#f6851b]/30 px-3 md:px-4 py-2 rounded-full text-sm font-bold transition-colors"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-4 h-4" />
          <span className="hidden sm:inline">Add Network</span>
        </button>
        <Link href="/trade" className="hidden md:flex bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors">
          Launch App
        </Link>
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
          <Link 
            href="/trade" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 mt-4 text-center text-lg font-bold bg-gray-900 text-white rounded-xl"
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  );
}
