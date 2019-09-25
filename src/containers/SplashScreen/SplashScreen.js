import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

import { authService } from '../../services';
import { dispatch } from '../../redux/store';

class SplashScreen extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    authService.checkAuth();

    console.log('Splash screen constructor ');

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

    return accounts.loading ?
      <Dimmer active inverted>
        <Loader size="massive">Authorization check</Loader>
      </Dimmer>
      : children;
  }
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps, null)(SplashScreen);
