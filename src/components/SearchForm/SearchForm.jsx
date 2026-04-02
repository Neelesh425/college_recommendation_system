import React, { useState } from 'react';
import './SearchForm.scss';

const branches = [
  'Any Branch',
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology',
];

const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const states = ['Both', 'Jharkhand', 'West Bengal'];

const SearchForm = ({ onSearch, loading }) => {
  const [form, setForm] = useState({
    jeeRank: '',
    wbjeeRank: '',
    class12Percent: '',
    category: 'General',
    state: 'Both',
    branch: 'Any Branch',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  const handleReset = () => {
    setForm({
      jeeRank: '',
      wbjeeRank: '',
      class12Percent: '',
      category: 'General',
      state: 'Both',
      branch: 'Any Branch',
    });
  };

  return (
    <div className="search-form">
      <div className="search-form__header">
        <h2 className="search-form__title">Your Academic Profile</h2>
        <p className="search-form__subtitle">Fill in your scores to find matching colleges</p>
      </div>

      <form onSubmit={handleSubmit} className="search-form__form">
        <div className="search-form__grid">

          <div className="search-form__field">
            <label className="search-form__label">
              JEE Main Rank
              <span className="search-form__hint">Leave blank if not applicable</span>
            </label>
            <input
              type="number"
              name="jeeRank"
              value={form.jeeRank}
              onChange={handleChange}
              placeholder="e.g. 45000"
              className="search-form__input"
              min="1"
            />
          </div>

          <div className="search-form__field">
            <label className="search-form__label">
              WBJEE Rank
              <span className="search-form__hint">For West Bengal colleges</span>
            </label>
            <input
              type="number"
              name="wbjeeRank"
              value={form.wbjeeRank}
              onChange={handleChange}
              placeholder="e.g. 8000"
              className="search-form__input"
              min="1"
            />
          </div>

          <div className="search-form__field">
            <label className="search-form__label">
              Class 12 Percentage
              <span className="search-form__hint">Required for eligibility check</span>
            </label>
            <input
              type="number"
              name="class12Percent"
              value={form.class12Percent}
              onChange={handleChange}
              placeholder="e.g. 82"
              className="search-form__input"
              min="0"
              max="100"
              step="0.1"
              required
            />
          </div>

          <div className="search-form__field">
            <label className="search-form__label">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="search-form__select">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="search-form__field">
            <label className="search-form__label">Preferred State</label>
            <select name="state" value={form.state} onChange={handleChange} className="search-form__select">
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="search-form__field">
            <label className="search-form__label">Preferred Branch</label>
            <select name="branch" value={form.branch} onChange={handleChange} className="search-form__select">
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="search-form__notice">
          <span className="search-form__notice-icon">ℹ</span>
          You need at least one rank (JEE Main or WBJEE) along with your Class 12 percentage to search.
        </div>

        <div className="search-form__actions">
          <button type="button" className="search-form__btn search-form__btn--reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="search-form__btn search-form__btn--submit" disabled={loading}>
            {loading ? (
              <><span className="search-form__spinner" /> Searching...</>
            ) : (
              <>Find Colleges →</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;