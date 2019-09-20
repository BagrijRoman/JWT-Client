import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '123',
      password: '123',
      loading: false,
    };


    // here add check if user is logged in - redirection
  }

  componentWillReceiveProps(nextProps) {
    // here add check if user is logged in - redirection
  };

  onInputChange = (valueKey) => (e, data) => this.setState({ [valueKey]: data.value });

  onSignInClick = () => {
    const {
      email,
      password,
    } = this.state;
  };

  render () {
    const {
      onSignInClick,
      onInputChange,
      state: {
        email,
        password,
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
              }}
            />
            <Form.Input
              {...{
                label: 'Password',
                type: 'password',
                placeholder: 'Enter password here...',
                value: password,
                onChange: onInputChange('password'),
              }}
            />
          </Form>
          <Button
            {...{
              primary: true,
              content: 'Sign in',
              className: 'sign-in-btn'
            }}
          />
        </div>
      </div>
    );
  };
}

export default SignIn;  // connect auth section of store to a component
