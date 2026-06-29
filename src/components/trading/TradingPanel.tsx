"use client";

import React, { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { NativeConnectButton } from '../layout/NativeConnectButton';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function TradingPanel() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  
  const [orderType, setOrderType] = useState('Limit');
  const [price, setPrice] = useState('0.0712');
  const [size, setSize] = useState('1000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const orderValue = Number(price) * Number(size);
  const platformFee = orderValue * 0.001; // 0.1% Platform Fee

  const handleOrder = async (side: 'Buy' | 'Sell') => {
    if (!price || !size || !isConnected) return;
    setIsSubmitting(true);
    
    try {
      // Construct the order message to sign (dYdX / Hyperliquid style)
      const orderMessage = `\nPLUS Hybrid DEX - Order Authorization\n\nAction: Place Order\nSide: ${side}\nType: ${orderType}\nMarket: PLUS-USDT Spot\nPrice: ${price} USDT\nSize: ${size} PLUS\nValue: ${orderValue.toLocaleString()} USDT\nPlatform Fee: ${platformFee.toLocaleString()} USDT\n\nTimestamp: ${Date.now()}\nNonce: ${crypto.randomUUID()}\n`;

      // Prompt Web3 Wallet for signature
      const signature = await signMessageAsync({ message: orderMessage });
      
      if (signature) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
      alert("Order cancelled or signature failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-80 bg-panel border-l border-panel-border flex flex-col shrink-0 z-10 relative shadow-2xl">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-panel/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="text-green-500" size={32} />
          </div>
          <h3 className="text-white font-bold text-lg">Order Submitted</h3>
          <p className="text-green-400 text-sm font-semibold">Platform Fee: {platformFee.toFixed(2)} USDT</p>
        </div>
      )}

      <div className="p-4 border-b border-panel-border flex space-x-4">
        <button 
          className={`font-semibold ${orderType === 'Limit' ? 'text-white' : 'text-text-muted'}`}
          onClick={() => setOrderType('Limit')}
        >
          Limit
        </button>
        <button 
          className={`font-semibold ${orderType === 'Market' ? 'text-white' : 'text-text-muted'}`}
          onClick={() => setOrderType('Market')}
        >
          Market
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-text-muted">Price</label>
          <div className="bg-background border border-panel-border rounded-md px-3 py-2 flex justify-between focus-within:border-brand transition-colors">
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-transparent text-white outline-none w-full font-medium" 
            />
            <span className="text-text-muted ml-2 font-semibold">USDT</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-text-muted">Size</label>
          <div className="bg-background border border-panel-border rounded-md px-3 py-2 flex justify-between focus-within:border-brand transition-colors">
            <input 
              type="number" 
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-transparent text-white outline-none w-full font-medium" 
            />
            <span className="text-text-muted ml-2 font-semibold">PLUS</span>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Order Value</span>
            <span className="text-white font-medium">{orderValue.toLocaleString()} USDT</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted flex items-center">
               Platform Fee (0.1%)
               <div className="w-2 h-2 rounded-full bg-brand ml-1 animate-pulse"></div>
            </span>
            <span className="text-brand font-bold">{platformFee.toLocaleString()} USDT</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-panel-border">
            <span className="text-text-muted">24h Platform Vol</span>
            <span className="text-white font-medium">1,245,890,000 USDT</span>
          </div>
        </div>

        <div className="mt-auto space-y-3 pt-6">
          {!isConnected ? (
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                 <p className="text-xs text-red-400 font-semibold text-center">Web3 Wallet Connection Required</p>
              </div>
              <div className="[&>div]:w-full [&>div>button]:!w-full [&>div>button]:!bg-brand [&>div>button]:!rounded-md">
                <NativeConnectButton />
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={() => handleOrder('Buy')}
                disabled={isSubmitting}
                className="flex-1 bg-long hover:bg-[#20b26c] text-white py-3.5 rounded-md font-bold transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(38,166,154,0.3)]"
              >
                Buy PLUS
              </button>
              <button 
                onClick={() => handleOrder('Sell')}
                disabled={isSubmitting}
                className="flex-1 bg-short hover:bg-[#ef4444] text-white py-3.5 rounded-md font-bold transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(239,83,80,0.3)]"
              >
                Sell PLUS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
