import React from 'react';
import T from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Header/>
    <div className="layout-content">
      {children}
    </div>
    <Footer/>
  </div>
);

AppLayout.propTypes = {
  children: T.oneOfType([T.element, T.array, T.func]).isRequired,
};

export default AppLayout;
