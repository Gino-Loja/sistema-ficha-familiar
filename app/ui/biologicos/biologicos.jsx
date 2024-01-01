"use client";
import {
  updateRiesgosAmbientales,
  updateRiesgosBiologicos,
  updateRiesgosSocieconomicos,
} from "@/app/action";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ModalFinalizar from "@/app/components/modal/modalFinalizar";
import ModalGenerico from "@/app/components/modal/modalGenerico";

export default function Biologico({
  data,
  biologicos,
  socioeconomicos,
  ambientales,
  riesgosAmbientalesById,
  riesgosSocioeconomicosById,
  riesgosBiologicosById,
}) {
  const router = useRouter();
  const params = useParams();

  const [modalShow, setModalShow] = useState(false);
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);
  const [listaBiologicos, setListaBiologicos] = useState([]);
  const [listaSocioeconomicos, setListaSocioeconomicos] = useState([]);
  const [listaAmbientales, setListaAmbientales] = useState([]);
  const [Rbiologicos, setRbiologicos] = useState(riesgosBiologicosById);
  const [Rsocioeconomicos, setRsocioeconomicos] = useState(
    riesgosSocioeconomicosById
  );
  const [RAmbientales, setRAmbientales] = useState(riesgosAmbientalesById);

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

    const { anios, meses, dias } = data;
    getBiologicos(anios, meses, dias).then((data) => {
      setListaBiologicos(data);
    });
    getSocioeconomicos(anios, meses, dias).then((data) => {
      setListaSocioeconomicos(data);
    });
    getAmbientales().then((data) => {
      setListaAmbientales(data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit =  () => {
    const tabs = document.querySelectorAll(".nav-link");
    const content = document.querySelectorAll(".tab-pane");

    var indexTab = 0;
    
    if (data.embarazo) {
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
  };

  const handleChange = () => {
    switch (true) {
      case biologicoOrSocioeconomicoOrAmbiental?.nom_rbiolo !== undefined:
        handleUpdateBiologicos({
          accion: true,
          id_i: biologicoOrSocioeconomicoOrAmbiental.csctbriesgobioloid,
          id_familia: params.id,
        }).then(() => {
          setRbiologicos([
            ...Rbiologicos,
            biologicoOrSocioeconomicoOrAmbiental,
          ]);
        });
        break;

      case biologicoOrSocioeconomicoOrAmbiental?.nom_rambiental !== undefined:
        handleUpdateAmbientales({
          accion: true,
          id_i: biologicoOrSocioeconomicoOrAmbiental.csctbrambientalesid,
          id_familia: params.id,
        }).then(() => {
          setRAmbientales([
            ...RAmbientales,
            biologicoOrSocioeconomicoOrAmbiental,
          ]);
        });
        break;

      default:
        handleUpdateSocieconomicos({
          accion: true,
          id_i: biologicoOrSocioeconomicoOrAmbiental.csctbrsocioid,
          id_familia: params.id,
        }).then(() => {
          setRsocioeconomicos([
            ...Rsocioeconomicos,
            biologicoOrSocioeconomicoOrAmbiental,
          ]);
        });
        break;
    }
  };

  const handleUpdateBiologicos = async (params) => {
    await updateRiesgosBiologicos(params).then(() => {
      setRbiologicos((prev) =>
        prev.filter((dato) => dato.csctbriesgobioloid !== params.id_i)
      );
      router.refresh();
    });
  };
  const handleUpdateSocieconomicos = async (params) => {
    await updateRiesgosSocieconomicos(params).then(() => {
      setRsocioeconomicos((prev) =>
        prev.filter((dato) => dato.csctbrsocioid !== params.id_i)
      );
      router.refresh();
    });
  };
  const handleUpdateAmbientales = async (params) => {
    await updateRiesgosAmbientales(params).then(() => {
      setRAmbientales((prev) =>
        prev.filter((dato) => dato.csctbrambientalesid !== params.id_i)
      );
      router.refresh();
    });
  };
  //console.log(Rbiologicos)

  return (
    <form >
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
        tittle={`A Finalizado el registro de: ${data.nombre} como ${data.parentesco}`}
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
        <p className="fw-bold fs-4">Riesgos Biologicos: {data.nombre}</p>
      </div>
      <div className="row ">
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
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <label className="form-label">Lista de riesgos Biologicos</label>
          {Rbiologicos.map((biologico, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {biologico.nom_rbiolo}
                <span>
                  <button
                    onClick={() => {
                      handleUpdateBiologicos({
                        accion: false,
                        id_i: biologico.csctbriesgobioloid,
                        id_familia: params.id,
                        id_d: riesgosBiologicosById.find(
                          (a) =>
                            a.csctbriesgobioloid == biologico.csctbriesgobioloid
                        )?.csctbrbiolofamiliaid,
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
                {Rbiologicos.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label className="form-label">Lista de riesgos Socioeconomicos</label>

          {Rsocioeconomicos.map((socio, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {socio.nom_rsocio}
                <span>
                  <button
                    onClick={() => {
                      handleUpdateSocieconomicos({
                        accion: false,
                        id_i: socio.csctbrsocioid,
                        id_familia: params.id,
                        id_d: riesgosSocioeconomicosById.find(
                          (a) => a.csctbrsocioid == socio.csctbrsocioid
                        )?.csctbrsociofamiliaid,
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
                {Rsocioeconomicos.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>

      <div className="row">
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
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
          <label className="form-label">Lista de riesgos Ambientales</label>

          {RAmbientales.map((ambiental, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {ambiental.nom_rambiental}
                <span>
                  <button
                    onClick={() => {
                      handleUpdateAmbientales({
                        accion: false,
                        id_i: ambiental.csctbrambientalesid,
                        id_familia: params.id,
                        id_d: riesgosAmbientalesById.find(
                          (a) =>
                            a.csctbrambientalesid ==
                            ambiental.csctbrambientalesid
                        )?.csctbrambientalfamiliaid,
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
                {RAmbientales.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>

      <div className="  h-25 d-flex justify-content-between mt-2 align-items-center">
      <button onClick={()=>(router.push("/buscarFicha"))} type="button" className="btn btn-danger">
          Cerrar
        </button>
        <button type="button" onClick={onSubmit} className="btn btn-primary">
          {data.embarazo ? "siguiente" : "Finalizar"}
        </button>
      </div>
      
    </form>
  );
}
