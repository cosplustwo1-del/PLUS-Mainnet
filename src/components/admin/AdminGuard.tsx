"use client";

import React, { useState, useEffect } from 'react';
import { ShieldAlert, KeyRound } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if previously authorized in this session
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  if (!mounted) return null;

  const handleLogin = async () => {
    if (!password) return;
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthorized(true);
        sessionStorage.setItem('adminAuth', 'true');
        // Store secure token if needed
        if (data.token) sessionStorage.setItem('adminToken', data.token);
      } else {
        setError(data.message || 'Access Denied.');
        setPassword('');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-in fade-in zoom-in duration-500">
      <div className="bg-panel border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 blur-[50px] pointer-events-none"></div>
        
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <ShieldAlert size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Denied</h2>
        <p className="text-red-400 font-mono text-sm mb-6 bg-red-500/10 py-1 px-3 rounded-lg inline-block">
          HTTP 403 Forbidden
        </p>
        
        <p className="text-text-muted mb-8">
          You are attempting to access a highly restricted area. Administrator privileges are required.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <KeyRound size={18} className="text-text-muted" />
            </div>
            <input
              type="password"
              placeholder="Enter Master Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-background border border-panel-border text-white rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
            />
          </div>
          {error && <p className="text-red-500 text-sm animate-pulse">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={!password || isLoading}
            className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 disabled:border-panel-border disabled:bg-panel disabled:text-text-muted text-red-500 py-3 rounded-xl font-bold transition-all flex justify-center items-center"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <span>Verify Credentials</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
