'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlashSaleBanner from '../components/features/FlashSaleBanner';
import CustomerReviewsSection from '../components/features/CustomerReviewsSection';
import CustomerReelsSection from '../components/features/CustomerReelsSection';
import VipLoyaltySection from '../components/features/VipLoyaltySection';
import SecurityNoticeSection from '../components/features/SecurityNoticeSection';
import PriceGuaranteeBadge from '../components/features/PriceGuaranteeBadge';
import { 
  Zap, ShieldCheck, Sparkles, ArrowRight, 
  PhoneCall, CreditCard, Trophy, Gamepad2, Flame
} from 'lucide-react';

// 12 Games strictly ordered as requested by user
const games = [
  { 
    name: 'Pubg Mobile', 
    category: 'pubg',
    img: '/images/games/pubg-mobile.png', 
    badge: 'INSTANT', 
    currency: 'Unknown Cash (UC)', 
    rating: '4.9', 
    tag: 'Best Seller',
    href: '/topup/order?game=pubg',
    accentColor: '#f39c12'
  },
  { 
    name: 'Free Fire', 
    category: 'freefire',
    img: '/images/games/free-fire.png', 
    badge: 'INSTANT', 
    currency: 'Garena Diamonds', 
    rating: '4.8', 
    tag: 'Popular',
    href: '/topup/order?game=freefire',
    accentColor: '#e74c3c'
  },
  { 
    name: 'Pubg Korean', 
    category: 'pubg',
    img: '/images/games/pubg-korean.png', 
    badge: 'MANUAL', 
    currency: 'Donkatsu Medals & UC', 
    rating: '4.9', 
    tag: 'Korean Ver.',
    href: '/topup/order?game=pubg_kr',
    accentColor: '#d91f2d'
  },
  { 
    name: 'E-Football Coins iOS', 
    category: 'efootball',
    img: '/images/games/efootball-ios.png', 
    badge: 'MANUAL', 
    currency: 'eFootball iOS Coins', 
    rating: '4.9', 
    tag: 'Apple iOS',
    href: '/topup/order?game=efootball_ios',
    accentColor: '#0a2c61'
  },
  { 
    name: 'E-Football Coins Android', 
    category: 'efootball',
    img: '/images/games/efootball-android.png', 
    badge: 'MANUAL', 
    currency: 'eFootball Android Coins', 
    rating: '4.9', 
    tag: 'Android',
    href: '/topup/order?game=efootball_android',
    accentColor: '#0a2c61'
  },
  { 
    name: 'Blood Strike Mena', 
    category: 'other',
    img: '/images/games/blood-strike.png', 
    badge: 'INSTANT', 
    currency: 'Gold & Strike Pass', 
    rating: '4.8', 
    tag: 'Fast',
    href: '/topup/order?game=bloodstrike',
    accentColor: '#e67e22'
  },
  { 
    name: 'Roblox Robux Digital Pin', 
    category: 'other',
    img: '/images/games/roblox.png', 
    badge: 'INSTANT', 
    currency: 'Robux Digital Card', 
    rating: '4.9', 
    tag: 'Digital Pin',
    href: '/topup/order?game=roblox',
    accentColor: '#e74c3c'
  },
  { 
    name: 'Call of Duty Mobile (CP)', 
    category: 'other',
    img: '/images/games/cod-mobile.png', 
    badge: 'INSTANT', 
    currency: 'CP Points & Battle Pass', 
    rating: '4.8', 
    tag: 'Global',
    href: '/topup/order?game=codm',
    accentColor: '#2c3e50'
  },
  { 
    name: 'Mobile Legends: Bang Bang', 
    category: 'other',
    img: '/images/games/mobile-legends.png', 
    badge: 'INSTANT', 
    currency: 'Diamonds & Twilight Pass', 
    rating: '4.9', 
    tag: 'Global',
    href: '/topup/order?game=mlbb',
    accentColor: '#3498db'
  },
  { 
    name: 'X-Suits (Official)', 
    category: 'mythic',
    img: '/images/games/pubg-xsuits-official.png', 
    badge: '7-STAR', 
    currency: '7-Star Mythic Upgrade', 
    rating: '5.0', 
    tag: 'Official',
    href: '/topup/order?service=xsuits',
    accentColor: '#f1c40f'
  },
  { 
    name: 'Cars (Official)', 
    category: 'mythic',
    img: '/images/games/pubg-cars-official.png', 
    badge: 'FERRARI', 
    currency: 'Supercar Master Key', 
    rating: '5.0', 
    tag: 'Official',
    href: '/topup/order?service=cars',
    accentColor: '#dc1424'
  },
  { 
    name: 'Popularity Battle', 
    category: 'mythic',
    img: '/images/games/pubg-popularity-official.png', 
    badge: 'MANUAL', 
    currency: 'Airplane / Jet / Yacht', 
    rating: '4.9', 
    tag: 'Manual',
    href: '/topup/order?service=popularity',
    accentColor: '#00b4d8'
  }
];

