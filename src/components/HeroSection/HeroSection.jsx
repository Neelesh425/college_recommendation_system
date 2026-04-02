import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.scss';

const stats = [
  { value: '40+', label: 'Colleges Listed' },
  { value: '2', label: 'States Covered' },
  { value: '6+', label: 'Branches' },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__bg-circle hero__bg-circle--1" />
        <div className="hero__bg-circle hero__bg-circle--2" />
        <div className="hero__bg-grid" />
      </div>

      <div className="hero__content container">
        <div className="hero__badge">
          <span>◈</span> Jharkhand & West Bengal
        </div>

        <h1 className="hero__title">
          Find Your <span className="hero__title-highlight">Perfect College</span>
          <br />Based on Your Rank
        </h1>

        <p className="hero__subtitle">
          Enter your JEE Main rank, WBJEE rank, and Class 12 marks —
          we'll match you with the best colleges you're eligible for.
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => navigate('/search')}>
            Find My Colleges
            <span className="hero__btn-arrow">→</span>
          </button>
          <button className="hero__btn hero__btn--ghost" onClick={() => navigate('/search')}>
            How it works
          </button>
        </div>

        <div className="hero__stats">
          {stats.map((s, i) => (
            <div className="hero__stat" key={i}>
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default HeroSection;