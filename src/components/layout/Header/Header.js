import React, { Component } from 'react';

import { I18n } from 'react-redux-i18n';

import UserPanel from './UserPanel';

const Header = () => (
  <header className="app-header">
    <div className="header-content">
      <div className="header-left-panel">
        <h3>{I18n.t('header')}</h3>
      </div>

      <div className="header-right-panel">
        <UserPanel/>
      </div>
    </div>
  </header>
);

export default Header;
