import React, { Component } from 'react';

import UserPanel from './UserPanel';

const Header = () => (
  <header className="app-header">
    <div className="header-content">
      <div className="header-left-panel">
        <h3>Application Name</h3>
      </div>

      <div className="header-right-panel">
        <UserPanel/>
      </div>
    </div>
  </header>
);

export default Header;
