'use client';
import { X, MapPin, Clock, Calendar as CalendarIcon, Tag } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: 'var(--color-surface)', width: '100%', maxWidth: '500px',
        borderRadius: 'var(--radius-lg)', padding: '2rem', position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', left: '1rem', 
          background: 'transparent', border: 'none', cursor: 'pointer'
        }}>
          <X size={24} color="var(--color-text-muted)" />
        </button>

        <h2 style={{ marginBottom: '1.5rem', marginTop: '0.5rem', paddingLeft: '2rem' }}>{event.title}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Tag color="var(--color-primary)" size={20} />
            <span style={{ fontWeight: 500 }}>النوع:</span>
            <span>{event.type}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin color="var(--color-primary)" size={20} />
            <span style={{ fontWeight: 500 }}>المدينة:</span>
            <span>{event.city}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CalendarIcon color="var(--color-primary)" size={20} />
            <span style={{ fontWeight: 500 }}>التاريخ:</span>
            <span>{event.date}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock color="var(--color-primary)" size={20} />
            <span style={{ fontWeight: 500 }}>الوقت:</span>
            <span>{event.time}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose}>إغلاق</button>
        </div>
      </div>
    </div>
  );
}
