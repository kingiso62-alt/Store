'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px', maxWidth: '820px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Terms of Service</b>
          </div>

          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', textDecoration: 'none' }}
          >
            <ArrowLeft size={13} />
            <span>Ku Noqo Ciyaaraha</span>
          </Link>
        </div>

        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '32px 28px', boxShadow: '0 6px 24px rgba(10,44,97,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
              <FileText size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Shuruudaha Adeegga (Terms of Service)</h1>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Last Updated: August 2026 • Tokiyo Store Somalia</small>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>1. Guudmar &amp; Adeegyada Tokiyo Store</b>
              <p style={{ margin: 0 }}>
                Tokiyo Store waa goobta #1 ee Soomaaliya ugu awoodda badan xagga dhiibista dhibcaha ciyaaraha (PUBG Mobile UC, Free Fire Diamonds, eFootball Coins, Roblox Robux). Dhammaan adeegyadayadu waa kuwo 100% rasmi ah oo si toos ah loogu shubo Player ID-gaaga.
              </p>
            </div>

            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>2. Xaqiijinta Player ID-ga</b>
              <p style={{ margin: 0 }}>
                Macmiilka waxaa saaran mas'uuliyadda inuu hubiyo sax ahaanshaha Player ID-giisa ka hor inta uusan bixin lacagta. Haddii qalad ka dhaco xagga macmiilka oo dhibcuhu ku dhacaan ID kale, laguma celin karo lacagta. Haddii qaladku xaggayaga ka yimaado, 100% lacag celin degdeg ah ayaa la siinayaa.
              </p>
            </div>

            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>3. Amniga &amp; Badbaadada Akoonnada</b>
              <p style={{ margin: 0 }}>
                Tokiyo Store marna ma weydiiso Password-kaaga ama SMS Code-kaaga. Wax kasta waxay ku dhacaan Player ID oo kaliya.
              </p>
            </div>

            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>4. Lacag-bixinta (EVC Plus, Zaad, Sahal &amp; Cards)</b>
              <p style={{ margin: 0 }}>
                Dhammaan lacag-bixinnada waxaa lagu aqbalaa nidaamyada rasmiga ah ee Soomaaliya (Hormuud EVC Plus, Telesom Zaad, Golis Sahal, eDahab iyo Kaararka Bangiyada).
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
