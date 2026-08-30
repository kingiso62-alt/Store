'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  UserRound, ShoppingBag, Wallet, Trophy, 
  KeyRound, HelpCircle, PhoneCall, LogOut, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck 
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

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  useEffect(() => {
    // 1. Try local saved auth user
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

    // 2. Try Supabase session
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

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px', maxWidth: '840px', margin: '0 auto' }}>
        
        {/* Customer Profile Banner */}
        <div style={{ background: 'linear-gradient(135deg, #091c3d 0%, #151036 50%, #2a0b18 100%)', borderRadius: '20px', padding: '28px 24px', color: '#ffffff', boxShadow: '0 8px 30px rgba(10,44,97,0.15)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)', display: 'grid', placeItems: 'center', fontSize: '26px' }}>
              👑
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 900, margin: 0 }}>{user.name}</h1>
                <span style={{ background: '#facc15', color: '#854d0e', fontSize: '10.5px', fontWeight: 900, padding: '2px 8px', borderRadius: '6px' }}>
                  {user.role}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#c2d2e9', margin: '4px 0 0' }}>{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
          >
            <LogOut size={14} />
            <span>Ka Bax (Logout)</span>
          </button>
        </div>

        {/* 2 Stat Cards (Wallet Balance & Points) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div>
              <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Available Balance</small>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#16a34a', margin: '2px 0 0' }}>{user.balance}</h2>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center' }}>
              <Wallet size={20} />
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div>
              <small style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>VIP Reward Points</small>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#d91f2d', margin: '2px 0 0' }}>{user.points}</h2>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef2f2', color: '#d91f2d', display: 'grid', placeItems: 'center' }}>
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* Quick Menu Shortcuts Grid */}
        <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', marginBottom: '14px' }}>
          Maamul Adeegyadaada (Quick Actions)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
          <Link 
            href="/track-order" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 16px rgba(10,44,97,0.02)', transition: 'all .15s ease' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef4fc', color: '#0a2c61', display: 'grid', placeItems: 'center' }}>
              <ShoppingBag size={18} />
            </div>
            <b style={{ fontSize: '13px', color: '#0a2c61' }}>Dalabkaga (Orders)</b>
            <span style={{ fontSize: '11px', color: '#64748b' }}>La soco dalabyadaada tooska ah.</span>
          </Link>

          <Link 
            href="/redeem" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 16px rgba(10,44,97,0.02)', transition: 'all .15s ease' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center' }}>
              <KeyRound size={18} />
            </div>
            <b style={{ fontSize: '13px', color: '#0a2c61' }}>Code Checker</b>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Fur vouchers iyo promo codes.</span>
          </Link>

          <Link 
            href="/cashback" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 16px rgba(10,44,97,0.02)', transition: 'all .15s ease' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'grid', placeItems: 'center' }}>
              <Wallet size={18} />
            </div>
            <b style={{ fontSize: '13px', color: '#0a2c61' }}>Cashback &amp; VIP</b>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Hel ilaa 5% Cashback dib ah.</span>
          </Link>

          <Link 
            href="/leaderboard" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 16px rgba(10,44,97,0.02)', transition: 'all .15s ease' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef08a', color: '#854d0e', display: 'grid', placeItems: 'center' }}>
              <Trophy size={18} />
            </div>
            <b style={{ fontSize: '13px', color: '#0a2c61' }}>Leaderboard</b>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Arag kaalintaada tartanka.</span>
          </Link>

          <Link 
            href="/faq" 
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 16px rgba(10,44,97,0.02)', transition: 'all .15s ease' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', display: 'grid', placeItems: 'center' }}>
              <HelpCircle size={18} />
            </div>
            <b style={{ fontSize: '13px', color: '#0a2c61' }}>FAQ &amp; Su&apos;aalaha</b>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Jawaabaha su&apos;aalaha muhiimka ah.</span>
          </Link>

          <a 
            href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20VIP%20Member%20ayaan%20ahay%20caawinaad%20ayaan%20rabaa" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '14px', padding: '16px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 16px rgba(10,44,97,0.02)', transition: 'all .15s ease' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#25d366', display: 'grid', placeItems: 'center' }}>
              <PhoneCall size={18} />
            </div>
            <b style={{ fontSize: '13px', color: '#0a2c61' }}>VIP WhatsApp 24/7</b>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Taageero toos ah oo degdeg ah.</span>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
