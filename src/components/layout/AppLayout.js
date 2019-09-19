import React from 'react';
import T from 'prop-types';

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <div className="layout-content">
      <h3>App layout</h3>
      {children}
    </div>
  </div>
);

AppLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AppLayout;
