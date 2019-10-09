/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// eslint-disable-next-line no-undef
const PrivateRoute = ({component: Component, ...args }) => (
  <Route
    {...args} 
    render={(props) => {
      if (false) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }
    }}
  />
);

export default PrivateRoute;
