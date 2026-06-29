"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wallet, Provider, JsonRpcProvider } from 'ethers';

interface LocalWalletState {
  wallet: any | null;
  setWallet: (wallet: any | null) => void;
  provider: Provider;
  disconnect: () => void;
}

const LocalWalletContext = createContext<LocalWalletState | undefined>(undefined);

export function LocalWalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWalletState] = useState<any | null>(null);
  
  // Setup JSON RPC Provider for PLUS Mainnet
  const provider = new JsonRpcProvider('http://13.209.3.178:8545');

  const setWallet = (newWallet: any | null) => {
    if (newWallet) {
      // Attach provider to wallet
      const connectedWallet = newWallet.connect(provider);
      setWalletState(connectedWallet);
    } else {
      setWalletState(null);
    }
  };

  const disconnect = () => {
    setWalletState(null);
  };

  return (
    <LocalWalletContext.Provider value={{ wallet, setWallet, provider, disconnect }}>
      {children}
    </LocalWalletContext.Provider>
  );
}

export function useLocalWallet() {
  const context = useContext(LocalWalletContext);
  if (context === undefined) {
    throw new Error('useLocalWallet must be used within a LocalWalletProvider');
  }
  return context;
}
