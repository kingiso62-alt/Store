'use client';
import { useState, useRef } from 'react';
import { Download, Share2, Check, X, ShieldCheck, Zap, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    game: string;
    packageName: string;
    playerId: string;
    playerName?: string;
    amountUsd: number;
    paymentMethod: string;
    date?: string;
  };
}

export default function DownloadableReceiptModal({ isOpen, onClose, orderData }: ReceiptProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const receiptCardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const dateStr = orderData.date || new Date().toLocaleString('so-SO', { dateStyle: 'medium', timeStyle: 'short' });
  const sosPrice = (orderData.amountUsd * 27000).toLocaleString();

  const handleDownloadImage = () => {
    setDownloading(true);
    // Draw canvas receipt
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setDownloading(false);
      return;
    }

    // 1. Dark Esports Background
    const bgGrad = ctx.createLinearGradient(0, 0, 600, 760);
    bgGrad.addColorStop(0, '#06152d');
    bgGrad.addColorStop(0.5, '#091c3d');
    bgGrad.addColorStop(1, '#030c1b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 760);

    // 2. Gold Border
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 568, 728);

    // 3. Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TOKIYO STORE', 300, 70);

    ctx.fillStyle = '#93c5fd';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('RASMIS AH EE DHIJITAALKA CIYAARAHA SOOMAALIYA', 300, 95);

    // Success Badge
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.roundRect(180, 115, 240, 36, 18);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('✓ DALAB GUULEYSTAY', 300, 139);

    // Inner White Card
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(40, 175, 520, 440, 16);
    ctx.fill();

    // Receipt details
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('ORDER ID', 65, 215);
    ctx.fillStyle = '#0a2c61';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(orderData.orderId, 65, 240);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('TAARIIXDA', 350, 215);
    ctx.fillStyle = '#0a2c61';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText(dateStr, 350, 240);

    // Separator line
    ctx.strokeStyle = '#edf2f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(65, 260);
    ctx.lineTo(535, 260);
    ctx.stroke();

    // Game & Package
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('CIYAARTA & XIRMADDA', 65, 290);
    ctx.fillStyle = '#d91f2d';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(`${orderData.game} - ${orderData.packageName}`, 65, 315);

    // Player ID
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('PLAYER ID (USER ID)', 65, 360);
    ctx.fillStyle = '#0a2c61';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(orderData.playerId, 65, 388);

    // Payment Method
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('HABKA LACAG BIXINTA', 350, 360);
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText(orderData.paymentMethod || 'EVC Plus / Zaad', 350, 388);

    // Separator line
    ctx.strokeStyle = '#edf2f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(65, 415);
    ctx.lineTo(535, 415);
    ctx.stroke();

    // Total Amount
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText('WADARTA GUUD (TOTAL USD)', 65, 450);
    ctx.fillStyle = '#0a2c61';
    ctx.font = 'bold 30px Arial, sans-serif';
    ctx.fillText(`$${orderData.amountUsd.toFixed(2)} USD`, 65, 490);

    ctx.fillStyle = '#64748b';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText('QIIMAHA SHILLING-KA', 350, 450);
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText(`${sosPrice} SOS`, 350, 490);

    // Verification Seal
    ctx.fillStyle = '#ecfdf5';
    ctx.beginPath();
    ctx.roundRect(65, 525, 470, 60, 10);
    ctx.fill();
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.fillText('✓ RASMI: Dhibcooyinka si toos ah ayaa loogu shubay koontada ciyaarta.', 85, 560);

    // Footer contact
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mahadsanid! • WhatsApp: +252 61 366 7676 • www.tokiyostore.com', 300, 680);

    // Export image download
    const link = document.createElement('a');
    link.download = `Tokiyo-Receipt-${orderData.orderId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloading(false);
  };

  const shareWhatsApp = () => {
    const text = `Asc! Waxaan Tokiyo Store ka iibsaday ${orderData.game} (${orderData.packageName}). Order ID: ${orderData.orderId}. https://tokiyostore.com/track-order?id=${orderData.orderId}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 19, 41, 0.8)',
        backdropFilter: 'blur(8px)',
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
          borderRadius: '24px',
          padding: '24px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          animation: 'modalSlideUp .2s ease-out',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: '#f1f5f9', border: 0, borderRadius: '50%', width: '32px', height: '32px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <b style={{ fontSize: '16px', color: '#0a2c61', display: 'block' }}>Rasiidka Sawirka ah (Graphic Receipt)</b>
            <small style={{ fontSize: '11px', color: '#64748b' }}>Rasiid rasmi ah oo la degsan karo ama la wadaagi karo</small>
          </div>
        </div>

        {/* Graphic Receipt Card Preview */}
        <div
          ref={receiptCardRef}
          style={{
            background: 'linear-gradient(135deg, #091c3d 0%, #151036 100%)',
            border: '2px solid #facc15',
            borderRadius: '18px',
            padding: '20px',
            color: '#ffffff',
            marginBottom: '16px',
            boxShadow: '0 10px 25px rgba(9, 28, 61, 0.25)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px', marginBottom: '14px' }}>
            <div>
              <b style={{ fontSize: '16px', letterSpacing: '1px', color: '#ffffff' }}>TOKIYO STORE</b>
              <small style={{ fontSize: '10px', color: '#93c5fd', display: 'block' }}>Official Gaming Receipt</small>
            </div>
            <span style={{ fontSize: '10.5px', fontWeight: 900, background: '#16a34a', color: '#ffffff', padding: '3px 8px', borderRadius: '6px' }}>
              ✓ DELIVERED
            </span>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Order ID:</span>
              <b style={{ color: '#facc15' }}>{orderData.orderId}</b>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Ciyaarta:</span>
              <b style={{ color: '#ffffff' }}>{orderData.game}</b>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Xirmada:</span>
              <b style={{ color: '#f87171' }}>{orderData.packageName}</b>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Player ID:</span>
              <b style={{ color: '#67e8f9', fontFamily: 'monospace', fontSize: '13px' }}>{orderData.playerId}</b>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Wadarta (USD):</span>
              <b style={{ fontSize: '18px', color: '#4ade80' }}>${orderData.amountUsd.toFixed(2)}</b>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Shilling (SOS):</span>
              <b style={{ fontSize: '13px', color: '#facc15' }}>{sosPrice} SOS</b>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={downloading}
            style={{
              background: '#081d3d',
              color: '#ffffff',
              border: 0,
              padding: '11px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Download size={15} color="#facc15" />
            <span>{downloading ? 'Dajinayaa...' : 'Daji Sawirka (PNG)'}</span>
          </button>

          <button
            type="button"
            onClick={shareWhatsApp}
            style={{
              background: '#25d366',
              color: '#ffffff',
              border: 0,
              padding: '11px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <PhoneCall size={15} />
            <span>WhatsApp Status</span>
          </button>
        </div>
      </div>
    </div>
  );
}
