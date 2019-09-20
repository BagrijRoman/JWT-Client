import React, { Component } from 'react';
import T from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <Header/>
    <div className="layout-content">
      {children}
    </div>
    <Footer/>
  </div>
);

AuthLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AuthLayout;
