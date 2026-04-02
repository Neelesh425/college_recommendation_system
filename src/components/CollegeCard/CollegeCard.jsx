import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeCard.scss';

const typeColors = {
  Government: 'green',
  Private: 'blue',
  Deemed: 'orange',
};

const CollegeCard = ({ college, matchedBranches }) => {
  const navigate = useNavigate();

  return (
    <div className="college-card" onClick={() => navigate(`/college/${college.id}`, { state: { college, matchedBranches } })}>
      <div className="college-card__header">
        <div className="college-card__meta">
          <span className={`college-card__type college-card__type--${typeColors[college.type]}`}>
            {college.type}
          </span>
          <span className="college-card__state">{college.state}</span>
          {college.nirf_ranking && (
            <span className="college-card__rank">NIRF #{college.nirf_ranking}</span>
          )}
        </div>
        <div className="college-card__arrow">→</div>
      </div>

      <h3 className="college-card__name">{college.name}</h3>
      <p className="college-card__city">📍 {college.city}</p>

      <div className="college-card__branches">
        <span className="college-card__branches-label">Eligible Branches:</span>
        <div className="college-card__branch-tags">
          {matchedBranches.slice(0, 3).map((b, i) => (
            <span key={i} className="college-card__branch-tag">{b.code}</span>
          ))}
          {matchedBranches.length > 3 && (
            <span className="college-card__branch-tag college-card__branch-tag--more">
              +{matchedBranches.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="college-card__footer">
        <div className="college-card__match">
          <div
            className="college-card__match-bar"
            style={{ '--pct': `${Math.min(100, (matchedBranches.length / college.branches.length) * 100)}%` }}
          />
          <span className="college-card__match-text">
            {matchedBranches.length}/{college.branches.length} branches matched
          </span>
        </div>
        <span className="college-card__est">Est. {college.established}</span>
      </div>
    </div>
  );
};

export default CollegeCard;