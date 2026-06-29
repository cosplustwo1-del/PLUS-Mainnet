import React from 'react';
import MainnetHeader from '@/components/layout/MainnetHeader';
import { Pickaxe, Activity, Coins, Server, Flame, Info, Globe } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MainnetHeader />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-6">
            <Info className="text-brand" size={16} />
            <span className="text-xs font-bold text-brand tracking-widest uppercase">Official Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            How to Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">PLUS</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            플러스(PLUS) 하이브리드 거래소에 오신 것을 환영합니다.<br/>
            다양한 방법으로 수익을 창출하고 코인의 가치를 극대화하는 방법을 알아보세요.
          </p>
        </div>

        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">

          {/* Independent L1 & PRC-20 Intro Section */}
          <section className="bg-panel border border-brand/50 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-brand to-brand-hover rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Server className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white mb-3">[핵심] 100% 독립 메인넷(L1) & PRC-20 규격</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  PLUS 네트워크는 이더리움 L2나 앱체인(AppChain)에 종속되지 않은 <strong className="text-brand">100% 순수 독립 Layer-1 메인넷</strong>입니다. 독자적인 합의 알고리즘(Consensus)을 통해 1ms 이하의 블록 생성 속도를 구현하며, 이더리움의 ERC-20과 구별되는 우리만의 독자 규격인 <strong className="text-brand">PRC-20</strong> 토큰 생태계를 지원합니다.
                </p>
                <div className="mt-6 bg-background/50 border border-brand/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-brand mb-3 flex items-center space-x-2">
                    <Globe size={18} />
                    <span>글로벌 표준 규격 (International Standard Rules)</span>
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    PRC-20 토큰은 전 세계 주요 거래소(Binance, Coinbase 등) 및 메타마스크(MetaMask) 지갑과 100% 호환되기 위해 엄격한 글로벌 발행 규격을 준수합니다.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                    <li><strong className="text-white">Token Name:</strong> 프로젝트의 공식 영문 명칭 사용 권장</li>
                    <li><strong className="text-white">Token Symbol:</strong> 3~5자리의 영문 대문자 (특수기호 제외, 예: PLUS, BTC)</li>
                    <li><strong className="text-white">Decimals (소수점):</strong> 글로벌 공통 규격인 <strong>18자리</strong> 고정</li>
                    <li><strong className="text-white">발행 방법:</strong> <strong className="text-brand">[Token Studio]</strong> 메뉴를 통해 스마트 컨트랙트 코딩 없이 누구나 원클릭 배포 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* VIP Pass Section */}
          <section className="bg-panel border border-panel-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Pickaxe className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">1. VIP 마이닝 패스 (일일 채굴)</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  누구나 매일 <span className="text-white font-bold">0.2 PLUS</span>를 무료로 채굴할 수 있습니다. 하지만 <strong className="text-amber-500">10 USDT</strong>를 결제하여 VIP로 업그레이드하면, 영구적으로 매일 <strong className="text-amber-500">2.0 PLUS (10배)</strong>를 채굴할 수 있습니다.
                </p>
                <div className="bg-background/50 border border-amber-500/20 rounded-xl p-4 flex items-start space-x-4">
                  <Flame className="text-red-500 shrink-0 mt-1" size={20} />
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">🔥 Buyback & Burn 메커니즘:</strong><br/>
                    유저가 VIP 업그레이드를 위해 결제한 USDT의 절반(50%)은 시장에서 PLUS 코인을 사들이는 데 사용되며, 구매한 코인은 즉시 영구 소각(Burn)됩니다. 즉, VIP 가입자가 늘어날수록 코인의 시장 유통량은 줄어들고 가치는 상승합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Trade Mining Section */}
          <section className="bg-panel border border-panel-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Activity className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">2. 트레이딩 마이닝 (무역 채굴)</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  수수료를 내는 시대는 끝났습니다. 플러스 거래소에서는 스왑(Swap) 거래를 할 때 발생하는 <strong className="text-blue-400">수수료의 120%를 PLUS 코인으로 자동 환불(페이백)</strong>해 드립니다.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-2">
                  <li>거래소에서 매수/매도를 활발히 할수록 더 많은 코인이 채굴됩니다.</li>
                  <li>현재 채굴 속도: <strong className="text-white">10 USDT 거래 볼륨당 1.2 PLUS 지급</strong></li>
                  <li>초기 유동성을 폭발적으로 증가시키기 위한 한시적 혜택입니다.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Yield Farming Section */}
          <section className="bg-panel border border-panel-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Coins className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">3. 유동성 농사 (Yield Farming)</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  본인이 보유한 <strong className="text-purple-400">USDT와 PLUS 코인을 풀(Pool)에 예치(Staking)</strong>하면, 거래소가 얻는 스왑 수수료 수익의 일부를 1초 단위로 배당받습니다.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-2">
                  <li>은행 이자와 비교할 수 없는 높은 연이율(APY)을 제공합니다.</li>
                  <li>언제든지 원할 때 예치를 해제하고 원금과 이자를 출금할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Node Staking Section */}
          <section className="bg-panel border border-panel-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Server className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">4. 노드 스테이킹 (Node Validator)</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  플러스 메인넷의 블록을 검증하는 '노드(Node)'가 되어 네트워크 전체에서 발생하는 가스비(Transaction Fee)를 독식하세요.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-2">
                  <li>최소 <strong className="text-emerald-400">10,000 PLUS</strong> 이상을 스테이킹해야 검증자 자격이 주어집니다.</li>
                  <li>대량의 코인이 시장에서 락업(Lock-up)되므로 코인의 가치가 상승하는 핵심 원동력입니다.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Perpetuals & Options Section */}
          <section className="bg-panel border border-panel-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <Activity className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">5. 무기한 선물 & 예측 마켓 (Perpetuals & Options)</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  세계 최고 수준의 <strong className="text-red-400">Web3 기반 파생상품 거래 엔진</strong>을 통해 막대한 수익을 창출할 수 있습니다.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-2">
                  <li><strong className="text-white">Perpetuals (무기한 선물):</strong> 레버리지를 사용하여 비트코인의 상승(Long) 또는 하락(Short)에 베팅하는 전문 트레이딩입니다. (플랫폼 수수료 0.1% 징수)</li>
                  <li><strong className="text-white">Lightning Options (초단기 예측 마켓):</strong> 5분 단위로 비트코인의 가격 방향(UP/DOWN)을 맞추는 고수익·고위험 마켓입니다. (플랫폼 수수료 3% 선공제)</li>
                  <li>모든 거래는 중앙화 서버가 아닌 **100% 지갑 서명(Web3 Signature)**을 통해 투명하게 블록체인에 기록됩니다.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Developer Ecosystem Section */}
          <section className="bg-panel border border-panel-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Server className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">6. 개발자 웹 IDE 및 토큰 스튜디오 (Web3 IDE & Token Studio)</h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  PLUS 메인넷은 코딩을 모르는 일반인부터 전문 개발자까지 누구나 손쉽게 블록체인 생태계에 기여할 수 있는 <strong className="text-indigo-400">완전 통합형 웹 개발 환경</strong>을 제공합니다.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-2">
                  <li><strong className="text-white">Web3 IDE (개발자 스튜디오):</strong> 별도의 프로그램 설치 없이 웹 브라우저 전체 화면에서 즉시 스마트 컨트랙트를 작성, 컴파일, 배포할 수 있습니다. AI Copilot이 코딩을 실시간으로 도와줍니다.</li>
                  <li><strong className="text-white">Token Studio (원클릭 토큰 발행소):</strong> 코딩 지식이 전혀 없어도, 이름과 기호만 입력하면 즉각 PLUS 생태계에 새로운 PRC-20 코인을 발행하고 수수료를 챙길 수 있습니다.</li>
                  <li><strong className="text-white">글로벌 스캠 방어 시스템:</strong> 아무나 토큰을 발행할 수 있는 만큼, 거래소 스왑 화면에서 미인증 코인 거래 시 즉각적인 경고 팝업과 스캠 방지 시스템이 작동하여 투자자를 보호합니다.</li>
                  <li><strong className="text-white">Ecosystem Grants:</strong> 메인넷 위에 훌륭한 생태계(DApp)를 구축하면 최대 200,000 PLUS를 지원합니다.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
