/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

function GuardedRoute({ isAuthenticated, ...routeProps }: ProtectedRouteProps) {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
}

export default GuardedRoute;
