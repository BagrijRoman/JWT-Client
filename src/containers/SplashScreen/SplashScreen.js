import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import { dispatch } from '../../redux/store';

class SplashScreen extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    // todo  here should be existing tokens check
    // if token present - valid it, ang get user in and toggle loding flase
    // if token invalid or not present - toggle loading false and user will be redirected to a singin in page

    setTimeout(() => {
      dispatch({
        type: 'ACCOUNTS::SET_LOADING',
        payload: false,
      });

    }, 5000);
  }

  render() {
    const { accounts, children } = this.props;

    return accounts.loading ? <h3>Splash screen will be here</h3> : children;
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps, null)(SplashScreen);
