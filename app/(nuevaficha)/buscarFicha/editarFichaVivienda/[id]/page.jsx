import {
  getBarriosVivienda,
  getViviendaById,
  getViviendaFactoresById,
} from "@/app/action";
import Vivienda from "@/app/ui/viviendas/datosVivienda/vivienda";
import FactoresViviendas from "@/app/ui/viviendas/factoresVivienda/factoresVivienda";
import ServicioVivienda from "@/app/ui/viviendas/servicios/serviciosVivienda";
import UbicacionVivienda from "@/app/ui/viviendas/ubicacionVivienda/ubicacionVivienda";

export default async function AgregarVivienda({ params }) {
  const barrios = await getBarriosVivienda();
  const [viviendaById] = await getViviendaById(params.id);
  const [factoresById] = await getViviendaFactoresById(
    viviendaById?.csctbviviendaid
  );
  return viviendaById ? (
    <>
      <div className="container-fluid vh-100 d-flex flex-column p-3">
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
              Datos Vivienda
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
              Servicio Vivienda
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
              Factores de riesgo
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-prioritario-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-prioritario"
              type="button"
              role="tab"
              aria-controls="pills-prioritario"
              aria-selected="false"
            >
              Ubicacion Vivienda
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
            <Vivienda viviendaById={viviendaById}></Vivienda>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <ServicioVivienda viviendaById={viviendaById}></ServicioVivienda>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabIndex="0"
          >
            <FactoresViviendas factoresById={factoresById} id_vivienda={viviendaById?.csctbviviendaid}></FactoresViviendas>
          </div>
          <div
            className="tab-pane fade"
            id="pills-prioritario"
            role="tabpanel"
            aria-labelledby="pills-prioritario-tab"
            tabIndex="0"
          >
            <UbicacionVivienda
              barrios={barrios}
              viviendaById={viviendaById}
            ></UbicacionVivienda>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="alert alert-warning" role="alert">
          No tienes asignada una vivienda por favor regresa!
        </div>
      </div>
    </>
  );
}
