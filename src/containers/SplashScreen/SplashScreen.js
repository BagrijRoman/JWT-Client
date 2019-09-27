import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

import { authService } from '../../services';

class SplashScreen extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    authService.checkAuth();
  }

  shouldComponentUpdate(nextProps) {
    const { loading } = this.props.accounts;
    const { loading: nextLoading } = nextProps;

    return loading !== nextLoading;
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
