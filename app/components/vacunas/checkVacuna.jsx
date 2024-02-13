"use client";
import { guardarEnfermedadVacunas } from "@/app/action";
import { useForm } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalGenerico from "../modal/modalGenerico";
import { useSession } from "next-auth/react";
import ModalFinalizar from "../modal/modalFinalizar";

export default function CheckVacuna({ enfermedades, vacunas }) {

  const router =useRouter()
  const { data: session, status } = useSession();
  const [modalShow, setModalShow] = useState(false);
  const [enfer, setEnferme] = useState({});
  const [listaEnfermedades, setListaEnfermdades] = useState([]);
  const [listaVacunas, setListaVacunas] = useState([]);
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);

  useEffect(() => {
    if (status == "authenticated") {
      if (session.user.email?.id) {
        //console.log(session.user)
        const { anios, meses, dias } = session.user.email;
        obtenerVacunas(anios, meses, dias).then((data) => {
          setListaVacunas(data);
        });
      }
    }
  }, [status]);

  const obtenerVacunas = async (anios, meses, dias) => {
    return await vacunas(anios, meses, dias);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const result = await guardarEnfermedadVacunas(
      data,
      listaEnfermedades,
      session.user.email.id_familia
    );
    if (result.error) {
      console.log(result.error);
    } else {
      const tabs = document.querySelectorAll(".nav-link");
      const content = document.querySelectorAll(".tab-pane");
      const modal = document.getElementById("modalGuardar");
      var indexTab = 0;
      if (session.user.email.embarazada == "true") {
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
    }
  });
  const seachParams = useSearchParams();
  const pathname = usePathname();
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
        tittle={`A Finalizado el registro de: ${session?.user?.email?.nombre} como ${session?.user?.email?.parentesco}`}
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
              setListaEnfermdades([...listaEnfermedades, enfer]);
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalGenerico>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Vacunas</p>
      </div>
      <div className="row mb-3">
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
                              setValueAs: (e) => e.target.checked,
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
      <div className="row mb-3">
        <div className="col-sm-12 col-xl-6">
          <label className="form-label">
            <h5>Busqueda por nombre o codigo de la enfermedad</h5>
          </label>
          <input
            className="form-control"
            defaultValue={""}
            onChange={(e) => handleOnchange(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
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
      <div className="row mb-3">
        <div className="col-sm-12 col-xl-6">
          {listaEnfermedades.map((enfermedad, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {enfermedad.nom_enfermedad + " " + enfermedad.cog_enfermedad}{" "}
                {listaEnfermedades.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>
      <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
        <button type="button" className="btn btn-danger">
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>
      </div>
    </form>
  );
}
