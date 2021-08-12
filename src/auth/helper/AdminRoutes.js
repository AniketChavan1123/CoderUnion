import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated() && isAuthenticated().user.role===1) ? (
          <Component {...props}></Component>      // will be sent from Routes.js
        ) : (
          <Redirect
            to={{
              pathname: "/signin", 
              state: { from: props.location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default AdminRoute;
