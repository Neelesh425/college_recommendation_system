import React from 'react';
import CollegeCard from '../CollegeCard/CollegeCard';
import './CollegeList.scss';

const CollegeList = ({ results, loading, searched }) => {
  if (loading) {
    return (
      <div className="college-list__skeleton-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="college-list__skeleton" />
        ))}
      </div>
    );
  }

  if (!searched) {
    return (
      <div className="college-list__empty">
        <div className="college-list__empty-icon">🎓</div>
        <h3>Ready to find your college?</h3>
        <p>Fill in your academic details above and hit <strong>Find Colleges</strong> to get started.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="college-list__empty">
        <div className="college-list__empty-icon">🔍</div>
        <h3>No colleges found</h3>
        <p>Try adjusting your filters or check if your ranks are entered correctly.</p>
      </div>
    );
  }

  return (
    <div className="college-list__grid">
      {results.map((item, i) => (
        <div
          key={item.college.id}
          className="college-list__item"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <CollegeCard college={item.college} matchedBranches={item.matchedBranches} />
        </div>
      ))}
    </div>
  );
};

export default CollegeList;