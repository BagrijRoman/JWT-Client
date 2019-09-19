import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import SignInSignUpPanel from './SignInSignUpPanel';
import UserPanel from './UserPanel';

class Header extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
  };

  shouldComponentUpdate (nextProps) {
    return true;
  }

  render () {
    const { isAuthenticated } = this.props.accounts;

    return (
      <header className="app-header">
        <div className="header-content">
          <div className="header-left-panel">
            <h3>Application Name</h3>
          </div>

          <div className="header-right-panel">
            {isAuthenticated ? <UserPanel/> : <SignInSignUpPanel/>}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps, null)(Header);
