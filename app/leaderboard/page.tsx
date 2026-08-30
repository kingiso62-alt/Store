'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  Clock, TrendingUp, Calendar, Crown, 
  Trophy, Sparkles, UserRound, ArrowRight, Flame, ShieldCheck, Gift, Zap
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar?: string;
  game: string;
  totalSpend: number;
  badge?: string;
  prize?: string;
}

const timeData: Record<string, {
  summary: {
    todayTop: { spend: string; user: string };
    weeklyTop: { spend: string; user: string };
    monthlyTop: { spend: string; user: string };
    allTimeKing: { spend: string; user: string };
  };
  ranks: LeaderboardUser[];
}> = {
  DAILY: {
    summary: {
      todayTop: { spend: '$185.00', user: 'VIP_Shadow_99' },
      weeklyTop: { spend: '$980.00', user: 'King_Abdirahman' },
      monthlyTop: { spend: '$1,450.00', user: 'Somali_Sniper' },
      allTimeKing: { spend: '$4,850.00', user: 'Tokiyo_Master' }
    },
    ranks: [
      { rank: 1, name: 'VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 185.00, badge: '🥇 1st Place', prize: '$15 UC Pack' },
      { rank: 2, name: 'Ahmed_Gamer252', game: 'Free Fire Diamonds', totalSpend: 120.50, badge: '🥈 2nd Place', prize: '$10 Voucher' },
      { rank: 3, name: 'Liban_Konami', game: 'eFootball Coins', totalSpend: 95.00, badge: '🥉 3rd Place', prize: '$5 Cashback' },
      { rank: 4, name: 'Somali_Pro', game: 'Roblox Robux', totalSpend: 75.00 },
      { rank: 5, name: 'Mogadishu_Sniper', game: 'PUBG Mobile UC', totalSpend: 54.00 },
      { rank: 6, name: 'Hodan_PUBG', game: 'PUBG Mobile UC', totalSpend: 42.00 }
    ]
  },
  WEEKLY: {
    summary: {
      todayTop: { spend: '$185.00', user: 'VIP_Shadow_99' },
      weeklyTop: { spend: '$980.00', user: 'King_Abdirahman' },
      monthlyTop: { spend: '$1,450.00', user: 'Somali_Sniper' },
      allTimeKing: { spend: '$4,850.00', user: 'Tokiyo_Master' }
    },
    ranks: [
      { rank: 1, name: 'King_Abdirahman', game: 'PUBG Mobile UC', totalSpend: 980.00, badge: '👑 Champion', prize: '$30 UC Pack' },
      { rank: 2, name: 'VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 760.00, badge: '🥈 2nd Place', prize: '$15 Voucher' },
      { rank: 3, name: 'Somali_Sniper', game: 'PUBG Mythic X-Suit', totalSpend: 540.00, badge: '🥉 3rd Place', prize: '$10 Cashback' },
      { rank: 4, name: 'Fawzi_FreeFire', game: 'Free Fire Diamonds', totalSpend: 380.00 },
      { rank: 5, name: 'Guled_FIFA', game: 'eFootball Coins', totalSpend: 290.00 },
      { rank: 6, name: 'Amina_Roblox', game: 'Roblox Robux', totalSpend: 195.00 }
    ]
  },
  MONTHLY: {
    summary: {
      todayTop: { spend: '$185.00', user: 'VIP_Shadow_99' },
      weeklyTop: { spend: '$980.00', user: 'King_Abdirahman' },
      monthlyTop: { spend: '$1,450.00', user: 'Somali_Sniper' },
      allTimeKing: { spend: '$4,850.00', user: 'Tokiyo_Master' }
    },
    ranks: [
      { rank: 1, name: 'Somali_Sniper', game: 'PUBG Mobile & Supercars', totalSpend: 1450.00, badge: '👑 Monthly King', prize: '🎁 $50 UC Gift Pack' },
      { rank: 2, name: 'King_Abdirahman', game: 'PUBG Mobile UC', totalSpend: 1240.00, badge: '🥈 2nd Place', prize: '🎁 $25 Gift Voucher' },
      { rank: 3, name: 'VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 990.00, badge: '🥉 3rd Place', prize: '🎁 $10 Cashback' },
      { rank: 4, name: 'Khadar_Mog', game: 'Free Fire & MLBB', totalSpend: 720.00 },
      { rank: 5, name: 'Warsame_Gaming', game: 'eFootball iOS Coins', totalSpend: 610.00 },
      { rank: 6, name: 'Zack_Roblox', game: 'Roblox Robux Pin', totalSpend: 490.00 }
    ]
  },
  'ALL-TIME': {
    summary: {
      todayTop: { spend: '$185.00', user: 'VIP_Shadow_99' },
      weeklyTop: { spend: '$980.00', user: 'King_Abdirahman' },
      monthlyTop: { spend: '$1,450.00', user: 'Somali_Sniper' },
      allTimeKing: { spend: '$4,850.00', user: 'Tokiyo_Master' }
    },
    ranks: [
      { rank: 1, name: 'Tokiyo_Master', game: 'PUBG / Cars / X-Suits', totalSpend: 4850.00, badge: '🏆 Legend', prize: '👑 Tokiyo Legend VIP' },
      { rank: 2, name: 'Somali_Sniper', game: 'PUBG Mobile UC', totalSpend: 3620.00, badge: '🥈 Master', prize: '💎 Diamond VIP' },
      { rank: 3, name: 'King_Abdirahman', game: 'Free Fire / PUBG', totalSpend: 2980.00, badge: '🥉 Pro VIP', prize: '🥇 Gold VIP' },
      { rank: 4, name: 'VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 2150.00 },
      { rank: 5, name: 'Mustafe_Somalia', game: 'All 12 Games', totalSpend: 1840.00 },
      { rank: 6, name: 'Qalanjo_Gamer', game: 'Roblox & Free Fire', totalSpend: 1420.00 }
    ]
  }
};

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL-TIME'>('MONTHLY');

  const currentData = timeData[activeFilter] || timeData.MONTHLY;
  const top1 = currentData.ranks[0];
  const top2 = currentData.ranks[1];
  const top3 = currentData.ranks[2];

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px', maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Header Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                👑 TOKIYO CHAMPIONS
              </span>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800 }}>● $100+ Monthly Prize Pool</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>
              Podium-ka Dahabiga ah ee Leaderboard-ka 🥇
            </h1>
          </div>

          {/* Time Filter Pill Capsule */}
          <div style={{ display: 'inline-flex', background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '24px', padding: '4px', gap: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            {(['DAILY', 'WEEKLY', 'MONTHLY', 'ALL-TIME'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: 0,
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: activeFilter === tab ? '#081d3d' : 'transparent',
                  color: activeFilter === tab ? '#ffffff' : '#64748b',
                  boxShadow: activeFilter === tab ? '0 2px 10px rgba(8,29,61,0.2)' : 'none',
                  transition: 'all .2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================
            3D CHAMPION PODIUM SECTION (GOLD, SILVER, BRONZE)
           ============================================================ */}
        <section
          style={{
            background: 'linear-gradient(135deg, #081d3d 0%, #151036 50%, #091c3d 100%)',
            borderRadius: '24px',
            padding: '36px 20px 24px',
            color: '#ffffff',
            marginBottom: '28px',
            boxShadow: '0 16px 40px rgba(8, 29, 61, 0.25)',
            border: '1.5px solid #1e3a8a',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Banner Tag */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, background: 'rgba(255,255,255,0.12)', color: '#facc15', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
              🏆 {activeFilter} CHAMPIONS PODIUM
            </span>
          </div>

          {/* 3 Pedestals Row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '16px', maxWidth: '680px', margin: '0 auto' }}>
            
            {/* 2nd Place: Silver Pedestal */}
            <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)', border: '3px solid #e2e8f0', display: 'grid', placeItems: 'center', fontSize: '24px', marginBottom: '8px', boxShadow: '0 4px 14px rgba(203,213,225,0.4)' }}>
                🥈
              </div>
              <b style={{ fontSize: '13px', color: '#ffffff', display: 'block', marginBottom: '2px' }}>{top2.name}</b>
              <span style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>${top2.totalSpend.toFixed(2)}</span>
              
              {/* Pedestal Block */}
              <div style={{ width: '100%', height: '120px', background: 'linear-gradient(180deg, rgba(203,213,225,0.25) 0%, rgba(148,163,184,0.1) 100%)', border: '1.5px solid #cbd5e1', borderRadius: '16px 16px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <b style={{ fontSize: '28px', color: '#e2e8f0', fontWeight: 900 }}>2</b>
                <small style={{ fontSize: '10px', color: '#fef08a', fontWeight: 800 }}>{top2.prize || '$25 Prize'}</small>
              </div>
            </div>

            {/* 1st Place: Gold Champion Pedestal (TALLEST) */}
            <div style={{ flex: 1.15, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{ width: '74px', height: '74px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: '4px solid #facc15', display: 'grid', placeItems: 'center', fontSize: '32px', marginBottom: '8px', boxShadow: '0 0 24px rgba(245,158,11,0.6)' }}>
                👑
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', marginBottom: '2px' }}>
                <b style={{ fontSize: '15px', color: '#facc15' }}>{top1.name}</b>
              </div>
              <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: 900, display: 'block', marginBottom: '8px' }}>${top1.totalSpend.toFixed(2)}</span>
              
              {/* Pedestal Block */}
              <div style={{ width: '100%', height: '160px', background: 'linear-gradient(180deg, rgba(245,158,11,0.35) 0%, rgba(180,83,9,0.15) 100%)', border: '2px solid #facc15', borderRadius: '18px 18px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', boxShadow: '0 -8px 24px rgba(245,158,11,0.2)' }}>
                <b style={{ fontSize: '36px', color: '#facc15', fontWeight: 900 }}>1</b>
                <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '2px 8px', borderRadius: '4px', marginTop: '2px' }}>
                  {top1.prize || '$50 UC Pack'}
                </span>
              </div>
            </div>

            {/* 3rd Place: Bronze Pedestal */}
            <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)', border: '3px solid #f59e0b', display: 'grid', placeItems: 'center', fontSize: '24px', marginBottom: '8px', boxShadow: '0 4px 14px rgba(217,119,6,0.3)' }}>
                🥉
              </div>
              <b style={{ fontSize: '13px', color: '#ffffff', display: 'block', marginBottom: '2px' }}>{top3.name}</b>
              <span style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>${top3.totalSpend.toFixed(2)}</span>
              
              {/* Pedestal Block */}
              <div style={{ width: '100%', height: '95px', background: 'linear-gradient(180deg, rgba(217,119,6,0.25) 0%, rgba(146,64,14,0.1) 100%)', border: '1.5px solid #d97706', borderRadius: '16px 16px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <b style={{ fontSize: '24px', color: '#fed7aa', fontWeight: 900 }}>3</b>
                <small style={{ fontSize: '10px', color: '#fed7aa', fontWeight: 800 }}>{top3.prize || '$10 Cashback'}</small>
              </div>
            </div>

          </div>
        </section>

        {/* Live Ranking Table Section */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 6px 24px rgba(10,44,97,0.04)' }}>
          {/* Section Top Header */}
          <div style={{ padding: '18px 22px', borderBottom: '1.5px solid #edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eef4fc', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
                <Trophy size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: 0, textTransform: 'uppercase', letterSpacing: '.4px' }}>
                  FULL LEADERBOARD RANKINGS
                </h3>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  TOP SPENDERS &amp; REWARDS
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, color: '#059669' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              <span>REAL-TIME DATA</span>
            </div>
          </div>

          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 140px', padding: '12px 22px', background: '#f8fafc', borderBottom: '1px solid #edf2f7', fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px' }}>
            <span>RANK</span>
            <span>GAMER</span>
            <span style={{ textAlign: 'right' }}>TOTAL SPENT</span>
          </div>

          {/* Table Body List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {currentData.ranks.map((u) => {
              return (
                <div 
                  key={u.rank} 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '80px 1fr 140px', 
                    padding: '16px 22px', 
                    alignItems: 'center', 
                    borderBottom: '1px solid #edf2f7',
                    background: u.rank === 1 ? 'linear-gradient(90deg, rgba(254, 240, 138, 0.15) 0%, #ffffff 100%)' : '#ffffff',
                    transition: 'background .15s ease'
                  }}
                >
                  {/* Rank Column */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span 
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '50%', 
                        background: u.rank === 1 ? '#fef08a' : u.rank === 2 ? '#e2e8f0' : u.rank === 3 ? '#fed7aa' : '#f1f5f9', 
                        color: u.rank === 1 ? '#854d0e' : u.rank === 2 ? '#475569' : u.rank === 3 ? '#9a3412' : '#0a2c61',
                        display: 'grid', 
                        placeItems: 'center', 
                        fontSize: '12px', 
                        fontWeight: 900 
                      }}
                    >
                      {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : u.rank}
                    </span>
                  </div>

                  {/* Customer Column */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <b style={{ fontSize: '13.5px', color: '#0a2c61' }}>{u.name}</b>
                      {u.badge && (
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#d91f2d', background: 'rgba(217,31,45,0.08)', padding: '1px 6px', borderRadius: '4px' }}>
                          {u.badge}
                        </span>
                      )}
                    </div>
                    <small style={{ fontSize: '11px', color: '#64748b' }}>{u.game}</small>
                  </div>

                  {/* Total Spend Column */}
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#0a2c61' }}>
                      ${u.totalSpend.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
