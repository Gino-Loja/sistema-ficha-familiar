"use client";
import {
  insertRiesgosBiologicosAmbientalesSocioeconomicos,
  saveEvaluarRiesgo,
} from "@/app/action";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ModalGenerico from "../modal/modalGenerico";
import { useSession } from "next-auth/react";
import ModalFinalizar from "../modal/modalFinalizar";
import { useRouter } from "next/navigation";

export default function Biologico({
  biologicos,
  socioeconomicos,
  ambientales,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [modalShow, setModalShow] = useState(false);
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);

  const [listaBiologicos, setListaBiologicos] = useState([]);
  const [listaSocioeconomicos, setListaSocioeconomicos] = useState([]);
  const [listaAmbientales, setListaAmbientales] = useState([]);
  const [Rbiologicos, setRbiologicos] = useState([]);
  const [Rsocioeconomicos, setRsocioeconomicos] = useState([]);
  const [RAmbientales, setRAmbientales] = useState([]);

  const [
    biologicoOrSocioeconomicoOrAmbiental,
    setBiologicoOrSocioeconomicoOrAmbiental,
  ] = useState({});
  useEffect(() => {
    const getBiologicos = async (anios, meses, dias) =>
      await biologicos(anios, meses, dias);
    const getSocioeconomicos = async (anios, meses, dias) =>
      await socioeconomicos(anios, meses, dias);
    const getAmbientales = async () => await ambientales();

    if (status == "authenticated") {
      if (session.user.email?.id) {
        const { anios, meses, dias } = session.user.email;
        getBiologicos(anios, meses, dias).then((data) => {
          setListaBiologicos(data);
        });
        getSocioeconomicos(anios, meses, dias).then((data) => {
          setListaSocioeconomicos(data);
        });
        getAmbientales().then((data) => {
          setListaAmbientales(data);
        });
      }
    }
  }, [status]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(session)
  const onSubmit = handleSubmit(async (data) => {
    const result = await insertRiesgosBiologicosAmbientalesSocioeconomicos(
      Rbiologicos,
      RAmbientales,
      Rsocioeconomicos,
      session.user.email.id_familia
    );
    if (result.error) {
      console.log(result.error);
    } else {
      const tabs = document.querySelectorAll(".nav-link");
      const content = document.querySelectorAll(".tab-pane");

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

  const handleChange = () => {
    switch (true) {
      case biologicoOrSocioeconomicoOrAmbiental?.nom_rbiolo !== undefined:
        setRbiologicos([...Rbiologicos, biologicoOrSocioeconomicoOrAmbiental]);
        break;

      case biologicoOrSocioeconomicoOrAmbiental?.nom_rambiental !== undefined:
        setRAmbientales([
          ...RAmbientales,
          biologicoOrSocioeconomicoOrAmbiental,
        ]);
        break;

      default:
        setRsocioeconomicos([
          ...Rsocioeconomicos,
          biologicoOrSocioeconomicoOrAmbiental,
        ]);
        break;
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <ModalGenerico
        show={modalShow}
        tittle={
          "Desea agregar: " +
          (biologicoOrSocioeconomicoOrAmbiental?.nom_rbiolo !== undefined
            ? biologicoOrSocioeconomicoOrAmbiental?.nom_rbiolo
            : biologicoOrSocioeconomicoOrAmbiental?.nom_rsocio !== undefined
            ? biologicoOrSocioeconomicoOrAmbiental?.nom_rsocio
            : biologicoOrSocioeconomicoOrAmbiental?.nom_rambiental)
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
              handleChange();
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalGenerico>
      <ModalFinalizar
        show={modalShowFinalizar}
        tittle={`A Finalizado el registro de: ${session?.user?.email?.nombre} como ${session?.user?.email?.parentesco}`}
      >
        <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
          <button
            onClick={() => {
              setModalShowFinalizar(false);
              router.push("/nuevaFicha/");
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalFinalizar>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Riesgos Biologicos</p>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
          <button className="btn btn-info mb-2 btn-md" type="button">
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
            Biologicos
          </button>

          <select
            {...register("biologicos", {
              required: {
                value: true,
                message: "Seleccione la prioridad",
              },
              onChange: (e) => {
                if (e.target.value != "") {
                  setBiologicoOrSocioeconomicoOrAmbiental(
                    JSON.parse(e.target.value)
                  );
                  //console.log(e.target.value)
                  setModalShow(true);
                  return;
                }
                setModalShow(false);
                return;
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            {listaBiologicos.map((biologico) => (
              <option
                key={biologico.csctbriesgobioloid}
                value={JSON.stringify(biologico)}
              >
                {biologico.nom_rbiolo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
          <button className="btn btn-info mb-2 btn-md" type="button">
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
            Socioeconomicos
          </button>

          <select
            {...register("socioeconomicos", {
              required: {
                value: true,
                message: "Seleccione",
              },
              onChange: (e) => {
                if (e.target.value != "") {
                  setBiologicoOrSocioeconomicoOrAmbiental(
                    JSON.parse(e.target.value)
                  );
                  //console.log(e.target.value)
                  setModalShow(true);
                  return;
                }
                setModalShow(false);
                return;
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            {listaSocioeconomicos.map((socio) => (
              <option key={socio.csctbrsocioid} value={JSON.stringify(socio)}>
                {socio.nom_rsocio}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <label className="form-label"><h5>Lista de riesgos Biologicos</h5> </label>

          {Rbiologicos.map((biologico, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {biologico.nom_rbiolo}
                {Rbiologicos.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label className="form-label"><h5>Lista de riesgos Socioeconomicos</h5> </label>

          {Rsocioeconomicos.map((socio, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {socio.nom_rsocio}
                {Rsocioeconomicos.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <button className="btn btn-info mb-2 btn-md" type="button">
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
            Ambientales
          </button>

          <select
            {...register("ambientales", {
              required: {
                value: true,
                message: "Seleccione la prioridad",
              },
              onChange: (e) => {
                if (e.target.value != "") {
                  setBiologicoOrSocioeconomicoOrAmbiental(
                    JSON.parse(e.target.value)
                  );
                  //console.log(e.target.value)
                  setModalShow(true);
                  return;
                }
                setModalShow(false);
                return;
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            {listaAmbientales.map((ambiental) => (
              <option
                key={ambiental.csctbrambientalesid}
                value={JSON.stringify(ambiental)}
              >
                {ambiental.nom_rambiental}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <label className="form-label"><h5>Lista de riesgos Ambientales</h5></label>

          {RAmbientales.map((ambiental, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {ambiental.nom_rambiental}
                {RAmbientales.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>

      <div className=" h-25 d-flex justify-content-end mt-2 align-items-center">
   
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>
      </div>
    </form>
  );
}
