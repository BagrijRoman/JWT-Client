import React from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';


const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div className="footer-navigation">
        <div className="nav-section">
          <div className="nav-section-header">{I18n.t('navigation')}</div>
          <ul className="nav-section-list">
            <Link to="#" className="nav-item">{I18n.t('home')}</Link>
            <Link to="#" className="nav-item">{I18n.t('aboutProject')}</Link>
            <Link to="#" className="nav-item">{I18n.t('termsOfService')}</Link>
            <Link to="#" className="nav-item">{I18n.t('privacyPolicy')}</Link>
          </ul>
        </div>

        <div className="nav-section">
          <div className="nav-section-header">{I18n.t('aboutUs')}</div>
          <ul className="nav-section-list">
            <Link to="#" className="nav-item">{I18n.t('blog')}</Link>
            <Link to="#" className="nav-item">{I18n.t('portfolio')}</Link>
            <Link to="#" className="nav-item">{I18n.t('faq')}</Link>
          </ul>
        </div>

      </div>
      <div className="bottom-line">
          <div className="copyright">
            Copyright © {new Date().getFullYear()} {I18n.t('allRightsRecerved')}.
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
