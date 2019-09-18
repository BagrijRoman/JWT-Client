import React from 'react';
import T from 'prop-types';

const AppLayout = ({ children }) => (
  <div>
    <h3>App layout</h3>
    {children}
  </div>
);

AppLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AppLayout;
