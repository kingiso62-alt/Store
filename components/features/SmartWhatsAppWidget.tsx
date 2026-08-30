'use client';
import { useState } from 'react';
import { PhoneCall, X, Zap, ChevronRight, MessageSquare } from 'lucide-react';

const quickOptions = [
  { label: '🪙 Dalbo PUBG Mobile UC', text: 'Asc TOKIYO STORE, waxaan rabaa in aan dalbado PUBG UC' },
  { label: '💎 Dalbo Free Fire Diamonds', text: 'Asc TOKIYO STORE, waxaan rabaa in aan dalbado Free Fire Diamonds' },
  { label: '⚽ Dalbo eFootball Coins (Android / iOS)', text: 'Asc TOKIYO STORE, waxaan rabaa in aan dalbado eFootball Coins' },
  { label: '👑 Dalbo Mythic X-Suits & Supercars', text: 'Asc TOKIYO STORE, waxaan rabaa in aan dalbado X-Suits ama Supercars' },
  { label: '💬 Kala Hadal Taageerada Macaamiisha', text: 'Asc TOKIYO STORE, waxaan qabaa su\'aal guud' }
];

export default function SmartWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '22px', right: '18px', zIndex: 995 }}>
      {/* Mini Popup Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '62px',
            right: 0,
            width: '290px',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 16px 40px rgba(5, 19, 41, 0.25)',
            border: '1.5px solid #e2e8f0',
            overflow: 'hidden',
            animation: 'scaleUp .2s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ background: '#0a2c61', color: '#ffffff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <div>
                <b style={{ fontSize: '13px', display: 'block' }}>Tokiyo Live Support</b>
                <small style={{ fontSize: '10px', color: '#93c5fd' }}>Caadi ahaan ku jawaaba 1 daqiiqo</small>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 0, color: '#ffffff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Options */}
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <small style={{ fontSize: '10.5px', fontWeight: 800, color: '#64748b', paddingLeft: '4px' }}>
              DOORO ADEEGGA AAD RABTO:
            </small>

            {quickOptions.map((opt) => (
              <a
                key={opt.label}
                href={`https://wa.me/252613667676?text=${encodeURIComponent(opt.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f8fafc',
                  border: '1px solid #edf2f7',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#0a2c61',
                  textDecoration: 'none',
                  transition: 'background .15s'
                }}
              >
                <span>{opt.label}</span>
                <ChevronRight size={13} color="#94a3b8" />
              </a>
            ))}
          </div>

          {/* Footer note */}
          <div style={{ background: '#f1f5f9', padding: '8px 12px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
            <small style={{ fontSize: '10px', color: '#64748b' }}>
              WhatsApp: <b>+252 61 366 7676</b>
            </small>
          </div>
        </div>
      )}

      {/* Pulsing Floating WhatsApp Bubble Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Support"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#25d366',
          border: '2px solid #ffffff',
          color: '#ffffff',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          position: 'relative'
        }}
      >
        {isOpen ? <X size={24} /> : <PhoneCall size={24} />}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid #ffffff'
            }}
          />
        )}
      </button>
    </div>
  );
}
