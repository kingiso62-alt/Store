'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Clock, TrendingUp, Calendar, Crown, 
  Trophy, Sparkles, UserRound, ArrowRight, Flame 
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar?: string;
  game: string;
  totalSpend: number;
  badge?: string;
  isCurrentUser?: boolean;
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
      { rank: 1, name: '★ VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 185.00, badge: '🥇 1st Place' },
      { rank: 2, name: '★ Ahmed_Gamer252', game: 'Free Fire', totalSpend: 120.50, badge: '🥈 2nd Place' },
      { rank: 3, name: '★ Liban_Konami', game: 'eFootball Coins', totalSpend: 95.00, badge: '🥉 3rd Place' },
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
      { rank: 1, name: '★ King_Abdirahman', game: 'PUBG Mobile UC', totalSpend: 980.00, badge: '👑 Champion' },
      { rank: 2, name: '★ VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 760.00, badge: '🥈 2nd Place' },
      { rank: 3, name: '★ Somali_Sniper', game: 'PUBG Mythic X-Suit', totalSpend: 540.00, badge: '🥉 3rd Place' },
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
      { rank: 1, name: '★ Somali_Sniper', game: 'PUBG Mobile & Supercars', totalSpend: 1450.00, badge: '👑 Monthly King' },
      { rank: 2, name: '★ King_Abdirahman', game: 'PUBG Mobile UC', totalSpend: 1240.00, badge: '🥈 2nd Place' },
      { rank: 3, name: '★ VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 990.00, badge: '🥉 3rd Place' },
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
      { rank: 1, name: '★ Tokiyo_Master', game: 'PUBG / Cars / X-Suits', totalSpend: 4850.00, badge: '🏆 Legend' },
      { rank: 2, name: '★ Somali_Sniper', game: 'PUBG Mobile UC', totalSpend: 3620.00, badge: '🥈 Master' },
      { rank: 3, name: '★ King_Abdirahman', game: 'Free Fire / PUBG', totalSpend: 2980.00, badge: '🥉 Pro VIP' },
      { rank: 4, name: '★ VIP_Shadow_99', game: 'PUBG Mobile UC', totalSpend: 2150.00 },
      { rank: 5, name: 'Mustafe_Somalia', game: 'All 12 Games', totalSpend: 1840.00 },
      { rank: 6, name: 'Qalanjo_Gamer', game: 'Roblox & Free Fire', totalSpend: 1420.00 }
    ]
  }
};

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL-TIME'>('DAILY');

  const currentData = timeData[activeFilter] || timeData.DAILY;

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px', maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Main Title & Subtitle */}
        <div style={{ marginBottom: '22px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>
            Leaderboard Analytics
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
            Real-time spending data across all users
          </p>
        </div>

        {/* Time Filter Pill Capsule */}
        <div style={{ display: 'inline-flex', background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '24px', padding: '4px', gap: '4px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'ALL-TIME'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: 0,
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                background: activeFilter === tab ? '#2563eb' : 'transparent',
                color: activeFilter === tab ? '#ffffff' : '#64748b',
                boxShadow: activeFilter === tab ? '0 2px 10px rgba(37,99,235,0.3)' : 'none',
                transition: 'all .2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4 Analytics Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {/* Card 1: Today's Top */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 18px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f8fafc', color: '#64748b', display: 'grid', placeItems: 'center', marginBottom: '12px' }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px', display: 'block', textTransform: 'uppercase' }}>
              TODAY&apos;S TOP
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 2px' }}>
              {currentData.summary.todayTop.spend}
            </h2>
            <small style={{ fontSize: '11px', color: '#64748b' }}>
              User: <b style={{ color: '#0a2c61' }}>{currentData.summary.todayTop.user}</b>
            </small>
          </div>

          {/* Card 2: Weekly Top */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 18px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f8fafc', color: '#64748b', display: 'grid', placeItems: 'center', marginBottom: '12px' }}>
              <TrendingUp size={18} />
            </div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px', display: 'block', textTransform: 'uppercase' }}>
              WEEKLY TOP
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 2px' }}>
              {currentData.summary.weeklyTop.spend}
            </h2>
            <small style={{ fontSize: '11px', color: '#64748b' }}>
              User: <b style={{ color: '#0a2c61' }}>{currentData.summary.weeklyTop.user}</b>
            </small>
          </div>

          {/* Card 3: Monthly Top */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 18px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f8fafc', color: '#64748b', display: 'grid', placeItems: 'center', marginBottom: '12px' }}>
              <Calendar size={18} />
            </div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px', display: 'block', textTransform: 'uppercase' }}>
              MONTHLY TOP
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 2px' }}>
              {currentData.summary.monthlyTop.spend}
            </h2>
            <small style={{ fontSize: '11px', color: '#64748b' }}>
              User: <b style={{ color: '#0a2c61' }}>{currentData.summary.monthlyTop.user}</b>
            </small>
          </div>

          {/* Card 4: All-Time King */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 18px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f8fafc', color: '#64748b', display: 'grid', placeItems: 'center', marginBottom: '12px' }}>
              <Crown size={18} />
            </div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px', display: 'block', textTransform: 'uppercase' }}>
              ALL-TIME KING
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 2px' }}>
              {currentData.summary.allTimeKing.spend}
            </h2>
            <small style={{ fontSize: '11px', color: '#64748b' }}>
              User: <b style={{ color: '#0a2c61' }}>{currentData.summary.allTimeKing.user}</b>
            </small>
          </div>
        </div>

        {/* Live Ranking Table Section */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 6px 24px rgba(10,44,97,0.04)' }}>
          {/* Section Top Header */}
          <div style={{ padding: '18px 22px', borderBottom: '1.5px solid #edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eef4fc', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
                <Trophy size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: 0, textTransform: 'uppercase', letterSpacing: '.4px' }}>
                  LIVE RANKING
                </h3>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  GLOBAL COMPETITION
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
            <span>CUSTOMER</span>
            <span style={{ textAlign: 'right' }}>TOTAL SPEND</span>
          </div>

          {/* Table Body List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {currentData.ranks.map((u) => {
              const isTop3 = u.rank <= 3;
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
