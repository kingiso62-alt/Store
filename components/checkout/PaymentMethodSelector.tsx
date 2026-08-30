'use client';
import { useState } from 'react';
import { PhoneCall, CreditCard, ShieldCheck, Check } from 'lucide-react';

const paymentOptions = [
  {
    id: 'evc',
    name: 'EVC Plus',
    operator: 'Hormuud Telecom',
    ussd: '*712*613667676*AMOUNT#',
    badge: 'AUTOMATED 24/7',
    color: '#16a34a',
    bg: '#f0fdf4'
  },
  {
    id: 'zaad',
    name: 'Zaad Service',
    operator: 'Telesom',
    ussd: '*880*63XXXXXXX*AMOUNT#',
    badge: 'INSTANT',
    color: '#d91f2d',
    bg: '#fef2f2'
  },
  {
    id: 'sahal',
    name: 'Sahal Service',
    operator: 'Golis Telecom',
    ussd: '*888*90XXXXXXX*AMOUNT#',
    badge: 'INSTANT',
    color: '#7c3aed',
    bg: '#f5f3ff'
  },
  {
    id: 'edahab',
    name: 'eDahab',
    operator: 'Dahabshiil',
    ussd: '*789*XXXXXXX*AMOUNT#',
    badge: 'INSTANT',
    color: '#d97706',
    bg: '#fffbeb'
  },
  {
    id: 'card',
    name: 'Visa / Mastercard',
    operator: 'International & Local Bank',
    ussd: 'Online Secure 3DS Payment',
    badge: 'SECURE',
    color: '#2563eb',
    bg: '#eff6ff'
  }
];

export default function PaymentMethodSelector() {
  const [selected, setSelected] = useState('evc');

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>
          Dooro Habka Lacag Bixinta (Payment Method)
        </h3>
        <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} />
          <span>100% Sugan</span>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {paymentOptions.map((opt) => {
          const isCurrent = selected === opt.id;
          return (
            <label
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                border: `1.5px solid ${isCurrent ? opt.color : '#e2e8f0'}`,
                background: isCurrent ? opt.bg : '#ffffff',
                cursor: 'pointer',
                transition: 'all .15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.id}
                  checked={isCurrent}
                  onChange={() => setSelected(opt.id)}
                  style={{ accentColor: opt.color, width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <b style={{ fontSize: '13.5px', color: '#0a2c61' }}>{opt.name}</b>
                    <span style={{ fontSize: '9.5px', fontWeight: 900, background: opt.bg, color: opt.color, border: `1px solid ${opt.color}30`, padding: '1px 6px', borderRadius: '4px' }}>
                      {opt.badge}
                    </span>
                  </div>
                  <small style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                    {opt.operator} • Code: <code style={{ color: opt.color, fontWeight: 700 }}>{opt.ussd}</code>
                  </small>
                </div>
              </div>

              {isCurrent && (
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: opt.color, color: '#ffffff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Check size={13} strokeWidth={3} />
                </div>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
