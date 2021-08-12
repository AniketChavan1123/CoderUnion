import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (      // if authenticated load the component
          <Component {...props}></Component>
        ) : (
          <Redirect        // if not Authenticated redirect user to signin page to signin
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

export default PrivateRoute;
