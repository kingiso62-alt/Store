'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  UserRound, ShoppingBag, Wallet, Trophy, 
  KeyRound, HelpCircle, PhoneCall, LogOut, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck,
  Gift, Calendar, Award, Brain, Zap, Copy, Check, Flame, RefreshCw, LayoutDashboard, Settings, Tv, Users
} from 'lucide-react';
import { supabaseBrowser } from '../../lib/supabase-browser';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  balance: string;
  points: string;
  phone: string;
}

const defaultUser: UserProfile = {
  id: 'usr_882910',
  name: 'Abdirahman VIP (Gamer)',
  email: 'vip.gamer@tokiyostore.com',
  role: 'VIP Gold Member',
  balance: '$150.00',
  points: '1,500 Pts',
  phone: '+252 61 366 7676'
};

const recentOrders = [
  { id: 'TK-882194', game: 'PUBG Mobile', package: '660 UC (Royale Pass)', playerId: '512984920', amount: 9.50, status: 'completed', date: 'Maanta 02:40 PM', icon: '/images/games/pubg-mobile.png' },
  { id: 'TK-774129', game: 'Free Fire', package: '520+52 Diamonds', playerId: '882194012', amount: 4.60, status: 'completed', date: 'Shalay 06:15 PM', icon: '/images/games/free-fire.png' },
  { id: 'TK-659021', game: 'eFootball', package: '1040 Coins (Android)', playerId: '994102914', amount: 9.30, status: 'completed', date: '2 Maalmood ka hor', icon: '/images/games/efootball-android.png' }
];

