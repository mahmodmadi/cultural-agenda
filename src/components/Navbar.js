'use client';
import Link from 'next/link';
import { CalendarDays, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <CalendarDays color="var(--color-primary)" size={28} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            الأجندة الثقافية
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="md-flex gap-1rem">
          <Link href="/" style={{ padding: '0.5rem', fontWeight: 500 }}>الرئيسية</Link>
          <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('openSuggestModal'))}>
            اقتراح نشاط
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md-hidden" onClick={() => setIsOpen(!isOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          {isOpen ? <X size={24} color="var(--color-text)" /> : <Menu size={24} color="var(--color-text)" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/" onClick={() => setIsOpen(false)} style={{ fontWeight: 500 }}>الرئيسية</Link>
            <button className="btn btn-primary" onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('openSuggestModal')); }}>
              اقتراح نشاط
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; align-items: center; gap: 1.5rem; }
          .md-hidden { display: none !important; }
        }
      `}</style>
    </header>
  );
}
