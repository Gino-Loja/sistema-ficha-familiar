import {
  getEtnia,
  getFamiliaEmbarazo,
  getFamiliarById,
  getInstruccion,
  getOcupacion,
  getParentesco,
  getPueblos,
} from "@/app/action";
import InfoPersonal from "@/app/ui/infoPersonal/inforPersonal";
import IndexPrioritarios from "@/app/ui/prioritarios/index";
import Vacuna from "@/app/ui/vacunas/vacuna";
import IndexRiesgos from "@/app/ui/riesgos";
import IndexBiologicos from "@/app/ui/biologicos";
import IndexEmbarazada from "@/app/ui/embarazada";

export default async function AgregarPersonaEdit({ params, searchParams }) {
  const etnias = await getEtnia();
  const ocupaciones = await getOcupacion();
  const instrucciones = await getInstruccion();
  const pueblos = await getPueblos();
  const parentescos = await getParentesco();
  const [datosFamiliar] = await getFamiliarById(params.id);
  const familiaEmbarazo = await getFamiliaEmbarazo(params.id);
  //console.log(familiaEmbarazo)

  return (
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
              Enfermedades
            </button>
          </li>
          {/* <li className="nav-item" role="presentation">
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
              id="pills-prioritario-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-prioritario"
              type="button"
              role="tab"
              aria-controls="pills-prioritario"
              aria-selected="false"
            >
              Prioritario
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-biologicos-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-biologicos"
              type="button"
              role="tab"
              aria-controls="pills-biologicos"
              aria-selected="false"
            >
              Riesgos Biologicos
            </button>
          </li> */}

          <li
            //style={{ display: familiaEmbarazo.length == 0 ? "none" : "" }}
            className="nav-item"
            role="presentation"
          >
            <button
              className="nav-link"
              id="pills-embarazada-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-embarazada"
              type="button"
              role="tab"
              aria-controls="pills-embarazada"
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
              datosFamiliar={datosFamiliar}
              data={{
                embarazo: familiaEmbarazo[0]?.gestas == null ? false : true,
              }}
            >
              <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
                <button className="btn btn-danger">Cerrar</button>
                <button type="submit" className="btn btn-primary">
                  Actulizar y continuar
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
            <Vacuna
              data={{
                anios: datosFamiliar.anios,
                meses: datosFamiliar.meses,
                dias: datosFamiliar.dias,
                nombre: datosFamiliar.nom_fam + " " + datosFamiliar.ape_fam,
                parentesco: datosFamiliar.nom_parentesco,
                embarazo: familiaEmbarazo[0]?.gestas == null ? false : true,
              }}
              params={searchParams}
              id_familia={params.id}
            ></Vacuna>
          </div>

          
          <div
            className="tab-pane fade"
            id="pills-embarazada"
            role="tabpanel"
            aria-labelledby="pills-embarazada-tab"
            tabIndex="0"
          >
            {familiaEmbarazo.length == 0 ? null : (
              <IndexEmbarazada
                id_familia={params.id}
                data={{
                  nombre: datosFamiliar.nom_fam + " " + datosFamiliar.ape_fam,
                  parentesco: datosFamiliar.nom_parentesco,
                  embarazo: familiaEmbarazo[0]?.gestas == null ? false : true,
                }}
              ></IndexEmbarazada>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
