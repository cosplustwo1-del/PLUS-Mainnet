import React from 'react';
import MainnetHeader from '@/components/layout/MainnetHeader';
import { FileText, ShieldCheck, Zap, Globe, Server, Activity, Lock, Layers } from 'lucide-react';
import Image from 'next/image';

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <MainnetHeader />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand to-brand-hover rounded-3xl mb-8 shadow-2xl shadow-brand/20">
            <FileText size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            PLUS Mainnet Architecture <br className="hidden md:block" /> & Global Whitepaper
          </h1>
          <h2 className="text-xl md:text-2xl text-text-muted font-medium mb-8">
            PLUS 메인넷 시스템 아키텍처 및 글로벌 블록체인 백서
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <div className="bg-panel border border-panel-border px-4 py-2 rounded-full text-text-muted">
              Version: <span className="text-white">2.0</span>
            </div>
            <div className="bg-panel border border-panel-border px-4 py-2 rounded-full text-text-muted">
              Network: <span className="text-white">PLUS Independent L1</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full text-green-400 flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>[LIVE] Mainnet Active</span>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
          
          {/* Section 1: The Core System */}
          <SectionBox>
            <SectionHeader 
              icon={<Server size={28} />} 
              enTitle="1. The Core: Independent Layer-1 Mainnet" 
              koTitle="1. 시스템의 본질: 100% 독립 레이어1 메인넷"
            />
            <DualText 
              en="The blocks generated on the PLUS platform are not mere visual simulations. They are part of a fully operational, 100% independent Layer-1 blockchain network powered by our proprietary consensus algorithm and PRC-20 token standard."
              ko="웹사이트에서 생성되는 블록들은 단순한 시각적 효과가 아닙니다. 이는 이더리움과 무관한 자체 합의 알고리즘으로 구동되는 100% 독립 Layer-1 블록체인 네트워크입니다."
            />
          </SectionBox>

          {/* Animated Diagram: 1-Second Block Time */}
          <div className="relative w-full bg-panel/50 border border-brand/30 rounded-3xl p-8 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
            <h3 className="text-center text-brand font-bold text-xl mb-12 relative z-10">1-Second Block Generation Architecture</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 max-w-3xl mx-auto gap-8">
              {/* User Node */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-panel border-2 border-text-muted rounded-full flex items-center justify-center mb-4 relative">
                   <Globe size={32} className="text-text-muted" />
                   <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                </div>
                <span className="text-white font-bold">Web Wallet</span>
                <span className="text-text-muted text-xs text-center">ECDSA Signature</span>
              </div>

              {/* Flow Animation 1 */}
              <div className="flex-1 flex items-center justify-center min-w-[100px]">
                <div className="relative w-full h-2 bg-panel-border rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-brand/80 rounded-full animate-[slideRight_1s_ease-in-out_infinite]"></div>
                </div>
              </div>

              {/* AWS Mainnet Node */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-brand/20 border-2 border-brand rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative overflow-hidden">
                   <Server size={40} className="text-brand relative z-10" />
                   <div className="absolute inset-0 bg-brand/10 animate-pulse"></div>
                </div>
                <span className="text-brand font-black text-lg">PLUS Node</span>
                <span className="text-text-muted text-xs text-center">Independent L1 Engine</span>
              </div>

              {/* Flow Animation 2 */}
              <div className="flex-1 flex items-center justify-center min-w-[100px]">
                <div className="relative w-full h-2 bg-panel-border rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-amber-500/80 rounded-full animate-[slideRight_1s_ease-in-out_infinite_0.5s]"></div>
                </div>
              </div>

              {/* Block Generation */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-amber-500/20 border-2 border-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)] relative">
                   <Layers size={36} className="text-amber-500" />
                   <div className="absolute -top-2 -right-2 bg-background border border-amber-500 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                     1 Sec
                   </div>
                </div>
                <span className="text-amber-500 font-bold text-lg">New Block</span>
                <span className="text-text-muted text-xs text-center">Immutable Ledger</span>
              </div>
            </div>
          </div>

          {/* Section 2: Zero Gas & HFT */}
          <SectionBox>
            <SectionHeader 
              icon={<Zap size={28} />} 
              enTitle="2. Zero Gas Fee & HFT Optimization" 
              koTitle="2. 가스비 전면 무료화 및 고빈도 매매 최적화"
            />
            <div className="space-y-8">
              <DualText 
                en="Unlike EVM networks that charge prohibitive gas fees, the PLUS Independent Mainnet operates on a proprietary Zero-Gas architecture. Users experience absolute zero network costs, maximizing efficiency for the PRC-20 ecosystem."
                ko="이더리움 같은 기존 네트워크는 트랜잭션마다 높은 가스비를 요구합니다. 하지만 PLUS 독립 메인넷은 자체적인 제로 가스(Zero-Gas) 아키텍처를 통해 PRC-20 생태계 유저들에게 100% 가스비 무료 환경을 제공합니다."
              />
              <DualText 
                en="Through our extreme 1-second block latency, institutional investors and algorithmic trading bots can execute dozens of orders per second without network congestion, enabling true High-Frequency Trading (HFT) on a decentralized architecture."
                ko="1초라는 압도적인 블록 속도를 통해 기관 투자자나 알고리즘 트레이딩 봇이 초당 수십 번의 주문을 넣어도 네트워크가 지연되거나 멈추지 않고 완벽하게 소화할 수 있는 진정한 고빈도 매매(HFT)를 탈중앙화 구조에서 실현합니다."
              />
            </div>
          </SectionBox>

          {/* Section 3: Phase 2 Roadmap */}
          <SectionBox>
            <SectionHeader 
              icon={<Globe size={28} />} 
              enTitle="3. The PRC-20 Standard & True Interoperability" 
              koTitle="3. PRC-20 독자 규격 및 글로벌 메인넷 도약"
            />
            <DualText 
              en="PLUS does not rely on Ethereum L2 or AppChain frameworks. We have established our own token standard, PRC-20. Our vision is true interoperability as an independent L1, connecting directly with other sovereign chains."
              ko="PLUS 메인넷은 이더리움 L2나 앱체인에 의존하지 않습니다. 독자적인 토큰 규격인 PRC-20을 제정하였으며, 향후 솔라나, 바이낸스 등 타 메인넷들과 동등한 입장에서 브릿지(Bridge)로 연결됩니다."
            />
            
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <FeatureCard 
                step="1"
                enTitle="Independent Node Network"
                koTitle="독립 노드 네트워크"
                enDesc="Blocks are validated purely by our independent, geographically distributed node network."
                koDesc="이더리움에 의존하지 않고, 전 세계에 분산된 자체 노드 네트워크에 의해 블록이 검증됩니다."
              />
              <FeatureCard 
                step="2"
                enTitle="PRC-20 Ecosystem"
                koTitle="PRC-20 생태계 팽창"
                enDesc="Any project can issue their own PRC-20 tokens on the PLUS Mainnet, creating a massive ecosystem."
                koDesc="누구나 PLUS 메인넷 위에서 자신만의 PRC-20 토큰을 발행하여 거대한 생태계를 구축할 수 있습니다."
              />
              <FeatureCard 
                step="3"
                enTitle="Cross-Chain Bridges"
                koTitle="크로스체인 브릿지"
                enDesc="Direct bridges to Ethereum, BSC, and Solana without being subservient to them."
                koDesc="이더리움이나 바이낸스 체인의 종속을 거부하고, 동등한 Layer-1 위치에서 브릿지를 연결합니다."
              />
            </div>
          </SectionBox>

          {/* Section 4: Tokenomics & Revenue Model */}
          <SectionBox>
            <SectionHeader 
              icon={<Lock size={28} />} 
              enTitle="4. Tokenomics & Revenue Model"
              koTitle="4. 토크노믹스 및 플랫폼 확정 수익 모델"
            />
            <DualText 
              en="The PLUS ecosystem is designed with extreme deflationary mechanics and guaranteed platform revenue streams. All features are rigorously engineered to maximize the scarcity of the PLUS token and the profitability of the exchange."
              ko="PLUS 생태계는 극단적인 디플레이션(가치 상승) 메커니즘과 확정적인 플랫폼 수익 모델로 설계되었습니다. 모든 기능은 PLUS 코인의 희소성과 거래소의 수익을 극대화하도록 철저히 공학적으로 계산되었습니다."
            />
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <FeatureCard 
                step="A"
                enTitle="VIP Mining & Auto-Burn"
                koTitle="VIP 마이닝 및 자동 소각"
                enDesc="50% of the 10 USDT VIP upgrade fee is used to immediately buy back and burn PLUS tokens from the market."
                koDesc="VIP 업그레이드 결제 대금(10 USDT)의 50%는 즉시 시장에서 PLUS 코인을 매입하여 영구 소각(Burn)하는 데 사용됩니다."
              />
              <FeatureCard 
                step="B"
                enTitle="Perpetuals Platform Fee"
                koTitle="무기한 선물 플랫폼 수수료"
                enDesc="A fixed 0.1% platform fee is deducted from every perpetual futures order, ensuring continuous revenue."
                koDesc="모든 무기한 선물(Perpetuals) 주문 발생 시 0.1%의 플랫폼 수수료가 원천 징수되어 회사의 현금 흐름을 창출합니다."
              />
              <FeatureCard 
                step="C"
                enTitle="Lightning Options Fee"
                koTitle="예측 마켓 3% 선공제"
                enDesc="In the 5-minute Lightning Options market, 3% of the total prize pool is guaranteed as platform profit per round."
                koDesc="5분 단위로 진행되는 초단기 예측 마켓에서는 매 판 전체 베팅 풀의 3%가 회사의 확정 수익으로 공제됩니다."
              />
              <FeatureCard 
                step="D"
                enTitle="Web3 IDE & Token Studio"
                koTitle="통합 개발 환경 및 토큰 스튜디오"
                enDesc="Anyone can deploy smart contracts via our in-browser IDE or create PRC-20 tokens via Token Studio with zero coding. All protected by an advanced Anti-Scam verification system."
                koDesc="브라우저 내장 IDE와 원클릭 토큰 스튜디오를 통해 코딩 없이 생태계에 참여할 수 있으며, 최첨단 스캠 방어 시스템이 투자자를 보호합니다."
              />
            </div>
          </SectionBox>

        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-text-muted flex flex-col items-center pb-12">
          <div className="w-16 h-16 opacity-50 mb-4">
             <Image src="/logo-v2.jpg" alt="PLUS" width={64} height={64} className="rounded-full grayscale mix-blend-screen" />
          </div>
          <p className="font-bold text-white tracking-widest uppercase mb-1">harrycos 개발팀일동</p>
          <p className="text-sm opacity-60">© 2026 PLUS Mainnet Architecture</p>
        </div>
        
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideRight {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}} />
    </div>
  );
}

