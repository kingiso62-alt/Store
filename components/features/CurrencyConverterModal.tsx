'use client';
import { useState } from 'react';
import { RefreshCw, X, DollarSign, Calculator, ArrowRightLeft } from 'lucide-react';

export default function CurrencyConverterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [usdAmount, setUsdAmount] = useState<number>(10);

  if (!isOpen) return null;

  // Real market rates for Somalia
  const sosRate = 26000; // 1 USD = 26,000 SOS (Hormuud)
  const slshRate = 8500; // 1 USD = 8,500 SLSH (Zaad)

  const sosTotal = (usdAmount * sosRate).toLocaleString();
  const slshTotal = (usdAmount * slshRate).toLocaleString();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 19, 41, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'grid',
        placeItems: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          animation: 'modalSlideUp .2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', display: 'grid', placeItems: 'center' }}>
              <Calculator size={18} />
            </div>
            <div>
              <b style={{ fontSize: '15px', color: '#0a2c61', display: 'block' }}>Qiimo-Xisaabiye &amp; Lacagaha</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>USD ⇄ EVC Plus ⇄ Zaad Rates</small>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 0, borderRadius: '50%', width: '28px', height: '28px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Input USD */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '6px' }}>
            Geli Qiimaha USD ($):
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 900, color: '#0a2c61', fontSize: '16px' }}>$</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={usdAmount}
              onChange={(e) => setUsdAmount(Number(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 28px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '16px',
                fontWeight: 900,
                color: '#0a2c61',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Quick Amount Pills */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          {[1, 5, 10, 25, 50, 100].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setUsdAmount(amt)}
              style={{
                flex: 1,
                background: usdAmount === amt ? '#0a2c61' : '#f1f5f9',
                color: usdAmount === amt ? '#ffffff' : '#0a2c61',
                border: 0,
                borderRadius: '6px',
                padding: '6px 0',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Converted Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* EVC Plus SOS */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#166534', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>EVC PLUS (SOS)</span>
              <small style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '2px' }}>Rate: 1 USD = 26,000 SOS</small>
            </div>
            <b style={{ fontSize: '16px', color: '#16a34a', fontWeight: 900 }}>{sosTotal} SOS</b>
          </div>

          {/* Zaad SLSH */}
          <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#991b1b', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>ZAAD (SL SHILLING)</span>
              <small style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '2px' }}>Rate: 1 USD = 8,500 SLSH</small>
            </div>
            <b style={{ fontSize: '16px', color: '#d91f2d', fontWeight: 900 }}>{slshTotal} SLSH</b>
          </div>
        </div>
      </div>
    </div>
  );
}
