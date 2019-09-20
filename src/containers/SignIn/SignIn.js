import React, { Component } from 'react';
import T from 'prop-types';
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routes } from '../../const';


class SignIn extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
    history: T.object.isRequired,
    dispatch: T.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    const { accounts, history } = props;

    if (accounts.isAuthenticated) {
      history.replace(routes.HOME);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { accounts, history } = nextProps;

    if (accounts.isAuthenticated) {
      history.replace(routes.HOME);
    }
  };

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  onSignInClick = () => {
    const {
      email,
      password,
    } = this.state;

    this.setState({ loading: true });



  };

  render () {
    const {
      onSignInClick,
      onInputChange,
      state: {
        email,
        password,
        loading,
      }
    } = this;

    return (
      <div className="sign-in-page">
        <div className="sign-in-container">
          <h3>Sign in</h3>
          <Form>
            <Form.Input
              {...{
                label: 'Email',
                type: 'email',
                placeholder: 'Type email here...',
                value: email,
                onChange: onInputChange('email'),
                disabled: loading,
              }}
            />
            <Form.Input
              {...{
                label: 'Password',
                type: 'password',
                placeholder: 'Enter password here...',
                value: password,
                onChange: onInputChange('password'),
                disabled: loading,
              }}
            />
          </Form>
          <Button
            {...{
              primary: true,
              content: 'Sign in',
              className: 'sign-in-btn',
              loading,
              onClick: onSignInClick,
            }}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default withRouter(connect(mapStateToProps, null)(SignIn));
