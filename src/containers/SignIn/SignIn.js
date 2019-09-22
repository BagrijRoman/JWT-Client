import React, { Component } from 'react';
import T from 'prop-types';
import { Button, Form, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routes } from '../../const';
import { authService } from '../../services';
// import { signIn } from '../../actions/accounts';

class SignIn extends Component {
  static propTypes = {
    accounts: T.object.isRequired,
    history: T.object.isRequired,
    // signInAction: T.func.isRequired,
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

  onSignInClick = async () => {
    const {
      props: {
        signInAction,
      },
      state: {
        email,
        password,
      },
    } = this;

    this.setState({ loading: true });

    const authResult = await authService.signIn({ email, password });

    if (!authResult.error) {
      // signInAction(authResult);
    } else {
      // todo handle error here
    }

    // this.setState({ loading: false });
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

// const mapDispatchToProps = (dispatch) => ({
//   signInAction: (user) => dispatch(signIn(user))
// });

export default withRouter(connect(mapStateToProps, null)(SignIn));
