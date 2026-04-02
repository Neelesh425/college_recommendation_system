import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner container">
      <div className="footer__brand">
        <span className="footer__logo">◈ CollegePath</span>
        <p className="footer__tagline">Helping students in Jharkhand & West Bengal find the right college based on their JEE & WBJEE ranks.</p>
      </div>
      <div className="footer__links">
        <Link to="/">Home</Link>
        <Link to="/search">Find Colleges</Link>
      </div>
      <div className="footer__note">
        <p>Cutoff data is indicative and based on previous year trends. Always verify with official sources before applying.</p>
      </div>
    </div>
    <div className="footer__bottom">
      <span>© {new Date().getFullYear()} CollegePath · Built for students of JH & WB</span>
    </div>
  </footer>
);

export default Footer;