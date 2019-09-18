import React from 'react';
import T from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { routes } from '../../const';

const ProtectedRoute = ({ component: Component, auth, ...rest }) =>
  <Route
    {...rest}
    render={props => auth.isAuthenticated ?
      <Component {...props}/> :
      <Redirect to={routes.SIGN_IN} />
    }
  />;

ProtectedRoute.propTypes = {
  auth: T.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(ProtectedRoute);