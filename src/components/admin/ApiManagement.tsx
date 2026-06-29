"use client";

import React, { useState } from 'react';
import { Key, Copy, Check, Terminal, ShieldAlert } from 'lucide-react';

export default function ApiManagement() {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [copied, setCopied] = useState(false);

  const generateKeys = () => {
    // Generate mock crypto keys for UI demonstration
    setApiKey('plus_' + crypto.randomUUID().replace(/-/g, ''));
    setSecretKey(crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, ''));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`API_KEY=${apiKey}\nSECRET_KEY=${secretKey}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-panel border border-panel-border rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col h-full">
      <div className="p-6 border-b border-panel-border flex justify-between items-center bg-background/50">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Key className="mr-3 text-brand" size={24} />
          Bot Trading API Keys
        </h2>
        <button 
          onClick={generateKeys}
          className="bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
        >
          Generate New Key
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col xl:flex-row gap-8">
        {/* Keys Display */}
        <div className="flex-1 space-y-6 flex flex-col">
          {!apiKey ? (
            <div className="flex-1 flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-panel-border rounded-2xl p-8 bg-background/20">
              <Key size={56} className="mb-4 opacity-40 text-brand" />
              <p className="text-lg font-medium text-white mb-2">No active API keys found</p>
              <p className="text-sm text-center max-w-[250px]">Generate a new key to connect your automated algorithmic trading bot.</p>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col justify-center">
              <div className="bg-short/10 border border-short/30 rounded-xl p-4 flex items-start space-x-3">
                <ShieldAlert className="text-short shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-short">
                  <strong>Warning:</strong> Your secret key will only be displayed once. Please copy and store it safely in your environment variables.
                </p>
              </div>

              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block font-semibold">API Key</label>
                <div className="bg-background border border-panel-border rounded-xl p-4 text-white font-mono break-all text-sm">
                  {apiKey}
                </div>
              </div>
              
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block font-semibold">Secret Key</label>
                <div className="bg-background border border-panel-border rounded-xl p-4 text-white font-mono break-all text-sm">
                  {secretKey}
                </div>
              </div>

              <button 
                onClick={copyToClipboard}
                className={`w-full mt-2 flex items-center justify-center space-x-2 py-3.5 rounded-xl transition-all font-bold ${
                  copied 
                    ? 'bg-long/20 text-long border border-long/50' 
                    : 'bg-panel-border hover:bg-background text-white border border-transparent hover:border-brand'
                }`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Both Keys'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Python Code Snippet */}
        <div className="flex-1 xl:max-w-[500px]">
          <div className="bg-[#0d1117] rounded-2xl border border-panel-border overflow-hidden h-full flex flex-col shadow-2xl">
            <div className="bg-[#161b22] px-5 py-3 flex items-center justify-between border-b border-[#30363d]">
              <div className="flex items-center space-x-3">
                <Terminal size={18} className="text-brand" />
                <span className="text-sm text-gray-300 font-mono font-medium">market_maker_bot.py</span>
              </div>
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-short"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-long"></div>
              </div>
            </div>
            <div className="p-5 overflow-x-auto custom-scrollbar flex-1">
              <pre className="text-[13px] font-mono leading-relaxed">
<span className="text-[#ff7b72]">import</span> <span className="text-[#c9d1d9]">requests</span>{'\n'}
<span className="text-[#ff7b72]">import</span> <span className="text-[#c9d1d9]">time</span>{'\n'}
{'\n'}
<span className="text-[#c9d1d9]">API_KEY = </span><span className="text-[#a5d6ff]">"{apiKey || 'YOUR_API_KEY'}"</span>{'\n'}
<span className="text-[#c9d1d9]">SECRET = </span><span className="text-[#a5d6ff]">"{secretKey ? '********' : 'YOUR_SECRET_KEY'}"</span>{'\n'}
{'\n'}
<span className="text-[#ff7b72]">def</span> <span className="text-[#d2a8ff]">place_order</span><span className="text-[#c9d1d9]">(side, price, size):</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">url = </span><span className="text-[#a5d6ff]">"http://127.0.0.1:8080/api/v1/orders"</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">payload = {'{'}</span>{'\n'}
{'        '}<span className="text-[#a5d6ff]">"user"</span><span className="text-[#c9d1d9]">: API_KEY,</span>{'\n'}
{'        '}<span className="text-[#a5d6ff]">"side"</span><span className="text-[#c9d1d9]">: side,</span>{'\n'}
{'        '}<span className="text-[#a5d6ff]">"price"</span><span className="text-[#c9d1d9]">: price,</span>{'\n'}
{'        '}<span className="text-[#a5d6ff]">"size"</span><span className="text-[#c9d1d9]">: size</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">{'}'}</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">headers = {'{'}</span> <span className="text-[#a5d6ff]">"X-API-KEY"</span><span className="text-[#c9d1d9]">: API_KEY {'}'}</span>{'\n'}
{'    '}<span className="text-[#ff7b72]">return</span> <span className="text-[#c9d1d9]">requests.post(url, json=payload, headers=headers)</span>{'\n'}
{'\n'}
<span className="text-[#8b949e]"># High-Frequency Market Making Strategy</span>{'\n'}
<span className="text-[#ff7b72]">while</span> <span className="text-[#79c0ff]">True</span><span className="text-[#c9d1d9]">:</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">place_order(</span><span className="text-[#a5d6ff]">"Buy"</span><span className="text-[#c9d1d9]">, </span><span className="text-[#79c0ff]">60000</span><span className="text-[#c9d1d9]">, </span><span className="text-[#79c0ff]">1</span><span className="text-[#c9d1d9]">)</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">place_order(</span><span className="text-[#a5d6ff]">"Sell"</span><span className="text-[#c9d1d9]">, </span><span className="text-[#79c0ff]">60010</span><span className="text-[#c9d1d9]">, </span><span className="text-[#79c0ff]">1</span><span className="text-[#c9d1d9]">)</span>{'\n'}
{'    '}<span className="text-[#8b949e]"># Execute trades within 10ms latency</span>{'\n'}
{'    '}<span className="text-[#c9d1d9]">time.sleep(</span><span className="text-[#79c0ff]">0.01</span><span className="text-[#c9d1d9]">)</span>{'\n'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
