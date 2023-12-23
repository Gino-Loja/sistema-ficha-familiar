"use client";

import { useEffect } from "react";
//import updateUser from "./action";


import { useRouter } from "next/navigation";
import Modal from "./components/modal";

export default function Home() {
  useEffect(() => {
    //updateUser();
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const router = useRouter();

  const handleAgregarPersona = () => {
    router.push("/nuevaFicha");
    router.refresh();
  };

  //IsUser(username, password);

  return (
      <div className="w-100 vh-100 d-flex flex-column">
        <nav className="navbar bg-body-tertiary ">
          <div className="w-100 d-flex h-100 mx-2 justify-content-between align-items-center">
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
            <div>Cerrar Sesion</div>
          </div>
        </nav>
        <div
          style={{ height: "90vh" }}
          className=" d-flex justify-content-center align-items-center"
        >
          <div
            style={{ height: "65%", margin: "20px" }}
            className="card text-center"
          >
            <Modal tittle="Desea crear una nueva ficha familiar">
              <div className="d-flex w-50 justify-content-around align-items-center">
                <button
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={handleAgregarPersona}
                  className="btn btn-primary"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </Modal>
            <img
              style={{ width: "50%", height: "40%" }}
              src="./icon-192x192.png"
              className="m-auto"
              alt="..."
            />

            <div className="card-body d-flex flex-column justify-content-between align-items-center">
              <h3 className="card-title mb-1">Opciones Ficha Familiar</h3>
              <button
                type="button"
                //onClick={handlePushNuevaFicha}
                className="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#modal-warning"
              >
                Nueva Ficha
              </button>
              <button type="button" className="btn btn-primary">
                Buscar Ficha
              </button>
              <button type="button" className="btn btn-primary">
                Reporte
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
