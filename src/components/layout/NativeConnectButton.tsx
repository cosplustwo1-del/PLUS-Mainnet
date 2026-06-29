"use client";

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function NativeConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      if (typeof window !== 'undefined' && (window as any).ethereum) {
         // Wagmi handles the connection and prompts automatically
         connect({ connector: injected() });
      } else {
         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
         if (isMobile) {
             // Deep link to open MetaMask App on mobile
             window.location.href = 'https://metamask.app.link/dapp/plusmain.net/swap';
         } else {
             alert('메타마스크 확장 프로그램이 설치되어 있지 않거나 인식할 수 없습니다. 크롬에 설치해주세요.');
             window.open('https://metamask.io/download/', '_blank');
         }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected && address) {
    return (
      <button onClick={() => disconnect()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all">
        {address.substring(0, 6)}...{address.substring(38)}
      </button>
    );
  }

  return (
    <button onClick={handleConnect} disabled={isConnecting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-md flex items-center space-x-2">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-5 h-5" />
      <span>{isConnecting ? '연결 중...' : 'MetaMask 연동'}</span>
    </button>
  );
}
