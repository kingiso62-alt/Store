'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Users, Plus, Trash2, ShieldCheck, Zap, ArrowLeft, PhoneCall, Check, DollarSign } from 'lucide-react';

interface SquadMember {
  id: number;
  game: string;
  playerId: string;
  zoneId: string;
  packName: string;
  price: number;
}

const gamePacks: Record<string, { name: string; price: number }[]> = {
  pubg: [
    { name: '60 UC', price: 0.95 },
    { name: '325 UC', price: 4.80 },
    { name: '660 UC (Royale Pass)', price: 9.50 },
    { name: '1800 UC', price: 24.00 }
  ],
  freefire: [
    { name: '100+10 Diamonds', price: 0.90 },
    { name: '310+31 Diamonds', price: 2.80 },
    { name: '520+52 Diamonds', price: 4.60 },
    { name: '1060+106 Diamonds', price: 9.20 }
  ],
  efootball: [
    { name: '130 Coins', price: 1.10 },
    { name: '550 Coins', price: 4.90 },
    { name: '1040 Coins', price: 9.30 }
  ]
};

export default function BulkTopupPage() {
  const [clanName, setClanName] = useState('Somali Titans Clan');
  const [members, setMembers] = useState<SquadMember[]>([
    { id: 1, game: 'pubg', playerId: '512984920', zoneId: '', packName: '660 UC (Royale Pass)', price: 9.50 },
    { id: 2, game: 'pubg', playerId: '598210344', zoneId: '', packName: '660 UC (Royale Pass)', price: 9.50 },
    { id: 3, game: 'pubg', playerId: '533109281', zoneId: '', packName: '660 UC (Royale Pass)', price: 9.50 },
    { id: 4, game: 'pubg', playerId: '544091823', zoneId: '', packName: '660 UC (Royale Pass)', price: 9.50 }
  ]);

  const addMember = () => {
    const nextId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    setMembers([
      ...members,
      { id: nextId, game: 'pubg', playerId: '', zoneId: '', packName: '660 UC (Royale Pass)', price: 9.50 }
    ]);
  };

  const removeMember = (id: number) => {
    if (members.length === 1) {
      alert('Fadlan ugu yaraan 1 xubin ku hay liiska.');
      return;
    }
    setMembers(members.filter(m => m.id !== id));
  };

  const updateMember = (id: number, field: string, value: any) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const updated = { ...m, [field]: value };
        if (field === 'game') {
          const defaultPack = gamePacks[value][0];
          updated.packName = defaultPack.name;
          updated.price = defaultPack.price;
        } else if (field === 'packName') {
          const pack = gamePacks[m.game].find(p => p.name === value);
          if (pack) updated.price = pack.price;
        }
        return updated;
      }
      return m;
    }));
  };

  const totalAmount = members.reduce((sum, m) => sum + m.price, 0);
  const totalSos = (totalAmount * 26000).toLocaleString();

  const generateWhatsAppMessage = () => {
    let msg = `Asc TOKIYO STORE! Waxaan rabaa Bulk Top-Up loogu talagalay Clanka (${clanName}):\n\n`;
    members.forEach((m, idx) => {
      msg += `${idx + 1}. [${m.game.toUpperCase()}] ID: ${m.playerId || 'N/A'} - ${m.packName} ($${m.price.toFixed(2)})\n`;
    });
    msg += `\nWadarta Guud: $${totalAmount.toFixed(2)} (${totalSos} SOS)\nFadlan noo soo geli EVC Plus.`;
    return msg;
  };

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Clan &amp; Squad Bulk Top-Up</b>
          </div>

          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', textDecoration: 'none' }}
          >
            <ArrowLeft size={13} />
            <span>Ku Noqo Ciyaaraha</span>
          </Link>
        </div>

        {/* Hero Header */}
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
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
              👥 SQUAD &amp; CLAN TOOL
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '6px 0 4px', color: '#ffffff' }}>
              Clan &amp; Squad Bulk Top-Up (Shubashada Kooxaha)
            </h1>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, maxWidth: '580px', lineHeight: '1.45' }}>
              U shub dhammaan xubnaha Clankaaga ama Squad-kaaga hal mar! Geli Player ID-yadooda, nidaamkuna wuxuu kuu xisaabinayaa wadarta guud.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '14px 22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#93c5fd', display: 'block' }}>Wadarta Xubnaha:</span>
            <b style={{ fontSize: '22px', color: '#ffffff' }}>{members.length} Ciyaartoy</b>
          </div>
        </div>

        {/* Clan Configuration & Table Card */}
        <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(10,44,97,0.04)', marginBottom: '28px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0a2c61' }}>
              Magaca Clanka / Kooxda:
            </label>
            <input
              type="text"
              value={clanName}
              onChange={(e) => setClanName(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: 800, color: '#0a2c61', outline: 'none', minWidth: '220px' }}
            />
          </div>

          {/* Members Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontSize: '11.5px', color: '#64748b', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 12px' }}>#</th>
                  <th style={{ padding: '10px 12px' }}>Ciyaarta</th>
                  <th style={{ padding: '10px 12px' }}>Player ID</th>
                  <th style={{ padding: '10px 12px' }}>Xirmada</th>
                  <th style={{ padding: '10px 12px' }}>Qiimaha ($)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>Tir</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, idx) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #edf2f7', fontSize: '12.5px' }}>
                    <td style={{ padding: '12px', fontWeight: 800, color: '#0a2c61' }}>{idx + 1}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={m.game}
                        onChange={(e) => updateMember(m.id, 'game', e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px', fontWeight: 700, outline: 'none' }}
                      >
                        <option value="pubg">PUBG Mobile</option>
                        <option value="freefire">Free Fire</option>
                        <option value="efootball">eFootball</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="text"
                        placeholder="Player ID (e.g. 512984920)"
                        value={m.playerId}
                        onChange={(e) => updateMember(m.id, 'playerId', e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px', fontWeight: 700, width: '160px', outline: 'none' }}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={m.packName}
                        onChange={(e) => updateMember(m.id, 'packName', e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px', fontWeight: 700, outline: 'none' }}
                      >
                        {gamePacks[m.game].map(p => (
                          <option key={p.name} value={p.name}>{p.name} (${p.price.toFixed(2)})</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 900, color: '#d91f2d' }}>
                      ${m.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => removeMember(m.id)}
                        style={{ background: '#fee2e2', border: 0, color: '#dc2626', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <button
              type="button"
              onClick={addMember}
              style={{
                background: '#f1f5f9',
                color: '#0a2c61',
                border: '1.5px solid #cbd5e1',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={16} />
              <span>Ku Dar Xubin Kale (Add Member)</span>
            </button>

            {/* Total Summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Wadarta Guud:</span>
                <b style={{ fontSize: '20px', color: '#0a2c61' }}>${totalAmount.toFixed(2)}</b>
                <small style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800, display: 'block' }}>({totalSos} SOS)</small>
              </div>

              <a
                href={`https://wa.me/252613667676?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25d366',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 900,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
                }}
              >
                <PhoneCall size={16} />
                <span>Dalbo Bulk Top-Up (1-Click)</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
