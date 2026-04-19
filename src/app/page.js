'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CalendarView from '@/components/CalendarView';
import FilterSidebar from '@/components/FilterSidebar';
import EventModal from '@/components/EventModal';
import SuggestEventForm from '@/components/SuggestEventForm';
import WhatsAppSubscribe from '@/components/WhatsAppSubscribe';
import { getApprovedEvents } from '@/services/eventService';

const CATEGORIES = ["توقيع كتب وإصدارات", "أمسيات شعرية", "ورش كتابة إبداعية", "معارض", "جولات استكشافية", "أخرى"];
const CITIES = ["الرباط", "الدار البيضاء", "المحمدية", "سلا", "مراكش", "فاس", "طنجة", "أكادير"];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({ category: '', city: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from Firebase
    const loadEvents = async () => {
      try {
        const data = await getApprovedEvents();
        // Fallback dummy data if firebase is empty/unconfigured
        const dummyEvents = data.length > 0 ? data : [
          { id: '1', title: 'معرض الكتاب بالدار البيضاء', type: 'معارض', city: 'الدار البيضاء', date: new Date().toISOString().split('T')[0], time: '10:00' },
          { id: '2', title: 'أمسية شعرية بدار الثقافة', type: 'أمسيات شعرية', city: 'الرباط', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '18:00' }
        ];
        setEvents(dummyEvents);
        setFilteredEvents(dummyEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    let result = events;
    if (filters.category) {
      result = result.filter(e => e.type === filters.category);
    }
    if (filters.city) {
      result = result.filter(e => e.city === filters.city);
    }
    setFilteredEvents(result);
  }, [filters, events]);

  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>اكتشف الثقافة المغربية</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            دليلك الشامل لمعرفة أحدث المعارض، الأمسيات الشعرية، الورش الإبداعية، وتواقيع الكتب في مختلف المدن المغربية.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Desktop Layout: Sidebar on right, calendar on left */}
            <div className="layout-grid">
              <div className="sidebar-col">
                <FilterSidebar 
                  categories={CATEGORIES} 
                  cities={CITIES} 
                  onFilterChange={setFilters} 
                  currentFilters={filters} 
                />
                <WhatsAppSubscribe />
              </div>
              <div className="calendar-col">
                {loading ? (
                  <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>جاري تحميل الأجندة...</p>
                  </div>
                ) : (
                  <CalendarView events={filteredEvents} onSelectEvent={setSelectedEvent} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <SuggestEventForm />

      <style>{`
        .layout-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .sidebar-col {
          width: 100%;
        }
        .calendar-col {
          width: 100%;
        }
        @media (min-width: 992px) {
          .layout-grid {
            flex-direction: row;
          }
          .sidebar-col {
            width: 300px;
            flex-shrink: 0;
          }
          .calendar-col {
            flex-grow: 1;
            min-width: 0;
          }
        }
      `}</style>
    </>
  );
}
