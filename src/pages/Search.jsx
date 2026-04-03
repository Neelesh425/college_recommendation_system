import React, { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import FilterBar from '../components/FilterBar/FilterBar';
import CollegeList from '../components/CollegeList/CollegeList';
import { searchColleges } from '../api/api';
import './Search.scss';

const Search = () => {
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);
  const [error,    setError]    = useState(null);
  const [filters,  setFilters]  = useState({
    state: 'All',
    type:  'All',
    sort:  'rank',
  });

  const handleSearch = async (form) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchColleges({ ...form, sortBy: filters.sort });
      // Backend returns { total, results } where each result is
      // { college, matched_branches, match_score }
      // Remap to the shape CollegeList / CollegeCard expect
      const remapped = data.results.map(r => ({
        college:         r.college,
        matchedBranches: r.matched_branches,
        matchScore:      r.match_score,
      }));
      setResults(remapped);
    } catch (err) {
      setError(err.message || 'Something went wrong. Is the backend running?');
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  // Client-side filter/sort on top of backend results
  const filtered = results
    .filter(r => filters.state === 'All' || r.college.state === filters.state)
    .filter(r => filters.type  === 'All' || r.college.type  === filters.type)
    .sort((a, b) => {
      if (filters.sort === 'rank')     return (a.college.nirf_ranking || 999) - (b.college.nirf_ranking || 999);
      if (filters.sort === 'name')     return a.college.name.localeCompare(b.college.name);
      if (filters.sort === 'branches') return b.matchedBranches.length - a.matchedBranches.length;
      return 0;
    });

  return (
    <div className="search-page page-wrapper">
      <div className="search-page__top">
        <div className="container">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </div>

      <div className="search-page__results container">
        {error && (
          <div className="search-page__error">
            ⚠ {error}
          </div>
        )}
        {searched && !error && (
          <FilterBar filters={filters} onChange={setFilters} total={filtered.length} />
        )}
        <CollegeList results={filtered} loading={loading} searched={searched} />
      </div>
    </div>
  );
};

export default Search;