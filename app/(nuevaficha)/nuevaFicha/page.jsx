"use client";
import Nav from "@/app/components/nav";
import Modal from "@/app/components/modal";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
function NuevaFicha() {


  const router = useRouter();
  const handlePusAgregarPersona = () => {
    router.push("/nuevaFicha/agregarPersona");
    
  };
  const handlePushaAgregarInformacionVivienda = () => {
    router.push("/agregarInformacionVivienda");
  };

  //IsUser(username, password);

  return (
    <div className="w-100 vh-100 d-flex flex-column">
      <Nav></Nav>
      <div
        style={{ height: "90vh" }}
        className=" d-flex justify-content-center align-items-center"
      >
        <div
          style={{ height: "30%", margin: "20px" }}
          className="card text-center"
        >
          <Modal tittle="EL primer integrante debe ser Jef@ del Hogar">
            <div className="d-flex w-50 justify-content-around align-items-center">
              <button
                data-bs-dismiss="modal"
                type="button"
                onClick={handlePusAgregarPersona}
                className="btn btn-primary"
              >
                Aceptar
              </button>
            </div>
          </Modal>

          <div className="card-body d-flex flex-column justify-content-between align-items-center">
            <h3 className="card-title mb-1">Opciones: </h3>
            <button
              type="button"
              className="btn btn-primary "
              data-bs-toggle="modal"
              data-bs-target="#modal-warning"
            >
              Agregar Personas
            </button>
            <button
              onClick={handlePushaAgregarInformacionVivienda}
              type="button"
              className="btn btn-primary"
            >
              Agregar Informacion de la vivienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevaFicha;
