'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, ShieldCheck, CheckCircle2, 
  ShoppingCart, Sparkles, HelpCircle, Check, 
  Coins, Users, Tag, Gem, Gift, Flame, Trophy, PhoneCall
} from 'lucide-react';
import { addToCart } from '../lib/cart';

interface GamePackage {
  name: string;
  bonus?: string;
  price: number;
  img: string;
  section: string;
  btnText?: string;
}

interface GameSection {
  id: string;
  title: string;
  subTitle?: string;
  iconType?: 'coins' | 'players' | 'discount' | 'diamonds' | 'gift' | 'flame' | 'trophy';
}

interface GameConfig {
  name: string;
  category: string;
  icon: string;
  idField: string;
  idPlaceholder: string;
  hasZoneId?: boolean;
  zonePlaceholder?: string;
  badge: string;
  sections: GameSection[];
  packages: GamePackage[];
}

const gameDatabase: Record<string, GameConfig> = {
  // 1. PUBG Mobile
  pubg: {
    name: 'PUBG Mobile UC',
    category: 'PUBG Mobile Official (Global)',
    icon: '/images/games/pubg-mobile.png',
    idField: 'PUBG Player ID (UID)',
    idPlaceholder: 'e.g. 5123456789',
    badge: '⚡ INSTANT GLOBAL UC',
    sections: [
      { id: 'uc', title: 'UC', subTitle: 'QAYBTA UC', iconType: 'coins' },
      { id: 'prime', title: 'PRIME & PRIME PLUS', subTitle: 'QAYBTA PRIME & PRIME PLUS', iconType: 'trophy' }
    ],
    packages: [
      { name: '60 UC', price: 1.50, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '120 UC', price: 2.50, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },
      { name: '180 UC', price: 3.55, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },
      { name: '325 UC', price: 5.55, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '385 UC', price: 6.50, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },
      { name: 'Elite Pass LV1-50', price: 6.50, img: '/images/games/pubg-royale-pass.jpg', section: 'uc', btnText: 'BUY' },
      { name: '660 UC', price: 10.60, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '720 UC', price: 11.00, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },
      { name: 'Elite Pass LV1-100', price: 12.50, img: '/images/games/pubg-royale-pass.jpg', section: 'uc', btnText: 'BUY' },
      { name: '985 UC', price: 15.80, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '1045 UC', price: 16.80, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },
      { name: '1320 UC', price: 20.00, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '1800 UC', price: 25.00, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: 'Elite Pass Plus LV1-100', price: 29.50, img: '/images/games/pubg-royale-pass.jpg', section: 'uc', btnText: 'BUY' },
      { name: '2460 UC', price: 35.00, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '3850 UC', price: 49.00, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '5650 UC', price: 75.00, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '8100 UC', price: 98.00, img: '/images/games/pubg-uc-chest.jpg', section: 'uc', btnText: 'BUY' },
      { name: '11990 UC', price: 146.00, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },
      { name: '16300 UC', price: 197.00, img: '/images/games/pubg-guy.jpg', section: 'uc', btnText: 'BUY' },

      // Prime Section
      { name: 'Prime (1 Month)', price: 2.00, img: '/images/games/pubg-royale-pass.jpg', section: 'prime', btnText: 'BUY' },
      { name: 'Prime (3 Months)', price: 5.00, img: '/images/games/pubg-royale-pass.jpg', section: 'prime', btnText: 'BUY' },
      { name: 'Prime (6 Months)', price: 7.50, img: '/images/games/pubg-royale-pass.jpg', section: 'prime', btnText: 'BUY' },
      { name: 'Prime Plus (1 Month)', price: 11.00, img: '/images/games/pubg-royale-pass.jpg', section: 'prime', btnText: 'BUY' },
      { name: 'Prime Plus (3 Months)', price: 29.00, img: '/images/games/pubg-royale-pass.jpg', section: 'prime', btnText: 'BUY' },
      { name: 'Prime Plus (12 Months)', price: 113.00, img: '/images/games/pubg-royale-pass.jpg', section: 'prime', btnText: 'BUY' }
    ]
  },

  // 2. eFootball Android (SCREENSHOT 1)
  efootball_android: {
    name: 'eFootball 2024 (Android)',
    category: 'Konami Official (Android)',
    icon: '/images/games/efootball-android.png',
    idField: 'Konami / eFootball Android User ID',
    idPlaceholder: 'e.g. 123-456-789',
    badge: '🤖 INSTANT ANDROID COINS',
    sections: [
      { id: 'coins', title: 'COINS', subTitle: 'QAYBTA COINS', iconType: 'coins' }
    ],
    packages: [
      { name: '130 Coins', price: 2.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '550 Coins', price: 6.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '750 Coins', price: 8.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '1040 Coins', price: 9.50, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '2130 Coins', price: 19.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '3250 Coins', price: 28.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '5700 Coins', price: 47.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' },
      { name: '12800 Coins', price: 95.00, img: '/images/games/efootball-android.png', section: 'coins', btnText: 'BUY' }
    ]
  },

  // 3. eFootball iOS (SCREENSHOT 2)
  efootball_ios: {
    name: 'eFootball 2024 (Apple iOS)',
    category: 'Konami Official (Apple iOS)',
    icon: '/images/games/efootball-ios.png',
    idField: 'Konami / eFootball iOS User ID',
    idPlaceholder: 'e.g. 987-654-321',
    badge: '🍎 INSTANT IOS COINS',
    sections: [
      { id: 'coins', title: 'COINS', subTitle: 'QAYBTA COINS', iconType: 'coins' },
      { id: 'players', title: 'PLAYERS', subTitle: 'QAYBTA PLAYERS', iconType: 'players' },
      { id: 'discount', title: 'QIIMO DHIMIS COINS', subTitle: 'QAYBTA QIIMO DHIMIS COINS', iconType: 'discount' }
    ],
    packages: [
      // Coins Section
      { name: '130 Coins', price: 2.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '300 Coins', price: 4.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '550 Coins', price: 6.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '750 Coins', price: 8.50, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '1040 Coins', price: 10.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '2130 Coins', price: 21.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '3250 Coins', price: 30.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '5700 Coins', price: 49.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },
      { name: '12800 Coins', price: 99.00, img: '/images/games/efootball-ios.png', section: 'coins', btnText: 'BUY' },

      // Players Section
      { name: 'Starter Set: Luis Suárez', price: 2.00, img: '/images/games/efootball-ios.png', section: 'players', btnText: 'BUY' },
      { name: 'Starter Set: Iker Casillas', price: 4.00, img: '/images/games/efootball-ios.png', section: 'players', btnText: 'BUY' },

      // Discount Coins Section
      { name: '840 Coins', price: 6.50, img: '/images/games/efootball-ios.png', section: 'discount', btnText: 'BUY' }
    ]
  },

  // 4. Free Fire (SCREENSHOT 3)
  freefire: {
    name: 'Free Fire Diamonds',
    category: 'Garena Official',
    icon: '/images/games/free-fire.png',
    idField: 'Free Fire Player ID',
    idPlaceholder: 'e.g. 192837465',
    badge: '💎 INSTANT DIAMONDS',
    sections: [
      { id: 'middle_east', title: 'MIDDLE EAST PACKAGES', subTitle: 'QAYBTA BARIGA DHEXE', iconType: 'diamonds' }
    ],
    packages: [
      { name: '110 Diamonds', price: 1.60, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: 'Weekly Membership', price: 3.00, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: '231 Diamonds', price: 3.00, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: 'Booyah Pass', price: 4.10, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: '583 Diamonds', price: 6.00, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: '1188 Diamonds', price: 11.00, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: 'Monthly Membership', price: 11.70, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' },
      { name: '2420 Diamonds', price: 21.00, img: '/images/games/free-fire.png', section: 'middle_east', btnText: 'BUY NOW' }
    ]
  },

  // 5. Roblox
  roblox: {
    name: 'Roblox Robux Gift Card',
    category: 'Roblox Official',
    icon: '/images/games/roblox.png',
    idField: 'Roblox Username / Account',
    idPlaceholder: 'e.g. GamerTag123',
    badge: '🎁 INSTANT ROBUX PIN',
    sections: [
      { id: 'robux', title: 'ROBUX GIFT CARDS', subTitle: 'QAYBTA ROBUX PINS', iconType: 'gift' }
    ],
    packages: [
      { name: '400 Robux Card', price: 4.99, img: '/images/games/roblox.png', section: 'robux', btnText: 'BUY' },
      { name: '800 Robux Card', price: 9.99, img: '/images/games/roblox.png', section: 'robux', btnText: 'BUY' },
      { name: '1,700 Robux Card', price: 19.99, img: '/images/games/roblox.png', section: 'robux', btnText: 'BUY' },
      { name: '4,500 Robux Card', price: 49.99, img: '/images/games/roblox.png', section: 'robux', btnText: 'BUY' },
      { name: '10,000 Robux Card', price: 99.99, img: '/images/games/roblox.png', section: 'robux', btnText: 'BUY' }
    ]
  },

  // 6. Mobile Legends (MLBB)
  mlbb: {
    name: 'Mobile Legends: Bang Bang',
    category: 'Moonton Official',
    icon: '/images/games/mobile-legends.png',
    idField: 'User ID',
    idPlaceholder: 'e.g. 12345678',
    hasZoneId: true,
    zonePlaceholder: 'Zone ID (e.g. 1234)',
    badge: '💎 INSTANT DIAMONDS',
    sections: [
      { id: 'diamonds', title: 'DIAMONDS & PASSES', subTitle: 'QAYBTA DIAMONDS', iconType: 'diamonds' }
    ],
    packages: [
      { name: '86 Diamonds', price: 1.50, img: '/images/games/mobile-legends.png', section: 'diamonds', btnText: 'BUY' },
      { name: '172 Diamonds', price: 2.99, img: '/images/games/mobile-legends.png', section: 'diamonds', btnText: 'BUY' },
      { name: '257 Diamonds', price: 4.50, img: '/images/games/mobile-legends.png', section: 'diamonds', btnText: 'BUY' },
      { name: '706 Diamonds', price: 11.99, img: '/images/games/mobile-legends.png', section: 'diamonds', btnText: 'BUY' },
      { name: 'Weekly Diamond Pass', price: 1.99, img: '/images/games/mobile-legends.png', section: 'diamonds', btnText: 'BUY' }
    ]
  },

  // 7. Blood Strike
  bloodstrike: {
    name: 'Blood Strike Gold Voucher',
    category: 'NetEase Official',
    icon: '/images/games/blood-strike.png',
    idField: 'Blood Strike User ID',
    idPlaceholder: 'e.g. BS-9876543',
    badge: '🔥 INSTANT GOLD',
    sections: [
      { id: 'gold', title: 'GOLD PACKAGES', subTitle: 'QAYBTA GOLD', iconType: 'flame' }
    ],
    packages: [
      { name: '100 Gold', price: 0.99, img: '/images/games/blood-strike.png', section: 'gold', btnText: 'BUY' },
      { name: '300 Gold', price: 2.99, img: '/images/games/blood-strike.png', section: 'gold', btnText: 'BUY' },
      { name: '500 Gold', price: 4.99, img: '/images/games/blood-strike.png', section: 'gold', btnText: 'BUY' },
      { name: '1,000 Gold', price: 9.99, img: '/images/games/blood-strike.png', section: 'gold', btnText: 'BUY' },
      { name: '2,000 Gold', price: 19.99, img: '/images/games/blood-strike.png', section: 'gold', btnText: 'BUY' }
    ]
  }
};

export default function TopupOrderClient() {
  const searchParams = useSearchParams();
  const gameParam = searchParams.get('game') || 'pubg';
  const serviceParam = searchParams.get('service');

  const gameKey = serviceParam || gameParam;
  const game = gameDatabase[gameKey] || gameDatabase.pubg;

  const [selectedPackage, setSelectedPackage] = useState<GamePackage>(game.packages[0]);
  const [playerIdInput, setPlayerIdInput] = useState('');
  const [zoneIdInput, setZoneIdInput] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  useEffect(() => {
    if (game.packages && game.packages.length > 0) {
      setSelectedPackage(game.packages[0]);
    }
  }, [gameKey]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!playerIdInput.trim()) return;

    setIsOrdering(true);

    const newOrderNumber = `TK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: newOrderNumber,
      game: game.name,
      gameIcon: game.icon,
      package: selectedPackage.name,
      playerId: playerIdInput.trim(),
      amount: selectedPackage.price,
      status: 'completed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      paymentMethod: 'EVC Plus (*770#)',
      reference: `EVC-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    // Save to user local orders
    try {
      const existing = localStorage.getItem('tokiyo_user_orders');
      const parsed = existing ? JSON.parse(existing) : [];
      localStorage.setItem('tokiyo_user_orders', JSON.stringify([newOrder, ...parsed]));
    } catch {
      // ignore
    }

    addToCart({
      productId: `digital-${gameKey}-${selectedPackage.name}`,
      name: `${game.name} - ${selectedPackage.name}`,
      price: Number(selectedPackage.price),
      quantity: 1,
      productType: 'digital',
      playerData: {
        game: game.name,
        playerId: playerIdInput.trim(),
        zoneId: zoneIdInput || undefined,
        package: selectedPackage.name
      }
    });

    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(newOrder);
    }, 600);
  };

  const renderSectionIcon = (type?: string) => {
    switch (type) {
      case 'coins': return <Coins size={17} color="#2563eb" />;
      case 'players': return <Users size={17} color="#2563eb" />;
      case 'discount': return <Tag size={17} color="#2563eb" />;
      case 'diamonds': return <Gem size={17} color="#2563eb" />;
      case 'gift': return <Gift size={17} color="#2563eb" />;
      case 'flame': return <Flame size={17} color="#ea580c" />;
      default: return <Trophy size={17} color="#2563eb" />;
    }
  };

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '70px' }}>
      
      {/* 1. BREADCRUMB & BACK BUTTON */}
      <div className="orderHeaderNavRow">
        <div className="orderBreadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/">Top-Up</Link>
          <span>/</span>
          <b>{game.name}</b>
        </div>

        <Link 
          href="/" 
          className="backToAllGamesBtn"
        >
          <ArrowLeft size={13} />
          <span>Back to Games</span>
        </Link>
      </div>

      {/* 2. ORDER CONTAINER GRID (MAIN CARD + GUARANTEE SIDEBAR) */}
      <div className="topupOrderGridContainer">
        
        {/* LEFT COLUMN: ORDER FORM */}
        <form onSubmit={handleSubmit} className="orderFormMainCard">
          
          {/* Game Banner Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1.5px solid #edf2f7', marginBottom: '22px' }}>
            <img 
              src={game.icon} 
              alt={game.name} 
              style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '1.5px solid #e2e8f0' }} 
            />
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.5px' }}>
                {game.category}
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0a2c61', margin: '2px 0 4px' }}>
                {game.name}
              </h2>
              <span style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 900 }}>
                {game.badge}
              </span>
            </div>
          </div>

          {/* Step 1: Account Details */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0a2c61', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 900 }}>
                1
              </span>
              <b style={{ fontSize: '14.5px', color: '#0a2c61' }}>Enter Account Details</b>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: game.hasZoneId ? '1fr 140px' : '1fr', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: '#0a2c61' }}>
                    {game.idField} *
                  </label>
                  {playerIdInput.trim().length >= 4 && (
                    <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#16a34a', background: '#ecfdf5', padding: '1px 6px', borderRadius: '4px' }}>
                      ✓ ID Format Sax Ah
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    name="playerId"
                    placeholder={game.idPlaceholder}
                    value={playerIdInput}
                    onChange={(e) => setPlayerIdInput(e.target.value)}
                    style={{ flex: 1, padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none', fontWeight: 700 }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!playerIdInput.trim()) {
                        alert('Fadlan marka hore geli Player ID-gaaga.');
                        return;
                      }
                      alert(`✓ Player ID: ${playerIdInput.trim()} waa la xaqiijiyay! Waxaad u gudbi kartaa xulashada xirmada.`);
                    }}
                    style={{ background: '#eef4fc', border: '1.5px solid #cbd5e1', color: '#0a2c61', padding: '0 14px', borderRadius: '10px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    Hubi ID-ga
                  </button>
                </div>
              </div>

              {game.hasZoneId && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '6px' }}>
                    Zone ID *
                  </label>
                  <input 
                    type="text" 
                    name="zoneId"
                    placeholder={game.zonePlaceholder || 'Zone ID'}
                    value={zoneIdInput}
                    onChange={(e) => setZoneIdInput(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none', fontWeight: 700 }}
                    required
                  />
                </div>
              )}
            </div>
            <small style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
              <HelpCircle size={12} />
              To find your ID, open the game profile screen and copy your numeric Character ID.
            </small>
          </div>

          {/* Step 2: Select Recharge Package (WITH SECTIONS & 3-COLUMN GLOWING CARDS) */}
          <div style={{ marginBottom: '26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0a2c61', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 900 }}>
                2
              </span>
              <b style={{ fontSize: '14.5px', color: '#0a2c61' }}>Select Recharge Package</b>
            </div>

            {/* Render Each Section */}
            {game.sections.map((sec) => {
              const secPackages = game.packages.filter(p => p.section === sec.id);
              if (secPackages.length === 0) return null;

              return (
                <div key={sec.id} style={{ marginBottom: '26px' }}>
                  
                  {/* Clean Section Divider Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #eef2f6', marginBottom: '14px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#eff6ff', display: 'grid', placeItems: 'center' }}>
                      {renderSectionIcon(sec.iconType)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#0a2c61', margin: 0, letterSpacing: '.4px' }}>
                        {sec.title}
                      </h3>
                      {sec.subTitle && (
                        <small style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px' }}>
                          {sec.subTitle}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Section Packages Grid (3 columns on mobile) */}
                  <div className="gamePackagesGrid">
                    {secPackages.map((pkg) => {
                      const isSelected = selectedPackage.name === pkg.name;

                      return (
                        <button
                          key={pkg.name}
                          type="button"
                          onClick={() => setSelectedPackage(pkg)}
                          className={`gamePackageCard ${isSelected ? 'selected' : ''}`}
                        >
                          {/* Image Container */}
                          <div className="pkgCardImageWrap">
                            <img 
                              src={pkg.img} 
                              alt={pkg.name} 
                              className="pkgCardImage"
                            />
                          </div>

                          {/* Title */}
                          <span className="pkgCardTitle">
                            {pkg.name}
                          </span>

                          {/* Price & Green BUY / BUY NOW Pill */}
                          <div className="pkgCardBottom">
                            <b className="pkgCardPrice">
                              ${pkg.price.toFixed(2)}
                            </b>
                            <span className="pkgCardBuyBtn">
                              {pkg.btnText || 'BUY'}
                            </span>
                          </div>

                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="pkgSelectedBadge">
                              <Check size={11} strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Row (Selected Package + Submit Button) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '18px', borderTop: '1.5px solid #edf2f7' }}>
            <div>
              <small style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Selected Package:</small>
              <b style={{ fontSize: '15px', color: '#0a2c61' }}>{selectedPackage.name} — ${selectedPackage.price.toFixed(2)}</b>
            </div>

            <button 
              type="submit"
              disabled={isOrdering}
              style={{ background: '#081d3d', color: '#ffffff', border: 0, padding: '12px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(8,29,61,0.25)' }}
            >
              <Zap size={15} color="#facc15" />
              <span>{isOrdering ? 'Processing Order...' : '⚡ RECHARGE NOW (BUY)'}</span>
            </button>
          </div>

          {/* Success Notification & Receipt Box */}
          {orderSuccess && (
            <div style={{ marginTop: '22px', padding: '20px', borderRadius: '16px', background: '#f0fdf4', border: '1.5px solid #86efac', color: '#065f46', boxShadow: '0 6px 20px rgba(16,185,129,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="#10b981" />
                  <h4 style={{ fontSize: '15px', fontWeight: 900, margin: 0, color: '#065f46' }}>Dalabkaagu Si Guul Leh Ayaa Loo Diiwaangeliyay!</h4>
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 900, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '6px' }}>
                  {orderSuccess.id}
                </span>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px', marginBottom: '14px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Ciyaarta:</span>
                  <b style={{ color: '#0a2c61' }}>{orderSuccess.game}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Xirmada:</span>
                  <b style={{ color: '#16a34a' }}>{orderSuccess.package}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Player ID:</span>
                  <b style={{ color: '#0a2c61' }}>{orderSuccess.playerId}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Qiimaha:</span>
                  <b style={{ color: '#d91f2d' }}>${Number(orderSuccess.amount).toFixed(2)}</b>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <a 
                  href={`https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%2C%20waxaan%20bixiyay%20dalabkan%3A%0A-%20Order%20ID%3A%20${orderSuccess.id}%0A-%20Ciyaarta%3A%20${encodeURIComponent(orderSuccess.game)}%0A-%20Xirmada%3A%20${encodeURIComponent(orderSuccess.package)}%0A-%20Player%20ID%3A%20${orderSuccess.playerId}%0A-%20Qiimaha%3A%20$${orderSuccess.amount}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#25d366', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}
                >
                  <PhoneCall size={14} />
                  <span>Xaqiiji WhatsApp (1-Click)</span>
                </a>

                <Link 
                  href="/track-order"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0a2c61', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, textDecoration: 'none' }}
                >
                  <span>La Soco Dalabkaga →</span>
                </Link>
              </div>
            </div>
          )}
        </form>

        {/* RIGHT COLUMN: STORE GUARANTEE & PAYMENT METHODS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Tokiyo Store Guarantee Box */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '22px 20px', boxShadow: '0 6px 24px rgba(10,44,97,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldCheck size={20} color="#2563eb" />
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Tokiyo Store Guarantee</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>Instant 24/7 Automated Delivery</b> directly to in-game account.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>100% Safe &amp; Authorized</b> no password required.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>Official In-Game Rates</b> and exclusive bonus items.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>24/7 WhatsApp &amp; Live Support</b> across Somalia.</span>
              </div>
            </div>
          </div>

          {/* Accepted Payments Box */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '22px 20px', boxShadow: '0 6px 24px rgba(10,44,97,0.03)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0a2c61', margin: '0 0 12px' }}>Accepted Payments</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0a2c61' }}>EVC Plus</span>
              <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0a2c61' }}>Zaad Service</span>
              <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0a2c61' }}>Sahal</span>
              <span style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0a2c61' }}>Credit Card</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}