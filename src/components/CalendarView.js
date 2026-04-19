'use client';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useMemo } from 'react';

const locales = {
  'ar': ar,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView({ events, onSelectEvent }) {
  const defaultDate = useMemo(() => new Date(), []);
  
  // Format events for react-big-calendar
  const calendarEvents = events.map(e => {
    // Parse the date and time strings. Assuming date is YYYY-MM-DD and time is HH:MM
    const startDateTime = new Date(`${e.date}T${e.time || '10:00'}`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // add 2 hours approx
    
    return {
      id: e.id,
      title: e.title,
      start: startDateTime,
      end: endDateTime,
      resource: e
    };
  });

  return (
    <div style={{ height: '70vh', width: '100%', marginTop: '1rem' }} className="animate-fade-in">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        culture="ar"
        messages={{
          next: "التالي",
          previous: "السابق",
          today: "اليوم",
          month: "شهر",
          week: "أسبوع",
          day: "يوم",
          agenda: "أجندة"
        }}
        onSelectEvent={(event) => onSelectEvent(event.resource)}
      />
    </div>
  );
}
