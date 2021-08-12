// this is file where header and footer are mentioned and are called accordingly....bcz both header and footer
// are going to be same on everyPage
import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
    <Menu></Menu>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center">
          <h4>If you go any question, feel free to reach out</h4>
          <button className="btn btn-warning bt-lg">Contact Us</button>
        </div>

        <div className="container">
          <span className="text-muted">An Amazing <span className="text-white">MERN</span> Bootcamp</span>
        </div>
      </footer>
    </div>
  );
};
// if there is curly brace return is necessary

export default Base;
