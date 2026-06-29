"use client";

import React from "react";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, darkTheme, Chain } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { LocalWalletProvider } from "@/context/LocalWalletContext";

const plusMainnet: Chain = {
  id: 8080,
  name: "PLUS Mainnet (Official)",
  iconUrl: "/plus-logo.png",
  iconBackground: "#ffffff",
  nativeCurrency: {
    decimals: 18,
    name: "PLUS",
    symbol: "PLUS",
  },
  rpcUrls: {
    default: { http: ["http://13.209.3.178:8545"] },
    public: { http: ["http://13.209.3.178:8545"] },
  },
};

const config = getDefaultConfig({
  appName: "PLUS Hybrid DEX",
  projectId: "00000000000000000000000000000000", // Dummy project ID for local dev
  chains: [plusMainnet],
  transports: {
    [plusMainnet.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: "#3b82f6",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <LocalWalletProvider>
            {children}
          </LocalWalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
