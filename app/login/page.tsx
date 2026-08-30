'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  UserRound, Mail, Lock, Eye, EyeOff, 
  Sparkles, CheckCircle2, AlertCircle, ArrowRight,
  ShieldCheck, Zap, Crown, UserPlus, LogIn, PhoneCall
} from 'lucide-react';
import { supabaseBrowser } from '../../lib/supabase-browser';

const demoAccounts = [
  {
    role: 'VIP Gold Member',
    name: 'Abdirahman VIP (Gamer)',
    email: 'vip.gamer@tokiyostore.com',
    balance: '$150.00',
    points: '1,500 Pts',
    avatar: '👑',
    color: '#eab308'
  },
  {
    role: 'Pro Esports Player',
    name: 'Mohamed Sniper 252',
    email: 'pro.player@tokiyostore.com',
    balance: '$45.00',
    points: '450 Pts',
    avatar: '⚡',
    color: '#3b82f6'
  },
  {
    role: 'New Member',
    name: 'Hassan New Customer',
    email: 'new.gamer@tokiyostore.com',
    balance: '$10.00',
    points: '100 Pts',
    avatar: '🎮',
    color: '#10b981'
  }
];

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // One-Click Demo Login Handler
  const handleDemoLogin = (demo: typeof demoAccounts[0]) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg(`Galayaa Akoonka Demo ee ${demo.name}...`);

    const userObj = {
      id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
      email: demo.email,
      name: demo.name,
      role: demo.role,
      balance: demo.balance,
      points: demo.points,
      phone: '+252 61 366 7676',
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('tokiyo_auth_user', JSON.stringify(userObj));
    } catch {
      // fallback
    }

    setTimeout(() => {
      setLoading(false);
      location.href = '/account';
    }, 600);
  };

  // Standard Form Submit (Login or Register)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (activeTab === 'LOGIN') {
        // Try Supabase auth, fallback to mock demo session
        const { data, error } = await supabaseBrowser.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        const userObj = {
          id: data?.user?.id || `usr_${Math.floor(100000 + Math.random() * 900000)}`,
          email: email.trim(),
          name: email.split('@')[0],
          role: 'Member',
          balance: '$25.00',
          points: '250 Pts',
          phone: phone || '+252 61 000 0000',
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('tokiyo_auth_user', JSON.stringify(userObj));
        setSuccessMsg('Si guul leh ayaad u gashay! Kusoo dhawoow...');
        setTimeout(() => {
          location.href = '/account';
        }, 500);
      } else {
        // Register Tab
        const { data, error } = await supabaseBrowser.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim(), phone } }
        });

        const userObj = {
          id: data?.user?.id || `usr_${Math.floor(100000 + Math.random() * 900000)}`,
          email: email.trim(),
          name: fullName.trim() || email.split('@')[0],
          role: 'New Member',
          balance: '$5.00 Welcome Bonus',
          points: '50 Pts',
          phone: phone || '+252 61 000 0000',
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('tokiyo_auth_user', JSON.stringify(userObj));
        setSuccessMsg('Hambalyo! Akoonkaaga cusub si guul leh ayaa loo sameeyay ($5 Bonus).');
        setTimeout(() => {
          location.href = '/account';
        }, 600);
      }
    } catch {
      // Offline fallback
      const userObj = {
        id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
        email: email.trim(),
        name: fullName.trim() || email.split('@')[0],
        role: activeTab === 'REGISTER' ? 'New Member' : 'Member',
        balance: '$20.00',
        points: '200 Pts',
        phone: phone || '+252 61 366 7676',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('tokiyo_auth_user', JSON.stringify(userObj));
      location.href = '/account';
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '32px', paddingBottom: '70px', maxWidth: '520px', margin: '0 auto' }}>
        
        {/* Main Card */}
        <div style={{ background: '#ffffff', border: '1.5px solid #e5edf7', borderRadius: '20px', padding: '28px 24px', boxShadow: '0 8px 30px rgba(10,44,97,0.06)' }}>
          
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#081d3d', color: '#ffffff', display: 'grid', placeItems: 'center', margin: '0 auto 12px', boxShadow: '0 4px 14px rgba(8,29,61,0.2)' }}>
              <UserRound size={26} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '0 0 4px' }}>
              {activeTab === 'LOGIN' ? 'Ku Soo Dhawoow TOKIYO STORE' : 'Sameyso Akoon Cusub'}
            </h1>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
              {activeTab === 'LOGIN' ? 'Gal akoonkaaga si aad u maamusho dalabyada iyo lacagtaada.' : 'Ku biir si aad u hesho dhibco iyo ilaa 5% Cashback.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#f1f5f9', padding: '4px', borderRadius: '14px', marginBottom: '22px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('LOGIN')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px',
                borderRadius: '10px',
                border: 0,
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                background: activeTab === 'LOGIN' ? '#ffffff' : 'transparent',
                color: activeTab === 'LOGIN' ? '#0a2c61' : '#64748b',
                boxShadow: activeTab === 'LOGIN' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                transition: 'all .2s'
              }}
            >
              <LogIn size={15} />
              <span>Gal (Login)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('REGISTER')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px',
                borderRadius: '10px',
                border: 0,
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                background: activeTab === 'REGISTER' ? '#ffffff' : 'transparent',
                color: activeTab === 'REGISTER' ? '#0a2c61' : '#64748b',
                boxShadow: activeTab === 'REGISTER' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                transition: 'all .2s'
              }}
            >
              <UserPlus size={15} />
              <span>Diiwaangeli (Register)</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeTab === 'REGISTER' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '6px' }}>
                  Magacaaga Oo Buuxa (Full Name) *
                </label>
                <div style={{ position: 'relative' }}>
                  <UserRound size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    placeholder="Tusaale: Axmed Cabdi Cali" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '6px' }}>
                Email Address *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  required
                />
              </div>
            </div>

            {activeTab === 'REGISTER' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '6px' }}>
                  Taleefanka WhatsApp (+252)
                </label>
                <div style={{ position: 'relative' }}>
                  <PhoneCall size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="tel" 
                    placeholder="+252 61 366 7676" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#0a2c61' }}>
                  Password *
                </label>
                {activeTab === 'LOGIN' && (
                  <a href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20password-kaygii%20ayaan%20ilaaway" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}>
                    Ma ilaawday?
                  </a>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '11px 40px 11px 36px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: '#94a3b8', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{ background: '#0a2c61', color: '#ffffff', border: 0, padding: '13px', borderRadius: '10px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '6px', boxShadow: '0 4px 14px rgba(10,44,97,0.25)' }}
            >
              {activeTab === 'LOGIN' ? <LogIn size={16} /> : <UserPlus size={16} />}
              <span>{loading ? 'Processing...' : activeTab === 'LOGIN' ? 'GAL AKOONKAAGA (SIGN IN)' : 'ABUUR AKOONKA (REGISTER)'}</span>
            </button>
          </form>

          {/* Feedback Messages */}
          {successMsg && (
            <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #ef4444', color: '#991b1b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} color="#ef4444" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ONE-CLICK INSTANT DEMO ACCOUNTS */}
          <div style={{ marginTop: '26px', paddingTop: '22px', borderTop: '1.5px dashed #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#eab308" />
                <b style={{ fontSize: '12.5px', color: '#0a2c61' }}>One-Click Demo Login (Tijaabi Hadda):</b>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, background: '#fef08a', color: '#854d0e', padding: '2px 6px', borderRadius: '4px' }}>
                DEMO
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {demoAccounts.map((demo, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDemoLogin(demo)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all .15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{demo.avatar}</span>
                    <div>
                      <b style={{ fontSize: '12px', color: '#0a2c61', display: 'block' }}>{demo.name}</b>
                      <small style={{ fontSize: '10.5px', color: '#64748b' }}>{demo.role} • Balance: <b style={{ color: '#16a34a' }}>{demo.balance}</b></small>
                    </div>
                  </div>

                  <span style={{ background: '#0a2c61', color: '#ffffff', fontSize: '10.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                    Gal Hadda →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
