'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PhoneCall, Package, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === '/' || pathname === '/topup';
  const isOrders = pathname?.startsWith('/track-order') || pathname?.startsWith('/orders');
  const isProfile = pathname?.startsWith('/account') || pathname?.startsWith('/profile');

  return (
    <nav className="mobileBottomAppBar" aria-label="Mobile Navigation">
      <div className="bottomNavInner">
        {/* 1. Home */}
        <Link href="/" className={`bottomNavItem ${isHome ? 'active' : ''}`}>
          <div className="navItemPill">
            <Home size={20} />
          </div>
          <span>Home</span>
        </Link>

        {/* 2. Contacts / WhatsApp */}
        <a 
          href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20waxaan%20rabaa%20in%20aan%20wax%20iibsado" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bottomNavItem"
        >
          <div className="navItemPill">
            <PhoneCall size={20} />
          </div>
          <span>Contacts</span>
        </a>

        {/* 3. Orders / Track Order */}
        <Link href="/track-order" className={`bottomNavItem ${isOrders ? 'active' : ''}`}>
          <div className="navItemPill">
            <Package size={20} />
          </div>
          <span>Orders</span>
        </Link>

        {/* 4. Profile / Account */}
        <Link href="/account" className={`bottomNavItem ${isProfile ? 'active' : ''}`}>
          <div className="navItemPill">
            <User size={20} />
          </div>
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}
