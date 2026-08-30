'use client';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tokiyo_theme');
      if (saved === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark-theme');
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      if (next) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('tokiyo_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('tokiyo_theme', 'light');
      }
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        background: isDark ? '#1e293b' : 'rgba(255,255,255,0.08)',
        border: `1px solid ${isDark ? '#334155' : 'rgba(255,255,255,0.15)'}`,
        color: isDark ? '#facc15' : '#ffffff',
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        transition: 'all .2s'
      }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
