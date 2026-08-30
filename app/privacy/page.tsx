'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px', maxWidth: '820px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Privacy Policy</b>
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
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
              <Lock size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Siyaasadda Xog-Ilaalinta (Privacy Policy)</h1>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Tokiyo Store Privacy Protection • Somalia</small>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>1. Xogta Aan Ururinno</b>
              <p style={{ margin: 0 }}>
                Waxaan kaliya ururinaa macluumaadka lagama maarmaanka u ah dhiibista dalabkaaga sida: Player ID, Ciyaarta, iyo Xirmada aad dooratay. Marna ma keydinno xog shakhsi ah oo xasaasi ah sida passwords ama lambarada sirta ah ee bangiyada.
              </p>
            </div>

            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>2. Ilaalinta Xogta Macmiilka</b>
              <p style={{ margin: 0 }}>
                Xogtaada waxaa lagu ilaaliyaa habka casriga ah ee SSL 256-bit Encryption. Marna lama wadaagno dhinac saddexaad ujeeddooyin xayeysiis ah.
              </p>
            </div>

            <div>
              <b style={{ fontSize: '14px', color: '#0a2c61', display: 'block', marginBottom: '4px' }}>3. Xiriirka &amp; Caawinaadda</b>
              <p style={{ margin: 0 }}>
                Haddii aad qabto wax su'aalo ah oo ku saabsan xogtaada, fadlan nala soo xiriir: <b>info@tokiyostore.com</b> ama WhatsApp: <b>+252 61 366 7676</b>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
