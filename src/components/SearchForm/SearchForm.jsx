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

const categories  = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const states      = ['Both', 'Jharkhand', 'West Bengal'];
const collegeTypes = ['Any', 'Government', 'Private', 'Deemed'];
const affiliations = ['Any', 'Autonomous', 'University Affiliated'];
const feeRanges   = ['Any', 'Low', 'Medium', 'High'];

const SearchForm = ({ onSearch, loading }) => {
  const [form, setForm] = useState({
    jeeRank:       '',
    wbjeeRank:     '',
    class12Percent:'',
    category:      'General',
    state:         'Both',
    branch:        'Any Branch',
    collegeType:   'Any',
    affiliation:   'Any',
    feesRange:     'Any',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  const handleReset = () =>
    setForm({
      jeeRank: '', wbjeeRank: '', class12Percent: '',
      category: 'General', state: 'Both', branch: 'Any Branch',
      collegeType: 'Any', affiliation: 'Any', feesRange: 'Any',
    });

  return (
    <div className="search-form">
      <div className="search-form__header">
        <div className="search-form__header-left">
          <h2 className="search-form__title">Find Your College</h2>
          <p className="search-form__subtitle">Enter your scores and preferences — we'll match you instantly</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="search-form__form">

        {/* Row 1 — Ranks + Class 12 + Category */}
        <div className="search-form__section-label">Academic Scores</div>
        <div className="search-form__row search-form__row--4">
          <div className="search-form__field">
            <label className="search-form__label">JEE Main Rank</label>
            <input type="number" name="jeeRank" value={form.jeeRank}
              onChange={handleChange} placeholder="e.g. 45000"
              className="search-form__input" min="1" />
          </div>
          <div className="search-form__field">
            <label className="search-form__label">WBJEE Rank</label>
            <input type="number" name="wbjeeRank" value={form.wbjeeRank}
              onChange={handleChange} placeholder="e.g. 8000"
              className="search-form__input" min="1" />
          </div>
          <div className="search-form__field">
            <label className="search-form__label">Class 12 % <span className="search-form__required">*</span></label>
            <input type="number" name="class12Percent" value={form.class12Percent}
              onChange={handleChange} placeholder="e.g. 82"
              className="search-form__input" min="0" max="100" step="0.1" required />
          </div>
          <div className="search-form__field">
            <label className="search-form__label">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="search-form__select">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Row 2 — Preferences */}
        <div className="search-form__section-label">Preferences</div>
        <div className="search-form__row search-form__row--5">
          <div className="search-form__field">
            <label className="search-form__label">State</label>
            <select name="state" value={form.state} onChange={handleChange} className="search-form__select">
              {states.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="search-form__field">
            <label className="search-form__label">Branch</label>
            <select name="branch" value={form.branch} onChange={handleChange} className="search-form__select">
              {branches.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="search-form__field">
            <label className="search-form__label">College Type</label>
            <select name="collegeType" value={form.collegeType} onChange={handleChange} className="search-form__select">
              {collegeTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="search-form__field">
            <label className="search-form__label">Affiliation</label>
            <select name="affiliation" value={form.affiliation} onChange={handleChange} className="search-form__select">
              {affiliations.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="search-form__field">
            <label className="search-form__label">Fees Range</label>
            <select name="feesRange" value={form.feesRange} onChange={handleChange} className="search-form__select">
              {feeRanges.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="search-form__footer">
          <p className="search-form__notice">
            ℹ &nbsp;Provide at least one rank (JEE or WBJEE) and your Class 12 percentage.
          </p>
          <div className="search-form__actions">
            <button type="button" className="search-form__btn search-form__btn--reset" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="search-form__btn search-form__btn--submit" disabled={loading}>
              {loading
                ? <><span className="search-form__spinner" /> Searching...</>
                : <>Search Colleges &rarr;</>}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default SearchForm;