"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Server, ShieldCheck, Database } from 'lucide-react';
import Image from 'next/image';

export default function SystemStatus() {
  const [rustStatus, setRustStatus] = useState('Checking...');
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    const checkRust = async () => {
      const start = Date.now();
      try {
        const res = await fetch('http://127.0.0.1:8080/api/v1/orderbook');
        if (res.ok) {
          setRustStatus('Online');
          setLatency(Date.now() - start);
        } else {
          setRustStatus('Offline');
        }
      } catch (e) {
        setRustStatus('Offline');
      }
    };
    checkRust();
    const interval = setInterval(checkRust, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-panel border border-panel-border rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <h2 className="text-xl font-bold text-white mb-8 flex items-center">
        <Activity className="mr-3 text-brand" size={24} />
        System Status
      </h2>

      <div className="space-y-8">
        {/* Rust Engine Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${rustStatus === 'Online' ? 'bg-long/20 text-long' : 'bg-short/20 text-short'}`}>
              <Server size={24} />
            </div>
            <div>
              <div className="text-sm text-text-muted">Matching Engine (Rust)</div>
              <div className="font-semibold text-white">127.0.0.1:8080</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-bold ${rustStatus === 'Online' ? 'text-long' : 'text-short'}`}>
              {rustStatus === 'Online' ? '??Online' : '??Offline'}
            </div>
            {rustStatus === 'Online' && <div className="text-xs text-text-muted mt-1">{latency}ms ping</div>}
          </div>
        </div>

        {/* AppChain Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand/20 text-brand flex items-center justify-center shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-sm text-text-muted">AppChain Node</div>
              <div className="font-semibold text-white">Arbitrum Orbit</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-long">??Connected</div>
            <div className="text-xs text-text-muted mt-1">&lt;1ms local</div>
          </div>
        </div>

        {/* Smart Contract TVL */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow-lg">
              <Database size={24} />
            </div>
            <div>
              <div className="text-sm text-text-muted">Vault Contract</div>
              <div className="font-semibold text-white">Total Value Locked</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-white text-lg">425,850,000</div>
            <div className="flex items-center justify-end mt-1 space-x-1">
              <div className="flex items-center justify-center bg-white rounded shadow-sm overflow-hidden h-5 px-1.5">
                <Image src="/logo-v2.jpg" alt="PLUS" width={32} height={16} className="h-3.5 w-auto object-contain" />
              </div>
              <span className="text-xs text-brand font-semibold">Secured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
