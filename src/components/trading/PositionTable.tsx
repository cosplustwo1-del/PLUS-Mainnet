import React from 'react';

export default function PositionTable() {
  const tabs = ['Positions (1)', 'Open Orders (0)', 'Order History', 'Assets'];

  return (
    <div className="h-[280px] bg-panel border-t border-panel-border flex flex-col shrink-0">
      <div className="flex space-x-8 px-6 border-b border-panel-border shrink-0">
        {tabs.map((tab, i) => (
          <button key={i} className={`py-3.5 text-sm font-semibold border-b-2 transition-colors ${i === 0 ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-white'}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-[11px] uppercase tracking-wider text-text-muted sticky top-0 bg-panel z-10 shadow-sm">
            <tr>
              <th className="font-semibold px-6 py-3">Market</th>
              <th className="font-semibold px-6 py-3">Position</th>
              <th className="font-semibold px-6 py-3 text-right">Entry Price</th>
              <th className="font-semibold px-6 py-3 text-right">Mark Price</th>
              <th className="font-semibold px-6 py-3 text-right">Liq. Price</th>
              <th className="font-semibold px-6 py-3 text-right">Unrealized PnL</th>
              <th className="font-semibold px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-panel-border/50">
            <tr className="hover:bg-panel-border/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-white text-base">BTCUSDT</div>
                <div className="text-xs font-medium text-text-muted">Perpetual</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-long shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-long font-bold text-sm">Long 10x</span>
                </div>
                <div className="text-xs font-medium text-text-highlight mt-1 tabular-nums">0.500 BTC</div>
              </td>
              <td className="px-6 py-4 text-right tabular-nums font-medium text-text-highlight">67,100.0</td>
              <td className="px-6 py-4 text-right tabular-nums font-medium text-text-highlight">67,415.2</td>
              <td className="px-6 py-4 text-right tabular-nums font-medium text-short">61,245.0</td>
              <td className="px-6 py-4 text-right tabular-nums">
                <div className="text-long font-bold text-base">+$157.60</div>
                <div className="text-long text-xs font-medium">(+4.70%)</div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-xs font-bold px-4 py-2 border border-short/50 text-short hover:bg-short hover:text-white rounded transition-colors">
                  Market Close
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
