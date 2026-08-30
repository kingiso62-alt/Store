import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Zap, ShieldCheck, Sparkles, ArrowRight, 
  PhoneCall, CreditCard
} from 'lucide-react';

// 12 Games strictly ordered as requested by user
const games = [
  { 
    name: 'Pubg Mobile', 
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
    img: '/images/games/efootball-android.png', 
    badge: 'MANUAL', 
    currency: 'eFootball Android Coins', 
    rating: '4.9', 
    tag: 'Android',
    href: '/topup/order?game=efootball_android',
    accentColor: '#107c41'
  },
  { 
    name: 'Blood Strike Mena', 
    img: '/images/games/blood-strike.png', 
    badge: 'INSTANT', 
    currency: 'Gold Top-Up', 
    rating: '4.6', 
    tag: 'New',
    href: '/topup/order?game=bloodstrike',
    accentColor: '#e74c3c'
  },
  { 
    name: 'Roblox', 
    img: '/images/games/roblox.png', 
    badge: 'INSTANT', 
    currency: 'Gift Card PIN', 
    rating: '4.7', 
    tag: 'Instant PIN',
    href: '/topup/order?game=roblox',
    accentColor: '#2ecc71'
  },
  { 
    name: 'Mobile Legends', 
    img: '/images/games/mobile-legends.png', 
    badge: 'INSTANT', 
    currency: 'Diamonds & Pass', 
    rating: '4.9', 
    tag: 'Hot',
    href: '/topup/order?game=mlbb',
    accentColor: '#9b59b6'
  },
  { 
    name: 'Call of Duty Mobile', 
    img: '/images/games/cod-mobile.png', 
    badge: 'INSTANT', 
    currency: 'COD Points (CP)', 
    rating: '4.8', 
    tag: 'Instant',
    href: '/topup/order?game=codm',
    accentColor: '#e67e22'
  },
  { 
    name: 'X-Suits', 
    img: '/images/games/pubg-xsuits-official.png', 
    badge: '7-STAR', 
    currency: 'Druvaen & Mythic X-Suits', 
    rating: '5.0', 
    tag: 'Mythic',
    href: '/topup/order?service=xsuits',
    accentColor: '#a855f7'
  },
  { 
    name: 'Cars', 
    img: '/images/games/pubg-cars-official.png', 
    badge: 'OFFICIAL', 
    currency: 'Ferrari & Lambo Models', 
    rating: '4.9', 
    tag: 'Official',
    href: '/topup/order?service=cars',
    accentColor: '#dc1424'
  },
  { 
    name: 'Popularity Battle', 
    img: '/images/games/pubg-popularity-official.png', 
    badge: 'MANUAL', 
    currency: 'Airplane / Jet / Yacht', 
    rating: '4.9', 
    tag: 'Manual',
    href: '/topup/order?service=popularity',
    accentColor: '#00b4d8'
  }
];

