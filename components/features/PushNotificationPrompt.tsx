'use client';
import { useState, useEffect } from 'react';
import { Bell, X, Check, ShieldCheck, Zap } from 'lucide-react';

export default function PushNotificationPrompt() {
  const [show, setShow] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('tokiyo_notif_prompt_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShow(true);
        }, 6000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleEnable = () => {
    setGranted(true);
    try {
      localStorage.setItem('tokiyo_notif_prompt_dismissed', 'true');
      if ('Notification' in window) {
        Notification.requestPermission();
      }
    } catch {
      // ignore
    }
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const handleDismiss = () => {
    setShow(false);
    try {
      localStorage.setItem('tokiyo_notif_prompt_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '20px',
        zIndex: 99990,
        maxWidth: '360px',
        width: 'calc(100% - 40px)',
        background: '#ffffff',
        border: '1.5px solid #2563eb',
        borderRadius: '18px',
        padding: '16px 18px',
        boxShadow: '0 16px 40px rgba(10, 44, 97, 0.2)',
        animation: 'slideUp .3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
            <Bell size={18} />
          </div>
          <div>
            <b style={{ fontSize: '13.5px', color: '#0a2c61', display: 'block' }}>Habeysi Ogeysiisyada 🔔</b>
            <small style={{ fontSize: '11px', color: '#64748b' }}>Flash Sale &amp; Xaaladda Dalabkaaga</small>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          style={{ background: 'transparent', border: 0, color: '#94a3b8', cursor: 'pointer', padding: '2px', display: 'grid', placeItems: 'center' }}
        >
          <X size={15} />
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4', margin: '0 0 14px' }}>
        Ma rabtaa in laguula socodsiiyo marka dalabkaagu guuleysto iyo marka qiimo dhimis cusub la bilaabo?
      </p>

      {granted ? (
        <div style={{ background: '#ecfdf5', border: '1px solid #86efac', borderRadius: '10px', padding: '8px', textAlign: 'center', color: '#166534', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Check size={14} />
          <span>Ogeysiisyada Waa La Oggolaaday!</span>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleEnable}
            style={{
              flex: 1,
              background: '#081d3d',
              color: '#ffffff',
              border: 0,
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <Zap size={13} color="#facc15" />
            <span>Oggolow (Enable)</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: '#f1f5f9',
              color: '#64748b',
              border: 0,
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Hadhow
          </button>
        </div>
      )}
    </div>
  );
}
