'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Trophy, Users, Calendar, Award, PhoneCall, CheckCircle2, Zap, ArrowLeft, ShieldCheck } from 'lucide-react';

const upcomingTournaments = [
  {
    id: 'pubg-squad-1',
    game: 'PUBG Mobile',
    icon: '/images/games/pubg-mobile.png',
    title: 'Somali PUBG Squad Championship (Erangel & Miramar)',
    mode: 'Squad (4 Players)',
    date: 'Jimco, 8:30 PM (Mogadishu Time)',
    prizePool: '$150 USD + 6,000 UC',
    entryFee: '$5.00 / Squad',
    slots: '25 Squads (18 Buuxsamay)',
    status: 'OPEN',
    rules: ['Dhammaan aaladaha Mobile-ka waa la oggol yahay (No Emulators)', 'Room ID & Password waxaa lagu helayaa WhatsApp 15 daqiiqo ka hor ciyaarta', 'Abaalmarinta waxaa toos loogu shubayaa EVC Plus / UC isla habeenkaas']
  },
  {
    id: 'ff-clash-1',
    game: 'Free Fire',
    icon: '/images/games/free-fire.png',
    title: 'Free Fire 4v4 Clash Squad Masters',
    mode: 'Clash Squad (4v4)',
    date: 'Sabti, 7:00 PM (Mogadishu Time)',
    prizePool: '$100 USD + 5,000 Diamonds',
    entryFee: '$3.00 / Squad',
    slots: '16 Squads (11 Buuxsamay)',
    status: 'OPEN',
    rules: ['Gun attributes waa OFF', 'Character skills waa ON', 'Kaalinta 1-aad: $70 + 3,000 Diamonds, Kaalinta 2-aad: $30 + 2,000 Diamonds']
  },
  {
    id: 'efootball-cup-1',
    game: 'eFootball Mobile',
    icon: '/images/games/efootball-android.png',
    title: 'eFootball Somali Solo Knockout Cup',
    mode: '1v1 Solo (Home & Away)',
    date: 'Axad, 5:00 PM (Mogadishu Time)',
    prizePool: '$80 USD + 3,000 Coins',
    entryFee: '$2.00 / Player',
    slots: '32 Ciyaartoy (24 Buuxsamay)',
    status: 'OPEN',
    rules: ['Match duration: 10 daqiiqo + Extra Time + Penalties', 'Natiijada waxaa lagu soo dirayaa Screenshot WhatsApp-ka maamulka']
  }
];

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState(upcomingTournaments[0]);

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '28px', paddingBottom: '70px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748b' }}>Home</Link>
            <span>/</span>
            <b style={{ color: '#0a2c61' }}>Esports Tournaments</b>
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
            padding: '36px 28px',
            color: '#ffffff',
            marginBottom: '32px',
            boxShadow: '0 12px 36px rgba(8, 29, 61, 0.25)',
            border: '1.5px solid #1e3a8a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ maxWidth: '560px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#eab308', color: '#713f12', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
              🏆 TOKIYO ESPORTS LEAGUE
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '8px 0 6px', color: '#ffffff' }}>
              Tartamada &amp; Custom Rooms-ka Soomaaliya
            </h1>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
              Ku biir tartamada toddobaadlaha ah ee PUBG Mobile, Free Fire &amp; eFootball. Ku guuleyso lacago caddaan ah iyo UC toos ah!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px 18px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
              <b style={{ fontSize: '20px', color: '#facc15', display: 'block' }}>$330+</b>
              <small style={{ fontSize: '10.5px', color: '#cbd5e1' }}>Todobaadkan Prize Pool</small>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px 18px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
              <b style={{ fontSize: '20px', color: '#4ade80', display: 'block' }}>70+</b>
              <small style={{ fontSize: '10.5px', color: '#cbd5e1' }}>Squads Diiwaangashan</small>
            </div>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {upcomingTournaments.map((t) => (
            <div
              key={t.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #edf2f7',
                borderRadius: '20px',
                padding: '22px',
                boxShadow: '0 8px 24px rgba(10,44,97,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Card Top */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={t.icon} alt={t.game} style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div>
                      <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block' }}>{t.game}</b>
                      <small style={{ fontSize: '11px', color: '#64748b' }}>{t.mode}</small>
                    </div>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 900, background: '#ecfdf5', color: '#16a34a', border: '1px solid #86efac', padding: '3px 8px', borderRadius: '6px' }}>
                    ● {t.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0a2c61', margin: '0 0 14px' }}>
                  {t.title}
                </h3>

                {/* Details list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px' }}>
                    <span style={{ color: '#64748b' }}>📅 Taariikhda:</span>
                    <b style={{ color: '#0a2c61' }}>{t.date}</b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fefce8', padding: '6px 10px', borderRadius: '8px', border: '1px solid #fef08a' }}>
                    <span style={{ color: '#854d0e', fontWeight: 800 }}>🏆 Prize Pool:</span>
                    <b style={{ color: '#ca8a04', fontSize: '13px' }}>{t.prizePool}</b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px' }}>
                    <span style={{ color: '#64748b' }}>💵 Lacagta Gelitaanka:</span>
                    <b style={{ color: '#16a34a' }}>{t.entryFee}</b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px' }}>
                    <span style={{ color: '#64748b' }}>👥 Boosaska:</span>
                    <b style={{ color: '#0a2c61' }}>{t.slots}</b>
                  </div>
                </div>

                {/* Rules */}
                <div style={{ marginBottom: '18px' }}>
                  <small style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '4px' }}>SHURUUDAHA GUUD:</small>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#475569', lineHeight: '1.4' }}>
                    {t.rules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Register Button */}
              <a
                href={`https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%2C%20waxaan%20rabaa%20in%20aan%20isu%20diiwaangeliyo%20${encodeURIComponent(t.title)}%20(Entry%3A%20${encodeURIComponent(t.entryFee)})`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25d366',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 900,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
                }}
              >
                <PhoneCall size={16} />
                <span>Isu Diiwaangeli WhatsApp (1-Click)</span>
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
