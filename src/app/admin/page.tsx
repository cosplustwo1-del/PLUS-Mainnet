import React from 'react';
import SystemStatus from '@/components/admin/SystemStatus';
import ApiManagement from '@/components/admin/ApiManagement';
import TransactionHistory from '@/components/admin/TransactionHistory';
import MainnetHeader from '@/components/layout/MainnetHeader';
import WalletScanner from '@/components/admin/WalletScanner';
import UserDatabase from '@/components/admin/UserDatabase';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Developer & Admin Portal</h1>
          <p className="text-text-muted text-lg">Monitor system performance and manage algorithmic trading bot API keys.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: System Status */}
          <div className="lg:col-span-1">
            <SystemStatus />
          </div>

          {/* Right Column: API Management */}
          <div className="lg:col-span-2">
            <ApiManagement />
          </div>
        </div>

        {/* Members Database */}
        <UserDatabase />

        {/* Wallet Scanner (Internal Explorer) */}
        <WalletScanner />

        {/* Bottom Row: Transaction History */}
        <TransactionHistory />
      </div>
    </div>
    </AdminGuard>
  );
}
