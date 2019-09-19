import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div className="footer-navigation">
        <div className="nav-section">
          <div className="nav-section-header">Navigation</div>
          <ul className="nav-section-list">
            <Link to="#" className="nav-item">Home</Link>
            <Link to="#" className="nav-item">About</Link>
            <Link to="#" className="nav-item">Terms of service</Link>
            <Link to="#" className="nav-item">Privacy policy</Link>
          </ul>
        </div>

        <div className="nav-section">
          <div className="nav-section-header">About us</div>
          <ul className="nav-section-list">
            <Link to="#" className="nav-item">Blog</Link>
            <Link to="#" className="nav-item">Portfolio</Link>
            <Link to="#" className="nav-item">FAQ</Link>
          </ul>
        </div>

      </div>
      <div className="bottom-line">
          <div className="copyright">
            Copyright © {new Date().getFullYear()} All Rights Reserved.
          </div>
          <div className="socials">
            <a className="social-link facebook" href="#"><i className="fa fa-facebook" /></a>
            <a className="social-link twitter" href="#"><i className="fa fa-twitter" /></a>
            <a className="social-link linkedin" href="#"><i className="fa fa-linkedin" /></a>
            <a className="social-link instagram" href="#"><i className="fa fa-instagram" /></a>
            <a className="social-link youtube" href="#"><i className="fa fa-youtube" /></a>
          </div>
      </div>
    </div>
  </footer>
);

export default Footer;
