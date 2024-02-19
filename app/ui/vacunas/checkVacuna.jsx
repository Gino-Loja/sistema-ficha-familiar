"use client";
import {
  guardarEnfermedadVacunas,
  updateEnfermdad,
  updateVacunas,
} from "@/app/action";
import { useForm } from "react-hook-form";
import {
  useSearchParams,
  usePathname,
  useRouter,
  useParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ModalGenerico from "@/app/components/modal/modalGenerico";
import ModalFinalizar from "@/app/components/modal/modalFinalizar";

export default function CheckVacuna({
  enfermedades,
  vacunas,
  familiarVacuna,
  data,
  familiarEnfermedad,
}) {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [enfer, setEnferme] = useState({});
  const [listaEnfermedades, setListaEnfermdades] = useState([]);
  const [listaVacunas, setListaVacunas] = useState([]);
  useEffect(() => {
    const { anios, meses, dias } = data;
    obtenerVacunas(anios, meses, dias).then((data) => {
      setListaVacunas(data);
    });
    setListaEnfermdades(familiarEnfermedad);
  }, []);

  const obtenerVacunas = async (anios, meses, dias) => {
    return await vacunas(anios, meses, dias);
  };
  const handleUpdateVacunas = async (
    accion,
    id_vacuna,
    id_familia,
    id_vacunaFamilia
  ) => {
    await updateVacunas(accion, id_vacuna, id_familia, id_vacunaFamilia).then(
      () => {
        refresh();
      }
    );
  };

  const handleUpdateEnfermedad = async (params) => {
    await updateEnfermdad(params).then(() => {
      refresh();
      setListaEnfermdades((prevEnfermedades) =>
        prevEnfermedades.filter(
          (enfermedad) => enfermedad.csctbenfermedadid !== params.id_enfermedad
        )
      );
    });
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const tabs = document.querySelectorAll(".nav-link");
    const content = document.querySelectorAll(".tab-pane");
    const modal = document.getElementById("modalGuardar");

    var indexTab = 0;

    //const tabs = document.querySelectorAll(".nav-link");

    // var indexTab = 0;

    tabs.forEach((tab, index) => {
      if (tab.classList.contains("active")) {
        indexTab = index;
        //console.log(indexTab);
      }
    });

    //console.log(activeTabIndex)
    if (tabs[tabs.length - 1].style.display != "none") {
      tabs.forEach((tab, index) => {
        if (tab.classList.contains("active")) {
          indexTab = index;
        }
      });
      console.log(indexTab);
      tabs[indexTab].classList.remove("active");
      tabs[indexTab + 1].classList.add("active");
      content[indexTab].classList.remove("active", "show");
      content[indexTab + 1].classList.add("active", "show");
    } else {
      setModalShowFinalizar(true);
    }
  });
  const seachParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const { replace, refresh } = useRouter();

  const handleOnchange = (termino) => {
    const params = new URLSearchParams(seachParams);
    if (termino) {
      params.set("query", termino);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalFinalizar
        show={modalShowFinalizar}
        tittle={`A Finalizado la Actualizacion de: ${data.nombre} como ${data.parentesco}`}
      >
        <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
          <button
            onClick={() => {
              setModalShowFinalizar(false);
              router.push("/buscarFicha/");
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalFinalizar>
      <ModalGenerico
        show={modalShow}
        tittle={
          "Desea agregar la enfermedad: " + enfer.nom_enfermedad
          // JSON.parse(watch("enfermedad") ? watch("enfermedad") : "{}")
          //   .nom_enfermedad
        }
      >
        <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
          <button
            onClick={() => setModalShow(false)}
            className="btn btn-danger"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              setModalShow(false);
              updateEnfermdad({
                accion: true,
                id_enfermedad: enfer.csctbenfermedadid,
                id_familia: params.id,
              }).then(() => {
                refresh();
              });
              setListaEnfermdades([...listaEnfermedades, enfer]);
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalGenerico>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Vacunas: {data.nombre}</p>
      </div>
      <div className="row">
        <div className="col-12">
          <a
            className="btn btn-info mb-2"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Vacunas
          </a>

          <div className="collapse" id="collapseExample">
            <div className="card card-body border-light overflow-x-auto">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Rango de Edad</th>
                    <th scope="col">Nombre de la Vacuna</th>
                    <th scope="col">check</th>
                  </tr>
                </thead>
                <tbody>
                  {listaVacunas.map((vacunas) => (
                    <tr key={vacunas.csctbvacunasid}>
                      <td>{vacunas.csctbvacunasid}</td>
                      <td>{vacunas.rango_edad}</td>
                      <td>{vacunas.nom_vacuna}</td>

                      <td>
                        <div className="form-check form-switch">
                          <input
                            {...register(vacunas.csctbvacunasid.toString(), {
                              value: familiarVacuna.some(
                                (id) =>
                                  id.csctbvacunasid == vacunas.csctbvacunasid
                              ),
                              onChange: (e) =>
                                handleUpdateVacunas(
                                  e.target.checked,
                                  vacunas.csctbvacunasid,
                                  params.id,
                                  familiarVacuna.find(
                                    (a) =>
                                      a.csctbvacunasid == vacunas.csctbvacunasid
                                  )?.csctbvacunafamiliaid
                                ),
                            })}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-xl-6">
          <input
            className="form-control"
            defaultValue={""}
            onChange={(e) => handleOnchange(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-xl-6">
          <select
            {...register("enfermedad", {
              onChange: (e) => {
                if (e.target.value != "") {
                  setEnferme(JSON.parse(e.target.value));
                  setModalShow(true);
                  return;
                }
                setModalShow(false);
                return;
              },
            })}
            className="form-select"
          >
            <option value="">Seleccione la opcion</option>
            {enfermedades.map((enfermedad, index) => (
              <option key={index} value={JSON.stringify(enfermedad)}>
                {enfermedad.nom_enfermedad + " " + enfermedad.cog_enfermedad}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-xl-6">
          {listaEnfermedades.map((enfermedad, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {enfermedad.nom_enfermedad + " " + enfermedad.cog_enfermedad}{" "}
                <span>
                  <button
                    onClick={() => {
                      handleUpdateEnfermedad({
                        accion: false,
                        id_enfermedad: enfermedad.csctbenfermedadid,
                        id_familia: params.id,
                        id_enfermedadFamilia: familiarEnfermedad.find(
                          (a) =>
                            a.csctbenfermedadid == enfermedad.csctbenfermedadid
                        )?.csctbenfermeriesgoid,
                      });
                    }}
                    type="button"
                    className="btn btn-danger mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </span>
                {listaEnfermedades.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>
      <div className=" h-25 d-flex flex-row-reverse mt-2 align-items-center">
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>
      </div>
    </form>
  );
}
