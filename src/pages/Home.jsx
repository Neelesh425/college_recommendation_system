import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import './Home.scss';

const features = [
  {
    icon: '🎯',
    title: 'Rank-Based Matching',
    desc: 'Enter your JEE Main or WBJEE rank and get colleges you\'re actually eligible for — no guesswork.',
  },
  {
    icon: '📊',
    title: 'Category-Aware Cutoffs',
    desc: 'Cutoffs shown for your specific category — General, OBC, SC, ST, or EWS.',
  },
  {
    icon: '✅',
    title: 'Class 12 Eligibility Check',
    desc: 'We check your Class 12 percentage against each college\'s minimum requirement automatically.',
  },
  {
    icon: '🗺️',
    title: 'JH & WB Coverage',
    desc: 'Covers colleges in Jharkhand (JEE Main) and West Bengal (WBJEE), all in one place.',
  },
];

const Home = () => {
  return (
    <div className="home">
      <HeroSection />

      <section className="home__features">
        <div className="container">
          <div className="home__section-label">Why CollegePath?</div>
          <h2 className="home__section-title">Everything you need to decide</h2>
          <div className="home__features-grid">
            {features.map((f, i) => (
              <div className="home__feature-card" key={i}>
                <div className="home__feature-icon">{f.icon}</div>
                <h3 className="home__feature-title">{f.title}</h3>
                <p className="home__feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__how">
        <div className="container">
          <div className="home__section-label">How It Works</div>
          <h2 className="home__section-title">Three steps to your shortlist</h2>
          <div className="home__steps">
            {[
              { step: '01', title: 'Enter Your Scores', desc: 'Input your JEE Main rank, WBJEE rank, Class 12 %, and category.' },
              { step: '02', title: 'We Match Colleges', desc: 'Our engine checks your rank against cutoffs for every college and branch.' },
              { step: '03', title: 'Explore & Decide', desc: 'Browse matched colleges, compare branches, and click through for full details.' },
            ].map((s, i) => (
              <div className="home__step" key={i}>
                <div className="home__step-number">{s.step}</div>
                <div className="home__step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < 2 && <div className="home__step-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;