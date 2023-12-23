"use client";

import { useEffect } from "react";

function Nav(props) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar fixed-top bg-body-tertiary">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex justify-content-between align-items-center"
          href="#"
        >
          <img
            src="./icon-192x192.png"
            alt="Logo"
            width="100"
            height="70"
            className="d-inline-block align-text-top"
          />
          Ministerio de salud
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              Pricing
            </a>
            <a className="nav-link disabled" aria-disabled="true">
              Disabled
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
