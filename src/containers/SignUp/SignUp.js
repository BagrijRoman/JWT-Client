import React, { Component } from 'react';
import T from 'prop-types';
import { Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

import FormButtons from './FormButtons';

import { authService } from '../../services';
import { routes } from '../../const';
import { notificator, validateDataBySchema } from '../../utils';
import signUpValidationSchema from './validationSchema';

class SignUp extends Component {
  static propTypes = {
    history: T.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      loading: false,
      errors: {
        name: false,
        email: false,
        passowrd: false,
        rePassword: false,
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

  setError = (error) => {
    const stateUpdates = { errors: {} };

    if (error) {
      const { message, key } =  error.details;
      Object.assign(stateUpdates, { errors: { [key]: message } });  // todo message should be trnaslated
      notificator.error(message); // todo message should be trnaslated
    }

    this.setState(stateUpdates);
  };

  resetErrors = () => this.setState({ errors: {} });

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  onSignUpClick = async () => {
    const {
      state: {
        name,
        email,
        password,
        rePassword,
      },
      toggleLoading,
      setError,
      resetErrors,
    } = this;
    toggleLoading(true);
    const data = { name, email, password, rePassword };
    const { error } = validateDataBySchema(data, signUpValidationSchema);

    if (error) {
      setError(error);
    } else {
      resetErrors();
      const authResult = await authService.signUp(data);

      if (authResult.error) {
        setError(authResult);
      }
    }

    toggleLoading(false);
  };

  onSignInClick = () => this.props.history.push(routes.SIGN_IN);

  render () {
    const {
      onSignUpClick,
      onSignInClick,
      onInputChange,
      state: {
        name,
        email,
        password,
        rePassword,
        loading,
        errors,
      }
    } = this;

    return (
      <div className="sign-page">
        <div className="sign-container">
          <h3>Sign up</h3>
          <Form error>
            <Form.Input
              {...{
                label: 'Name',
                type: 'text',
                placeholder: 'Input name here...',
                value: name,
                onChange: onInputChange('name'),
                disabled: loading,
                error: errors.name,
              }}
            />
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
            <Form.Input
              {...{
                label: 'Confirm Password',
                type: 'password',
                placeholder: 'Confirm password here...',
                value: rePassword,
                onChange: onInputChange('rePassword'),
                disabled: loading,
                error: errors.rePassword,
              }}
            />
          </Form>

          <FormButtons
            {...{
              loading,
              onSignInClick,
              onSignUpClick,
            }}
          />
        </div>
      </div>
    );
  };
}

export default withRouter(SignUp);
