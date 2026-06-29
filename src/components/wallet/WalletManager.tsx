"use client";

import React, { useState } from 'react';
import { Wallet } from 'ethers';
import { useLocalWallet } from '@/context/LocalWalletContext';
import { Download, Key, LogIn, Plus } from 'lucide-react';

export default function WalletManager() {
  const { wallet, setWallet, disconnect } = useLocalWallet();
  const [activeTab, setActiveTab] = useState<'create' | 'import'>('create');
  
  // Create State
  const [password, setPassword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newWallet, setNewWallet] = useState<any | null>(null);
  
  // Import State
  const [importPassword, setImportPassword] = useState('');
  const [keystoreFile, setKeystoreFile] = useState<File | null>(null);
  const [importError, setImportError] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleCreateWallet = async () => {
    if (!password) return alert('Please enter a password for your Keystore file.');
    setIsGenerating(true);
    try {
      // Generate a random wallet
      const randomWallet = Wallet.createRandom();
      setNewWallet(randomWallet);

      // Encrypt with password to get Keystore JSON
      const keystoreJson = await randomWallet.encrypt(password);
      
      // Trigger download
      const blob = new Blob([keystoreJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `UTC--${new Date().toISOString().replace(/:/g, '-')}--${randomWallet.address.substring(2)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Automatically connect after creation
      setWallet(randomWallet);
    } catch (e) {
      console.error(e);
      alert('Failed to generate wallet.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImportWallet = async () => {
    if (!keystoreFile) return setImportError('Please select a Keystore JSON file.');
    if (!importPassword) return setImportError('Please enter your password.');
    
    setIsImporting(true);
    setImportError('');
    try {
      const fileContent = await keystoreFile.text();
      const decryptedWallet = await Wallet.fromEncryptedJson(fileContent, importPassword);
      setWallet(decryptedWallet);
    } catch (e) {
      console.error(e);
      setImportError('Invalid password or corrupted Keystore file.');
    } finally {
      setIsImporting(false);
    }
  };

  if (wallet) {
    return (
      <div className="bg-panel border border-panel-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-white mb-4">My Web Wallet</h2>
        <div className="bg-background rounded-xl p-4 mb-4 border border-panel-border">
          <p className="text-text-muted text-sm mb-1">Address</p>
          <p className="text-white font-mono text-sm break-all">
            {wallet.address}
          </p>
        </div>
        <button 
          onClick={disconnect}
          className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 py-3 rounded-xl font-bold transition-colors"
        >
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-panel border border-panel-border rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden">
      <div className="flex border-b border-panel-border">
        <button 
          className={`flex-1 py-4 text-sm font-bold flex justify-center items-center gap-2 transition-colors ${activeTab === 'create' ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-text-muted hover:text-white'}`}
          onClick={() => setActiveTab('create')}
        >
          <Plus size={18} />
          Create Wallet
        </button>
        <button 
          className={`flex-1 py-4 text-sm font-bold flex justify-center items-center gap-2 transition-colors ${activeTab === 'import' ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-text-muted hover:text-white'}`}
          onClick={() => setActiveTab('import')}
        >
          <LogIn size={18} />
          Access Wallet
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'create' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-text-muted text-sm mb-4">
              Create a new Ethereum-compatible wallet directly in your browser. No apps required.
            </p>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Keystore Password</label>
              <input 
                type="password" 
                placeholder="Must be strong"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-background border border-panel-border text-white rounded-xl px-4 py-3 outline-none focus:border-brand transition-colors"
              />
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-xs text-yellow-200/80">
              <strong>CRITICAL:</strong> Save the downloaded Keystore file safely. Do not forget this password. We cannot recover it for you.
            </div>
            <button 
              onClick={handleCreateWallet}
              disabled={!password || isGenerating}
              className="w-full bg-brand hover:bg-brand-hover disabled:bg-panel disabled:text-text-muted text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isGenerating ? 'Generating & Encrypting...' : <><Download size={18} /> Generate & Download</>}
            </button>
          </div>
        )}

        {activeTab === 'import' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-text-muted text-sm mb-4">
              Access your existing Web Wallet using your Keystore JSON file.
            </p>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Select Keystore File</label>
              <input 
                type="file" 
                accept=".json"
                onChange={(e) => setKeystoreFile(e.target.files?.[0] || null)}
                className="w-full bg-background border border-panel-border text-white rounded-xl px-4 py-2 outline-none focus:border-brand transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter password to decrypt"
                value={importPassword}
                onChange={(e) => setImportPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-background border border-panel-border text-white rounded-xl px-4 py-3 outline-none focus:border-brand transition-colors"
              />
            </div>
            {importError && <p className="text-red-500 text-sm">{importError}</p>}
            <button 
              onClick={handleImportWallet}
              disabled={!keystoreFile || !importPassword || isImporting}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 disabled:from-panel disabled:to-panel disabled:text-text-muted text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isImporting ? 'Decrypting...' : <><Key size={18} /> Unlock Wallet</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
