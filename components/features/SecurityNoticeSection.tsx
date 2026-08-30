'use client';
import { ShieldAlert, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export default function SecurityNoticeSection() {
  return (
    <section style={{ margin: '32px 0 24px' }}>
      <div
        style={{
          background: '#fffbeb',
          border: '1.5px solid #fde047',
          borderRadius: '18px',
          padding: '20px 22px',
          boxShadow: '0 4px 16px rgba(234, 179, 8, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '680px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef08a', color: '#854d0e', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '1px 6px', borderRadius: '4px' }}>
                DIGNIIN AMNI
              </span>
              <b style={{ fontSize: '14px', color: '#854d0e' }}>Kalsoonida &amp; Badbaadada Macaamiisha</b>
            </div>
            <p style={{ fontSize: '12px', color: '#713f12', margin: 0, lineHeight: '1.45' }}>
              Tokiyo Store <b>marna kuuma weydiinayo Password-ka ciyaartaada</b> ama SMS OTP Code-kaaga. Shubashada dhammaan ciyaaraha (PUBG, Free Fire, eFootball) waxay ku dhacaysaa <b>Player ID</b> oo kaliya.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#ecfdf5', color: '#166534', border: '1px solid #86efac', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#16a34a" />
            <span>100% Authorized &amp; Safe</span>
          </span>
        </div>
      </div>
    </section>
  );
}
