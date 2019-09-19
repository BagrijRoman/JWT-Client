import React, { Component } from 'react';
import T from 'prop-types';

import Footer from './Footer';

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <div className="layout-content">
      <h3>Auth layout</h3>
      {children}
    </div>
    <Footer/>
  </div>
);

AuthLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AuthLayout;