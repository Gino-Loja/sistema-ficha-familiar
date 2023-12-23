import {
  getEtnia,
  getInstruccion,
  getOcupacion,
  getParentesco,
  getPueblos,
  saveFamilia,
} from "@/app/action";
import InfoPersonal from "@/app/components/infoPersonal";
import Modal from "@/app/components/modal";
import Vacuna from "@/app/components/vacunas/vacuna";

export default async function AgregarPersona({ params, searchParams }) {
  
  const etnias = await getEtnia();
  const ocupaciones = await getOcupacion();
  const instrucciones = await getInstruccion();
  const pueblos = await getPueblos();
  const parentescos = await getParentesco();

  return (
    <>
      <div className="container-fluid vh-100 d-flex flex-column p-3">
        {/* <Modal tittle="nada de bueno">
          <div className="d-flex w-50 justify-content-around align-items-center">
            <button
              data-bs-dismiss="modal"
              type="button"
              id="modalGuardar"
              className="btn btn-primary"
            >
              Aceptar
            </button>
          </div>
        </Modal> */}
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Inf Personal
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Vacunas
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Riesgos Discapacidad
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Prioritario
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Riesgos Biologicos
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-embarazada-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-embarazada"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Embarazadas
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <InfoPersonal
              etnias={etnias}
              ocupaciones={ocupaciones}
              instrucciones={instrucciones}
              pueblos={pueblos}
              parentescos={parentescos}
              saveFamilia={saveFamilia}
            >
              <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
                <button className="btn btn-danger">Cerrar</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Continuar
                </button>
              </div>
            </InfoPersonal>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <Vacuna params={searchParams}></Vacuna>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabIndex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="pills-disabled"
            role="tabpanel"
            aria-labelledby="pills-disabled-tab"
            tabIndex="0"
          >
            ...
          </div>
        </div>
      </div>
    </>
  );
}
