'use client';
import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user previously dismissed
      const dismissed = localStorage.getItem('tokiyo_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('Si aad App-ka ugu shubato taleefankaaga, browser menu-ga (saddexda dhibcood) ka dooro "Add to Home Screen" ama "Install App".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      localStorage.setItem('tokiyo_pwa_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (!showPrompt) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99998,
        width: 'min(92%, 460px)',
        background: '#081d3d',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '12px 16px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
        border: '1.5px solid #2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        animation: 'slideDown .3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/images/tokiyo-emblem.png"
          alt="Tokiyo App"
          style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'contain', background: 'rgba(255,255,255,0.1)', padding: '2px' }}
        />
        <div>
          <b style={{ fontSize: '13px', color: '#ffffff', display: 'block' }}>
            Ku Shubo Tokiyo App 📲
          </b>
          <small style={{ fontSize: '11px', color: '#93c5fd' }}>
            Top-up degdeg ah oo 1-Click ah taleefankaaga
          </small>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          type="button"
          onClick={handleInstall}
          style={{
            background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
            color: '#081d3d',
            border: 0,
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '11.5px',
            fontWeight: 900,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Download size={13} />
          <span>INSTALL</span>
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          style={{ background: 'transparent', border: 0, color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'grid', placeItems: 'center' }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
