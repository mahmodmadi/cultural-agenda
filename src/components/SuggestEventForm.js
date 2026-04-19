'use client';
import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { submitEventSuggestion } from '../services/eventService';

const CATEGORIES = ["توقيع كتب وإصدارات", "أمسيات شعرية", "ورش كتابة إبداعية", "معارض", "جولات استكشافية", "أخرى"];
const CITIES = ["الرباط", "الدار البيضاء", "المحمدية", "سلا", "مراكش", "فاس", "طنجة", "أكادير"];

export default function SuggestEventForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '', type: CATEGORIES[0], city: CITIES[0], date: '', time: '', description: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openSuggestModal', handleOpen);
    return () => window.removeEventListener('openSuggestModal', handleOpen);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitEventSuggestion(formData);
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({ title: '', type: CATEGORIES[0], city: CITIES[0], date: '', time: '', description: '' });
      }, 3000);
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("حدث خطأ أثناء إرسال الاقتراح.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', overflowY: 'auto'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: 'var(--color-surface)', width: '100%', maxWidth: '600px',
        borderRadius: 'var(--radius-lg)', padding: '2rem', position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <button onClick={() => setIsOpen(false)} style={{
          position: 'absolute', top: '1rem', left: '1rem', 
          background: 'transparent', border: 'none', cursor: 'pointer'
        }}>
          <X size={24} color="var(--color-text-muted)" />
        </button>

        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>اقتراح نشاط ثقافي</h2>

        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 0' }}>
            <CheckCircle size={64} color="var(--color-secondary)" />
            <h3 style={{ color: 'var(--color-secondary)' }}>تم إرسال اقتراحك بنجاح!</h3>
            <p>سيتم مراجعة النشاط من قبل الإدارة قبل نشره.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">عنوان النشاط</label>
              <input required type="text" name="title" className="input-field" value={formData.title} onChange={handleChange} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">النوع</label>
                <select name="type" className="input-field" value={formData.type} onChange={handleChange}>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">المدينة</label>
                <select name="city" className="input-field" value={formData.city} onChange={handleChange}>
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">التاريخ</label>
                <input required type="date" name="date" className="input-field" value={formData.date} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label className="input-label">الوقت</label>
                <input required type="time" name="time" className="input-field" value={formData.time} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">تفاصيل إضافية (اختياري)</label>
              <textarea name="description" className="input-field" rows="3" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'جاري الإرسال...' : 'إرسال الاقتراح'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
