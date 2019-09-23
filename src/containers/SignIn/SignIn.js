import React, { Component } from 'react';
import T from 'prop-types';
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormButtons from './FormButtons';

import { routes, errors } from '../../const';
import { authService } from '../../services';
import { notificator, validateDataBySchema } from '../../utils';
import signInValidationSchema from './validationSchema';

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
      errors: {
        email: false,
        passowrd: false,
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleLoading = (value) => {
    const { _isMounted } = this;

    if (_isMounted) {
      this.setState({ loading: value });
    }
  };

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  setError = (error) => {
    const stateUpdates = { errors: {} };

    if (error) {
      const { message, key } =  error.details;
      Object.assign(stateUpdates, { errors: { [key]: message } });  // todo message should be trnaslated
      notificator.error(message); // todo message should be trnaslated
    }

    this.setState(stateUpdates);
  };

  onSignInClick = async () => {
    const {
      toggleLoading,
      setError,
      state: { email, password },
    } = this;
    toggleLoading(true);

    const { error } = validateDataBySchema({ email, password }, signInValidationSchema);

    if (error) {
      setError(error);
    } else {
      const authResult = await authService.signIn({ email, password });

      if (authResult.error) {
        setError(authResult);
      }
    }

    toggleLoading(false);
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
        errors,
      }
    } = this;

    return (
      <div className="sign-page">
        <div className="sign-container">
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
                error: errors.email,
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
                error: errors.password,
              }}
            />
          </Form>
          <FormButtons
            {...{
              loading,
              onSignInClick,
              onSignUpClick,
              onForgotPasswordClick,
            }}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ accounts }) => ({ accounts });

export default withRouter(connect(mapStateToProps, null)(SignIn));
