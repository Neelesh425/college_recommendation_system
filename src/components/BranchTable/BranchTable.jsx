import React, { useState } from 'react';
import './BranchTable.scss';

const BranchTable = ({ branches, userInput }) => {
  const [expanded, setExpanded] = useState(null);

  const isEligible = (branch) => {
    const cat = userInput?.category || 'General';
    const jeeRank = parseInt(userInput?.jeeRank);
    const wbjeeRank = parseInt(userInput?.wbjeeRank);

    const jeeOk = branch.cutoffs?.JEE_Main?.[cat] && jeeRank
      ? jeeRank <= branch.cutoffs.JEE_Main[cat]
      : false;

    const wbjeeOk = branch.cutoffs?.WBJEE?.[cat] && wbjeeRank
      ? wbjeeRank <= branch.cutoffs.WBJEE[cat]
      : false;

    return jeeOk || wbjeeOk;
  };

  return (
    <div className="branch-table">
      <div className="branch-table__header">
        <h3 className="branch-table__title">Branch-wise Cutoffs</h3>
        <span className="branch-table__cat-badge">
          Category: {userInput?.category || 'General'}
        </span>
      </div>

      <div className="branch-table__list">
        {branches.map((branch, i) => {
          const eligible = userInput ? isEligible(branch) : null;
          const isOpen = expanded === i;

          return (
            <div
              key={i}
              className={`branch-table__row ${eligible === true ? 'branch-table__row--eligible' : eligible === false ? 'branch-table__row--ineligible' : ''}`}
            >
              <div className="branch-table__row-header" onClick={() => setExpanded(isOpen ? null : i)}>
                <div className="branch-table__row-left">
                  {eligible !== null && (
                    <span className={`branch-table__status ${eligible ? 'branch-table__status--yes' : 'branch-table__status--no'}`}>
                      {eligible ? '✓' : '✗'}
                    </span>
                  )}
                  <div>
                    <span className="branch-table__branch-name">{branch.name}</span>
                    <span className="branch-table__branch-code">{branch.code}</span>
                  </div>
                </div>
                <div className="branch-table__row-right">
                  <span className="branch-table__class12">Min 12th: {branch.min_class12_percentage}%</span>
                  <span className="branch-table__toggle">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {isOpen && (
                <div className="branch-table__cutoffs">
                  <div className="branch-table__cutoffs-inner">
                    {branch.cutoffs?.JEE_Main && (
                      <div className="branch-table__cutoff-group">
                        <h4>JEE Main Cutoffs</h4>
                        <div className="branch-table__cutoff-grid">
                          {Object.entries(branch.cutoffs.JEE_Main).map(([cat, rank]) => (
                            <div key={cat} className={`branch-table__cutoff-cell ${userInput?.category === cat ? 'branch-table__cutoff-cell--highlight' : ''}`}>
                              <span className="branch-table__cutoff-cat">{cat}</span>
                              <span className="branch-table__cutoff-rank">{rank?.toLocaleString() ?? '—'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {branch.cutoffs?.WBJEE && (
                      <div className="branch-table__cutoff-group">
                        <h4>WBJEE Cutoffs</h4>
                        <div className="branch-table__cutoff-grid">
                          {Object.entries(branch.cutoffs.WBJEE).map(([cat, rank]) => (
                            <div key={cat} className={`branch-table__cutoff-cell ${userInput?.category === cat ? 'branch-table__cutoff-cell--highlight' : ''}`}>
                              <span className="branch-table__cutoff-cat">{cat}</span>
                              <span className="branch-table__cutoff-rank">{rank?.toLocaleString() ?? '—'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BranchTable;