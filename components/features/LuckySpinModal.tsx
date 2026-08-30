'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Gift, Trophy, ArrowRight, Check } from 'lucide-react';

const prizes = [
  { id: 1, label: '$0.50 Qiimo Dhimis', code: 'SPIN-50OFF', color: '#3b82f6', bg: '#eff6ff' },
  { id: 2, label: '60 UC PUBG Free', code: 'SPIN-60UC', color: '#eab308', bg: '#fefce8' },
  { id: 3, label: '5% VIP Cashback Boost', code: 'SPIN-VIP5', color: '#10b981', bg: '#ecfdf5' },
  { id: 4, label: '$1.00 Top-Up Voucher', code: 'SPIN-1USD', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 5, label: '50 Diamonds Free Fire', code: 'SPIN-FF50', color: '#ef4444', bg: '#fef2f2' },
  { id: 6, label: '3% Cashback Bonus', code: 'SPIN-3CASH', color: '#06b6d4', bg: '#ecfeff' }
];

export default function LuckySpinModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof prizes[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [alreadySpun, setAlreadySpun] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    try {
      const lastSpin = localStorage.getItem('tokiyo_last_spin_time');
      if (lastSpin) {
        const lastDate = new Date(lastSpin).toDateString();
        const today = new Date().toDateString();
        if (lastDate === today) {
          setAlreadySpun(true);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const handleSpin = () => {
    if (isSpinning || alreadySpun) return;

    setIsSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Pick random prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selected = prizes[randomIndex];

    // Compute rotation (minimum 5 full spins = 1800 deg + segment angle)
    const segmentAngle = 360 / prizes.length;
    const targetDeg = 1800 + (prizes.length - 1 - randomIndex) * segmentAngle + segmentAngle / 2;

    setRotation(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selected);
      setAlreadySpun(true);
      try {
        localStorage.setItem('tokiyo_last_spin_time', new Date().toISOString());
      } catch {
        // ignore
      }
    }, 4000);
  };

  const handleCopy = () => {
    if (!wonPrize) return;
    navigator.clipboard.writeText(wonPrize.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Trigger Pill on Screen */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="luckySpinFloatingBtn"
        style={{
          position: 'fixed',
          bottom: '85px',
          left: '18px',
          zIndex: 990,
          background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
          color: '#ffffff',
          border: '2px solid #fef08a',
          borderRadius: '30px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(202, 138, 4, 0.4)',
          transition: 'transform .2s'
        }}
      >
        <Gift size={16} className="spinGlowIcon" />
        <span>🎁 Daily Lucky Spin</span>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 19, 41, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'grid',
          placeItems: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px 22px',
            maxWidth: '440px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            animation: 'modalSlideUp .25s ease-out'
          }}>
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f1f5f9',
                border: 0,
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Title */}
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                ⭐ TOKIYO STORE REWARDS
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0a2c61', margin: '6px 0 2px' }}>
                Daily Lucky Spin Wheel
              </h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Wareeji giraanta maalin kasta si aad ugu guuleysato UC, Diamonds &amp; Discounts!
              </p>
            </div>

            {/* Wheel Canvas / CSS Graphics */}
            <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px' }}>
              {/* Pointer */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '20px solid #d91f2d',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }} />

              {/* The Wheel */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '6px solid #081d3d',
                boxShadow: '0 6px 25px rgba(8, 29, 61, 0.25)',
                background: 'conic-gradient(#3b82f6 0deg 60deg, #eab308 60deg 120deg, #10b981 120deg 180deg, #8b5cf6 180deg 240deg, #ef4444 240deg 300deg, #06b6d4 300deg 360deg)',
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                position: 'relative'
              }}>
                {/* Center Hub */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#081d3d',
                  border: '3px solid #ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#facc15',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  <Sparkles size={18} />
                </div>
              </div>
            </div>

            {/* Spin Button or Result */}
            {wonPrize ? (
              <div style={{ background: wonPrize.bg, border: `1.5px solid ${wonPrize.color}`, borderRadius: '16px', padding: '16px', marginBottom: '10px', animation: 'scaleUp .2s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: wonPrize.color, fontWeight: 900, fontSize: '13px', marginBottom: '4px' }}>
                  <Trophy size={16} />
                  <span>HAMBALYO! WAA LAGUU DIYAARIYAY</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0a2c61', margin: '2px 0 10px' }}>
                  {wonPrize.label}
                </h3>
                
                {/* Promo Code Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#ffffff', border: '1.5px dashed #cbd5e1', padding: '8px 12px', borderRadius: '10px', maxWidth: '240px', margin: '0 auto 12px' }}>
                  <code style={{ fontSize: '13px', fontWeight: 900, color: '#0a2c61', letterSpacing: '.5px' }}>{wonPrize.code}</code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{ background: '#0a2c61', color: '#ffffff', border: 0, padding: '4px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                  >
                    {copied ? <Check size={12} /> : null}
                    <span>{copied ? 'Kobiyeeyay' : 'Kobi'}</span>
                  </button>
                </div>

                <Link
                  href="/redeem"
                  onClick={() => setIsOpen(false)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#081d3d', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, textDecoration: 'none' }}
                >
                  <span>Fur Code Checker (Redeem Now)</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  disabled={isSpinning || alreadySpun}
                  onClick={handleSpin}
                  style={{
                    background: alreadySpun ? '#94a3b8' : 'linear-gradient(135deg, #081d3d 0%, #0a2c61 100%)',
                    color: '#ffffff',
                    border: 0,
                    padding: '13px 32px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 900,
                    cursor: alreadySpun ? 'not-allowed' : 'pointer',
                    boxShadow: alreadySpun ? 'none' : '0 6px 20px rgba(8, 29, 61, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles size={16} color="#facc15" />
                  <span>{isSpinning ? 'Giraanta ayaa wareegaysa...' : alreadySpun ? 'Maanta waad wareejisay (Come back tomorrow)' : 'WAREEJI HADDA (SPIN)'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
