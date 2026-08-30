'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Tv, Play, Radio, ArrowLeft, Users, Trophy, PhoneCall, Calendar } from 'lucide-react';

const matches = [
  {
    id: 1,
    title: 'PUBG Mobile Somali Scrims - Tier 1 Squads',
    game: 'PUBG Mobile',
    teams: 'Somali Titans vs Horn Of Africa vs Mogadishu Kings',
    time: 'CAWA 08:30 PM (Somalia Time)',
    status: 'LIVE NOW 🔴',
    viewers: '1,420 Viewers',
    streamUrl: 'https://youtube.com',
    thumbnail: '/images/games/pubg-mobile.png'
  },
  {
    id: 2,
    title: 'Free Fire Clash Squad 4v4 Championship Finals',
    game: 'Free Fire',
    teams: 'Hargeisa Elite vs Puntland Warriors',
    time: 'BERRI 09:00 PM',
    status: 'UPCOMING ⏰',
    viewers: '850 Registrations',
    streamUrl: 'https://youtube.com',
    thumbnail: '/images/games/free-fire.png'
  },
  {
    id: 3,
    title: 'eFootball Mobile Cup Season 2 - Semi Finals',
    game: 'eFootball 2025',
    teams: 'Top 8 Somali Pro Players',
    time: 'Jimco 04:00 PM',
    status: 'UPCOMING ⏰',
    viewers: '420 Registrations',
    streamUrl: 'https://youtube.com',
    thumbnail: '/images/games/efootball-android.png'
  }
];

export default function StreamsPage() {
  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Somali Esports Streams</b>
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
            background: 'linear-gradient(135deg, #081d3d 0%, #1e1b4b 100%)',
            borderRadius: '24px',
            padding: '32px 26px',
            color: '#ffffff',
            marginBottom: '28px',
            boxShadow: '0 12px 36px rgba(8, 29, 61, 0.25)',
            border: '1.5px solid #312e81',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Radio size={16} color="#ef4444" />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#f87171' }}>
                SOMALI ESPORTS LIVE BROADCAST
              </span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '2px 0 4px', color: '#ffffff' }}>
              Tartamada &amp; Ciyaaraha Tooska ah ee Soomaaliya
            </h1>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>
              Daawo kulamada ugu adag ee PUBG Squads, Free Fire 4v4 iyo eFootball ee ka socda guud ahaan gobollada dalka.
            </p>
          </div>

          <a
            href="https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20waxaan%20rabaa%20in%20clankeygu%20ka%20qeybgalo%20Scrims-ka"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#25d366', color: '#ffffff', padding: '10px 18px', borderRadius: '12px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(37,211,102,0.3)' }}
          >
            <PhoneCall size={14} />
            <span>Diiwaangeli Kooxdaada (WhatsApp)</span>
          </a>
        </div>

        {/* Live Matches List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {matches.map((m) => (
            <div
              key={m.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #edf2f7',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 6px 20px rgba(10,44,97,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={m.thumbnail}
                  alt={m.title}
                  style={{ width: '58px', height: '58px', borderRadius: '14px', objectFit: 'cover', border: '1px solid #edf2f7' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 900, background: m.status.includes('LIVE') ? '#fee2e2' : '#eff6ff', color: m.status.includes('LIVE') ? '#dc2626' : '#2563eb', padding: '2px 8px', borderRadius: '4px' }}>
                      {m.status}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{m.viewers}</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: '0 0 2px' }}>{m.title}</h3>
                  <small style={{ fontSize: '11.5px', color: '#64748b' }}>{m.teams} • <b>{m.time}</b></small>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href={m.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#081d3d',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Play size={14} fill="#ffffff" />
                  <span>Daawo Toos (Watch Live)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
