'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserRound, Zap, Bell, Sparkles, 
  Truck, Download, Menu, X, Home, ShoppingBag, 
  KeyRound, Wallet, Award, Info, 
  HelpCircle, PhoneCall, Heart, ShoppingCart, Search, Trophy,
  Users, Activity, Calculator, Brain, Gift, Flame, Calendar, Tv
} from 'lucide-react';
import { supabaseBrowser } from '../lib/supabase-browser';
import QuickSearchModal from './features/QuickSearchModal';
import CurrencyConverterModal from './features/CurrencyConverterModal';
import DailyGamingQuizModal from './features/DailyGamingQuizModal';
import GamerBadgesModal from './features/GamerBadgesModal';
import DailyLoginStreakModal from './features/DailyLoginStreakModal';
import ThemeToggle from './features/ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [cartCount, setCartCount] = useState(2);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [streakOpen, setStreakOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Non-blocking notification count check
    const loadNotifications = async () => {
      try {
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => timeoutController.abort(), 300);

        const { data } = await supabaseBrowser.auth.getSession();
        if (!data.session) {
          clearTimeout(timeoutId);
          return setUnreadNotifications(0);
        }
        const r = await fetch('/api/account/notifications', {
          headers: { authorization: `Bearer ${data.session.access_token}` },
          signal: timeoutController.signal
        });
        clearTimeout(timeoutId);
        if (r.ok) {
          const res = await r.json();
          setUnreadNotifications(res.unreadCount || 0);
        }
      } catch {
        setUnreadNotifications(0);
      }
    };
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      window.location.href = '/pwa/install';
    }
  };

  return (
    <header className="tokiyoHeader">
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div className="headerTopBar">
        <div className="headerTopInner wrap">
          <div className="topAnnouncement">
            <span className="liveIndicator">
              <span className="liveDot"></span>
              24/7 Fast Delivery In Somalia
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <a href="https://wa.me/252613667676" target="_blank" rel="noopener noreferrer" className="topBarLink">
              WhatsApp: +252 61 366 7676
            </a>
          </div>

          <div className="topUtilityLinks">
            <Link
              href="/mystery-box"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#ffffff', borderRadius: '4px', padding: '2px 8px', fontSize: '10.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
            >
              <Gift size={12} />
              <span>Mystery Box 🎁</span>
            </Link>

            <button
              type="button"
              onClick={() => setStreakOpen(true)}
              style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#86efac', borderRadius: '4px', padding: '2px 7px', cursor: 'pointer', fontSize: '10.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Calendar size={12} />
              <span>Streak 🔥</span>
            </button>

            <button
              type="button"
              onClick={() => setBadgesOpen(true)}
              style={{ background: 'transparent', border: 0, color: '#fef08a', cursor: 'pointer', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Award size={13} />
              <span>Badges 🎖️</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrencyOpen(true)}
              style={{ background: 'transparent', border: 0, color: '#93c5fd', cursor: 'pointer', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Calculator size={13} />
              <span>USD ⇄ SOS</span>
            </button>

            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid #eab308', color: '#fef08a', borderRadius: '4px', padding: '2px 7px', cursor: 'pointer', fontSize: '10.5px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Brain size={12} />
              <span>Quiz</span>
            </button>

            {deferredPrompt && (
              <button onClick={handleInstallClick} className="topPwaBtn">
                <Download size={12} />
                <span>Install</span>
              </button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 2. UNIFIED MAIN NAVIGATION BAR */}
      <div className="unifiedEsportsHeaderBar">
        <div className="unifiedHeaderInner wrap">
          {/* Logo Section */}
          <Link href="/" className="unifiedBrandLogo" aria-label="Tokiyo Store Home">
            <img 
              src="/images/tokiyo-logo.png" 
              alt="TOKIYO STORE" 
              className="unifiedLogoImg" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="unifiedNavLinks">
            <Link href="/" className={`unifiedNavLink ${pathname === '/' ? 'active' : ''}`}>
              <Zap size={15} className="navItemIcon" />
              <span>Top-Up</span>
            </Link>
            <Link href="/bulk-topup" className={`unifiedNavLink ${pathname === '/bulk-topup' ? 'active' : ''}`}>
              <Users size={15} className="navItemIcon" />
              <span>Bulk Clan</span>
            </Link>
            <Link href="/vouchers" className={`unifiedNavLink ${pathname === '/vouchers' ? 'active' : ''}`}>
              <Gift size={15} className="navItemIcon" />
              <span>Gift Cards</span>
            </Link>
            <Link href="/streams" className={`unifiedNavLink ${pathname === '/streams' ? 'active' : ''}`}>
              <Tv size={15} className="navItemIcon" />
              <span>Streams</span>
            </Link>
            <Link href="/track-order" className={`unifiedNavLink ${pathname === '/track-order' ? 'active' : ''}`}>
              <Truck size={15} className="navItemIcon" />
              <span>Orders</span>
            </Link>
            <Link href="/referral" className={`unifiedNavLink ${pathname === '/referral' ? 'active' : ''}`}>
              <Users size={15} className="navItemIcon" />
              <span>Refer $1</span>
            </Link>
            <Link href="/tournaments" className={`unifiedNavLink ${pathname === '/tournaments' ? 'active' : ''}`}>
              <Trophy size={15} className="navItemIcon" />
              <span>Tournaments</span>
            </Link>
            <Link href="/status" className={`unifiedNavLink ${pathname === '/status' ? 'active' : ''}`}>
              <Activity size={15} className="navItemIcon" />
              <span>Servers</span>
            </Link>
            <Link href="/faq" className={`unifiedNavLink ${pathname === '/faq' ? 'active' : ''}`}>
              <HelpCircle size={15} className="navItemIcon" />
              <span>FAQ</span>
            </Link>
          </nav>

          {/* Action Icons (Desktop & Mobile) */}
          <div className="unifiedActionGroup">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="unifiedHeaderIconBtn"
              aria-label="Search games"
              title="Search (Ctrl + K)"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px 12px', color: '#ffffff', fontSize: '11px', fontWeight: 800 }}
            >
              <Search size={15} color="#93c5fd" />
              <span className="hideOnMobile">Search (Ctrl+K)</span>
            </button>

            {/* Desktop Action Icons */}
            <div className="desktopActionIcons">
              <Link href="/track-order" className="unifiedHeaderIconBtn" aria-label="Orders" title="Orders">
                <ShoppingBag size={18} />
              </Link>

              <Link href="/account" className="unifiedHeaderIconBtn" aria-label="My Account" title="Account">
                <UserRound size={18} />
              </Link>
            </div>

            {/* Notification Bell */}
            <Link 
              href="/account#notifications" 
              className="unifiedHeaderIconBtn mobileNotifBtn" 
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadNotifications > 0 && <span className="notifBadgeDot"></span>}
            </Link>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button 
              className="mobileMenuToggle" 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. CLEAN & ELEGANT MOBILE DRAWER */}
      {mobileNavOpen && (
        <>
          <div 
            className="mobileNavBackdrop" 
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="cleanBiriqDrawer">
            {/* Drawer Top Header */}
            <div className="cleanDrawerHeader">
              <h3 className="cleanDrawerTitle">Menu</h3>
              <button 
                className="cleanDrawerCloseBtn" 
                onClick={() => setMobileNavOpen(false)} 
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Menu List */}
            <div className="cleanDrawerMenuList">
              {/* 1. Home */}
              <Link 
                href="/" 
                className={`cleanDrawerItem ${pathname === '/' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Home size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Home</span>
              </Link>

              {/* 2. Mystery Box */}
              <Link 
                href="/mystery-box" 
                className={`cleanDrawerItem ${pathname === '/mystery-box' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Gift size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Lucky Mystery Box 🎁</span>
              </Link>

              {/* 3. Bulk Top-Up */}
              <Link 
                href="/bulk-topup" 
                className={`cleanDrawerItem ${pathname === '/bulk-topup' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Users size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Clan &amp; Squad Bulk Top-Up</span>
              </Link>

              {/* 4. Gift Cards */}
              <Link 
                href="/vouchers" 
                className={`cleanDrawerItem ${pathname === '/vouchers' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Gift size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Digital Gift Cards &amp; Vouchers</span>
              </Link>

              {/* 5. Live Streams */}
              <Link 
                href="/streams" 
                className={`cleanDrawerItem ${pathname === '/streams' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Tv size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Somali Esports Streams 📺</span>
              </Link>

              {/* 6. Orders */}
              <Link 
                href="/track-order" 
                className={`cleanDrawerItem ${pathname === '/track-order' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <ShoppingBag size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Orders</span>
              </Link>

              {/* 7. Refer $1.00 */}
              <Link 
                href="/referral" 
                className={`cleanDrawerItem ${pathname === '/referral' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Users size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Refer a Friend ($0.50 Bonus)</span>
              </Link>

              {/* 8. Tournaments */}
              <Link 
                href="/tournaments" 
                className={`cleanDrawerItem ${pathname === '/tournaments' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Trophy size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Tournaments (Tartamada)</span>
              </Link>

              {/* 9. Server Status */}
              <Link 
                href="/status" 
                className={`cleanDrawerItem ${pathname === '/status' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Activity size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Live Server Status</span>
              </Link>

              {/* 10. Code Checker */}
              <Link 
                href="/redeem" 
                className={`cleanDrawerItem ${pathname === '/redeem' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <KeyRound size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Code Checker</span>
              </Link>

              {/* 11. FAQ */}
              <Link 
                href="/faq" 
                className={`cleanDrawerItem ${pathname === '/faq' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <HelpCircle size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">FAQ</span>
              </Link>
            </div>

            {/* Drawer Bottom WhatsApp Support */}
            <div className="cleanDrawerFooter">
              <a 
                href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20caawinaad%20ayaan%20rabaa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cleanDrawerSupportBtn"
              >
                <PhoneCall size={16} />
                <span>WhatsApp (+252 61 366 7676)</span>
              </a>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CurrencyConverterModal isOpen={currencyOpen} onClose={() => setCurrencyOpen(false)} />
      <DailyGamingQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <GamerBadgesModal isOpen={badgesOpen} onClose={() => setBadgesOpen(false)} />
      <DailyLoginStreakModal isOpen={streakOpen} onClose={() => setStreakOpen(false)} />
    </header>
  );
}