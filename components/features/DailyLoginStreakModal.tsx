'use client';
import { useState, useEffect } from 'react';
import { Calendar, Gift, X, Check, Sparkles, Trophy, Zap } from 'lucide-react';

const streakDays = [
  { day: 1, reward: '+5 Pts', icon: '🪙', claimed: true },
  { day: 2, reward: '+10 Pts', icon: '🪙', claimed: true },
  { day: 3, reward: '$0.20 Off', icon: '🎁', claimed: false },
  { day: 4, reward: '+20 Pts', icon: '🪙', claimed: false },
  { day: 5, reward: '5% Cashback', icon: '⚡', claimed: false },
  { day: 6, reward: '+50 Pts', icon: '🪙', claimed: false },
  { day: 7, reward: '🎟️ 60 UC Ticket', icon: '👑', claimed: false }
];

export default function DailyLoginStreakModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [claimedDay3, setClaimedDay3] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 19, 41, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'grid',
        placeItems: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '22px',
          padding: '24px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          animation: 'modalSlideUp .2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
              <Calendar size={20} />
            </div>
            <div>
              <b style={{ fontSize: '15px', color: '#0a2c61', display: 'block' }}>7-Day Daily Login Rewards</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Soo gal maalin kasta oo qaado hadiyado bilaash ah!</small>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 0, borderRadius: '50%', width: '28px', height: '28px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Current Streak Badge */}
        <div style={{ background: 'linear-gradient(135deg, #081d3d 0%, #0d2857 100%)', borderRadius: '14px', padding: '14px 18px', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '10.5px', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 800 }}>Streak-gaaga Maanta:</span>
            <b style={{ fontSize: '18px', display: 'block', color: '#facc15' }}>🔥 Maalinta 3-aad (Day 3)</b>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
            +35 Pts Active
          </span>
        </div>

        {/* 7-Day Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {streakDays.map((s, idx) => {
            const isToday = s.day === 3;
            const isClaimed = s.claimed || (isToday && claimedDay3);

            return (
              <div
                key={s.day}
                style={{
                  gridColumn: s.day === 7 ? 'span 2' : 'span 1',
                  background: isToday ? '#eff6ff' : isClaimed ? '#f8fafc' : '#ffffff',
                  border: `1.5px solid ${isToday ? '#2563eb' : isClaimed ? '#86efac' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <small style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, display: 'block' }}>Day {s.day}</small>
                <div style={{ fontSize: '18px', margin: '4px 0' }}>{s.icon}</div>
                <b style={{ fontSize: '11px', color: isToday ? '#1e40af' : '#0a2c61', display: 'block' }}>{s.reward}</b>

                {isClaimed && (
                  <span style={{ position: 'absolute', top: '4px', right: '4px', background: '#22c55e', color: '#ffffff', borderRadius: '50%', width: '14px', height: '14px', fontSize: '9px', display: 'grid', placeItems: 'center' }}>
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Claim Action */}
        {!claimedDay3 ? (
          <button
            type="button"
            onClick={() => setClaimedDay3(true)}
            style={{
              width: '100%',
              background: '#081d3d',
              color: '#ffffff',
              border: 0,
              padding: '12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={16} color="#facc15" />
            <span>Qaado Hadiyadda Maanta ($0.20 Voucher)</span>
          </button>
        ) : (
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#166534', fontWeight: 900, display: 'block' }}>
              ✓ Hambalyo! Waxaad heshay Code: <b>STREAK-DAY3-WIN</b>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
