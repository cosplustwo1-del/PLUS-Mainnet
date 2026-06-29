import React from 'react';
import { Users, Search, ShieldAlert, Monitor } from 'lucide-react';

// Mock database of registered users
const mockUsers = [
  {
    id: 'USR-8991',
    address: '0x742d...44e',
    ip: '121.134.xx.xx',
    plusBalance: 150,
    usdtBalance: 45.50,
    joinDate: '2026-06-21',
    status: 'Active'
  },
  {
    id: 'USR-8992',
    address: '0x992c...11b',
    ip: '211.36.xx.xx',
    plusBalance: 840,
    usdtBalance: 12.00,
    joinDate: '2026-06-22',
    status: 'Active'
  },
  {
    id: 'USR-8993',
    address: '0x11ab...99c',
    ip: '14.52.xx.xx',
    plusBalance: 0,
    usdtBalance: 154.00,
    joinDate: '2026-06-23',
    status: 'Flagged'
  },
  {
    id: 'USR-8994',
    address: '0x55dc...33a',
    ip: '59.15.xx.xx',
    plusBalance: 320,
    usdtBalance: 0.00,
    joinDate: '2026-06-24',
    status: 'Active'
  }
];

export default function UserDatabase() {
  return (
    <div className="bg-panel border border-panel-border rounded-xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="p-2 bg-brand/20 rounded-lg">
            <Users className="text-brand" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Members Database</h2>
            <p className="text-sm text-text-muted">Monitor all registered wallets and balances</p>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input 
            type="text"
            placeholder="Search by Wallet Address..."
            className="w-full bg-background border border-panel-border rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-panel-border">
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm">User ID</th>
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm">Wallet Address</th>
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm">IP Address</th>
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm text-right">PLUS Balance</th>
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm text-right">USDT Balance</th>
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm">Join Date</th>
              <th className="pb-3 px-4 font-semibold text-text-muted text-sm text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {mockUsers.map((user, idx) => (
              <tr 
                key={user.id} 
                className={`border-b border-panel-border/50 hover:bg-background/50 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-background/20'}`}
              >
                <td className="py-4 px-4">
                  <span className="font-mono text-text-muted">{user.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand to-purple-600 flex-shrink-0"></div>
                    <span className="font-mono text-white">{user.address}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1.5">
                    <Monitor size={14} className="text-text-muted" />
                    <span className="text-text-muted">{user.ip}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-bold text-white">{user.plusBalance.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-bold text-green-400">${user.usdtBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-text-muted">{user.joinDate}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  {user.status === 'Active' ? (
                    <span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-1 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      <ShieldAlert size={12} />
                      <span>Flagged</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
