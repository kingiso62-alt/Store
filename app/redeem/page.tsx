'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { KeyRound, CheckCircle2, AlertCircle, Copy, ArrowRight, Sparkles, Gift } from 'lucide-react';
import Link from 'next/link';

interface CodeResult {
  code: string;
  name: string;
  type: string;
  value: string;
  status: 'valid' | 'invalid';
  game: string;
}

const promoDatabase: Record<string, CodeResult> = {
  'TOKIYO30': {
    code: 'TOKIYO30',
    name: '30% Flash Discount Voucher',
    type: 'Discount',
    value: '30% OFF Any Top-Up',
    status: 'valid',
    game: 'PUBG / Free Fire / eFootball'
  },
  'VIP50': {
    code: 'VIP50',
    name: 'VIP High Roller Bonus',
    type: 'Gift Card',
    value: '$50.00 Balance',
    status: 'valid',
    game: 'All Games'
  },
  'PUBG660': {
    code: 'PUBG660',
    name: '600 + 60 UC Direct Voucher',
    type: 'Game Package',
    value: '660 Unknown Cash',
    status: 'valid',
    game: 'PUBG Mobile Global'
  },
  'FREEFIRE100': {
    code: 'FREEFIRE100',
    name: '100 + 10 Diamonds Voucher',
    type: 'Diamonds',
    value: '110 Diamonds',
    status: 'valid',
    game: 'Garena Free Fire'
  }
};

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CodeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setResult(null);

    setTimeout(() => {
      const cleanCode = code.trim().toUpperCase();
      if (promoDatabase[cleanCode]) {
        setResult(promoDatabase[cleanCode]);
      } else if (cleanCode.includes('TOKIYO') || cleanCode.includes('VIP')) {
        setResult({
          code: cleanCode,
          name: 'Official Tokiyo Promotional Credit',
          type: 'Store Credit',
          value: '$10.00 USD Credit',
          status: 'valid',
          game: 'All 12 Games'
        });
      } else {
        setErrorMsg('Code-kani ma jiro, waa qalad ama horay ayaa loo isticmaalay. Fadlan hubi xarfaha.');
      }
      setLoading(false);
    }, 450);
  };

  const applySample = (c: string) => {
    setCode(c);
  };

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '30px', paddingBottom: '60px', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ background: '#ffffff', border: '1.5px solid #e5edf7', borderRadius: '18px', padding: '28px 24px', boxShadow: '0 6px 24px rgba(10, 44, 97, 0.06)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#eef4fc', color: '#0a2c61', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
              <KeyRound size={24} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>Code Checker &amp; Redeem</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Gali Voucher Code, Promo Code, ama Gift Card si aad u hubiso ansaxnimada iyo qiimaha.</p>
          </div>

          <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input 
              type="text" 
              placeholder="Gali Code-ka (e.g. TOKIYO30, VIP50)" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none', textAlign: 'center', fontWeight: 800, letterSpacing: '1px' }}
              required
            />
            <button 
              type="submit"
              disabled={loading}
              style={{ background: '#0a2c61', color: '#ffffff', border: 0, padding: '13px', borderRadius: '10px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Sparkles size={16} />
              <span>{loading ? 'Hubinayaa...' : 'HUBI & FUR CODE-KA (CHECK CODE)'}</span>
            </button>
          </form>

          {/* Quick Demo Codes to Test */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#8c9eb5' }}>Tijaabi Codes:</span>
            {['TOKIYO30', 'VIP50', 'PUBG660', 'FREEFIRE100'].map((c) => (
              <button 
                key={c}
                type="button" 
                onClick={() => applySample(c)}
                style={{ background: '#f1f5f9', border: '1px dashed #cbd5e1', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', color: '#0a2c61', fontWeight: 800, cursor: 'pointer' }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Successful Valid Code Result */}
          {result && (
            <div style={{ marginTop: '22px', padding: '18px', borderRadius: '14px', background: '#f0fdf4', border: '1.5px solid #86efac', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginBottom: '8px' }}>
                <CheckCircle2 size={20} />
                <h3 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>Hambalyo! Code-kani waa Mid Ansax ah</h3>
              </div>

              <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                <div>
                  <b style={{ color: '#0a2c61', fontSize: '13px', display: 'block' }}>{result.name}</b>
                  <small style={{ color: '#64748b', fontSize: '11px' }}>Ciyaarta: {result.game}</small>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 900 }}>
                  {result.value}
                </span>
              </div>

              <Link 
                href="/topup/order?game=pubg" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#16a34a', color: '#ffffff', padding: '11px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none', marginTop: '10px' }}
              >
                <span>Isticmaal Hadda (Recharge With Discount)</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Error / Invalid Code Alert */}
          {errorMsg && (
            <div style={{ marginTop: '20px', padding: '14px', borderRadius: '12px', background: '#fef2f2', border: '1.5px solid #fca5a5', color: '#991b1b', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
