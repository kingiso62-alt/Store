'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Zap, ArrowRight, Gamepad2, Sparkles } from 'lucide-react';

const searchableItems = [
  { id: 'pubg', title: 'PUBG Mobile Global & KR', category: 'Direct UC & Royale Pass', icon: '/images/games/pubg-mobile.png', price: 'from $0.99', badge: 'POPULAR 7-STAR', href: '/topup/order?game=pubg', tags: ['pubg', 'uc', 'royale pass', 'pass', 'xsuit', 'cars'] },
  { id: 'freefire', title: 'Free Fire Diamonds', category: 'Garena Official Diamonds', icon: '/images/games/free-fire.png', price: 'from $0.99', badge: 'INSTANT ID', href: '/topup/order?game=freefire', tags: ['free fire', 'ff', 'diamonds', 'booyah', 'membership'] },
  { id: 'efootball_android', title: 'eFootball Android Coins', category: 'Konami Official Coins', icon: '/images/games/efootball-android.png', price: 'from $0.99', badge: 'ANDROID FAST', href: '/topup/order?game=efootball_android', tags: ['efootball', 'pes', 'coins', 'android', 'messi'] },
  { id: 'efootball_ios', title: 'eFootball iOS Coins', category: 'Apple iOS Coins Top-Up', icon: '/images/games/efootball-ios.png', price: 'from $0.99', badge: 'IOS SPECIAL', href: '/topup/order?game=efootball_ios', tags: ['efootball', 'pes', 'coins', 'ios', 'apple', 'messi'] },
  { id: 'pubg_xsuits', title: 'PUBG Mythic X-Suits (7-Star)', category: 'Official Mythic Upgrade', icon: '/images/games/pubg-xsuits-official.png', price: 'from $35.00', badge: '7-STAR EXCLUSIVE', href: '/topup/order?game=pubg_xsuits', tags: ['xsuit', 'x-suit', 'druvaen', 'fiend', 'mythic', 'pubg'] },
  { id: 'pubg_cars', title: 'PUBG Official Supercars (Ferrari)', category: 'Ferrari SF90 & Roma Sets', icon: '/images/games/pubg-cars-official.png', price: 'from $45.00', badge: 'OFFICIAL CARS', href: '/topup/order?game=pubg_cars', tags: ['cars', 'ferrari', 'supercar', 'roma', 'sf90', 'pubg'] },
  { id: 'pubg_popularity', title: 'PUBG Popularity Battle Gifts', category: 'Airplanes, Yachts & Sports Cars', icon: '/images/games/pubg-popularity-official.png', price: 'from $2.50', badge: 'AIRPLANE / CAR', href: '/topup/order?game=pubg_popularity', tags: ['popularity', 'battle', 'airplane', 'yacht', 'car', 'pubg'] },
  { id: 'mlbb', title: 'Mobile Legends: Bang Bang', category: 'Diamonds & Twilight Pass', icon: '/images/games/mobile-legends.png', price: 'from $1.49', badge: 'OFFICIAL ID', href: '/topup/order?game=mlbb', tags: ['mlbb', 'mobile legends', 'diamonds', 'twilight'] },
  { id: 'roblox', title: 'Roblox Robux Digital Codes', category: 'Robux & Gift Card Pin', icon: '/images/games/roblox.png', price: 'from $4.99', badge: 'DIGITAL PIN', href: '/topup/order?game=roblox', tags: ['roblox', 'robux', 'code', 'pin'] },
  { id: 'bloodstrike', title: 'Blood Strike Gold Mena', category: 'Direct ID Gold Top-Up', icon: '/images/games/blood-strike.png', price: 'from $0.99', badge: 'MENA DIRECT', href: '/topup/order?game=bloodstrike', tags: ['blood strike', 'gold', 'strike', 'mena'] },
  { id: 'codm', title: 'Call of Duty Mobile (CP)', category: 'COD Points & Battle Pass', icon: '/images/games/cod-mobile.png', price: 'from $1.29', badge: 'OFFICIAL ID', href: '/topup/order?game=codm', tags: ['cod', 'codm', 'call of duty', 'cp', 'points'] }
];

export default function QuickSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? searchableItems
    : searchableItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((t) => t.includes(q))
        );
      });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 19, 41, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'grid',
        placeItems: 'start center',
        padding: '60px 16px 20px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          animation: 'modalSlideUp .2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1.5px solid #edf2f7', background: '#f8fafc' }}>
          <Search size={20} color="#2563eb" />
          <input
            type="text"
            placeholder="Raadi Ciyaar, UC, Diamonds, eFootball, Robux..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 0,
              background: 'transparent',
              fontSize: '15px',
              fontWeight: 700,
              color: '#0a2c61',
              outline: 'none'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ background: '#e2e8f0', border: 0, borderRadius: '50%', width: '22px', height: '22px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={13} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{ background: '#0a2c61', color: '#ffffff', border: 0, borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div style={{ padding: '10px 18px', display: 'flex', flexWrap: 'wrap', gap: '6px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
          <small style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <Sparkles size={12} /> Popular:
          </small>
          {['PUBG UC', 'Free Fire', 'eFootball', 'Ferrari Cars', '7-Star X-Suit', 'Roblox'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              style={{
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#0a2c61',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '10px 14px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <Gamepad2 size={36} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block' }}>Ma jiraan natiijooyin ku habboon "{query}"</b>
              <small style={{ fontSize: '12px' }}>Isku day: PUBG, Diamonds, eFootball, ama X-Suits</small>
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'background .15s ease',
                  marginBottom: '4px'
                }}
                className="searchResultItem"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <b style={{ fontSize: '13.5px', color: '#0a2c61' }}>{item.title}</b>
                      <span style={{ fontSize: '9px', fontWeight: 900, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '1px 5px', borderRadius: '4px' }}>
                        {item.badge}
                      </span>
                    </div>
                    <small style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>
                      {item.category} • <span style={{ color: '#d91f2d', fontWeight: 800 }}>{item.price}</span>
                    </small>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563eb', fontSize: '11.5px', fontWeight: 800 }}>
                  <span>Dalbo</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