const categoryTabs = [
  { id: 'all', label: '🌟 Dhammaan (All Games)' },
  { id: 'pubg', label: '🪙 PUBG Mobile' },
  { id: 'freefire', label: '💎 Free Fire' },
  { id: 'efootball', label: '⚽ eFootball' },
  { id: 'mythic', label: '👑 Mythic & Supercars' },
  { id: 'other', label: '🎮 Ciyaaraha Kale' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredGames = activeTab === 'all'
    ? games
    : games.filter((g) => g.category === activeTab);

  return (
    <>
      <Header />
      
      {/* 1. ANIMATED ESPORTS TOP-UP HERO BANNER — CONTAINED GAMING CARD */}
      <div className="wrap">
        <section className="topupEsportsHero">
          <div className="heroInnerContainer">
            <div className="heroMeshGlow"></div>
            <div className="topupHeroContent">
              <div className="heroTag">
                <Zap size={14} className="zapGlow" />
                <span>24/7 INSTANT TOP-UP • OFFICIAL SERVERS</span>
              </div>
              <h1>
                TOP-UP YOUR<br />
                <span className="textGradient">FAVORITE GAMES</span>
              </h1>
              <p>
                Get game credits, diamonds, UC, and passes delivered directly to your Player ID in seconds with guaranteed safety.
              </p>
              
              <div className="heroBadgesRow">
                <div className="heroBadgeItem">
                  <ShieldCheck size={16} />
                  <span>100% Authorized</span>
                </div>
                <div className="heroBadgeItem">
                  <Zap size={16} />
                  <span>Instant Delivery</span>
                </div>
                <div className="heroBadgeItem">
                  <Sparkles size={16} />
                  <span>Zero Hidden Fees</span>
                </div>
              </div>
            </div>

            {/* Dynamic Floating Animated Pure Digital Gaming Showcase */}
            <div className="topupHeroShowcase">
              <div className="floatingGameStack">
                {/* Digital Gaming Passes & Currencies */}
                <div className="floatCard card1" title="PUBG Mobile UC">
                  <img src="/images/games/pubg-uc-chest.jpg" alt="PUBG UC Chest" />
                  <span className="cardLabel">PUBG UC</span>
                </div>
                <div className="floatCard card2" title="Free Fire Diamonds">
                  <img src="/images/games/free-fire.png" alt="Free Fire Diamonds" />
                  <span className="cardLabel">Diamonds</span>
                </div>
                <div className="floatCard card3" title="eFootball Android">
                  <img src="/images/games/efootball-android.png" alt="eFootball Coins" />
                  <span className="cardLabel">eFootball</span>
                </div>
                <div className="floatCard card4" title="eFootball iOS">
                  <img src="/images/games/efootball-ios.png" alt="eFootball iOS" />
                  <span className="cardLabel">eFootball iOS</span>
                </div>
                <div className="floatCard card5" title="PUBG Royale Pass">
                  <img src="/images/games/pubg-royale-pass.jpg" alt="Royale Pass" />
                  <span className="cardLabel">Royale Pass</span>
                </div>
                <div className="floatCard card6" title="Official Supercars">
                  <img src="/images/games/pubg-cars-official.png" alt="Ferrari Supercars" />
                  <span className="cardLabel">Supercars</span>
                </div>
                <div className="floatCard card7" title="Mythic 7-Star X-Suits">
                  <img src="/images/games/pubg-xsuits-official.png" alt="X-Suits" />
                  <span className="cardLabel">X-Suits</span>
                </div>
                <div className="floatCard card8" title="Popularity Battle">
                  <img src="/images/games/pubg-popularity-official.png" alt="Popularity" />
                  <span className="cardLabel">Popularity</span>
                </div>
                <div className="floatCard card9" title="Roblox Robux">
                  <img src="/images/games/roblox.png" alt="Roblox" />
                  <span className="cardLabel">Roblox</span>
                </div>
                <div className="floatCard card10" title="Blood Strike Mena">
                  <img src="/images/games/blood-strike.png" alt="Blood Strike" />
                  <span className="cardLabel">Blood Strike</span>
                </div>
                <div className="floatCard card11" title="Mobile Legends Diamonds">
                  <img src="/images/games/mobile-legends.png" alt="Mobile Legends" />
                  <span className="cardLabel">MLBB</span>
                </div>
                <div className="floatCard card12" title="COD Mobile Points">
                  <img src="/images/games/cod-mobile.png" alt="COD Points" />
                  <span className="cardLabel">COD Points</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. MAIN BODY CONTENT */}
      <main className="wrap homePage">

        {/* 2. POPULAR GAMES SECTION HEADER WITH CATEGORY FILTER PILLS */}
        <div className="gameSectionHeaderRow" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
            <div className="gameSectionTitleGroup">
              <h2 className="gameSectionMainTitle">POPULAR GAMES</h2>
              <span className="gameSectionBadge">TOP-UP SELECTION</span>
            </div>
            <PriceGuaranteeBadge />
          </div>

          {/* Interactive Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
            {categoryTabs.map((tab) => {
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: isCurrent ? '#081d3d' : '#f1f5f9',
                    color: isCurrent ? '#ffffff' : '#0a2c61',
                    border: `1.5px solid ${isCurrent ? '#081d3d' : '#e2e8f0'}`,
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all .15s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ORDERED 12 ESPORTS GAME CARDS GRID */}
        <section className="esportsGameGrid biriqGridStyle">
          {filteredGames.map((g) => (
            <Link href={g.href} key={g.name} className="biriqGameCard">
              <div className="biriqMediaWrap">
                <img src={g.img} alt={g.name} className="biriqGameImg" />
              </div>
              <div className="biriqCardInfo">
                <h3 className="biriqGameTitle">{g.name}</h3>
                <span className="biriqGameSub">{g.currency}</span>
              </div>
            </Link>
          ))}
        </section>

        {/* 4. FLASH SALE & 24-HOUR DEALS BANNER */}
        <FlashSaleBanner />

        {/* 5. TRUST & SECURITY STEPS */}
        <section className="esportsStepsSection">
          <div className="stepCard">
            <div className="stepNumber">01</div>
            <div className="stepContent">
              <h4>Choose Game &amp; Package</h4>
              <p>Select your favorite game title and required currency pack.</p>
            </div>
          </div>
          <div className="stepArrow">→</div>
          <div className="stepCard">
            <div className="stepNumber">02</div>
            <div className="stepContent">
              <h4>Enter Player ID</h4>
              <p>Provide your in-game User ID or Character UID accurately.</p>
            </div>
          </div>
          <div className="stepArrow">→</div>
          <div className="stepCard">
            <div className="stepNumber">03</div>
            <div className="stepContent">
              <h4>Instant In-Game Delivery</h4>
              <p>Credits arrive in your game inventory within 30-60 seconds.</p>
            </div>
          </div>
        </section>

        {/* 6. SECURITY & ANTI-FRAUD NOTICE */}
        <SecurityNoticeSection />

        {/* 7. VIP LOYALTY CLUB SECTION */}
        <VipLoyaltySection />

        {/* 8. 15-SECOND DELIVERY REELS */}
        <CustomerReelsSection />

        {/* 9. CUSTOMER REVIEWS & TESTIMONIALS */}
        <CustomerReviewsSection />

        {/* 9. PURE GAMING TOP-UP GUARANTEES */}
        <section className="luxuryBenefitsStrip wrap">
          <div className="benefitCard">
            <div className="benefitIconWrap benefitIconDelivery">
              <Zap size={18} />
            </div>
            <div className="benefitInfo">
              <h4>Instant Delivery</h4>
              <p>30-60s In-Game Delivery</p>
            </div>
          </div>

          <div className="benefitCard">
            <div className="benefitIconWrap benefitIconWarranty">
              <ShieldCheck size={18} />
            </div>
            <div className="benefitInfo">
              <h4>100% Official</h4>
              <p>Direct Publisher Partner</p>
            </div>
          </div>

          <div className="benefitCard">
            <div className="benefitIconWrap benefitIconReturn">
              <PhoneCall size={18} />
            </div>
            <div className="benefitInfo">
              <h4>24/7 Live Support</h4>
              <p>WhatsApp: +252 61 366 7676</p>
            </div>
          </div>

          <div className="benefitCard">
            <div className="benefitIconWrap benefitIconPayment">
              <CreditCard size={18} />
            </div>
            <div className="benefitInfo">
              <h4>Secure Payment</h4>
              <p>EVC Plus, Zaad &amp; Cards</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}