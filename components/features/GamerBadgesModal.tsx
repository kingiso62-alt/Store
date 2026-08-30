'use client';
import { useState } from 'react';
import { Award, X, Trophy, ShieldCheck, Zap, Flame, Star, Sparkles } from 'lucide-react';

const badges = [
  { id: 'pioneer', name: 'Pioneer Gamer', desc: 'Waxaad samaysay dalabkaagii ugu horreeyay ee Tokiyo Store.', icon: '🥉', unlocked: true, level: 'Bronze' },
  { id: 'pubg_vet', name: 'PUBG Veteran', desc: 'Waxaad ku shubatay in ka badan 5 jeer PUBG UC.', icon: '🪙', unlocked: true, level: 'Silver' },
  { id: 'vip_roller', name: 'VIP High Roller', desc: 'Waxaad dukaanka ku qarash gareysay in ka badan $100.', icon: '👑', unlocked: true, level: 'Gold' },
  { id: 'flash_hunter', name: 'Flash Sale Hunter', desc: 'Waxaad ka faa\'iideysatay qiimo-dhimista 24-Hour Flash Deals.', icon: '⚡', unlocked: true, level: 'Special' },
  { id: 'quiz_master', name: 'Quiz Master', desc: 'Waxaad 100% saxday su\'aalaha Gaming Quiz-ka.', icon: '🎯', unlocked: true, level: 'Special' },
  { id: 'lucky_spinner', name: 'Lucky Spinner', desc: 'Waxaad rogtay shaagga Lucky Wheel 3 maalmood.', icon: '🎡', unlocked: false, level: 'Locked' }
];

export default function GamerBadgesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const unlockedCount = badges.filter(b => b.unlocked).length;

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
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef08a', color: '#854d0e', display: 'grid', placeItems: 'center' }}>
              <Trophy size={20} />
            </div>
            <div>
              <b style={{ fontSize: '15px', color: '#0a2c61', display: 'block' }}>Gamer Badges &amp; Guulahaaga</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Biladaha aad ka heshay Tokiyo Store</small>
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

        {/* Progress Overview */}
        <div style={{ background: '#f8fafc', border: '1px solid #edf2f7', borderRadius: '14px', padding: '12px 14px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Biladaha Aad Furtay:</span>
            <b style={{ fontSize: '16px', color: '#0a2c61' }}>{unlockedCount} ee {badges.length} Biladood</b>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 900, background: '#ecfdf5', color: '#16a34a', padding: '4px 10px', borderRadius: '6px' }}>
            ✓ Level 3 Gamer
          </span>
        </div>

        {/* Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
          {badges.map((b) => (
            <div
              key={b.id}
              style={{
                background: b.unlocked ? '#ffffff' : '#f8fafc',
                border: `1.5px solid ${b.unlocked ? '#e2e8f0' : '#f1f5f9'}`,
                borderRadius: '14px',
                padding: '12px',
                opacity: b.unlocked ? 1 : 0.6,
                boxShadow: b.unlocked ? '0 2px 8px rgba(0,0,0,0.03)' : 'none'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{b.icon}</div>
              <b style={{ fontSize: '12.5px', color: '#0a2c61', display: 'block', marginBottom: '2px' }}>{b.name}</b>
              <p style={{ fontSize: '10.5px', color: '#64748b', margin: 0, lineHeight: '1.35' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
