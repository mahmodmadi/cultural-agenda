'use client';
import { Filter } from 'lucide-react';

export default function FilterSidebar({ categories, cities, onFilterChange, currentFilters }) {
  const handleCategoryChange = (e) => {
    onFilterChange({ ...currentFilters, category: e.target.value });
  };

  const handleCityChange = (e) => {
    onFilterChange({ ...currentFilters, city: e.target.value });
  };

  return (
    <aside style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      height: 'fit-content'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Filter color="var(--color-primary)" />
        <h3 style={{ margin: 0 }}>تصفية الأنشطة</h3>
      </div>

      <div className="input-group">
        <label className="input-label">المدينة</label>
        <select className="input-field" value={currentFilters.city || ''} onChange={handleCityChange}>
          <option value="">كل المدن</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="input-group" style={{ marginTop: '1.5rem' }}>
        <label className="input-label">نوع النشاط</label>
        <select className="input-field" value={currentFilters.category || ''} onChange={handleCategoryChange}>
          <option value="">كل الأنواع</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <button 
        className="btn btn-outline" 
        style={{ width: '100%', marginTop: '1rem' }}
        onClick={() => onFilterChange({ category: '', city: '' })}
      >
        مسح الفلاتر
      </button>
    </aside>
  );
}
