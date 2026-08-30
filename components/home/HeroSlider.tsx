'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Sparkles, ArrowRight, Star, Flame } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: 'PRO GAMING GEAR & ACCESSORIES',
    titlePrimary: 'LEVEL UP YOUR',
    titleAccent: 'GAMING SETUP',
    subtitle: 'Upgrade your battlestation with official mechanical keyboards, pro gaming mice, headsets & RGB desk accessories.',
    image: '/images/hero-banner.jpg',
    specs: ['4K RGB Display', 'Mechanical Switches', 'Pro Ergonomics'],
    primaryBtn: { text: 'SHOP GAMING GEAR', href: '/shop' },
    secondaryBtn: { text: '⚡ TOP-UP GAMES', href: '/topup' },
    badge: '100% Genuine Brands • 1-Year Official Warranty',
    priceTag: 'Starting From $19.99',
    accentGradient: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 60%, #ffdf40 100%)',
    themeBg: '#0b1d3a'
  },
  {
    id: 2,
    tag: '⚡ 24/7 INSTANT GAME RECHARGE',
    titlePrimary: 'PUBG UC, FREE FIRE',
    titleAccent: '& MLBB DIAMONDS',
    subtitle: 'Instant direct Player ID recharge in 30 seconds. Official server rates, zero fees, and 24/7 support across Somalia.',
    image: '/images/hero-topup.jpg',
    specs: ['30s Automated Delivery', '100% ID Safe', 'EVC & Zaad Accepted'],
    primaryBtn: { text: '⚡ TOP-UP NOW', href: '/topup' },
    secondaryBtn: { text: 'EXPLORE PACKAGES', href: '/topup' },
    badge: '⚡ Over 10,000+ Gamers Recharged Safely',
    priceTag: 'Packages From $0.99',
    accentGradient: 'linear-gradient(90deg, #ffdf40 0%, #ff8c00 60%, #ff3b30 100%)',
    themeBg: '#091830'
  },
  {
    id: 3,
    tag: '🏆 HIGH-PERFORMANCE ESPORTS HARDWARE',
    titlePrimary: 'RGB MECHANICAL',
    titleAccent: 'KEYBOARDS & MICE',
    subtitle: 'Ultra-low latency tactile switches, customizable dynamic RGB lighting, and pro tournament-grade optical sensors.',
    image: '/images/hero-gear.jpg',
    specs: ['8000Hz Polling', 'Hot-Swappable', 'Custom RGB Macro'],
    primaryBtn: { text: 'EXPLORE GEAR', href: '/shop?category=keyboards' },
    secondaryBtn: { text: 'BROWSE MICE', href: '/shop?category=mouse' },
    badge: '🚀 Fast Express Door-to-Door Delivery',
    priceTag: 'Save Up to 35% OFF',
    accentGradient: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 60%, #a855f7 100%)',
    themeBg: '#08162e'
  },
  {
    id: 4,
    tag: '🔥 EXCLUSIVE FLASH DEALS',
    titlePrimary: 'HOT ESPORTS DEALS',
    titleAccent: '& ACCESSORY BUNDLES',
    subtitle: 'Exclusive discounts on top-tier noise-canceling headsets, controllers, and bundled desk accessories.',
    image: '/images/hero-deals.jpg',
    specs: ['Limited Flash Stock', 'Up to 45% OFF', 'Free Shipping $50+'],
    primaryBtn: { text: 'CLAIM DEALS NOW 🔥', href: '/#deals' },
    secondaryBtn: { text: 'TRACK ORDER', href: '/track-order' },
    badge: '🔥 Limited-Time Flash Sale • Ends Soon',
    priceTag: 'Up to 45% OFF',
    accentGradient: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
    themeBg: '#100b1a'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<any>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(nextSlide, 6000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused]);

  const slide = slides[current];

  return (
    <section 
      className="heroSliderContainer wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Esports Slider"
    >
      {/* Background Ambient Glow & Cyber Grid */}
      <div className="sliderAmbientMesh"></div>
      
      {/* Slide Inner Layout */}
      <div className="sliderInner" key={slide.id}>
        {/* Left Side: Content & Typography */}
        <div className="sliderContent animateFadeIn">
          <div className="sliderBadgeRow">
            <span className="sliderCyberBadge">
              <Sparkles size={13} className="badgeSparkle" />
              {slide.tag}
            </span>
            <span className="sliderPriceTagPill">{slide.priceTag}</span>
          </div>

          <h1 className="sliderMainHeading">
            <span className="headingTopLine">{slide.titlePrimary}</span>
            <span 
              className="headingAccentLine"
              style={{ backgroundImage: slide.accentGradient }}
            >
              {slide.titleAccent}
            </span>
          </h1>

          <p className="sliderDescriptionText">{slide.subtitle}</p>

          {/* Floating Spec Highlights */}
          <div className="sliderSpecsRow">
            {slide.specs.map((spec, i) => (
              <span key={i} className="sliderSpecPill">
                <Star size={11} className="specStar" />
                {spec}
              </span>
            ))}
          </div>

          {/* CTA Action Buttons */}
          <div className="sliderActionsRow">
            <Link href={slide.primaryBtn.href} className="sliderPrimaryCta">
              <span>{slide.primaryBtn.text}</span>
              <ArrowRight size={16} className="btnArrowIcon" />
            </Link>
            <Link href={slide.secondaryBtn.href} className="sliderSecondaryCta">
              <span>{slide.secondaryBtn.text}</span>
            </Link>
          </div>

          {/* Trust Guarantee Line */}
          <div className="sliderTrustGuarantee">
            <ShieldCheck size={16} className="trustCheckmark" />
            <span>{slide.badge}</span>
          </div>
        </div>

        {/* Right Side: Cinematic Image Showcase with Ambient Depth */}
        <div className="sliderVisualShowcase">
          <div className="showcaseBackdropGlow"></div>
          <div className="showcaseImageFrame">
            <img 
              src={slide.image} 
              alt={`${slide.titlePrimary} ${slide.titleAccent}`} 
              className="showcaseMainImage"
            />
            <div className="showcaseEdgeFade"></div>
          </div>
        </div>
      </div>

      {/* Futuristic Bottom Controls Navigation */}
      <div className="sliderControlsRow">
        {/* Previous Button */}
        <button 
          className="sliderNavArrow prevBtn" 
          onClick={prevSlide} 
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Interactive Progress Indicators */}
        <div className="sliderDotsGroup">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              className={`sliderProgressPill ${idx === current ? 'activePill' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="pillTrack">
                {idx === current && <span className="pillFill"></span>}
              </span>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button 
          className="sliderNavArrow nextBtn" 
          onClick={nextSlide} 
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* Slide Counter */}
        <div className="sliderCounter">
          <span className="activeNum">0{current + 1}</span>
          <span className="dividerSlash">/</span>
          <span className="totalNum">0{slides.length}</span>
        </div>
      </div>
    </section>
  );
}
