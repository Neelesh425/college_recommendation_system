import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BranchTable from '../components/BranchTable/BranchTable';
import './CollegeDetail.scss';

const CollegeDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const college = state?.college;
  const matchedBranches = state?.matchedBranches || [];

  if (!college) {
    return (
      <div className="college-detail page-wrapper">
        <div className="container">
          <p>College not found. <button onClick={() => navigate('/search')}>Go back</button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="college-detail page-wrapper">
      <div className="college-detail__hero">
        <div className="container">
          <button className="college-detail__back" onClick={() => navigate(-1)}>← Back to Results</button>
          <div className="college-detail__badges">
            <span className="college-detail__badge">{college.type}</span>
            <span className="college-detail__badge">{college.state}</span>
            {college.nirf_ranking && <span className="college-detail__badge">NIRF #{college.nirf_ranking}</span>}
          </div>
          <h1 className="college-detail__name">{college.name}</h1>
          <div className="college-detail__meta">
            <span>📍 {college.city}</span>
            <span>📅 Est. {college.established}</span>
            {college.website && <a href={college.website} target="_blank" rel="noreferrer">🌐 Visit Website</a>}
          </div>
          {matchedBranches.length > 0 && (
            <div className="college-detail__eligible-summary">
              ✓ You are eligible for <strong>{matchedBranches.length}</strong> branch{matchedBranches.length > 1 ? 'es' : ''} in this college
            </div>
          )}
        </div>
      </div>

      <div className="container college-detail__body">
        <BranchTable branches={college.branches} userInput={state?.userInput} />
      </div>
    </div>
  );
};

export default CollegeDetail;