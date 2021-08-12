import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    //didRedirect will be true when the signed in user is admin....and will be redirected to Admin Dashboard
  });

  const { email, password, error, loading, didRedirect } = values;
  // email=values.email
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // values as it it ...and also mention additional tweaking
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
          // if signin fails ...error=data.error and loading = false
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Signin Request failed"));
  };
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        // if user is admin
        return <Redirect to="/admin/dashboard"></Redirect>
        // <p> redirect to admin </p>;
      } else {
        return <Redirect to="/user/dashboard"></Redirect>
        // <p>redirect to user Dashboard</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"></Redirect>;
    }
    // once you signed in....jwt is stored ....which you have to delete it
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="text"
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              ></input>
            </div>
            <button
              onClick={onSubmit}
              style={{ marginTop: "10px" }}
              className="btn btn-success btn-block"
            >
              SignIn
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="sign in page" description="A page for user ro signUp">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify.values}</p>
    </Base>
  );
};

export default Signin;
