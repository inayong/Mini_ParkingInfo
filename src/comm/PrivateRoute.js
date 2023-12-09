import React from 'react';
import { Link, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, allowedUsername, currentUsername, ...rest }) => {
    <Route
    {...rest}
    render={(props) =>
      currentUsername === allowedUsername ? (
        <Component {...props} />
      ) : (
        <Link to="/login" />
      )
    }
  />
};

export default PrivateRoute;