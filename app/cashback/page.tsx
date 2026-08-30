import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Wallet, Sparkles, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Cashback & Rewards Program | TOKIYO STORE',
  description: 'Hel ilaa 5% Cashback dib ugu soo noqonaya akoonkaaga mar kasta oo aad PUBG UC ama Free Fire iibsato.',
};

export default function CashbackPage() {
  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '30px', paddingBottom: '60px', maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ background: '#ffffff', border: '1.5px solid #e5edf7', borderRadius: '18px', padding: '28px 22px', boxShadow: '0 6px 24px rgba(10, 44, 97, 0.06)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center', margin: '0 auto 12px', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)' }}>
              <Wallet size={28} />
            </div>
            <h1 style={{ fontSize: '23px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>Cashback &amp; VIP Rewards</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Hel ilaa <b>5% Cashback</b> toos ugu soo dhacaya boorsadaada mar kasta oo aad naga dukaameysato.</p>
          </div>

          {/* 3 Cashback Tiers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '26px' }}>
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0a2c61', background: '#eef4fc', padding: '2px 8px', borderRadius: '6px' }}>BRONZE</span>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0a2c61', margin: '10px 0 2px' }}>1% Back</h3>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Dalabyada $1 - $50</p>
            </div>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '16px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>SILVER</span>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#16a34a', margin: '10px 0 2px' }}>3% Back</h3>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Dalabyada $50 - $200</p>
            </div>

            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '14px', padding: '16px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#92400e', background: '#fef3c7', padding: '2px 8px', borderRadius: '6px' }}>GOLD VIP</span>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#d97706', margin: '10px 0 2px' }}>5% Back</h3>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Dalabyada $200+</p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '18px', background: '#0a2c61', borderRadius: '14px', color: '#ffffff' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px' }}>Bilow Helitaanka Cashback Hadda!</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 14px' }}>Sameyso dalabkaaga PUBG, Free Fire ama eFootball si toos ah.</p>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#d91f2d', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none' }}>
              <span>Dukaameyso Hadda</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
