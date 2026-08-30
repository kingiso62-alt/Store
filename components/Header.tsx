'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserRound, Zap, Bell, Sparkles, 
  Truck, Download, Menu, X, Home, ShoppingBag, 
  KeyRound, Wallet, Award, Info, 
  HelpCircle, PhoneCall, Heart, ShoppingCart
} from 'lucide-react';
import { supabaseBrowser } from '../lib/supabase-browser';

export default function Header() {
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [cartCount, setCartCount] = useState(2);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
    }
  };

  return (
    <header className="tokiyoHeader">
      {/* 1. TOP ANNOUNCEMENT & UTILITY BAR (Desktop) */}
      <div className="headerTopBar">
        <div className="headerTopInner wrap">
          <div className="topAnnouncement">
            <span className="liveIndicator">
              <span className="liveDot"></span>
              24/7 Fast Delivery In Somalia
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <a href="https://wa.me/252613667676" target="_blank" rel="noopener noreferrer" className="topBarLink">
              WhatsApp Support: +252 61 366 7676
            </a>
          </div>

          <div className="topUtilityLinks">
            <span className="topCurrency">🇸🇴 USD ($) Somali Shilling</span>
            {deferredPrompt && (
              <button onClick={handleInstallClick} className="topPwaBtn">
                <Download size={12} />
                <span>Install Tokiyo App</span>
              </button>
            )}
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
            <Link href="/track-order" className={`unifiedNavLink ${pathname === '/track-order' ? 'active' : ''}`}>
              <Truck size={15} className="navItemIcon" />
              <span>Orders</span>
            </Link>
            <Link href="/redeem" className={`unifiedNavLink ${pathname === '/redeem' ? 'active' : ''}`}>
              <KeyRound size={15} className="navItemIcon" />
              <span>Code Checker</span>
            </Link>
            <Link href="/cashback" className={`unifiedNavLink ${pathname === '/cashback' ? 'active' : ''}`}>
              <Wallet size={15} className="navItemIcon" />
              <span>Cashback</span>
            </Link>
            <Link href="/leaderboard" className={`unifiedNavLink ${pathname === '/leaderboard' ? 'active' : ''}`}>
              <Award size={15} className="navItemIcon" />
              <span>Leaderboard</span>
            </Link>
            <Link href="/terms" className={`unifiedNavLink ${pathname === '/terms' ? 'active' : ''}`}>
              <Info size={15} className="navItemIcon" />
              <span>Shuruudaha</span>
            </Link>
            <Link href="/faq" className={`unifiedNavLink ${pathname === '/faq' ? 'active' : ''}`}>
              <HelpCircle size={15} className="navItemIcon" />
              <span>FAQ</span>
            </Link>
          </nav>

          {/* Action Icons (Desktop & Mobile) */}
          <div className="unifiedActionGroup">
            {/* Desktop Action Icons */}
            <div className="desktopActionIcons">
              <Link href="/track-order" className="unifiedHeaderIconBtn" aria-label="Orders" title="Orders">
                <ShoppingBag size={18} />
              </Link>

              <Link href="/account" className="unifiedHeaderIconBtn" aria-label="My Account" title="Account">
                <UserRound size={18} />
              </Link>
            </div>

            {/* Notification Bell (Always Visible) */}
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

      {/* 3. CLEAN & ELEGANT MOBILE DRAWER (EXACT 7 ITEMS AS IN USER SCREENSHOT) */}
      {mobileNavOpen && (
        <>
          <div 
            className="mobileNavBackdrop" 
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="cleanBiriqDrawer">
            {/* Drawer Top Header (Menu + Close X) */}
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

            {/* Exact 7 Navigation Items as requested */}
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

              {/* 2. Orders */}
              <Link 
                href="/track-order" 
                className={`cleanDrawerItem ${pathname === '/track-order' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <ShoppingBag size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Orders</span>
              </Link>

              {/* 3. Code Checker */}
              <Link 
                href="/redeem" 
                className={`cleanDrawerItem ${pathname === '/redeem' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <KeyRound size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Code Checker</span>
              </Link>

              {/* 4. Cashback */}
              <Link 
                href="/cashback" 
                className={`cleanDrawerItem ${pathname === '/cashback' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Wallet size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Cashback</span>
              </Link>

              {/* 5. Leaderboard */}
              <Link 
                href="/leaderboard" 
                className={`cleanDrawerItem ${pathname === '/leaderboard' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Award size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Leaderboard</span>
              </Link>

              {/* 6. Shuruudaha */}
              <Link 
                href="/terms" 
                className={`cleanDrawerItem ${pathname === '/terms' ? 'active' : ''}`} 
                onClick={() => setMobileNavOpen(false)}
              >
                <Info size={19} className="cleanDrawerIcon" />
                <span className="cleanDrawerLabel">Shuruudaha</span>
              </Link>

              {/* 7. FAQ */}
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
    </header>
  );
}