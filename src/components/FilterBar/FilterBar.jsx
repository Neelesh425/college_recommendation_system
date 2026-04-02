import React from 'react';
import './FilterBar.scss';

const FilterBar = ({ filters, onChange, total }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__left">
        <span className="filter-bar__count">
          <strong>{total}</strong> college{total !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="filter-bar__right">
        <span className="filter-bar__label">Filter by:</span>

        <div className="filter-bar__chips">
          {['All', 'Jharkhand', 'West Bengal'].map(s => (
            <button
              key={s}
              className={`filter-bar__chip ${filters.state === s ? 'filter-bar__chip--active' : ''}`}
              onClick={() => handleChange('state', s)}
            >
              {s}
            </button>
          ))}
        </div>

        <select
          className="filter-bar__select"
          value={filters.type}
          onChange={e => handleChange('type', e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
        </select>

        <select
          className="filter-bar__select"
          value={filters.sort}
          onChange={e => handleChange('sort', e.target.value)}
        >
          <option value="rank">Sort by NIRF Rank</option>
          <option value="name">Sort by Name</option>
          <option value="branches">Sort by Matched Branches</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;