'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { 
  ArrowLeft, Wallet, TrendingUp, TrendingDown, 
  ShoppingBag, Send, History, Crown, Search, 
  Clock, Sparkles, CheckCircle2, ArrowRight, X, PhoneCall
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'EARNED' | 'USED';
  title: string;
  game: string;
  amount: number;
  date: string;
  status: string;
}

export default function CashbackPage() {
  const [activeAction, setActiveAction] = useState<'BUY' | 'WITHDRAW' | 'HISTORY' | 'TIERS'>('HISTORY');
  const [filterType, setFilterType] = useState<'ALL' | 'EARNED' | 'USED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [balance, setBalance] = useState(0.0000);
  const [earned, setEarned] = useState(0.0000);
  const [used, setUsed] = useState(0.0000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawPhone, setWithdrawPhone] = useState('+252 61 ');
  const [withdrawSuccess, setWithdrawSuccess] = useState('');

  // Load from local storage or initialize
  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem('tokiyo_cashback_balance');
      const savedEarned = localStorage.getItem('tokiyo_cashback_earned');
      const savedUsed = localStorage.getItem('tokiyo_cashback_used');
      const savedTxs = localStorage.getItem('tokiyo_cashback_txs');

      if (savedBalance) setBalance(parseFloat(savedBalance));
      if (savedEarned) setEarned(parseFloat(savedEarned));
      if (savedUsed) setUsed(parseFloat(savedUsed));
      if (savedTxs) setTransactions(JSON.parse(savedTxs));
    } catch {
      // fallback
    }
  }, []);

  // Demo simulation function to test earning cashback
  const handleClaimDemoReward = () => {
    const rewardAmount = 0.5000;
    const newBal = balance + rewardAmount;
    const newEarned = earned + rewardAmount;
    const newTx: Transaction = {
      id: `CB-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'EARNED',
      title: 'VIP Welcome Cashback Bonus',
      game: 'PUBG Mobile UC',
      amount: rewardAmount,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      status: 'Completed'
    };
    const updatedTxs = [newTx, ...transactions];

    setBalance(newBal);
    setEarned(newEarned);
    setTransactions(updatedTxs);

    try {
      localStorage.setItem('tokiyo_cashback_balance', newBal.toFixed(4));
      localStorage.setItem('tokiyo_cashback_earned', newEarned.toFixed(4));
      localStorage.setItem('tokiyo_cashback_txs', JSON.stringify(updatedTxs));
    } catch {
      // fallback
    }
  };

  // Withdraw submit
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (balance < 1.0) {
      alert('Lacagta ugu yar ee la labixi karo waa $1.00.');
      return;
    }
    const withdrawAmount = balance;
    const newBal = 0.0000;
    const newUsed = used + withdrawAmount;
    const newTx: Transaction = {
      id: `WD-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'USED',
      title: `Kala-bixid EVC/Zaad (${withdrawPhone})`,
      game: 'Cashback Payout',
      amount: withdrawAmount,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      status: 'Processing'
    };
    const updatedTxs = [newTx, ...transactions];

    setBalance(newBal);
    setUsed(newUsed);
    setTransactions(updatedTxs);

    try {
      localStorage.setItem('tokiyo_cashback_balance', '0.0000');
      localStorage.setItem('tokiyo_cashback_used', newUsed.toFixed(4));
      localStorage.setItem('tokiyo_cashback_txs', JSON.stringify(updatedTxs));
    } catch {
      // fallback
    }

    setWithdrawSuccess(`Codsigaaga $${withdrawAmount.toFixed(2)} si guul leh ayaa loo diray nambarka ${withdrawPhone}.`);
    setTimeout(() => {
      setShowWithdrawModal(false);
      setWithdrawSuccess('');
    }, 2000);
  };

  const filteredTxs = transactions.filter(t => {
    if (filterType === 'EARNED' && t.type !== 'EARNED') return false;
    if (filterType === 'USED' && t.type !== 'USED') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.game.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="wrap" style={{ paddingTop: '16px', paddingBottom: '70px', maxWidth: '540px', margin: '0 auto' }}>
        
        {/* TOP CASHBACK HERO WALLET CARD */}
        <div style={{
          background: 'radial-gradient(circle at 85% 30%, rgba(245, 158, 11, 0.18) 0%, transparent 60%), linear-gradient(145deg, #051329 0%, #0d1e3d 45%, #180d32 85%, #2a0b18 100%)',
          borderRadius: '24px',
          padding: '24px 20px',
          color: '#ffffff',
          boxShadow: '0 12px 36px rgba(5, 19, 41, 0.35)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          
          {/* Header row with Back Button & Centered Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
            <Link 
              href="/" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'grid',
                placeItems: 'center',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'background .2s'
              }}
            >
              <ArrowLeft size={18} />
            </Link>

            <h1 style={{ fontSize: '17px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Tokiyo Cashback Wallet</span>
              <Sparkles size={16} color="#fbbf24" />
            </h1>

            <div style={{ width: '38px' }}></div>
          </div>

          {/* Decorative Glowing Coin Artwork on Right */}
          <div style={{
            position: 'absolute',
            right: '-15px',
            top: '55px',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
            display: 'grid',
            placeItems: 'center'
          }}>
            <div style={{
              width: '85px',
              height: '85px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
              border: '3px solid rgba(253, 230, 138, 0.5)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 0 25px rgba(245,158,11,0.4)',
              transform: 'rotate(-12deg)'
            }}>
              <b style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>UC</b>
            </div>
          </div>

          {/* Main Balance Info */}
          <div style={{ position: 'relative', zIndex: 2, marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '.8px' }}>
              Available Balance
            </span>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#ffffff', margin: '2px 0 6px', letterSpacing: '-0.5px' }}>
              ${balance.toFixed(4)}
            </h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(147, 51, 234, 0.25)', border: '1px solid rgba(192, 132, 252, 0.3)', padding: '4px 10px', borderRadius: '20px', fontSize: '10.5px', fontWeight: 800, color: '#e9d5ff' }}>
              <span>👁 MIN. $1.00 WITHDRAW</span>
            </div>
          </div>

          {/* 2 Sub-Metric Cards (Earned & Used) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', position: 'relative', zIndex: 2, marginBottom: '18px' }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.25)', color: '#60a5fa', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <TrendingUp size={16} />
              </div>
              <div>
                <small style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Earned</small>
                <b style={{ fontSize: '13.5px', color: '#ffffff', display: 'block' }}>${earned.toFixed(4)}</b>
              </div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.25)', color: '#f87171', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <TrendingDown size={16} />
              </div>
              <div>
                <small style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Used</small>
                <b style={{ fontSize: '13.5px', color: '#ffffff', display: 'block' }}>${used.toFixed(4)}</b>
              </div>
            </div>
          </div>

          {/* 4 Action Pills (Buy, Withdraw, History, VIP Tiers) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', position: 'relative', zIndex: 2 }}>
            <Link
              href="/"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: '#ffffff',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all .2s'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.3)', color: '#93c5fd', display: 'grid', placeItems: 'center' }}>
                <ShoppingBag size={15} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800 }}>Buy</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowWithdrawModal(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all .2s'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.3)', color: '#6ee7b7', display: 'grid', placeItems: 'center' }}>
                <Send size={15} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800 }}>Withdraw</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAction('HISTORY')}
              style={{
                background: activeAction === 'HISTORY' ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.08)',
                border: activeAction === 'HISTORY' ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: activeAction === 'HISTORY' ? '0 4px 14px rgba(168,85,247,0.4)' : 'none',
                transition: 'all .2s'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', display: 'grid', placeItems: 'center' }}>
                <History size={15} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800 }}>History</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAction('TIERS')}
              style={{
                background: activeAction === 'TIERS' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'rgba(255, 255, 255, 0.08)',
                border: activeAction === 'TIERS' ? '1px solid #fcd34d' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: activeAction === 'TIERS' ? '0 4px 14px rgba(245,158,11,0.4)' : 'none',
                transition: 'all .2s'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', display: 'grid', placeItems: 'center' }}>
                <Crown size={15} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800 }}>VIP Tiers</span>
            </button>
          </div>
        </div>

        {/* VIP TIERS VIEW (IF ACTIVE) */}
        {activeAction === 'TIERS' && (
          <div style={{ background: '#ffffff', border: '1.5px solid #edf2f7', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0 6px 20px rgba(10,44,97,0.04)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Crown size={18} color="#d97706" />
              <span>Cashback VIP Loyalty Levels</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block' }}>🥉 Bronze Member (1% Back)</b>
                  <small style={{ fontSize: '11px', color: '#64748b' }}>Dalabyada $1 ilaa $50</small>
                </div>
                <span style={{ background: '#eef4fc', color: '#0a2c61', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>1%</span>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <b style={{ fontSize: '13px', color: '#166534', display: 'block' }}>🥈 Silver Member (3% Back)</b>
                  <small style={{ fontSize: '11px', color: '#16a34a' }}>Dalabyada $50 ilaa $200</small>
                </div>
                <span style={{ background: '#dcfce7', color: '#166534', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>3%</span>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <b style={{ fontSize: '13px', color: '#92400e', display: 'block' }}>👑 Gold VIP Member (5% Back)</b>
                  <small style={{ fontSize: '11px', color: '#d97706' }}>Dalabyada $200+ (Unlimited)</small>
                </div>
                <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>5%</span>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SHEET / TRANSACTIONS CONTAINER */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #edf2f7',
          borderRadius: '24px',
          padding: '22px 18px',
          boxShadow: '0 8px 30px rgba(10, 44, 97, 0.05)'
        }}>
          
          {/* Curved top drag pill */}
          <div style={{ width: '40px', height: '4px', borderRadius: '4px', background: '#cbd5e1', margin: '0 auto 16px' }}></div>

          {/* Transactions Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Transactions</h3>
            
            <div style={{ position: 'relative', width: '130px' }}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '6px 10px 6px 28px', borderRadius: '20px', border: '1.5px solid #e2e8f0', fontSize: '11.5px', outline: 'none' }}
              />
              <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
          </div>

          {/* Filter Pills (All, Earned, Used) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              style={{
                background: filterType === 'ALL' ? '#7c3aed' : '#f1f5f9',
                color: filterType === 'ALL' ? '#ffffff' : '#64748b',
                border: 0,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all .2s'
              }}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setFilterType('EARNED')}
              style={{
                background: filterType === 'EARNED' ? '#7c3aed' : '#f1f5f9',
                color: filterType === 'EARNED' ? '#ffffff' : '#64748b',
                border: 0,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all .2s'
              }}
            >
              Earned
            </button>

            <button
              type="button"
              onClick={() => setFilterType('USED')}
              style={{
                background: filterType === 'USED' ? '#7c3aed' : '#f1f5f9',
                color: filterType === 'USED' ? '#ffffff' : '#64748b',
                border: 0,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all .2s'
              }}
            >
              Used
            </button>
          </div>

          {/* Transactions List or Empty State Matching Screenshot */}
          {filteredTxs.length === 0 ? (
            <div style={{
              background: '#f8fafc',
              border: '1.5px dashed #e2e8f0',
              borderRadius: '18px',
              padding: '36px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#eef4fc',
                color: '#64748b',
                display: 'grid',
                placeItems: 'center',
                marginBottom: '4px'
              }}>
                <Clock size={22} />
              </div>

              <b style={{ fontSize: '13.5px', color: '#0a2c61', display: 'block', maxWidth: '300px' }}>
                Ma jiraan wax transactions ah oo kuu diiwaangashan.
              </b>

              <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, maxWidth: '320px', lineHeight: 1.4 }}>
                Cashback-ga aad hesho ama isticmaasho mar kasta oo aad PUBG, eFootball ama Free Fire naga iibsato halkan ayaa lagu soo bandhigi doonaa.
              </p>

              {/* Demo claim button to allow live testing */}
              <button
                type="button"
                onClick={handleClaimDemoReward}
                style={{
                  marginTop: '12px',
                  background: '#0a2c61',
                  color: '#ffffff',
                  border: 0,
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={13} color="#facc15" />
                <span>Tijaabi Cashback (+$0.50 Demo Reward)</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredTxs.map((t) => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#f8fafc', border: '1px solid #edf2f7', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: t.type === 'EARNED' ? '#ecfdf5' : '#fef2f2', color: t.type === 'EARNED' ? '#10b981' : '#ef4444', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      {t.type === 'EARNED' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                    <div>
                      <b style={{ fontSize: '12.5px', color: '#0a2c61', display: 'block' }}>{t.title}</b>
                      <small style={{ fontSize: '10.5px', color: '#64748b' }}>{t.game} • {t.date}</small>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <b style={{ fontSize: '13.5px', color: t.type === 'EARNED' ? '#16a34a' : '#ef4444' }}>
                      {t.type === 'EARNED' ? '+' : '-'}${t.amount.toFixed(4)}
                    </b>
                    <small style={{ fontSize: '9.5px', color: '#64748b', display: 'block' }}>{t.status}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WITHDRAW POPUP MODAL */}
        {showWithdrawModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: '16px' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', position: 'relative' }}>
              <button 
                type="button" 
                onClick={() => setShowWithdrawModal(false)}
                style={{ position: 'absolute', right: '16px', top: '16px', background: '#f1f5f9', border: 0, borderRadius: '50%', width: '30px', height: '30px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Send size={20} color="#10b981" />
                <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0a2c61', margin: 0 }}>Kala-bax Cashback-gaaga</h3>
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
                Balance-kaaga hadda waa: <b style={{ color: '#16a34a' }}>${balance.toFixed(4)}</b>. Lacagta waxaa toos loogu soo dirayaa EVC Plus, Zaad ama Sahal.
              </p>

              {withdrawSuccess ? (
                <div style={{ padding: '12px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{withdrawSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleWithdrawSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#0a2c61', marginBottom: '6px' }}>
                      Nambarka Taleefanka (EVC Plus / Zaad / Sahal) *
                    </label>
                    <input 
                      type="tel"
                      value={withdrawPhone}
                      onChange={(e) => setWithdrawPhone(e.target.value)}
                      placeholder="+252 61 XXXXXXX"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none', fontWeight: 700 }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ background: '#0a2c61', color: '#ffffff', border: 0, padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '6px' }}
                  >
                    <Send size={15} />
                    <span>Xaqiiji Kala-bixidda ($ {balance.toFixed(2)})</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
