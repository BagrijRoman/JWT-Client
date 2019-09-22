import React, { Component } from 'react';
import T from 'prop-types';
import { Button, Form, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routes } from '../../const';
import { authService } from '../../services';
import { notificator } from '../../utils';

class SignIn extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
    history: T.object.isRequired,
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

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const { accounts, history } = nextProps;

    if (accounts.isAuthenticated) {
      history.replace(routes.HOME);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleLoading = () => {
    const { state: { loading }, _isMounted } = this;

    if (_isMounted) {
      this.setState({ loading: !loading });
    }
  };

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  onSignInClick = async () => {
    const {
      toggleLoading,
      state: { email, password}
    } = this;
    toggleLoading();
    const authResult = await authService.signIn({ email, password });

    if (authResult.error) {
      notificator.error(authResult.details.message); // todo message should be trnaslated
    }

    toggleLoading();
  };

  onSignUpClick = () => this.props.history.push(routes.SIGN_UP);

  onForgotPasswordClick = () => this.props.history.push(routes.FORGOT_PASSWORD);

  render () {
    const {
      onSignInClick,
      onSignUpClick,
      onForgotPasswordClick,
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
              icon: true,
              labelPosition: 'left',
              primary: true,
              className: 'sign-in-form-btn',
              loading,
              disabled: loading,
              onClick: onSignInClick,
            }}
          >
            <Icon name="sign-in" />
            Sign in
          </Button>
          <Button
            {...{
              icon: true,
              labelPosition: 'left',
              className: 'sign-in-form-btn',
              disabled: loading,
              onClick: onSignUpClick,
            }}
          >
            <Icon name="add user" />
            Sign up
          </Button>
          <Button
            {...{
              icon: true,
              labelPosition: 'left',
              className: 'sign-in-form-btn',
              disabled: loading,
              onClick: onForgotPasswordClick,
            }}
          >
            <Icon name="question" />
            Forgot password
          </Button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default withRouter(connect(mapStateToProps, null)(SignIn));
