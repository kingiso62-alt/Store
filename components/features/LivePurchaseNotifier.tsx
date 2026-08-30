'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Zap, X } from 'lucide-react';

const mockActivities = [
  { name: 'Axmed C.', city: 'Muqdisho', item: '660 UC PUBG Mobile', time: '1 daqiiqo ka hor', icon: '🪙', color: '#eab308' },
  { name: 'Khaalid Y.', city: 'Hargeysa', item: '1040 Coins eFootball Android', time: '2 daqiiqo ka hor', icon: '⚽', color: '#16a34a' },
  { name: 'Liibaan M.', city: 'Garoowe', item: 'Weekly Membership Free Fire', time: '4 daqiiqo ka hor', icon: '💎', color: '#ef4444' },
  { name: 'Farxiyo A.', city: 'Boosaaso', item: '$2.50 Cashback Reward', time: '5 daqiiqo ka hor', icon: '🎉', color: '#8b5cf6' },
  { name: 'Mustafe H.', city: 'Kismaayo', item: '1800 + 300 UC PUBG Mobile', time: '7 daqiiqo ka hor', icon: '🪙', color: '#eab308' },
  { name: 'Guuleed O.', city: 'Jigjiga', item: 'Mythic Druvaen 7-Star X-Suit', time: '9 daqiiqo ka hor', icon: '👑', color: '#a855f7' },
  { name: 'Deeqo S.', city: 'Muqdisho', item: '2420 Diamonds Free Fire', time: '11 daqiiqo ka hor', icon: '💎', color: '#ef4444' }
];

export default function LivePurchaseNotifier() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show after 3s
    const firstTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Rotate every 8s (show 4.5s, hide 3.5s)
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % mockActivities.length);
        setVisible(true);
      }, 1000);
    }, 9000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;
  const current = mockActivities[currentIdx];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '18px',
        zIndex: 980,
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 10px 30px rgba(10, 44, 97, 0.12)',
        maxWidth: '320px',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all .35s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: '#f8fafc',
          border: '1px solid #edf2f7',
          display: 'grid',
          placeItems: 'center',
          fontSize: '18px',
          flexShrink: 0
        }}
      >
        {current.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <b style={{ fontSize: '11.5px', color: '#0a2c61', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {current.name} ({current.city})
          </b>
          <CheckCircle2 size={11} color="#16a34a" />
        </div>
        <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800, margin: '1px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {current.item}
        </p>
        <small style={{ fontSize: '9.5px', color: '#94a3b8' }}>
          {current.time} • Tokiyo Verified
        </small>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        style={{ background: 'transparent', border: 0, color: '#94a3b8', cursor: 'pointer', padding: '2px', display: 'grid', placeItems: 'center' }}
      >
        <X size={13} />
      </button>
    </div>
  );
}
