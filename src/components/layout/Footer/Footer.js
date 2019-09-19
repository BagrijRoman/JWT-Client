import React from 'react';

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <h3>Footer component</h3>
      <div className="bottom-line">
        <div className="copyright">
          Copyright © {new Date().getFullYear()} All Rights Reserved.
        </div>
        <div className="socials">


        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
