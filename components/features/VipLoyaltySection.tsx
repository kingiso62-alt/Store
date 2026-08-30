'use client';
import Link from 'next/link';
import { Crown, Sparkles, Zap, ShieldCheck, ArrowRight, Trophy } from 'lucide-react';

const vipTiers = [
  { level: 1, name: 'Bronze Gamer', icon: '🥉', spend: '$0 - $49', perk: 'Standard Instant Delivery + 24/7 Support', badge: 'LEVEL 1', color: '#92400e', bg: '#fef3c7' },
  { level: 2, name: 'Silver Pro', icon: '🥈', spend: '$50 - $149', perk: '1% Cashback Wallet + Daily Spin Access', badge: 'LEVEL 2', color: '#475569', bg: '#f1f5f9' },
  { level: 3, name: 'Gold Elite', icon: '🥇', spend: '$150 - $399', perk: '3% Cashback + Priority Queue Top-Up', badge: 'LEVEL 3', color: '#ca8a04', bg: '#fefce8' },
  { level: 4, name: 'Diamond Master', icon: '💎', spend: '$400 - $999', perk: '5% Cashback + Exclusive Monthly Giveaways', badge: 'LEVEL 4', color: '#0284c7', bg: '#e0f2fe' },
  { level: 5, name: 'Legendary Tokiyo VIP', icon: '👑', spend: '$1,000+', perk: 'Direct WhatsApp Concierge + Free UC Giveaways', badge: 'LEVEL 5', color: '#7c3aed', bg: '#ede9fe' }
];

export default function VipLoyaltySection() {
  return (
    <section style={{ margin: '40px 0 30px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: '6px' }}>
              👑 TOKIYO LOYALTY CLUB
            </span>
          </div>
          <h2 style={{ fontSize: '21px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 0' }}>
            Heerarka VIP-da &amp; Faa'iidooyinka Macaamiisha
          </h2>
        </div>

        <Link
          href="/account"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#2563eb', textDecoration: 'none' }}
        >
          <span>Eeg Heerkaaga Dashboard-ka →</span>
        </Link>
      </div>

      {/* Tiers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
        {vipTiers.map((tier) => (
          <div
            key={tier.level}
            style={{
              background: '#ffffff',
              border: '1.5px solid #edf2f7',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 4px 14px rgba(10,44,97,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>{tier.icon}</span>
                <span style={{ fontSize: '9.5px', fontWeight: 900, background: tier.bg, color: tier.color, padding: '2px 6px', borderRadius: '4px' }}>
                  {tier.badge}
                </span>
              </div>

              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '2px' }}>{tier.name}</b>
              <small style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
                Iibsiga: {tier.spend}
              </small>

              <p style={{ fontSize: '11.5px', color: '#64748b', lineHeight: '1.4', margin: 0 }}>
                {tier.perk}
              </p>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#94a3b8' }}>
              <Sparkles size={11} color={tier.color} />
              <span>Toos Ah (Automated)</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
