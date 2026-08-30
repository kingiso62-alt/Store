'use client';
import { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, UserCheck, ThumbsUp } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  city: string;
  game: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const initialReviews: Review[] = [
  {
    id: 1,
    author: 'Axmed Cali M.',
    city: 'Muqdisho',
    game: 'PUBG Mobile 660 UC',
    rating: 5,
    comment: 'Walaahi waa meesha ugu fiican! 660 UC wax kayar 15 ilbiriqsi ayaa account-keyga ku dhacay. EVC Plus ayaa ku bixiyay, aad iyo aad baad u mahadsan tihiin.',
    date: 'Maanta, 2:14 PM',
    verified: true
  },
  {
    id: 2,
    author: 'Khaalid Cabdi',
    city: 'Hargeysa',
    game: 'eFootball iOS 1040 Coins',
    rating: 5,
    comment: 'iOS coins meel walba waan ka waayay, Tokiyo Store si fudud ayaan uga helay. Zaad ayaan ku shubtay xaqiijintuna waxay ahayd 1-Click WhatsApp.',
    date: 'Shalay',
    verified: true
  },
  {
    id: 3,
    author: 'Maxamed Nuur',
    city: 'Garoowe',
    game: 'Free Fire 1000 Diamonds',
    rating: 5,
    comment: 'Kalsooni buuxda! Sahal ayaan ku qaatay, Player ID-ga oo kaliya ayaa la geliyay wax password ahna uma baahnin. Aad baan ugu qancay.',
    date: '2 maalmood ka hor',
    verified: true
  },
  {
    id: 4,
    author: 'Guuleed Cismaan',
    city: 'Jigjiga',
    game: 'Mythic Druvaen X-Suit',
    rating: 5,
    comment: '7-Star X-Suit-ka Tokiyo Store ayaa ii shubtay, qiimuhuna aad ayuu uga jaban yahay meelaha kale. 100% waan ku talinayaa!',
    date: '3 maalmood ka hor',
    verified: true
  }
];

export default function CustomerReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showModal, setShowModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('Muqdisho');
  const [newGame, setNewGame] = useState('PUBG Mobile');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: Date.now(),
      author: newAuthor.trim(),
      city: newCity,
      game: newGame,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Hadda (Just now)',
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setShowModal(false);
    setNewAuthor('');
    setNewComment('');
    alert('Waad ku mahadsan tahay faalladaada qiimaha leh! Waa la soo bandhigay.');
  };

  return (
    <section style={{ margin: '48px 0 32px' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, background: '#fef08a', color: '#854d0e', padding: '2px 8px', borderRadius: '6px' }}>
              ⭐ KALSOONIDA MACAAMIISHA
            </span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={14} /> 4.9 / 5.0 (2,400+ Faallooyin)
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0a2c61', margin: '4px 0 0' }}>
            Maxay Macaamiisheenu Ka Yiraahdeen Tokiyo Store?
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            background: '#081d3d',
            color: '#ffffff',
            border: 0,
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '12.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(8, 29, 61, 0.2)'
          }}
        >
          <MessageSquarePlus size={15} color="#facc15" />
          <span>Ku Dar Faalladaada (Write Review)</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
        {reviews.slice(0, 4).map((r) => (
          <div
            key={r.id}
            style={{
              background: '#ffffff',
              border: '1.5px solid #edf2f7',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 6px 20px rgba(10, 44, 97, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Star Rating Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#eab308" color="#eab308" />
                  ))}
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 800, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '1px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <CheckCircle2 size={11} /> {r.verified ? 'Iibsi La Xaqiijiyay' : 'Macmiil'}
                </span>
              </div>

              {/* Comment text */}
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: '1.5', margin: '0 0 14px' }}>
                "{r.comment}"
              </p>
            </div>

            {/* Author Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
              <div>
                <b style={{ fontSize: '13px', color: '#0a2c61', display: 'block' }}>{r.author}</b>
                <small style={{ fontSize: '10.5px', color: '#94a3b8' }}>{r.city} • <span style={{ color: '#2563eb', fontWeight: 700 }}>{r.game}</span></small>
              </div>
              <small style={{ fontSize: '10px', color: '#cbd5e1' }}>{r.date}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 19, 41, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 99999,
          display: 'grid',
          placeItems: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            animation: 'modalSlideUp .2s ease-out'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>
              Qor Faalladaada (Customer Review)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
              La wadaag ciyaartoyda kale khibraddaada Tokiyo Store.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '4px' }}>Magacaaga *</label>
                <input
                  type="text"
                  placeholder="Tusaale: Axmed Cali"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '4px' }}>Magaalada *</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  >
                    <option value="Muqdisho">Muqdisho</option>
                    <option value="Hargeysa">Hargeysa</option>
                    <option value="Garoowe">Garoowe</option>
                    <option value="Kismaayo">Kismaayo</option>
                    <option value="Boosaaso">Boosaaso</option>
                    <option value="Jigjiga">Jigjiga</option>
                    <option value="Borama">Borama</option>
                    <option value="Baydhabo">Baydhabo</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '4px' }}>Ciyaarta *</label>
                  <select
                    value={newGame}
                    onChange={(e) => setNewGame(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  >
                    <option value="PUBG Mobile">PUBG Mobile</option>
                    <option value="Free Fire">Free Fire</option>
                    <option value="eFootball Android">eFootball Android</option>
                    <option value="eFootball iOS">eFootball iOS</option>
                    <option value="Roblox">Roblox</option>
                    <option value="Mythic X-Suits">Mythic X-Suits</option>
                    <option value="Ferrari Supercars">Ferrari Supercars</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '4px' }}>Qiimeyntaada (Rating)</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: '2px' }}
                    >
                      <Star size={24} fill={star <= newRating ? '#eab308' : '#e2e8f0'} color={star <= newRating ? '#eab308' : '#cbd5e1'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0a2c61', marginBottom: '4px' }}>Faalladaada *</label>
                <textarea
                  placeholder="Sidee ayay ahayd khibraddaadu..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  rows={3}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#16a34a', color: '#ffffff', border: 0, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Gudbi Faallada (Submit)
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ background: '#f1f5f9', color: '#64748b', border: 0, padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Ka Noqo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
