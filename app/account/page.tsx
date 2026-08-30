'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  UserRound, ShoppingBag, Wallet, Trophy, 
  KeyRound, HelpCircle, PhoneCall, LogOut, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck,
  Gift, Calendar, Award, Brain, Zap, Copy, Check, Flame, RefreshCw
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
  { id: 'TK-774129', game: 'Free Fire', package: '520+52 Diamonds', playerId: '882194012', amount: 4.60, status: 'completed', date: 'Shalay 06:15 PM', icon: '/images/games/free-fire.png' }
];

const badges = [
  { name: 'Pioneer Gamer', icon: '🥉', unlocked: true },
  { name: 'PUBG Veteran', icon: '🪙', unlocked: true },
  { name: 'VIP High Roller', icon: '👑', unlocked: true },
  { name: 'Flash Hunter', icon: '⚡', unlocked: true },
  { name: 'Quiz Master', icon: '🎯', unlocked: true },
  { name: 'Lucky Spinner', icon: '🎡', unlocked: false }
];

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile>(defaultUser);
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
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px', maxWidth: '880px', margin: '0 auto' }}>
        
        {/* 1. CUSTOMER PROFILE BANNER */}
        <div style={{ background: 'linear-gradient(135deg, #091c3d 0%, #151036 50%, #081d3d 100%)', borderRadius: '24px', padding: '28px 24px', color: '#ffffff', boxShadow: '0 12px 36px rgba(10,44,97,0.18)', marginBottom: '24px', border: '1.5px solid #1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: '3px solid #facc15', display: 'grid', placeItems: 'center', fontSize: '28px', boxShadow: '0 0 16px rgba(245,158,11,0.5)' }}>
              👑
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0, color: '#ffffff' }}>{user.name}</h1>
                <span style={{ background: '#fef08a', color: '#854d0e', fontSize: '10.5px', fontWeight: 900, padding: '2px 8px', borderRadius: '6px' }}>
                  {user.role}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '4px 0 0' }}>{user.email} • {user.phone}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 2. STATS OVERVIEW CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div>
              <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Cashback Wallet Balance</small>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#16a34a', margin: '2px 0 0' }}>{user.balance}</h2>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center' }}>
              <Wallet size={22} />
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div>
              <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>VIP Loyalty Points</small>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#d91f2d', margin: '2px 0 0' }}>{user.points}</h2>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef2f2', color: '#d91f2d', display: 'grid', placeItems: 'center' }}>
              <Sparkles size={22} />
            </div>
          </div>
        </div>

        {/* 3. GAMER ZONE: MYSTERY BOX & DAILY STREAK */}
        <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 14px' }}>
          Gamer Rewards &amp; Daily Quests 🎁
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {/* Mystery Box Card */}
          <div style={{ background: 'linear-gradient(135deg, #081d3d 0%, #1e1b4b 100%)', borderRadius: '18px', padding: '20px', color: '#ffffff', border: '1.5px solid #312e81', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 6px 20px rgba(8, 29, 61, 0.15)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px' }}>🎁</span>
                <span style={{ fontSize: '10px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '2px 7px', borderRadius: '4px' }}>DAILY FREE</span>
              </div>
              <b style={{ fontSize: '15px', color: '#ffffff', display: 'block', marginBottom: '4px' }}>Lucky Mystery Box</b>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '0 0 14px', lineHeight: '1.4' }}>
                Fur sanduuqa dahabiga ah maalin kasta oo hel hadiyado ay ku jiraan PUBG UC &amp; Discounts!
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px' }}>🔥</span>
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

        {/* 4. GAMER BADGES & ACHIEVEMENTS */}
        <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 14px' }}>
          Biladahaaga Gaming-ka (Gamer Badges) 🎖️
        </h3>

        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '20px', marginBottom: '28px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            {badges.map((b) => (
              <div
                key={b.name}
                style={{
                  background: b.unlocked ? '#f8fafc' : '#f1f5f9',
                  border: `1.5px solid ${b.unlocked ? '#cbd5e1' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '12px 8px',
                  textAlign: 'center',
                  opacity: b.unlocked ? 1 : 0.5
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{b.icon}</div>
                <b style={{ fontSize: '11px', color: '#0a2c61', display: 'block' }}>{b.name}</b>
                <small style={{ fontSize: '9.5px', color: b.unlocked ? '#16a34a' : '#94a3b8', fontWeight: 800 }}>
                  {b.unlocked ? '✓ Unlocked' : 'Locked'}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* 5. RECENT ORDERS & 1-CLICK RE-ORDER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>
            Dalabyadii Ugu Dambeeyay (Recent Orders) 📋
          </h3>
          <Link href="/track-order" style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb', textDecoration: 'none' }}>
            Dhammaan Dalabyada →
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {recentOrders.map((ord) => (
            <div
              key={ord.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #edf2f7',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                boxShadow: '0 4px 14px rgba(10,44,97,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={ord.icon}
                  alt={ord.game}
                  style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div>
                  <b style={{ fontSize: '13.5px', color: '#0a2c61', display: 'block' }}>{ord.game} - {ord.package}</b>
                  <small style={{ fontSize: '11px', color: '#64748b' }}>ID: <b>{ord.playerId}</b> • {ord.date}</small>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

        {/* 6. REFERRAL SHARE BOX */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '20px', boxShadow: '0 4px 16px rgba(10,44,97,0.03)', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>👥</span>
            <b style={{ fontSize: '14px', color: '#0a2c61' }}>Refer a Friend &amp; Earn ($0.50 Qof Kasta)</b>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px' }}>
            La wadaag linkigaaga gaarka ah saaxiibadaada si aad u hesho $0.50 Cashback qof kasta oo wax iibsada:
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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

        {/* 7. QUICK SERVICE SHORTCUTS */}
        <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', marginBottom: '14px' }}>
          Adeegyada Kale ee Dukaanka (Quick Actions)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <Link 
            href="/redeem" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center' }}>
              <KeyRound size={16} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: '#0a2c61', display: 'block' }}>Code Checker</b>
              <small style={{ fontSize: '10.5px', color: '#64748b' }}>Fur vouchers &amp; codes</small>
            </div>
          </Link>

          <Link 
            href="/bulk-topup" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
              <Zap size={16} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: '#0a2c61', display: 'block' }}>Clan Bulk Top-Up</b>
              <small style={{ fontSize: '10.5px', color: '#64748b' }}>U shub dhammaan Squad-ka</small>
            </div>
          </Link>

          <Link 
            href="/vouchers" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#fef2f2', color: '#dc2626', display: 'grid', placeItems: 'center' }}>
              <Gift size={16} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: '#0a2c61', display: 'block' }}>Gift Cards</b>
              <small style={{ fontSize: '10.5px', color: '#64748b' }}>Kaararka hadiyadda</small>
            </div>
          </Link>

          <Link 
            href="/streams" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f8fafc', color: '#0a2c61', display: 'grid', placeItems: 'center' }}>
              <Trophy size={16} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: '#0a2c61', display: 'block' }}>Esports Streams</b>
              <small style={{ fontSize: '10.5px', color: '#64748b' }}>Daawo tartamada tooska ah</small>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
