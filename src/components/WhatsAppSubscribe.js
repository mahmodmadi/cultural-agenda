'use client';
import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { subscribeToWhatsApp } from '../services/eventService';

export default function WhatsAppSubscribe() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await subscribeToWhatsApp(phone);
      setStatus('success');
      setPhone('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-secondary)',
      color: 'white',
      padding: '2rem',
      borderRadius: 'var(--radius-lg)',
      marginTop: '2rem',
      backgroundImage: 'linear-gradient(45deg, var(--color-secondary), #1d3e3a)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Bell size={28} color="var(--color-accent)" />
        <h3 style={{ margin: 0, color: 'white' }}>اشترك في تذكيرات واتساب</h3>
      </div>
      <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
        لا تفوت أي فعالية ثقافية! سجل رقمك لتصلك رسائل تذكيرية بأهم الأنشطة في مدينتك.
      </p>

      {status === 'success' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)' }}>
          <Check /> <span>تم التسجيل بنجاح! شكراً لك.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input 
            type="tel" 
            placeholder="رقم الهاتف (مثال: 0612345678)" 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              flex: '1 1 200px',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontFamily: 'var(--font-body)',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-text)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {status === 'loading' ? 'جاري...' : 'اشترك الآن'}
          </button>
        </form>
      )}
      {status === 'error' && <p style={{ color: '#ffcccb', marginTop: '0.5rem', fontSize: '0.9rem' }}>حدث خطأ، يرجى المحاولة لاحقاً.</p>}
    </div>
  );
}
