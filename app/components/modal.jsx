'use client'

import { useEffect } from "react";

function Modal(props) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <div
      className="modal fade p-3"
      id="modal-warning"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body d-flex flex-column justify-content-between align-items-center">
            <img src="./icons8-informacion.svg" className="img-fluid"></img>
            {props.tittle}
          </div>
          <div className="modal-footer align-items-center justify-content-center">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
