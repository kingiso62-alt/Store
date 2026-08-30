'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Clock, Zap, ArrowRight, Sparkles } from 'lucide-react';

const flashDeals = [
  {
    id: 1,
    title: 'PUBG Mobile 660 UC + 60 Bonus',
    game: 'PUBG Global & KR',
    icon: '/images/games/pubg-uc-chest.jpg',
    originalPrice: '$9.99',
    dealPrice: '$7.99',
    badge: '20% OFF',
    href: '/topup/order?game=pubg',
    claimedPercent: 82
  },
  {
    id: 2,
    title: 'Free Fire 1000 + 100 Diamonds',
    game: 'Garena Free Fire',
    icon: '/images/games/free-fire.png',
    originalPrice: '$10.50',
    dealPrice: '$8.49',
    badge: '18% OFF',
    href: '/topup/order?game=freefire',
    claimedPercent: 74
  },
  {
    id: 3,
    title: 'eFootball 1040 Coins + Messi Set',
    game: 'Konami eFootball Android',
    icon: '/images/games/efootball-android.png',
    originalPrice: '$11.00',
    dealPrice: '$8.99',
    badge: '15% OFF',
    href: '/topup/order?game=efootball_android',
    claimedPercent: 91
  }
];

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <section style={{ margin: '36px 0 28px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #091e42 0%, #0d2857 100%)',
          borderRadius: '20px',
          padding: '24px 22px',
          color: '#ffffff',
          boxShadow: '0 12px 36px rgba(9, 30, 66, 0.25)',
          border: '1.5px solid #1e3a8a',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow background sphere */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.25) 0%, rgba(234, 179, 8, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top Header Row with Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ef4444', display: 'grid', placeItems: 'center', color: '#ffffff', boxShadow: '0 0 15px rgba(239,68,68,0.5)' }}>
              <Flame size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, background: '#ef4444', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', letterSpacing: '.5px' }}>
                  LIMITED TIME
                </span>
                <b style={{ fontSize: '17px', color: '#ffffff' }}>24-HOUR FLASH DEALS</b>
              </div>
              <small style={{ fontSize: '11.5px', color: '#93c5fd' }}>Xirmooyinka ugu dhimista badan maanta</small>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.35)', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Clock size={15} color="#facc15" />
            <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700 }}>Dhacaya:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace', fontSize: '14px', fontWeight: 900, color: '#facc15' }}>
              <span style={{ background: '#0a2c61', padding: '2px 6px', borderRadius: '4px' }}>{format(timeLeft.hours)}</span>:
              <span style={{ background: '#0a2c61', padding: '2px 6px', borderRadius: '4px' }}>{format(timeLeft.minutes)}</span>:
              <span style={{ background: '#0a2c61', padding: '2px 6px', borderRadius: '4px' }}>{format(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* 3 Flash Deal Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {flashDeals.map((deal) => (
            <Link
              key={deal.id}
              href={deal.href}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: '#0a2c61',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                transition: 'transform .2s ease'
              }}
              className="flashDealCard"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={deal.icon}
                    alt={deal.title}
                    style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '1.5px solid #e2e8f0' }}
                  />
                  <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: '#ffffff', fontSize: '9px', fontWeight: 900, padding: '1px 5px', borderRadius: '6px' }}>
                    {deal.badge}
                  </span>
                </div>

                <div>
                  <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block', marginBottom: '2px' }}>
                    {deal.title}
                  </b>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: '#d91f2d' }}>{deal.dealPrice}</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through' }}>{deal.originalPrice}</span>
                  </div>
                  {/* Claimed progress */}
                  <div style={{ width: '100px', height: '5px', background: '#e2e8f0', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${deal.claimedPercent}%`, height: '100%', background: '#16a34a' }} />
                  </div>
                </div>
              </div>

              <div style={{ background: '#081d3d', color: '#ffffff', borderRadius: '10px', padding: '8px 12px', fontSize: '11.5px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>BUY</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
