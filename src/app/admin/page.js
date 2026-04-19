'use client';
import { useState, useEffect } from 'react';
import { getPendingEvents, updateEventStatus } from '@/services/eventService';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assuming true for now, connect to Firebase Auth

  useEffect(() => {
    // In a real app, verify user is logged in via Firebase Auth
    // const unsubscribe = auth.onAuthStateChanged(user => { ... })
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const events = await getPendingEvents();
      // Dummy fallback if empty DB
      setPendingEvents(events.length > 0 ? events : [
        { id: '101', title: 'دورة في الخط العربي', type: 'ورش كتابة إبداعية', city: 'فاس', date: '2026-05-01', time: '16:00', description: 'دورة مكثفة لتعلم الرقعة', status: 'pending' }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      // Dummy check for fallback data
      if(id === '101') {
         setPendingEvents(pendingEvents.filter(e => e.id !== id));
         return;
      }
      const newStatus = action === 'approve' ? 'approved' : 'rejected';
      await updateEventStatus(id, newStatus);
      setPendingEvents(pendingEvents.filter(e => e.id !== id));
    } catch (error) {
      alert("حدث خطأ أثناء التحديث");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>غير مصرح لك بالدخول</h2>
        <Link href="/admin/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>لوحة تحكم المشرف</h1>
        <Link href="/" className="btn btn-outline">العودة للموقع</Link>
      </div>

      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>الأنشطة قيد المراجعة ({pendingEvents.length})</h2>
        
        {loading ? (
          <p>جاري التحميل...</p>
        ) : pendingEvents.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>لا توجد أنشطة قيد المراجعة حالياً.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingEvents.map(event => (
              <div key={event.id} style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' 
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{event.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <span>{event.type}</span>
                    <span>•</span>
                    <span>{event.city}</span>
                    <span>•</span>
                    <span>{event.date} - {event.time}</span>
                  </div>
                  {event.description && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{event.description}</p>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleAction(event.id, 'approve')}
                    style={{ background: '#e6f4ea', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: '#137333' }}
                    title="موافقة"
                  >
                    <CheckCircle size={24} />
                  </button>
                  <button 
                    onClick={() => handleAction(event.id, 'reject')}
                    style={{ background: '#fce8e6', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: '#c5221f' }}
                    title="رفض"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
