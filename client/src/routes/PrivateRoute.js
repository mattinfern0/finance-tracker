import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { getCookie } from '../utils'

const PrivateRoute = ({component: Component, ...args }) => (
  <Route
    {...args} 
    render={(props) => {
      console.log(getCookie('csrftoken'));
      if (getCookie('csrftoken')) {
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