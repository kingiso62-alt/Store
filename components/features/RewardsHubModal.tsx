'use client';
import { useState } from 'react';
import { Gift, Calendar, Award, Brain, X, Sparkles, Trophy, Flame } from 'lucide-react';
import Link from 'next/link';

export default function RewardsHubModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const rewards = [
    {
      title: '🎁 Lucky Mystery Box',
      desc: 'Fur sanduuqa dahabiga ah oo hel ilaa 60 UC ama $1.00 Voucher.',
      href: '/mystery-box',
      badge: 'POPULAR',
      color: '#f59e0b'
    },
    {
      title: '🔥 7-Day Login Streak',
      desc: 'Soo gal maalin kasta oo qaado dhibco iyo tigidhka 60 UC giveaway.',
      href: '/account',
      badge: 'ACTIVE',
      color: '#22c55e'
    },
    {
      title: '🎖️ Gamer Badges',
      desc: 'Fur biladaha gaming-ka oo kordhi heerkaaga VIP-da.',
      href: '/account',
      badge: 'LEVEL 3',
      color: '#3b82f6'
    },
    {
      title: '🧠 Daily Gaming Quiz',
      desc: 'Jawaab 3 su\'aalood oo ciyaaraha ah oo qaado code qiimo dhimis ah.',
      href: '/account',
      badge: 'BONUS',
      color: '#8b5cf6'
    },
    {
      title: '👥 Refer a Friend & Earn $1',
      desc: 'U dir linkigaaga saaxiibadaada oo hel $0.50 qof kasta.',
      href: '/referral',
      badge: '$0.50/REF',
      color: '#ec4899'
    }
  ];

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
          borderRadius: '24px',
          padding: '24px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          animation: 'modalSlideUp .2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef08a', color: '#854d0e', display: 'grid', placeItems: 'center' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <b style={{ fontSize: '16px', color: '#0a2c61', display: 'block' }}>Tokiyo Rewards Hub 🎁</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Hadiyadaha, Vouchers-ka &amp; Abaalmarinnada</small>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 0, borderRadius: '50%', width: '30px', height: '30px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
          {rewards.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '14px',
                background: '#f8fafc',
                border: '1.5px solid #edf2f7',
                textDecoration: 'none',
                transition: 'all .15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <b style={{ fontSize: '13px', color: '#0a2c61' }}>{r.title}</b>
                  <span style={{ fontSize: '9px', fontWeight: 900, background: '#eff6ff', color: r.color, border: `1px solid ${r.color}`, padding: '1px 5px', borderRadius: '4px' }}>
                    {r.badge}
                  </span>
                </div>
                <small style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>{r.desc}</small>
              </div>

              <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 900 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
