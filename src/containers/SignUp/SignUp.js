import React, { Component } from 'react';
import T from 'prop-types';
import { Form } from 'semantic-ui-react'

import FormButtons from './FormButtons';

import { routes } from '../../const';

class SignUp extends Component {
  static propTypes = {

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

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  onSignUpClick = () => {

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

export default SignUp;
