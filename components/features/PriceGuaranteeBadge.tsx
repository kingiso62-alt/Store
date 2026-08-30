'use client';
import { useState } from 'react';
import { ShieldCheck, X, Check, ArrowRight } from 'lucide-react';

export default function PriceGuaranteeBadge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          cursor: 'pointer',
          background: '#ecfdf5',
          border: '1.5px solid #86efac',
          borderRadius: '12px',
          padding: '8px 14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          margin: '8px 0'
        }}
      >
        <ShieldCheck size={18} color="#16a34a" />
        <div>
          <b style={{ fontSize: '11.5px', color: '#166534', display: 'block' }}>Dammaanadda Qiimaha Ugu Jaban</b>
          <small style={{ fontSize: '10px', color: '#15803d' }}>Haddii aad meel ka jaban hesho, farqiga ayaan kuu celinaynaa 100%!</small>
        </div>
      </div>

      {open && (
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
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '22px',
              padding: '24px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              animation: 'modalSlideUp .2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <b style={{ fontSize: '15px', color: '#0a2c61' }}>Lowest Price Guarantee 🇸🇴</b>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ background: '#f1f5f9', border: 0, borderRadius: '50%', width: '28px', height: '28px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={15} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: '0 0 16px' }}>
              Tokiyo Store waxaa ka go'an inay bixiso qiimaha ugu jaban ee PUBG UC, Free Fire Diamonds iyo eFootball Coins ee Soomaaliya.
            </p>

            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px', border: '1px solid #edf2f7', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#0a2c61' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#16a34a', fontWeight: 900 }}>✓</span>
                <span>Qiime Toos ah oo aan dillaal lahayn</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#16a34a', fontWeight: 900 }}>✓</span>
                <span>Lacag celin degdeg ah haddii qalad dhaco</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#16a34a', fontWeight: 900 }}>✓</span>
                <span>Qiimo dhimis gaar ah oo loogu talagalay Clanka</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{ width: '100%', background: '#081d3d', color: '#ffffff', border: 0, padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
            >
              Waan Fahmay (Got it)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
