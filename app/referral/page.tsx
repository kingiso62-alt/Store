'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Users, Gift, Share2, Copy, Check, PhoneCall, ArrowLeft, Trophy, Sparkles, DollarSign } from 'lucide-react';

export default function ReferralPage() {
  const [userName, setUserName] = useState('Axmed-VIP');
  const [copied, setCopied] = useState(false);
  const [invitedCount, setInvitedCount] = useState(3);
  const [earnedAmount, setEarnedAmount] = useState(1.50);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('tokiyo_auth_user');
      if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed.name) {
          setUserName(parsed.name.replace(/\s+/g, '-'));
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const refLink = `https://tokiyostore.com/ref/${userName}`;
  const shareText = `Asc saaxiib! Ku shubo PUBG UC, Free Fire Diamonds & eFootball Coins Tokiyo Store oo hel $0.50 Hadiyad ah marka aad is-diiwaangeliso: ${refLink}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <b style={{ color: '#0a2c61' }}>Refer a Friend &amp; Earn</b>
          </div>

          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', textDecoration: 'none' }}
          >
            <ArrowLeft size={13} />
            <span>Ku Noqo Ciyaaraha</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #081d3d 0%, #0d2857 100%)',
            borderRadius: '24px',
            padding: '36px 28px',
            color: '#ffffff',
            marginBottom: '30px',
            boxShadow: '0 12px 36px rgba(8, 29, 61, 0.25)',
            border: '1.5px solid #1e3a8a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ maxWidth: '560px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
              🎁 REFER &amp; EARN BONUS
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '8px 0 6px', color: '#ffffff' }}>
              Keen Saaxiibkaa Oo Hel $0.50 Qof Kasta!
            </h1>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
              La wadaag linkigaaga gaarka ah saaxiibadaada iyo WhatsApp Groups-ka. Marka ay wax iibsadaan, adigana $0.50 ayaa laguu shubayaa, iyagana $0.50 Cashback ayay helayaan!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: '14px 20px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
              <b style={{ fontSize: '24px', color: '#4ade80', display: 'block' }}>${earnedAmount.toFixed(2)}</b>
              <small style={{ fontSize: '11px', color: '#cbd5e1' }}>Lacagta Aad Heshay</small>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: '14px 20px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
              <b style={{ fontSize: '24px', color: '#facc15', display: 'block' }}>{invitedCount}</b>
              <small style={{ fontSize: '11px', color: '#cbd5e1' }}>Saaxiibood oo Yimid</small>
            </div>
          </div>
        </div>

        {/* Link Box & Share Actions */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '28px 24px', boxShadow: '0 8px 24px rgba(10,44,97,0.04)', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 12px' }}>
            Linkigaaga Gaarka ah ee Referral-ka:
          </h3>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ flex: 1, minWidth: '260px', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', fontWeight: 800, color: '#0a2c61', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{refLink}</span>
              <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#16a34a', padding: '2px 6px', borderRadius: '4px' }}>LIVE</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: '#081d3d',
                color: '#ffffff',
                border: 0,
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Waa La Kobiyeeyay!' : 'Kobi Link-ga'}</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25d366',
                color: '#ffffff',
                border: 0,
                padding: '12px 22px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
              }}
            >
              <PhoneCall size={16} />
              <span>Ku Wadaag WhatsApp</span>
            </a>
          </div>

          {/* 3 Step Instruction */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0a2c61', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>1</span>
              <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block', marginBottom: '3px' }}>U Dir Saaxiibkaa</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>U dir linkigaaga WhatsApp Groups-ka iyo saaxiibadaada ciyaaraha.</small>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0a2c61', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>2</span>
              <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block', marginBottom: '3px' }}>Ha Iibsado Xirmo</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Marka uu saaxiibkaa iibsado PUBG UC, Free Fire ama eFootball.</small>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#16a34a', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>3</span>
              <b style={{ fontSize: '13px', color: '#16a34a', display: 'block', marginBottom: '3px' }}>Qaado $0.50 Toos Ah</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Lacagtaadu waxay toos ugu dhacaysaa Tokiyo Cashback Wallet-kaaga.</small>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
