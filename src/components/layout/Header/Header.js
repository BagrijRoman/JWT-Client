import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
  };

  shouldComponentUpdate (nextProps) {
    return true;
  }

  render () {
    return (
      <header className="app-header">
        <div className="header-content">
          <h3>Application Name</h3>

          // todo  create panel for non authorized user nad for authorized
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps, null)(Header);