const badges = [
  { name: 'Pioneer Gamer', desc: 'Dalabkii 1-aad', icon: '🥉', unlocked: true },
  { name: 'PUBG Veteran', desc: '5+ Dalab', icon: '🪙', unlocked: true },
  { name: 'VIP High Roller', desc: '$100+ Iibsi', icon: '👑', unlocked: true },
  { name: 'Flash Hunter', desc: 'Flash Sale', icon: '⚡', unlocked: true },
  { name: 'Quiz Master', desc: '100% Sax', icon: '🎯', unlocked: true },
  { name: 'Lucky Spinner', desc: 'Daily Wheel', icon: '🎡', unlocked: false }
];

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'mystery' | 'streak' | 'badges' | 'referral'>('overview');
  const [copiedRef, setCopiedRef] = useState(false);
  const [streakClaimed, setStreakClaimed] = useState(false);

  useEffect(() => {
    try {
      const local = localStorage.getItem('tokiyo_auth_user');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.email) {
          setUser(parsed);
          return;
        }
      }
    } catch {
      // fallback
    }

    supabaseBrowser.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Customer',
          email: data.user.email || '',
          role: 'Member',
          balance: '$25.00',
          points: '250 Pts',
          phone: data.user.user_metadata?.phone || '+252 61 366 7676'
        });
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await supabaseBrowser.auth.signOut();
      localStorage.removeItem('tokiyo_auth_user');
    } catch {
      // fallback
    }
    location.href = '/login';
  };

  const refLink = `https://tokiyostore.com/ref/${user.name.replace(/\s+/g, '-')}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(refLink);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Gamer Dashboard</b>
          </div>

          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', textDecoration: 'none' }}
          >
            <span>← Ku Noqo Dukaanka</span>
          </Link>
        </div>

        {/* 2-COLUMN DASHBOARD LAYOUT WITH SIDEBAR */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* ============================================================
              LEFT SIDEBAR: PROFILE CARD & SERVICE NAVIGATION
             ============================================================ */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Gamer Identity Card */}
            <div style={{ background: 'linear-gradient(135deg, #091c3d 0%, #151036 50%, #081d3d 100%)', borderRadius: '20px', padding: '22px', color: '#ffffff', boxShadow: '0 8px 24px rgba(10,44,97,0.15)', border: '1.5px solid #1e3a8a', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: '3px solid #facc15', display: 'grid', placeItems: 'center', fontSize: '28px', margin: '0 auto 12px', boxShadow: '0 0 16px rgba(245,158,11,0.5)' }}>
                👑
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 900, margin: '0 0 4px', color: '#ffffff' }}>{user.name}</h2>
              <span style={{ background: '#fef08a', color: '#854d0e', fontSize: '10.5px', fontWeight: 900, padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                {user.role}
              </span>
              <p style={{ fontSize: '11.5px', color: '#cbd5e1', margin: '0 0 14px' }}>{user.email}</p>

              {/* Mini Balance Strip */}
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', display: 'flex', justifyContent: 'space-around', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div>
                  <small style={{ fontSize: '10px', color: '#93c5fd', display: 'block' }}>Wallet</small>
                  <b style={{ fontSize: '14px', color: '#4ade80' }}>{user.balance}</b>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)' }} />
                <div>
                  <small style={{ fontSize: '10px', color: '#93c5fd', display: 'block' }}>Points</small>
                  <b style={{ fontSize: '14px', color: '#facc15' }}>{user.points}</b>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation Menu */}
            <nav style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '12px', boxShadow: '0 4px 18px rgba(10,44,97,0.03)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: activeTab === 'overview' ? '#081d3d' : 'transparent',
                  color: activeTab === 'overview' ? '#ffffff' : '#0a2c61',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease'
                }}
              >
                <LayoutDashboard size={17} />
                <span>Dashboard Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: activeTab === 'orders' ? '#081d3d' : 'transparent',
                  color: activeTab === 'orders' ? '#ffffff' : '#0a2c61',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={17} />
                  <span>My Orders (Dalabyada)</span>
                </div>
                <span style={{ fontSize: '10px', background: activeTab === 'orders' ? 'rgba(255,255,255,0.2)' : '#eff6ff', color: activeTab === 'orders' ? '#ffffff' : '#2563eb', padding: '2px 6px', borderRadius: '4px' }}>3</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mystery')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: activeTab === 'mystery' ? '#081d3d' : 'transparent',
                  color: activeTab === 'mystery' ? '#ffffff' : '#0a2c61',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease'
                }}
              >
                <Gift size={17} color={activeTab === 'mystery' ? '#facc15' : '#eab308'} />
                <span>Lucky Mystery Box</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('badges')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: activeTab === 'badges' ? '#081d3d' : 'transparent',
                  color: activeTab === 'badges' ? '#ffffff' : '#0a2c61',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease'
                }}
              >
                <Award size={17} color={activeTab === 'badges' ? '#93c5fd' : '#2563eb'} />
                <span>Gamer Badges (5/6)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('streak')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: activeTab === 'streak' ? '#081d3d' : 'transparent',
                  color: activeTab === 'streak' ? '#ffffff' : '#0a2c61',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease'
                }}
              >
                <Flame size={17} color={activeTab === 'streak' ? '#f87171' : '#dc2626'} />
                <span>7-Day Login Streak</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('referral')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 0,
                  background: activeTab === 'referral' ? '#081d3d' : 'transparent',
                  color: activeTab === 'referral' ? '#ffffff' : '#0a2c61',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s ease'
                }}
              >
                <Users size={17} color={activeTab === 'referral' ? '#4ade80' : '#16a34a'} />
                <span>Refer &amp; Earn ($0.50)</span>
              </button>

              <div style={{ height: '1px', background: '#f1f5f9', margin: '6px 0' }} />

              {/* Direct Links in Sidebar */}
              <Link
                href="/bulk-topup"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', color: '#0a2c61', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}
              >
                <Zap size={16} color="#0284c7" />
                <span>Clan Bulk Top-Up</span>
              </Link>

              <Link
                href="/vouchers"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', color: '#0a2c61', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}
              >
                <Gift size={16} color="#d91f2d" />
                <span>Digital Gift Cards</span>
              </Link>

              <Link
                href="/streams"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', color: '#0a2c61', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}
              >
                <Tv size={16} color="#7c3aed" />
                <span>Somali Esports Streams</span>
              </Link>

              <Link
                href="/redeem"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', color: '#0a2c61', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}
              >
                <KeyRound size={16} color="#16a34a" />
                <span>Code Checker</span>
              </Link>

              <div style={{ height: '1px', background: '#f1f5f9', margin: '6px 0' }} />

              <button
                type="button"
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', border: 0, background: '#fef2f2', color: '#dc2626', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer', textAlign: 'left' }}
              >
                <LogOut size={16} />
                <span>Ka Bax (Logout)</span>
              </button>
            </nav>

            {/* Direct WhatsApp Support Box */}
            <div style={{ background: '#ecfdf5', border: '1.5px solid #86efac', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
              <small style={{ fontSize: '11px', color: '#166534', fontWeight: 800, display: 'block', marginBottom: '4px' }}>VIP 24/7 SUPPORT</small>
              <a
                href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20VIP%20Member%20ayaan%20ahay"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#25d366', color: '#ffffff', padding: '8px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 900, textDecoration: 'none' }}
              >
                <PhoneCall size={13} />
                <span>WhatsApp (+252 61 366 7676)</span>
              </a>
            </div>
          </aside>

          {/* ============================================================
              RIGHT MAIN CONTENT: DYNAMIC TAB RENDERING
             ============================================================ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '0' }}>
            
            {/* Top Stat Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <div>
                  <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Cashback Balance</small>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#16a34a', margin: '2px 0 0' }}>{user.balance}</h3>
                </div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center' }}>
                  <Wallet size={20} />
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <div>
                  <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>VIP Loyalty Points</small>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#d91f2d', margin: '2px 0 0' }}>{user.points}</h3>
                </div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef2f2', color: '#d91f2d', display: 'grid', placeItems: 'center' }}>
                  <Sparkles size={20} />
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <div>
                  <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Completed Orders</small>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '2px 0 0' }}>{recentOrders.length} Dalab</h3>
                </div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
                  <CheckCircle2 size={20} />
                </div>
              </div>
            </div>

            {/* TAB CONTENT 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <>
                {/* Rewards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  {/* Mystery Box Card */}
                  <div style={{ background: 'linear-gradient(135deg, #081d3d 0%, #1e1b4b 100%)', borderRadius: '18px', padding: '20px', color: '#ffffff', border: '1.5px solid #312e81', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 6px 20px rgba(8, 29, 61, 0.15)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '26px' }}>🎁</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '2px 7px', borderRadius: '4px' }}>DAILY FREE</span>
                      </div>
                      <b style={{ fontSize: '15px', color: '#ffffff', display: 'block', marginBottom: '4px' }}>Lucky Mystery Box</b>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '0 0 14px', lineHeight: '1.4' }}>
                        Fur sanduuqa dahabiga ah oo hel PUBG UC, Diamonds &amp; Vouchers!
                      </p>
                    </div>
                    <Link
                      href="/mystery-box"
                      style={{ background: '#f59e0b', color: '#ffffff', padding: '9px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 900, textDecoration: 'none', textAlign: 'center', display: 'block' }}
                    >
                      Fur Sanduuqa Hadda →
                    </Link>
                  </div>

                  {/* 7-Day Login Streak Card */}
                  <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '26px' }}>🔥</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, background: '#ecfdf5', color: '#16a34a', padding: '2px 7px', borderRadius: '4px' }}>DAY 3 ACTIVE</span>
                      </div>
                      <b style={{ fontSize: '15px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>7-Day Daily Streak</b>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 14px', lineHeight: '1.4' }}>
                        Soo gal maalin kasta si aad u furto Tigidhka 60 UC Giveaway ee Maalinta 7-aad!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStreakClaimed(true)}
                      style={{ background: streakClaimed ? '#ecfdf5' : '#081d3d', color: streakClaimed ? '#16a34a' : '#ffffff', border: 0, padding: '9px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 900, cursor: 'pointer' }}
                    >
                      {streakClaimed ? '✓ Hadiyadda Maanta Waa La Qaatay' : 'Qaado Hadiyadda Maanta (Day 3)'}
                    </button>
                  </div>
                </div>

                {/* Recent Orders List */}
                <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>
                      Dalabyadii Ugu Dambeeyay (Recent Orders) 📋
                    </h3>
                    <Link href="/track-order" style={{ fontSize: '11.5px', fontWeight: 800, color: '#2563eb', textDecoration: 'none' }}>
                      Dhammaan Dalabyada →
                    </Link>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {recentOrders.map((ord) => (
                      <div
                        key={ord.id}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #edf2f7',
                          borderRadius: '14px',
                          padding: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={ord.icon}
                            alt={ord.game}
                            style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block' }}>{ord.game} - {ord.package}</b>
                            <small style={{ fontSize: '11px', color: '#64748b' }}>ID: <b>{ord.playerId}</b> • {ord.date}</small>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <b style={{ fontSize: '14px', color: '#d91f2d' }}>${ord.amount.toFixed(2)}</b>
                          <Link
                            href={`/topup/order?game=${ord.game.toLowerCase().includes('pubg') ? 'pubg' : ord.game.toLowerCase().includes('free fire') ? 'freefire' : 'efootball_android'}`}
                            style={{ background: '#081d3d', color: '#ffffff', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Zap size={11} color="#facc15" />
                            <span>⚡ Dib U Dalbo</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gamer Badges */}
                <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: '0 0 14px' }}>
                    Biladahaaga Gaming-ka (Gamer Badges) 🎖️
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
                    {badges.map((b) => (
                      <div
                        key={b.name}
                        style={{
                          background: b.unlocked ? '#f8fafc' : '#f1f5f9',
                          border: `1.5px solid ${b.unlocked ? '#cbd5e1' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          padding: '10px 8px',
                          textAlign: 'center',
                          opacity: b.unlocked ? 1 : 0.5
                        }}
                      >
                        <div style={{ fontSize: '22px', marginBottom: '2px' }}>{b.icon}</div>
                        <b style={{ fontSize: '10.5px', color: '#0a2c61', display: 'block' }}>{b.name}</b>
                        <small style={{ fontSize: '9px', color: b.unlocked ? '#16a34a' : '#94a3b8', fontWeight: 800 }}>
                          {b.unlocked ? '✓ Unlocked' : 'Locked'}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB CONTENT 2: ORDERS */}
            {activeTab === 'orders' && (
              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 16px' }}>
                  Dhammaan Dalabyadaada (Order History)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentOrders.map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        background: '#f8fafc',
                        border: '1.5px solid #edf2f7',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={ord.icon}
                          alt={ord.game}
                          style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <div>
                          <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block' }}>{ord.game} - {ord.package}</b>
                          <small style={{ fontSize: '11px', color: '#64748b' }}>Order ID: <b>{ord.id}</b> • Player ID: <b>{ord.playerId}</b></small>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 900, background: '#ecfdf5', color: '#16a34a', padding: '4px 8px', borderRadius: '6px' }}>
                          ✓ Completed
                        </span>
                        <b style={{ fontSize: '15px', color: '#d91f2d' }}>${ord.amount.toFixed(2)}</b>
                        <Link
                          href={`/topup/order?game=${ord.game.toLowerCase().includes('pubg') ? 'pubg' : 'freefire'}`}
                          style={{ background: '#081d3d', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Zap size={12} color="#facc15" />
                          <span>⚡ Dib U Dalbo</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: MYSTERY BOX */}
            {activeTab === 'mystery' && (
              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '28px', textAlign: 'center', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', display: 'grid', placeItems: 'center', fontSize: '36px', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(245,158,11,0.3)' }}>
                  🎁
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>Lucky Mystery Box</h3>
                <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '440px', margin: '0 auto 20px', lineHeight: '1.45' }}>
                  Fur sanduuqa dahabiga ah ee maalinlaha ah oo hel hadiyado lama filaan ah oo ay ku jiraan PUBG UC, Free Fire Diamonds iyo Vouchers qiimo-dhimis ah!
                </p>
                <Link
                  href="/mystery-box"
                  style={{ background: '#081d3d', color: '#ffffff', padding: '12px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: 900, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Sparkles size={16} color="#facc15" />
                  <span>Fur Bogga Mystery Box-ka →</span>
                </Link>
              </div>
            )}

            {/* TAB CONTENT 4: BADGES */}
            {activeTab === 'badges' && (
              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 16px' }}>
                  Biladaha &amp; Derejooyinkaada (Gamer Badges)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {badges.map((b) => (
                    <div
                      key={b.name}
                      style={{
                        background: b.unlocked ? '#f8fafc' : '#f1f5f9',
                        border: `1.5px solid ${b.unlocked ? '#cbd5e1' : '#e2e8f0'}`,
                        borderRadius: '14px',
                        padding: '16px',
                        opacity: b.unlocked ? 1 : 0.5
                      }}
                    >
                      <div style={{ fontSize: '28px', marginBottom: '6px' }}>{b.icon}</div>
                      <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block' }}>{b.name}</b>
                      <small style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '6px' }}>{b.desc}</small>
                      <span style={{ fontSize: '10px', fontWeight: 900, background: b.unlocked ? '#ecfdf5' : '#e2e8f0', color: b.unlocked ? '#16a34a' : '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                        {b.unlocked ? '✓ Unlocked' : 'Locked'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: STREAK */}
            {activeTab === 'streak' && (
              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>
                  7-Day Daily Login Streak 🔥
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 20px' }}>
                  Soo gal dukaanka 7 maalmood oo isku xigta si aad ugu guuleysato Tigidhka 60 UC Giveaway!
                </p>

                <div style={{ background: 'linear-gradient(135deg, #081d3d 0%, #0d2857 100%)', borderRadius: '16px', padding: '16px 20px', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#93c5fd' }}>Streak-gaaga Maanta:</span>
                    <b style={{ fontSize: '18px', color: '#facc15', display: 'block' }}>🔥 Maalinta 3-aad (Day 3 Active)</b>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStreakClaimed(true)}
                    style={{ background: streakClaimed ? '#ecfdf5' : '#22c55e', color: streakClaimed ? '#16a34a' : '#ffffff', border: 0, padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 900, cursor: 'pointer' }}
                  >
                    {streakClaimed ? '✓ Waa La Qaatay' : 'Qaado Hadiyadda Maanta'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT 6: REFERRAL */}
            {activeTab === 'referral' && (
              <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>
                  Refer a Friend &amp; Earn ($0.50 Qof Kasta) 👥
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 16px' }}>
                  La wadaag linkigaaga gaarka ah saaxiibadaada. Qof kasta oo ku shubta xirmo, adigana $0.50 ayaa laguu shubayaa, isagana $0.50 Cashback ayuu helayaa!
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <div style={{ flex: 1, minWidth: '220px', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', fontWeight: 800, color: '#0a2c61' }}>
                    {refLink}
                  </div>
                  <button
                    type="button"
                    onClick={copyReferral}
                    style={{ background: '#081d3d', color: '#ffffff', border: 0, padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedRef ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedRef ? 'Waa La Kobiyeeyay' : 'Kobi Link'}</span>
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Asc saaxiib! Ku shubo PUBG UC & Free Fire Diamonds Tokiyo Store oo hel $0.50 Hadiyad ah: ${refLink}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#25d366', color: '#ffffff', padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <PhoneCall size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
