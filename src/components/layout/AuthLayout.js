import React, { Component } from 'react';
import T from 'prop-types';

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <div className="layout-content">
      {children}
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AuthLayout;
