import CartSnapshotSync from '../components/account/CartSnapshotSync';
import MobileBottomNav from '../components/MobileBottomNav';
import LuckySpinModal from '../components/features/LuckySpinModal';
import LivePurchaseNotifier from '../components/features/LivePurchaseNotifier';
import SmartWhatsAppWidget from '../components/features/SmartWhatsAppWidget';
import PwaInstallPrompt from '../components/features/PwaInstallPrompt';
import PushNotificationPrompt from '../components/features/PushNotificationPrompt';
import './globals.css';

export const viewport = {
  themeColor: '#081d3d',
};

export const metadata = {
  title: 'TOKIYO STORE | Instant Game Top-Up & Gaming Gear',
  description: 'Instant Game Top-Up (PUBG, Free Fire, MLBB, eFootball) & Official Gaming Accessories in Somalia.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'TOKIYO STORE | Instant Game Top-Up & Gaming Gear',
    description: 'Instant Game Top-Up & Official Gaming Accessories in Somalia.',
    type: 'website',
    images: ['/images/tokiyo-emblem.png']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartSnapshotSync />
        <PwaInstallPrompt />
        <PushNotificationPrompt />
        {children}
        <LuckySpinModal />
        <LivePurchaseNotifier />
        <SmartWhatsAppWidget />
        <MobileBottomNav />
      </body>
    </html>
  );
}