'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Gift, Sparkles, Copy, Check, ArrowLeft, PhoneCall, ShieldCheck, CreditCard } from 'lucide-react';

const giftDenominations = [5, 10, 25, 50, 100];
const cardThemes = [
  { id: 'gold', name: 'Gold Royale VIP', gradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #d97706 100%)', text: '#ffffff' },
  { id: 'neon', name: 'Esports Cyberpunk Blue', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%)', text: '#ffffff' },
  { id: 'red', name: 'Mythic Crimson Fire', gradient: 'linear-gradient(135deg, #881337 0%, #e11d48 50%, #f43f5e 100%)', text: '#ffffff' }
];

export default function VouchersPage() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [selectedTheme, setSelectedTheme] = useState(cardThemes[0]);
  const [recipientName, setRecipientName] = useState('Saaxiibka Qaaliga ah');
  const [customMsg, setCustomMsg] = useState('Hambalyo! Ka qaado kaarkan hadiyadda ah ee Tokiyo Store!');
  const [generatedCode, setGeneratedCode] = useState('TK-GIFT-8821-9943');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMsg = `Asc ${recipientName}! Waxaan kuugu soo diray Kaarka Hadiyadda ee TOKIYO STORE ($${selectedAmount}):\n\n- Hadiyadda: $${selectedAmount}.00 USD\n- Code-kaaga: ${generatedCode}\n- Fariinta: "${customMsg}"\n\nKu fur bogga: https://tokiyostore.com/redeem`;

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Tokiyo Digital Gift Cards</b>
          </div>

          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', textDecoration: 'none' }}
          >
            <ArrowLeft size={13} />
            <span>Ku Noqo Ciyaaraha</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #081d3d 0%, #0d2857 100%)',
            borderRadius: '24px',
            padding: '32px 26px',
            color: '#ffffff',
            marginBottom: '28px',
            boxShadow: '0 12px 36px rgba(8, 29, 61, 0.25)',
            border: '1.5px solid #1e3a8a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
              🎁 DIGITAL GIFT CARDS
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '6px 0 4px', color: '#ffffff' }}>
              Kaararka Hadiyadaha ee Tokiyo Store ($5 - $100)
            </h1>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, maxWidth: '580px', lineHeight: '1.45' }}>
              U iibi saaxiibkaa ama xubnaha qoyskaaga Digital Gift Card u gaar ah oo ay ku furan karaan PUBG UC, Free Fire ama eFootball.
            </p>
          </div>

          <Link
            href="/redeem"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.2)', padding: '10px 18px', borderRadius: '12px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Fur Bogga Code Checker →</span>
          </Link>
        </div>

        {/* Gift Card Creator Studio */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Controls */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(10,44,97,0.04)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 16px' }}>
              1. Dooro Qiimaha Hadiyadda:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
              {giftDenominations.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  style={{
                    background: selectedAmount === amt ? '#081d3d' : '#f1f5f9',
                    color: selectedAmount === amt ? '#ffffff' : '#0a2c61',
                    border: `1.5px solid ${selectedAmount === amt ? '#081d3d' : '#cbd5e1'}`,
                    borderRadius: '10px',
                    padding: '10px 0',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 12px' }}>
              2. Dooro Naqshadda Kaarka:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {cardThemes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: `1.5px solid ${selectedTheme.id === theme.id ? '#081d3d' : '#e2e8f0'}`,
                    background: selectedTheme.id === theme.id ? '#f8fafc' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <b style={{ fontSize: '12.5px', color: '#0a2c61' }}>{theme.name}</b>
                  <div style={{ width: '28px', height: '18px', borderRadius: '4px', background: theme.gradient }} />
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 12px' }}>
              3. Faahfaahinta Hadiyadda:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Magaca Saaxiibkaa"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                style={{ padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', outline: 'none' }}
              />
              <textarea
                rows={2}
                placeholder="Fariintaada Gaarka ah"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                style={{ padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', outline: 'none', resize: 'none' }}
              />
            </div>
          </div>

          {/* Virtual Card Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                background: selectedTheme.gradient,
                borderRadius: '24px',
                padding: '28px',
                color: selectedTheme.text,
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <b style={{ fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>TOKIYO STORE</b>
                  <span style={{ fontSize: '10px', display: 'block', opacity: 0.8 }}>OFFICIAL DIGITAL VOUCHER</span>
                </div>
                <b style={{ fontSize: '28px', fontWeight: 900 }}>${selectedAmount}</b>
              </div>

              <div>
                <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '0 0 10px', opacity: 0.9 }}>"{customMsg}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ fontSize: '11px', opacity: 0.8 }}>Loo diray: <b>{recipientName}</b></small>
                  <code style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>{generatedCode}</code>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  flex: 1,
                  background: '#081d3d',
                  color: '#ffffff',
                  border: 0,
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Code-ka Waa La Kobiyeeyay!' : 'Kobi Gift Code-ka'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  background: '#25d366',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 900,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
                }}
              >
                <PhoneCall size={16} />
                <span>U Dir WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
