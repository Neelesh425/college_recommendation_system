import React, { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import FilterBar from '../components/FilterBar/FilterBar';
import CollegeList from '../components/CollegeList/CollegeList';
import './Search.scss';

// Import your colleges data
import colleges from '../data/colleges.json';

const matchColleges = (form) => {
  const { jeeRank, wbjeeRank, class12Percent, category, state, branch } = form;
  const jee = parseInt(jeeRank);
  const wbjee = parseInt(wbjeeRank);
  const pct = parseFloat(class12Percent);

  return colleges
    .filter(college => {
      if (state !== 'Both' && college.state !== state) return false;
      return true;
    })
    .map(college => {
      const matchedBranches = college.branches.filter(b => {
        if (pct < b.min_class12_percentage) return false;
        if (branch !== 'Any Branch' && b.name !== branch) return false;
        const jeeOk = b.cutoffs?.JEE_Main?.[category] && jee
          ? jee <= b.cutoffs.JEE_Main[category] : false;
        const wbjeeOk = b.cutoffs?.WBJEE?.[category] && wbjee
          ? wbjee <= b.cutoffs.WBJEE[category] : false;
        return jeeOk || wbjeeOk;
      });
      return { college, matchedBranches };
    })
    .filter(item => item.matchedBranches.length > 0);
};

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({ state: 'All', type: 'All', sort: 'rank' });

  const handleSearch = (form) => {
    setLoading(true);
    setTimeout(() => {
      const matched = matchColleges(form);
      setResults(matched);
      setLoading(false);
      setSearched(true);
    }, 600);
  };

  const filtered = results
    .filter(r => filters.state === 'All' || r.college.state === filters.state)
    .filter(r => filters.type === 'All' || r.college.type === filters.type)
    .sort((a, b) => {
      if (filters.sort === 'rank') return (a.college.nirf_ranking || 999) - (b.college.nirf_ranking || 999);
      if (filters.sort === 'name') return a.college.name.localeCompare(b.college.name);
      if (filters.sort === 'branches') return b.matchedBranches.length - a.matchedBranches.length;
      return 0;
    });

  return (
    <div className="search-page page-wrapper">
      <div className="container">
        <div className="search-page__header">
          <h1 className="search-page__title">Find Your College</h1>
          <p className="search-page__subtitle">Enter your academic details to see which colleges you're eligible for</p>
        </div>
        <div className="search-page__layout">
          <div className="search-page__form-col">
            <SearchForm onSearch={handleSearch} loading={loading} />
          </div>
          <div className="search-page__results-col">
            {searched && (
              <FilterBar filters={filters} onChange={setFilters} total={filtered.length} />
            )}
            <CollegeList results={filtered} loading={loading} searched={searched} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;