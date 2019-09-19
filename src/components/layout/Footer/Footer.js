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
