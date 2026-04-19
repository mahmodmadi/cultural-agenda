'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // In a real app, use Firebase Auth:
    // await signInWithEmailAndPassword(auth, email, password);
    alert('سيتم ربط هذه الواجهة بـ Firebase Auth قريباً');
    window.location.href = '/admin'; // Redirect to dashboard for demo
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <div style={{ 
        backgroundColor: 'var(--color-surface)', 
        padding: '3rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)' }}>تسجيل دخول المشرف</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">كلمة المرور</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            دخول
          </button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)' }}>العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    </div>
  );
}