// Helper Components
function SectionBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-panel border border-panel-border p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand to-transparent"></div>
      {children}
    </div>
  );
}

function SectionHeader({ icon, enTitle, koTitle }: { icon: React.ReactNode, enTitle: string, koTitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-black text-white flex items-center space-x-4 mb-2">
        <span className="text-brand">{icon}</span>
        <span>{enTitle}</span>
      </h2>
      <h3 className="text-lg md:text-xl font-bold text-text-muted ml-11">
        {koTitle}
      </h3>
    </div>
  );
}

function DualText({ en, ko }: { en: string, ko: string }) {
  return (
    <div className="pl-11 space-y-3">
      <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
        {en}
      </p>
      <p className="text-base md:text-lg text-text-muted/80 leading-relaxed font-sans">
        {ko}
      </p>
    </div>
  );
}

function FeatureCard({ step, enTitle, koTitle, enDesc, koDesc }: { step: string, enTitle: string, koTitle: string, enDesc: string, koDesc: string }) {
  return (
    <div className="bg-background border border-panel-border p-6 rounded-2xl relative">
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand text-white font-black text-xl flex items-center justify-center rounded-xl shadow-lg">
        {step}
      </div>
      <div className="mt-4">
        <h4 className="text-white font-bold text-lg mb-1">{enTitle}</h4>
        <h5 className="text-brand font-medium text-sm mb-4">{koTitle}</h5>
        <p className="text-text-muted text-sm mb-2">{enDesc}</p>
        <p className="text-text-muted/60 text-xs">{koDesc}</p>
      </div>
    </div>
  );
}
