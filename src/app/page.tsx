import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Shield, Code } from 'lucide-react';
import MainnetHeader from '@/components/layout/MainnetHeader';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-yellow-800 overflow-x-hidden selection:bg-yellow-500 selection:text-white flex flex-col relative z-0">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2] opacity-100 pointer-events-none"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      {/* Light Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/30 z-[-1] pointer-events-none backdrop-blur-[2px]"></div>

      <MainnetHeader />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 mt-16 lg:mt-0">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="z-10 max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center space-x-3 bg-yellow-500/5 border border-yellow-500/20 rounded-full px-5 py-2 mb-4 backdrop-blur-md shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-xs font-extrabold text-yellow-700 tracking-widest">V1 MAINNET LIVE</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-gray-900">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">Premium</span> Independent<br className="hidden md:block"/> Layer-1 Mainnet.
          </h1>
          
          <p className="text-lg md:text-2xl text-yellow-900/60 max-w-3xl mx-auto leading-relaxed font-semibold">
            Experience VIP trading with 1ms latency matching powered by Rust, combined with absolute on-chain security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
            <Link 
              href="/trade"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.4)] w-full sm:w-auto"
            >
              Start Trading
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            
            <Link 
              href="/developers"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-yellow-700 transition-all duration-300 bg-white border border-yellow-500/30 rounded-full hover:bg-yellow-50 w-full sm:w-auto hover:scale-105 shadow-sm"
            >
              <Code className="mr-2 text-yellow-600" size={20} />
              Developer API
            </Link>
          </div>
        </div>

        {/* Official Mining Promo Banner */}
        <div className="w-full max-w-7xl mx-auto mt-24 z-10 px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="relative bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/30 p-8 md:p-12 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-amber-500/30 transition-colors duration-700"></div>
            
            <div className="flex-1 mb-8 md:mb-0 md:pr-12 relative z-10">
              <div className="inline-block bg-yellow-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 animate-pulse">
                Official Event
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                [공식] PLUS 하이브리드 <br className="hidden md:block"/> 채굴 참여 안내
              </h2>
              <p className="text-lg text-yellow-900/70 font-semibold mb-6">
                신규 지갑 연동 시 <span className="text-amber-600 font-bold bg-amber-100 px-2 py-0.5 rounded">50 PLUS 즉시 지급! (가입 축하금)</span><br/>
                출석, 트레이딩, 유동성 공급으로 압도적인 채굴 수익을 선점하세요.
              </p>
              <ul className="space-y-3 text-sm font-medium text-gray-700 mb-8">
                <li className="flex items-center space-x-2">
                  <Zap size={16} className="text-amber-500" />
                  <span>매일 출석 시 0.2 PLUS 확정 채굴</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Zap size={16} className="text-amber-500" />
                  <span>거래소 스왑 수수료의 0.2% 채굴자 페이백</span>
                </li>
              </ul>
            </div>

            <div className="shrink-0 relative z-10 w-full md:w-auto">
              <Link href="/mining" className="group relative inline-flex items-center justify-center w-full md:w-auto px-10 py-5 font-black text-white transition-all duration-300 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl hover:scale-105 shadow-[0_10px_30px_rgba(245,158,11,0.3)]">
                <span>채굴하러 가기 (Mining)</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-32 z-10 w-full px-4 pb-20 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-300 fill-mode-both">
          <div className="bg-white border border-yellow-500/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-yellow-500/30 transition-all group">
            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-gray-900">Ultra-Low Latency</h3>
            <p className="text-yellow-900/60 font-medium leading-relaxed">Memory-based matching engine written in pure Rust guarantees execution times under 1 millisecond.</p>
          </div>
          
          <div className="bg-white border border-yellow-500/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-yellow-500/30 transition-all group">
            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-gray-900">100% Independent L1</h3>
            <p className="text-yellow-900/60 font-medium leading-relaxed">Trades are instantly secured on the PLUS Mainnet via our proprietary, high-speed independent consensus mechanism.</p>
          </div>

          <div className="bg-white border border-yellow-500/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-yellow-500/30 transition-all group">
            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code size={28} />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-gray-900">HFT Bot Ready</h3>
            <p className="text-yellow-900/60 font-medium leading-relaxed">Direct API access designed for institutions and algorithmic traders with zero-gas fee architecture.</p>
          </div>

          <Link href="/mining" className="bg-white border border-yellow-500/10 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-yellow-500/30 transition-all group block">
            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-gray-900 flex items-center space-x-2">
              <span>Hybrid Mining</span>
              <span className="bg-amber-500 text-white text-[10px] uppercase px-2 py-0.5 rounded-full animate-pulse">Hot</span>
            </h3>
            <p className="text-yellow-900/60 font-medium leading-relaxed">Earn massive PLUS rewards through trade mining, liquidity farming, and daily clicks.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
