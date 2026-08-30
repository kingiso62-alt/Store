import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export const metadata = {
  title: 'Shuruudaha & Qawaaniinta (Terms of Service) | TOKIYO STORE',
  description: 'Shuruudaha iyo qawaaniinta isticmaalka TOKIYO STORE ee dhiibista Top-Up-ka iyo qalabka ciyaaraha.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '30px', paddingBottom: '60px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: '#ffffff', border: '1.5px solid #e5edf7', borderRadius: '16px', padding: '28px 24px', boxShadow: '0 4px 18px rgba(10, 44, 97, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eef4fc', color: '#0a2c61', display: 'grid', placeItems: 'center' }}>
              <FileText size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Shuruudaha &amp; Qawaaniinta</h1>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Terms &amp; Conditions of TOKIYO STORE</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: '#334155', fontSize: '13.5px', lineHeight: 1.6 }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a2c61', margin: '0 0 6px' }}>1. Dhiibista Tooska ah (Instant Delivery)</h3>
              <p style={{ margin: 0 }}>
                Dhammaan xirmooyinka UC, Free Fire Diamonds, iyo eFootball Coins waxaa loo dhiibaa si toos ah 30-60 ilbiriqsi gudahood ka dib marka lacag-bixintu si buuxda u xaqiijowdo.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a2c61', margin: '0 0 6px' }}>2. Xaqiijinta Player ID-ga</h3>
              <p style={{ margin: 0 }}>
                Macaamiilku wuxuu mas&apos;uul ka yahay inuu si sax ah u qoro Player ID-ga ama User ID-ga ciyaarta. Fadlan laba jeer hubi lambarkaaga ka hor inta aadan xaqiijin dalabka.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a2c61', margin: '0 0 6px' }}>3. Dammaanadda Qalabka Hardware-ka (1 Year Warranty)</h3>
              <p style={{ margin: 0 }}>
                Qalabka ciyaaraha ee Hardware-ka ah (Mice, Keyboards, Headsets, Controllers) waxay leeyihiin 1 sano dammaanad rasmi ah oo ka dhan ah cilladaha warshadda.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a2c61', margin: '0 0 6px' }}>4. Caawinaadda &amp; Adeegga Macmiilka</h3>
              <p style={{ margin: 0 }}>
                Haddii aad qabto wax su&apos;aal ah ama aad u baahan tahay taageero degdeg ah, waxaad 24/7 nagala soo xiriiri kartaa WhatsApp: <b>+252 61 366 7676</b>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