const packs = [
  {
    title: 'PUBG Mobile UC',
    icon: '/images/games/pubg-mobile.png',
    href: '/topup/order?game=pubg',
    options: [
      { name: '60 UC', tag: 'Instant' },
      { name: '300 + 25 UC', tag: 'Popular' },
      { name: '600 + 60 UC', tag: 'Best Seller' }
    ]
  },
  {
    title: 'eFootball Coins',
    icon: '/images/games/efootball-android.png',
    href: '/topup/order?game=efootball_android',
    options: [
      { name: '130 Coins', tag: 'Instant' },
      { name: '550 Coins', tag: 'Popular' },
      { name: '1040 Coins', tag: 'Top Choice' }
    ]
  }
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrap homePage" style={{ paddingTop: '18px' }}>
        {/* 1. ANIMATED ESPORTS TOP-UP HERO BANNER */}
        <section className="topupEsportsHero">
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

          {/* Dynamic Floating Animated Gaming & Accessories Showcase */}
          <div className="topupHeroShowcase">
            <div className="floatingGameStack">
              {/* Pro Accessories & Hardware */}
              <div className="floatCard cardMouse" title="Optical Gaming Mouse">
                <img src="/images/products/logitech-g502.png" alt="Pro Gaming Mouse" />
                <span className="cardLabel">Pro Mouse</span>
              </div>
              <div className="floatCard cardKeyboard" title="RGB Mechanical Keyboard">
                <img src="/images/products/redragon-k552.png" alt="Mechanical Keyboard" />
                <span className="cardLabel">RGB Keyboard</span>
              </div>
              <div className="floatCard cardHeadset" title="Esports Pro Headset">
                <img src="/images/products/hyperx-cloud2.png" alt="Esports Headset" />
                <span className="cardLabel">Pro Headset</span>
              </div>
              <div className="floatCard cardController" title="Wireless Controller">
                <img src="/images/products/ps5-dualsense.png" alt="PS5 Controller" />
                <span className="cardLabel">Controller</span>
              </div>
              <div className="floatCard cardChair" title="Ergonomic Chair">
                <img src="/images/categories/chair.png" alt="Gaming Chair" />
                <span className="cardLabel">Gaming Chair</span>
              </div>
              <div className="floatCard cardMonitor" title="Curved Gaming Monitor">
                <img src="/images/categories/monitor.png" alt="Curved Monitor" />
                <span className="cardLabel">Curved Monitor</span>
              </div>
              <div className="floatCard cardMic" title="Studio Microphone">
                <img src="/images/categories/microphone.png" alt="Studio Mic" />
                <span className="cardLabel">Studio Mic</span>
              </div>
              <div className="floatCard cardDeskMat" title="RGB Desk Mat">
                <img src="/images/categories/mousepad.png" alt="Desk Mat" />
                <span className="cardLabel">RGB Desk Mat</span>
              </div>

              {/* Popular Games & Specials */}
              <div className="floatCard card1" title="PUBG Mobile">
                <img src="/images/games/pubg-mobile.png" alt="PUBG Mobile" />
                <span className="cardLabel">PUBG Mobile</span>
              </div>
              <div className="floatCard card2" title="Free Fire">
                <img src="/images/games/free-fire.png" alt="Free Fire" />
                <span className="cardLabel">Free Fire</span>
              </div>
              <div className="floatCard card3" title="Mobile Legends">
                <img src="/images/games/mobile-legends.png" alt="Mobile Legends" />
                <span className="cardLabel">MLBB</span>
              </div>
              <div className="floatCard card4" title="eFootball">
                <img src="/images/games/efootball.png" alt="eFootball" />
                <span className="cardLabel">eFootball</span>
              </div>
              <div className="floatCard card6" title="Official Supercars">
                <img src="/images/games/pubg-cars-official.png" alt="Cars" />
                <span className="cardLabel">Cars</span>
              </div>
              <div className="floatCard card7" title="X-Suits">
                <img src="/images/games/pubg-xsuits-official.png" alt="X-Suits" />
                <span className="cardLabel">X-Suits</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. POPULAR GAMES SECTION HEADER */}
        <div className="gameSectionHeaderRow">
          <div className="gameSectionTitleGroup">
            <h2 className="gameSectionMainTitle">POPULAR GAMES</h2>
            <span className="gameSectionBadge">TOP-UP SELECTION</span>
          </div>
        </div>

        {/* 3. ORDERED 12 ESPORTS GAME CARDS GRID (3-BY-3 SQUIRCLE STYLE) */}
        <section className="esportsGameGrid biriqGridStyle">
          {games.map((g) => (
            <Link href={g.href} key={g.name} className="biriqGameCard">
              <div className="biriqMediaWrap">
                <img src={g.img} alt={g.name} className="biriqGameImg" />
                <div className="biriqFloatingPill">
                  <Zap size={11} className="biriqZap" />
                  <span>{g.badge}</span>
                </div>
              </div>
              <h3 className="biriqGameTitle">{g.name}</h3>
            </Link>
          ))}
        </section>

        {/* 4. TRUST & SECURITY STEPS */}
        <section className="esportsStepsSection">
          <div className="stepCard">
            <div className="stepNumber">01</div>
            <div className="stepContent">
              <h4>Choose Game & Package</h4>
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

        {/* 5. POPULAR QUICK PACKAGES */}
        {/* 5. POPULAR QUICK PACKAGES (COMPACT & MODERN) */}
        <div className="gameSectionHeaderRow" style={{ marginTop: '26px' }}>
          <div className="gameSectionTitleGroup">
            <h2 className="gameSectionMainTitle">POPULAR RECHARGES</h2>
            <span className="gameSectionBadge" style={{ background: '#e11d48' }}>HOT DEALS</span>
          </div>
        </div>

        <section className="featuredPacksGrid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {packs.map((p) => (
            <div key={p.title} className="featuredPackCard">
              <div className="packHead">
                <img src={p.icon} alt={p.title} className="packHeadImg" />
                <div className="packHeadInfo">
                  <h4 className="packHeadTitle">{p.title}</h4>
                  <span className="packInstantBadge">⚡ Instant Delivery</span>
                </div>
              </div>
              <div className="packOptionsList">
                {p.options.map((opt) => (
                  <div key={opt.name} className="packOptionItem">
                    <span className="packOptionName">{opt.name}</span>
                    <span className="packOptionTag">{opt.tag || 'Instant'}</span>
                  </div>
                ))}
              </div>
              <Link href={p.href} className="packCtaBtn">
                Select &amp; Recharge
              </Link>
            </div>
          ))}
        </section>

        {/* 6. PURE GAMING TOP-UP GUARANTEES */}
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