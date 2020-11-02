import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ path, exact, component }) => {
  const condition = localStorage.getItem('chat') !== null;

  return condition ? (<Route path={path} exact={exact} component={component} />)
    : (<Redirect to="/" />);
};

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
