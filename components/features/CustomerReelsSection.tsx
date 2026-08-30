'use client';
import { useState } from 'react';
import { Play, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const reels = [
  { id: 1, name: 'Axmed Cali', city: 'Muqdisho', game: 'PUBG Mobile', pack: '1800 UC', time: '12s Delivery', avatar: '🇸🇴' },
  { id: 2, name: 'Mustafe Jaamac', city: 'Hargeysa', game: 'Free Fire', pack: '2180 Diamonds', time: '8s Delivery', avatar: '🟢' },
  { id: 3, name: 'Khaalid Maxamed', city: 'Garoowe', game: 'eFootball', pack: '2130 Coins', time: '15s Delivery', avatar: '🔵' },
  { id: 4, name: 'Faarax Nuur', city: 'Kismaayo', game: 'PUBG Mobile', pack: '660 UC', time: '10s Delivery', avatar: '🇸🇴' }
];

export default function CustomerReelsSection() {
  const [activeReel, setActiveReel] = useState<number | null>(null);

  return (
    <section style={{ margin: '36px 0 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '10.5px', fontWeight: 900, background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
            ⚡ 15-SECOND DELIVERY PROOF
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 0' }}>
            Muuqaallada Xawaaraha Dhiibista Macaamiisha
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {reels.map((r) => (
          <div
            key={r.id}
            onClick={() => setActiveReel(r.id)}
            style={{
              background: 'linear-gradient(135deg, #081d3d 0%, #0d2857 100%)',
              borderRadius: '16px',
              padding: '16px',
              color: '#ffffff',
              boxShadow: '0 6px 18px rgba(8, 29, 61, 0.15)',
              border: '1.5px solid #1e3a8a',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform .15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>{r.avatar}</span>
              <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '9.5px', fontWeight: 900, padding: '2px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Zap size={10} />
                <span>{r.time}</span>
              </span>
            </div>

            <b style={{ fontSize: '13.5px', display: 'block', marginBottom: '2px', color: '#ffffff' }}>{r.name}</b>
            <small style={{ fontSize: '11px', color: '#93c5fd', display: 'block', marginBottom: '8px' }}>{r.city}, Soomaaliya</small>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cbd5e1' }}>{r.game}</span>
              <b style={{ color: '#facc15' }}>{r.pack}</b>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
