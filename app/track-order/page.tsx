'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  ChevronLeft, RotateCw, ShoppingBag, CheckCircle2, 
  Wallet, Search, Clock, ArrowRight, ExternalLink,
  PhoneCall, ShieldCheck, Copy, Check
} from 'lucide-react';

interface OrderItem {
  id: string;
  game: string;
  gameIcon: string;
  package: string;
  playerId: string;
  amount: number;
  status: 'completed' | 'processing';
  date: string;
  paymentMethod: string;
  reference: string;
}

const mockOrders: OrderItem[] = [
  {
    id: 'TK-984210',
    game: 'PUBG Mobile UC',
    gameIcon: '/images/games/pubg-mobile.png',
    package: '600 + 60 UC',
    playerId: '5129847120',
    amount: 8.99,
    status: 'completed',
    date: '2026-08-30 19:42',
    paymentMethod: 'EVC Plus (*770#)',
    reference: 'EVC-8839104'
  },
  {
    id: 'TK-881294',
    game: 'Free Fire Diamonds',
    gameIcon: '/images/games/free-fire.png',
    package: '520 + 52 Diamonds',
    playerId: '198273641',
    amount: 4.99,
    status: 'completed',
    date: '2026-08-29 14:15',
    paymentMethod: 'Zaad Service',
    reference: 'ZAD-1029384'
  },
  {
    id: 'TK-773019',
    game: 'eFootball 2024 Coins',
    gameIcon: '/images/games/efootball-android.png',
    package: '1,050 Coins',
    playerId: '448-912-301',
    amount: 7.99,
    status: 'processing',
    date: '2026-08-30 20:01',
    paymentMethod: 'Premier Bank',
    reference: 'PB-994821'
  }
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'COMPLETED' | 'PROCESSING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Read any local orders saved from cart / checkout
    try {
      const local = localStorage.getItem('tokiyo_user_orders');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders([...parsed, ...mockOrders]);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const copyRef = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesTab = 
      activeTab === 'ALL' ? true :
      activeTab === 'COMPLETED' ? o.status === 'completed' :
      o.status === 'processing';

    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.playerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.reference.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalCount = orders.length;
  const paidCount = orders.filter(o => o.status === 'completed').length;
  const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '24px', paddingBottom: '70px', maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Top Header Row (Back Button + Title + Refresh) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link 
              href="/" 
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1.5px solid #e2e8f0', display: 'grid', placeItems: 'center', color: '#0a2c61', textDecoration: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Dalabkaga</h1>
          </div>

          <button 
            type="button" 
            onClick={handleRefresh}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 0, color: '#64748b', fontSize: '12px', fontWeight: 800, cursor: 'pointer', letterSpacing: '.4px' }}
          >
            <RotateCw size={14} className={isRefreshing ? 'spinAnim' : ''} />
            <span>REFRESH</span>
          </button>
        </div>

        {/* 3 Summary Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '22px' }}>
          {/* Card 1: Total */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#eef4fc', color: '#2563eb', display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}>
              <ShoppingBag size={18} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0a2c61', margin: '0 0 2px' }}>{totalCount}</h2>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px' }}>TOTAL</span>
          </div>

          {/* Card 2: Paid */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}>
              <CheckCircle2 size={18} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#10b981', margin: '0 0 2px' }}>{paidCount}</h2>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px' }}>PAID</span>
          </div>

          {/* Card 3: Spent */}
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px 16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(10,44,97,0.03)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fff7ed', color: '#ea580c', display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}>
              <Wallet size={18} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ea580c', margin: '0 0 2px' }}>${totalSpent.toFixed(2)}</h2>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '.5px' }}>SPENT</span>
          </div>
        </div>

        {/* Filter Tabs Capsule */}
        <div style={{ background: '#edf2f7', padding: '4px', borderRadius: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '16px' }}>
          <button 
            type="button" 
            onClick={() => setActiveTab('ALL')}
            style={{ padding: '8px 12px', border: 0, borderRadius: '20px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', background: activeTab === 'ALL' ? '#ffffff' : 'transparent', color: activeTab === 'ALL' ? '#0a2c61' : '#64748b', boxShadow: activeTab === 'ALL' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none', transition: 'all .2s' }}
          >
            📋 ALL
          </button>

          <button 
            type="button" 
            onClick={() => setActiveTab('COMPLETED')}
            style={{ padding: '8px 12px', border: 0, borderRadius: '20px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', background: activeTab === 'COMPLETED' ? '#ffffff' : 'transparent', color: activeTab === 'COMPLETED' ? '#0a2c61' : '#64748b', boxShadow: activeTab === 'COMPLETED' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none', transition: 'all .2s' }}
          >
            ✓ COMPLETED
          </button>

          <button 
            type="button" 
            onClick={() => setActiveTab('PROCESSING')}
            style={{ padding: '8px 12px', border: 0, borderRadius: '20px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', background: activeTab === 'PROCESSING' ? '#ffffff' : 'transparent', color: activeTab === 'PROCESSING' ? '#0a2c61' : '#64748b', boxShadow: activeTab === 'PROCESSING' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none', transition: 'all .2s' }}
          >
            ⏱️ PROCESSING
          </button>
        </div>

        {/* Search Input Bar */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Raadi dalab (ID, Game, Player ID, Reference)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 14px 12px 38px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none', background: '#ffffff' }}
          />
        </div>

        {/* Orders List Container */}
        {filteredOrders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredOrders.map((ord) => (
              <div 
                key={ord.id} 
                style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '16px', padding: '18px', boxShadow: '0 4px 18px rgba(10,44,97,0.03)', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={ord.gameIcon} 
                      alt={ord.game} 
                      style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #edf2f7' }}
                    />
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#0a2c61', margin: '0 0 2px' }}>{ord.game}</h3>
                      <span style={{ fontSize: '11.5px', color: '#d91f2d', fontWeight: 800 }}>{ord.package}</span>
                    </div>
                  </div>

                  <span 
                    style={{ 
                      background: ord.status === 'completed' ? '#ecfdf5' : '#fffbeb', 
                      color: ord.status === 'completed' ? '#059669' : '#d97706', 
                      border: `1px solid ${ord.status === 'completed' ? '#a7f3d0' : '#fde68a'}`, 
                      padding: '4px 10px', 
                      borderRadius: '8px', 
                      fontSize: '11px', 
                      fontWeight: 900,
                      textTransform: 'uppercase'
                    }}
                  >
                    {ord.status === 'completed' ? '✓ Completed' : '⏱️ Processing'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', fontSize: '11.5px' }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Player ID:</span>
                    <b style={{ color: '#0a2c61' }}>{ord.playerId}</b>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Qiimaha:</span>
                    <b style={{ color: '#0a2c61' }}>${ord.amount.toFixed(2)}</b>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Payment:</span>
                    <span style={{ color: '#475569', fontWeight: 700 }}>{ord.paymentMethod}</span>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Taariikhda:</span>
                    <span style={{ color: '#475569' }}>{ord.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <button 
                    type="button" 
                    onClick={() => copyRef(ord.id, ord.id)}
                    style={{ background: 'transparent', border: 0, color: '#64748b', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === ord.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{copiedId === ord.id ? 'Waa la guuriyay!' : ord.id}</span>
                  </button>

                  <a 
                    href={`https://wa.me/252613667676?text=Asc%20TOKIYO%20STORE%20dalabkeyga%20${ord.id}%20ayaan%20su%27aal%20ka%20qabaa`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#25d366', fontSize: '11.5px', fontWeight: 800, textDecoration: 'none' }}
                  >
                    <PhoneCall size={13} />
                    <span>WhatsApp Help</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State as in Screenshot 1 */
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '18px', padding: '60px 20px', textAlign: 'center', boxShadow: '0 4px 18px rgba(10,44,97,0.02)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#f8fafc', color: '#cbd5e1', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
              <ShoppingBag size={28} />
            </div>
            <p style={{ fontSize: '12.5px', fontWeight: 800, color: '#94a3b8', margin: 0, letterSpacing: '.6px', textTransform: 'uppercase' }}>
              WAX DALAB AH ({activeTab}) LAMA HELIN
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
