'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Activity, CheckCircle2, Zap, ArrowLeft, Clock, ShieldCheck, RefreshCw, Server } from 'lucide-react';

const serverServices = [
  { id: 'pubg', name: 'PUBG Mobile Direct API', provider: 'Tencent / Midasbuy Global', latency: '12ms', speed: '10 - 25 Ilbiriqsi', uptime: '99.98%', status: 'OPERATIONAL 🟢' },
  { id: 'ff', name: 'Free Fire Garena Direct', provider: 'Garena Official ID Top-Up', latency: '8ms', speed: '5 - 15 Ilbiriqsi', uptime: '100%', status: 'OPERATIONAL 🟢' },
  { id: 'ef_and', name: 'eFootball Android API', provider: 'Konami Android Server Gateway', latency: '15ms', speed: '15 - 35 Ilbiriqsi', uptime: '99.95%', status: 'OPERATIONAL 🟢' },
  { id: 'ef_ios', name: 'eFootball iOS Coins Gateway', provider: 'Apple ID Top-Up Direct', latency: '18ms', speed: '30 - 60 Ilbiriqsi', uptime: '99.90%', status: 'OPERATIONAL 🟢' },
  { id: 'mlbb', name: 'Mobile Legends API', provider: 'Moonton Direct Recharge', latency: '9ms', speed: '5 - 10 Ilbiriqsi', uptime: '100%', status: 'OPERATIONAL 🟢' },
  { id: 'roblox', name: 'Roblox Digital Pin Vault', provider: 'Roblox Digital Cards Inc.', latency: '5ms', speed: 'Instant Pin Code', uptime: '100%', status: 'OPERATIONAL 🟢' },
  { id: 'evc', name: 'EVC Plus Automated Gateway', provider: 'Hormuud Telecom Somalia', latency: '14ms', speed: 'Instant Confirmation', uptime: '99.99%', status: 'OPERATIONAL 🟢' },
  { id: 'zaad', name: 'Zaad Service Gateway', provider: 'Telesom Somaliland', latency: '16ms', speed: 'Instant Confirmation', uptime: '99.98%', status: 'OPERATIONAL 🟢' }
];

export default function StatusPage() {
  const [lastChecked, setLastChecked] = useState('Hadda (Just now)');

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Live Server Status</b>
          </div>

          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', textDecoration: 'none' }}
          >
            <ArrowLeft size={13} />
            <span>Ku Noqo Ciyaaraha</span>
          </Link>
        </div>

        {/* Status Header */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#4ade80' }}>
                ALL SYSTEMS OPERATIONAL (100% HEALTHY)
              </span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '2px 0 4px', color: '#ffffff' }}>
              Xaaladda Tooska ah ee Adeegyada Ciyaaraha
            </h1>
            <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0 }}>
              Dhammaan servers-ka PUBG, Free Fire, eFootball iyo EVC Plus waxay ku shaqeynayaan xawaare buuxa 24/7.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', fontSize: '11.5px', color: '#cbd5e1' }}>
            <RefreshCw size={13} color="#4ade80" />
            <span>Updated: {lastChecked}</span>
          </div>
        </div>

        {/* Services Table Card */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(10,44,97,0.04)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {serverServices.map((s) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  background: '#f8fafc',
                  border: '1px solid #edf2f7',
                  borderRadius: '14px',
                  padding: '14px 18px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#081d3d', color: '#ffffff', display: 'grid', placeItems: 'center' }}>
                    <Server size={18} color="#93c5fd" />
                  </div>
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#0a2c61', display: 'block' }}>{s.name}</b>
                    <small style={{ fontSize: '11px', color: '#64748b' }}>{s.provider}</small>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '10.5px', display: 'block' }}>Xawaaraha Shubidda:</span>
                    <b style={{ color: '#0a2c61' }}>{s.speed}</b>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '10.5px', display: 'block' }}>Latency:</span>
                    <b style={{ color: '#16a34a' }}>{s.latency}</b>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '10.5px', display: 'block' }}>Uptime:</span>
                    <b style={{ color: '#0a2c61' }}>{s.uptime}</b>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 900, background: '#ecfdf5', color: '#16a34a', border: '1px solid #86efac', padding: '4px 10px', borderRadius: '6px' }}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
