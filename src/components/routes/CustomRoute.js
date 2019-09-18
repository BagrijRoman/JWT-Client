import React from 'react';
import T from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const CustomRoute = ({
  component: Component,
  layout: Layout,
  accounts,
  redirectTo,
  authStatus,
  ...rest
}) =>
  <Route
    {...rest}
    render={props => accounts.isAuthenticated === authStatus ?
      <Layout>
        <Component {...props}/>
      </Layout> :
      <Redirect to={redirectTo} />
    }
  />;

CustomRoute.propTypes = {
  accounts: T.object.isRequired,
  component: T.oneOfType([T.element, T.array, T.func]).isRequired,
  layout: T.oneOfType([T.element, T.func]).isRequired,
  redirectTo: T.string.isRequired,
  authStatus: T.bool.isRequired,
};

const mapStateToProps = ({ accounts }) => ({ accounts });

export default connect(mapStateToProps, null)(CustomRoute);
