import React, { Component } from 'react';
import T from 'prop-types';

const AuthLayout = ({ children }) => (
  <div>
    <h3>Auth layout</h3>
    {children}
  </div>
);

AuthLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AuthLayout;