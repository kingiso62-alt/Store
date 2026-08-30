'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Gift, Sparkles, Copy, Check, ArrowLeft, Trophy, Zap, Flame, RefreshCw } from 'lucide-react';

interface CrateReward {
  title: string;
  code: string;
  type: string;
  icon: string;
  color: string;
}

const rewardsPool: CrateReward[] = [
  { title: '🎉 60 PUBG UC BONUS', code: 'LOOT-UC-60', type: 'Instant UC Voucher', icon: '🪙', color: '#f59e0b' },
  { title: '💎 50 FREE FIRE DIAMONDS', code: 'LOOT-FF-50', type: 'Garena Top-Up', icon: '💎', color: '#ef4444' },
  { title: '💵 $1.00 OFF VOUCHER', code: 'LOOT-CASH-100', type: 'Store Discount', icon: '💵', color: '#10b981' },
  { title: '⚡ 10% CASHBACK BOOSTER', code: 'LOOT-BOOST-10', type: 'VIP Cashback', icon: '⚡', color: '#8b5cf6' },
  { title: '👑 MYTHIC TOKIYO PASS', code: 'LOOT-MYTHIC-VIP', type: 'Elite Member', icon: '👑', color: '#ec4899' }
];

export default function MysteryBoxPage() {
  const [opening, setOpening] = useState(false);
  const [reward, setReward] = useState<CrateReward | null>(null);
  const [copied, setCopied] = useState(false);
  const [cratesLeft, setCratesLeft] = useState(3);

  const handleOpenCrate = () => {
    if (opening || cratesLeft <= 0) return;
    setOpening(true);
    setReward(null);

    setTimeout(() => {
      const randomReward = rewardsPool[Math.floor(Math.random() * rewardsPool.length)];
      setReward(randomReward);
      setCratesLeft(prev => prev - 1);
      setOpening(false);
    }, 1800);
  };

  const handleCopy = () => {
    if (!reward) return;
    navigator.clipboard.writeText(reward.code);
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
            <b style={{ color: '#0a2c61' }}>Lucky Mystery Box</b>
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
            background: 'linear-gradient(135deg, #081d3d 0%, #1e1b4b 50%, #0d2857 100%)',
            borderRadius: '24px',
            padding: '32px 26px',
            color: '#ffffff',
            marginBottom: '28px',
            boxShadow: '0 12px 36px rgba(8, 29, 61, 0.25)',
            border: '1.5px solid #312e81',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
              🎁 MYSTERY LOOT CRATE
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '6px 0 4px', color: '#ffffff' }}>
              Sanduuqa Dahabiga ah ee Tokiyo (Lucky Mystery Box)
            </h1>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, maxWidth: '580px', lineHeight: '1.45' }}>
              Fur sanduuqa maalin kasta oo hel hadiyado lama filaan ah oo ay ku jiraan PUBG UC, Free Fire Diamonds iyo Vouchers qiimo-dhimis ah!
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '14px 22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#93c5fd', display: 'block' }}>Sanduuqyada Kaa Harsan:</span>
            <b style={{ fontSize: '24px', color: '#facc15' }}>{cratesLeft} Sanduuq</b>
          </div>
        </div>

        {/* Mystery Box Stage */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '24px', padding: '40px 20px', textAlign: 'center', boxShadow: '0 8px 24px rgba(10,44,97,0.04)', maxWidth: '560px', margin: '0 auto 32px' }}>
          {/* Crate Animation Box */}
          <div style={{ position: 'relative', margin: '0 auto 24px', width: '160px', height: '160px' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                boxShadow: opening ? '0 0 50px #f59e0b' : '0 12px 30px rgba(245,158,11,0.3)',
                display: 'grid',
                placeItems: 'center',
                fontSize: '64px',
                transform: opening ? 'scale(1.08) rotate(6deg)' : 'scale(1)',
                transition: 'all .2s ease-in-out',
                animation: opening ? 'shake .3s infinite' : 'none',
                cursor: 'pointer'
              }}
              onClick={handleOpenCrate}
            >
              {opening ? '✨' : '🎁'}
            </div>
          </div>

          {/* Opening state or reward */}
          {opening ? (
            <div>
              <b style={{ fontSize: '18px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>
                Sanduuqa Waa La Furayaa...
              </b>
              <small style={{ fontSize: '12px', color: '#64748b' }}>Fadlan sug hadiyaddaada dahabiga ah!</small>
            </div>
          ) : reward ? (
            <div style={{ background: '#f8fafc', border: `2px solid ${reward.color}`, borderRadius: '18px', padding: '20px', animation: 'modalSlideUp .3s ease-out' }}>
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '6px' }}>{reward.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: 900, color: reward.color, textTransform: 'uppercase', letterSpacing: '.5px' }}>{reward.type}</span>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 12px' }}>{reward.title}</h2>

              <div style={{ background: '#ffffff', border: '1.5px dashed #cbd5e1', borderRadius: '10px', padding: '10px 14px', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <code style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', letterSpacing: '1.5px' }}>{reward.code}</code>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{ background: '#081d3d', color: '#ffffff', border: 0, padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Link
                  href="/redeem"
                  style={{ background: '#081d3d', color: '#ffffff', padding: '10px 18px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none' }}
                >
                  <span>Fur Bogga Code Checker →</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <b style={{ fontSize: '18px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>
                Diyaar Ma U Tahay Inaed Furto?
              </b>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 18px' }}>
                Guji badhanka hoose si aad u furto Sanduuqaaga Maanta.
              </p>

              <button
                type="button"
                onClick={handleOpenCrate}
                disabled={cratesLeft <= 0}
                style={{
                  background: cratesLeft <= 0 ? '#cbd5e1' : 'linear-gradient(135deg, #081d3d 0%, #0d2857 100%)',
                  color: '#ffffff',
                  border: 0,
                  padding: '14px 28px',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: cratesLeft <= 0 ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(8, 29, 61, 0.2)'
                }}
              >
                <Sparkles size={16} color="#facc15" />
                <span>{cratesLeft <= 0 ? 'Maanta Sanduuq Kuma Harsana' : 'FUR SANDUUQA DAHABIGA AH 🎁'}</span>
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
