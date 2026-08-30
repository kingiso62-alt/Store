'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { HelpCircle, ChevronDown, ChevronUp, Search, PhoneCall, Zap, MessageCircleQuestion } from 'lucide-react';

const allFaqs = [
  {
    category: 'Top-Up & Dhiibista',
    q: 'Sidee ayuu u shaqeeyaa Top-Up-ka TOKIYO STORE?',
    a: 'Waxaad dooranaysaa ciyaarta aad rabto (PUBG Mobile, Free Fire, eFootball, Roblox, iwm), kadib xirmada dhibcaha, waxaadna gelinaysaa Player ID-gaaga. Markaad ku bixiso EVC Plus, Zaad ama Kaar, dhibcaha si toos ah 30-60 ilbiriqsi gudahood ayaa loogu shubayaa ciyaartaada.'
  },
  {
    category: 'Xawaaraha Dhiibista',
    q: 'Intee in le\'eg ayey qaadataa in dhibcaha (UC / Diamonds) i soo gaaraan?',
    a: 'Nidaamka TOKIYO STORE waa mid 100% Automated ah oo ku xiran API-yada rasmiga ah ee ciyaaraha. Dhiibistu waxay qaadataa 30 ilaa 60 ilbiriqsi oo keliya.'
  },
  {
    category: 'Lacag-bixinta',
    q: 'Hababkee ayaan lacagta ku bixin karaa Soomaaliya gudaheeda?',
    a: 'Waxaad ku bixin kartaa dhammaan hababka ugu caansan Soomaaliya: EVC Plus (*770# Hormuud), Zaad Service (Telesom), Sahal (Golis), Premier Bank, E-Dahab, iyo Kaararka Bangiyada ee Caalamiga ah (Visa & MasterCard).'
  },
  {
    category: 'Xaqiijinta ID-ga',
    q: 'Haddii aan Player ID qaldan galiyo maxaa dhacaya?',
    a: 'Fadlan laba jeer hubi Player ID-gaaga ka hor inta aadan xaqiijin dalabka. Haddii aad qalad ogaato isla markaas, fadlan degdeg nagala soo xiriir WhatsApp: +252 61 366 7676 ka hor inta aan la dhiibin.'
  },
  {
    category: 'Dammaanadda & Amniga',
    q: 'Dhibcaha ma yihiin kuwo ammaan ah oo rasmi ah?',
    a: 'Haa, 100% waa dhibco rasmi ah oo si toos ah uga yimaada Shirkadaha Rasmiga ah ee ciyaaraha (Tencent Games, Garena, Konami, Roblox). Akoonkaaga wax qatar ah ma gelinayaan.'
  },
  {
    category: 'Cashback & Dhibcaha',
    q: 'Sidee ayaan u helaa Cashback-ga iyo Abaalmarinnada?',
    a: 'Mar kasta oo aad dukaameysato waxaad helaysaa dhibco iyo ilaa 5% Cashback toos ugu soo noqonaya akoonkaaga. Waxaad sidoo kale ka qeyb geli kartaa Leaderboard-ka bishii si aad ugu guuleysato abaalmarino lacageed.'
  }
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = allFaqs.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
         f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
         f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '30px', paddingBottom: '60px', maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ background: '#ffffff', border: '1.5px solid #e5edf7', borderRadius: '18px', padding: '28px 24px', boxShadow: '0 6px 24px rgba(10, 44, 97, 0.06)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#eef4fc', color: '#0a2c61', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
              <HelpCircle size={24} />
            </div>
            <h1 style={{ fontSize: '23px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>Su&apos;aalaha Badanaa La Isweydiiyo (FAQ)</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Ka hel jawaabaha su&apos;aalaha ugu muhiimsan ee ku saabsan nidaamka dhiibista iyo adeegyada.</p>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Raadi su'aal (tusaale: EVC, PUBG, Xawaaraha, ID)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
            />
          </div>

          {/* Accordion FAQ List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredFaqs.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div 
                  key={i} 
                  style={{ border: `1.5px solid ${isOpen ? '#0a2c61' : '#e5edf7'}`, borderRadius: '12px', background: isOpen ? '#f8fafc' : '#ffffff', overflow: 'hidden', transition: 'all .2s' }}
                >
                  <button 
                    type="button"
                    onClick={() => toggle(i)}
                    style={{ width: '100%', padding: '15px 18px', background: 'transparent', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', cursor: 'pointer', gap: '12px' }}
                  >
                    <div>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#d91f2d', display: 'block', textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '2px' }}>
                        {f.category}
                      </span>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0a2c61', margin: 0 }}>
                        {f.q}
                      </h3>
                    </div>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isOpen ? '#0a2c61' : '#eef4fc', color: isOpen ? '#ffffff' : '#0a2c61', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 18px 16px', borderTop: '1px solid #edf2f7', marginTop: '4px' }}>
                      <p style={{ fontSize: '13px', color: '#475569', margin: '12px 0 0', lineHeight: 1.6 }}>
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
                <p style={{ margin: 0, fontSize: '13px' }}>Wax su&apos;aal ah oo ku habboon baaritaankaaga lama helin.</p>
              </div>
            )}
          </div>

          {/* Security Notice Section */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde047', borderRadius: '12px', padding: '14px 16px', color: '#854d0e', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🛡️</span>
              <p style={{ margin: 0, lineHeight: '1.4' }}>
                <b>Digniin Amni:</b> Tokiyo Store marna kuuma weydiinayo Password-kaaga ama SMS Code-kaaga. Shubashadu waa 100% Player ID oo kaliya.
              </p>
            </div>
          </div>

          {/* Direct WhatsApp Help Box */}
          <div style={{ marginTop: '26px', padding: '18px', background: '#0a2c61', borderRadius: '14px', color: '#ffffff', textAlign: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 6px' }}>Miyaad qabtaa su&apos;aal kale oo aan halkan ku jirin?</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 14px' }}>Kooxdayada caawinaadda ayaa diyaar u ah 24/7 inay si toos ah kaaga caawiyaan WhatsApp.</p>
            <a 
              href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20su%27aal%20ayaan%20qabaa" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#ffffff', padding: '10px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none' }}
            >
              <PhoneCall size={15} />
              <span>Nala Soo Xiriir WhatsApp (+252 61 366 7676)</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
