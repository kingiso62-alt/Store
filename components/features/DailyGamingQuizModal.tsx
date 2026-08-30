'use client';
import { useState } from 'react';
import { Brain, X, CheckCircle2, Award, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    q: 'Waa kuwee xirmooyinka ugu caansan PUBG Mobile ee lagu iibsado Royal Pass?',
    options: ['300 UC', '660 UC (Elite Pass)', '60 UC', '1800 UC'],
    correct: 1
  },
  {
    id: 2,
    q: 'Waa maxay lacagta rasmiga ah ee ciyaarta Garena Free Fire lagu isticmaalo?',
    options: ['UC', 'Diamonds (Dheemanka)', 'Coins', 'Robux'],
    correct: 1
  },
  {
    id: 3,
    q: 'Website-ka #1 ee Soomaaliya ugu degdegga badan xagga Gaming Top-Up-ka waa?',
    options: ['Tokiyo Store (24/7 Fast Delivery)', 'Store Kale', 'Ma Aqaan', 'Midna'],
    correct: 0
  }
];

export default function DailyGamingQuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedOption === null) return;

    let nextScore = score;
    if (selectedOption === questions[currentQ].correct) {
      nextScore += 1;
      setScore(nextScore);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  const q = questions[currentQ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 19, 41, 0.75)',
        backdropFilter: 'blur(6px)',
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
          borderRadius: '20px',
          padding: '24px',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          animation: 'modalSlideUp .2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef08a', color: '#854d0e', display: 'grid', placeItems: 'center' }}>
              <Brain size={18} />
            </div>
            <div>
              <b style={{ fontSize: '15px', color: '#0a2c61', display: 'block' }}>Daily Somali Gaming Quiz</b>
              <small style={{ fontSize: '11px', color: '#64748b' }}>Jawaab 3 su'aalood oo hel $0.50 Hadiyad ah!</small>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 0, borderRadius: '50%', width: '28px', height: '28px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={15} />
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>
              <span>Su'aasha {currentQ + 1} ee {questions.length}</span>
              <span>Dhibcaha: {score}</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '18px', overflow: 'hidden' }}>
              <div style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, height: '100%', background: '#2563eb' }} />
            </div>

            {/* Question Text */}
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0a2c61', margin: '0 0 16px', lineHeight: '1.4' }}>
              {q.q}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {q.options.map((opt, idx) => {
                const isSel = selectedOption === idx;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: `1.5px solid ${isSel ? '#2563eb' : '#e2e8f0'}`,
                      background: isSel ? '#eff6ff' : '#ffffff',
                      color: isSel ? '#1e40af' : '#0a2c61',
                      fontSize: '13px',
                      fontWeight: 800,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all .15s'
                    }}
                  >
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: isSel ? '#2563eb' : '#f1f5f9', color: isSel ? '#ffffff' : '#64748b', display: 'grid', placeItems: 'center', fontSize: '11px', flexShrink: 0 }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleNext}
              style={{
                width: '100%',
                background: selectedOption === null ? '#cbd5e1' : '#081d3d',
                color: '#ffffff',
                border: 0,
                padding: '12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 900,
                cursor: selectedOption === null ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <span>{currentQ + 1 === questions.length ? 'Eeg Natiijada (Finish)' : 'U Gudub Su\'aasha Xigta →'}</span>
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: score === 3 ? '#ecfdf5' : '#fefce8', color: score === 3 ? '#16a34a' : '#ca8a04', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
              <Trophy size={28} />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0a2c61', margin: '0 0 6px' }}>
              {score === 3 ? '🎉 HAMBALYO! DHAMMAAN WAAD SAXTAY' : 'Dhibcahaaga Quiz-ka!'}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
              Waxaad heshay <b>{score} / 3 sax ah</b>.
            </p>

            {score >= 2 ? (
              <div style={{ background: '#f0fdf4', border: '1.5px dashed #86efac', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
                <small style={{ fontSize: '11px', color: '#166534', fontWeight: 800, display: 'block', marginBottom: '4px' }}>CODE-KAAGA QIIMO DHIMISTA:</small>
                <code style={{ fontSize: '16px', fontWeight: 900, color: '#15803d', letterSpacing: '1px' }}>QUIZ-WIN-50</code>
              </div>
            ) : null}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleRestart}
                style={{ flex: 1, background: '#f1f5f9', color: '#0a2c61', border: 0, padding: '10px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer' }}
              >
                Dib U Bilow (Restart)
              </button>
              <Link
                href="/redeem"
                onClick={onClose}
                style={{ flex: 1, background: '#081d3d', color: '#ffffff', padding: '10px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, textDecoration: 'none', display: 'grid', placeItems: 'center' }}
              >
                <span>Fur Code Checker →</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
