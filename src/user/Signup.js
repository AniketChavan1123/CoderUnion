import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    // destructuring values u know that
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
        // clear the value once you signup
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control"
                type="text"
                value={name}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="text"
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              ></input>
            </div>
            <button
              onClick={onSubmit}
              style={{ marginTop: "10px" }}
              className="btn btn-success btn-block"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    );
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully.
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="sign up page" description="A page for user ro signUp">
      {signUpForm()}
      {successMessage()}
      {errorMessage()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
