"use client";

import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';

export default function RoiCalculator() {
  const [investment, setInvestment] = useState('100000'); // Default 100k PLUS
  const price = 0.0712;
  const investmentVal = Number(investment) || 0;
  
  // Diamond VIP 50% APR
  const dailyPlus = (investmentVal * 0.5) / 365;
  const monthlyPlus = dailyPlus * 30;
  const yearlyPlus = investmentVal * 0.5;

  return (
    <div className="bg-panel border border-panel-border rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-xl font-bold text-white flex items-center mb-6">
        <Calculator className="mr-2 text-brand" size={24} /> 
        ROI Simulator (Diamond 50%)
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-text-muted font-semibold mb-2 block">If you stake (PLUS)</label>
          <div className="relative">
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full bg-background border border-panel-border rounded-lg px-4 py-3 text-white focus:border-brand outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">
              ≈ ${(investmentVal * price).toLocaleString(undefined, {maximumFractionDigits: 0})}
            </span>
          </div>
        </div>

        <div className="bg-background/50 rounded-xl p-4 border border-panel-border/50 space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-panel-border/50">
            <span className="text-gray-400 font-medium">Daily Return</span>
            <div className="text-right">
              <div className="text-white font-bold text-lg">+ {dailyPlus.toLocaleString(undefined, {maximumFractionDigits: 2})} PLUS</div>
              <div className="text-green-400 text-sm">≈ ${(dailyPlus * price).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-panel-border/50">
            <span className="text-gray-400 font-medium">Monthly Return</span>
            <div className="text-right">
              <div className="text-white font-bold text-lg">+ {monthlyPlus.toLocaleString(undefined, {maximumFractionDigits: 2})} PLUS</div>
              <div className="text-green-400 text-sm">≈ ${(monthlyPlus * price).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-brand font-bold uppercase tracking-wider text-sm">1 Year Profit</span>
            <div className="text-right">
              <div className="text-brand font-black text-2xl">+ {yearlyPlus.toLocaleString(undefined, {maximumFractionDigits: 0})} PLUS</div>
              <div className="text-brand/80 text-sm font-bold">≈ ${(yearlyPlus * price).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
