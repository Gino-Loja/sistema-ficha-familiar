"use client";
import {
  updateFamiliarEvaluacionRiesgoById,
  updateEvaluacionRiesgos,
} from "@/app/action";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalGenerico from "@/app/components/modal/modalGenerico";

export default function Riesgos({
  evaluacionRiesgos,
  familiarRiesgos,
  familiaEvaluacionRiesgos,
  data
}) {
  const [modalShow, setModalShow] = useState(false);
  const [listaEvaluacionRiesgo, setListaEvaluacionRiesgo] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setListaEvaluacionRiesgo(familiaEvaluacionRiesgos);
  }, []);
  const onSubmit = handleSubmit(async (data) => {
    await updateFamiliarEvaluacionRiesgoById(params.id, data).then(() => {
      const tabs = document.querySelectorAll(".nav-link");
      const content = document.querySelectorAll(".tab-pane");

      var indexTab = 0;
      const activeTabIndex = tabs.forEach((tab, index) => {
        if (tab.classList.contains("active")) {
          indexTab = index;
        }
      });

      tabs[indexTab].classList.remove("active");
      tabs[indexTab + 1].classList.add("active");
      content[indexTab].classList.remove("active", "show");
      content[indexTab + 1].classList.add("active", "show");
    });
  });
  const params = useParams();
  const { replace, refresh ,push} = useRouter();
  const handleUpdateEvaluacionRiesgo = async (params) => {
    await updateEvaluacionRiesgos(params).then(() => {
      refresh();
      setListaEvaluacionRiesgo((prevEnfermedades) =>
        prevEnfermedades.filter(
          (enfermedad) => enfermedad.csctbevaluacionid !== params.id_evaluacion
        )
      );
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <ModalGenerico
        show={modalShow}
        tittle={
          "Desea agregar la enfermedad: " +
          JSON.parse(
            watch("evaluacionRiesgo") ? watch("evaluacionRiesgo") : "{}"
          ).nom_evaluacion
        }
      >
        <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
          <button
            onClick={() => {
              setModalShow(false);
            }}
            className="btn btn-danger"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              setModalShow(false);
              updateEvaluacionRiesgos({
                accion: true,
                id_evaluacion: JSON.parse(watch("evaluacionRiesgo"))
                  .csctbevaluacionid,
                id_familia: params.id,
              });
              setListaEvaluacionRiesgo([
                ...listaEvaluacionRiesgo,
                JSON.parse(watch("evaluacionRiesgo")),
              ]);
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalGenerico>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Riesgos y discapacidad : {data.nombre}</p>
      </div>
      <div className="row">
        <div className="col-12">
          <label className="form-label">Riesgo, enfermdad, discapacidad</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="1"
            {...register("riesgos", {
              required: {
                value: false,
              },
              value: familiarRiesgos.riesgos,
              validate: (value) => value !== "",
            })}
          ></textarea>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <label className="form-label">Grupo dispensarial</label>
          <select
            {...register("dispenserial", {
              required: {
                value: true,
                message: "Seleccione",
              },
              value: familiarRiesgos.gru_dispensa,
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            <option value="ENFERMO">Enfermo</option>
            <option value="RIESGO">Riesgo</option>
            <option value="SANO">Sano</option>
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <label className="form-label">Grado Discapacidad</label>
          <select
            {...register("discapacidad", {
              required: {
                value: true,
                message: "Seleccione",
              },
              value: familiarRiesgos.gra_discapacidad,
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            <option value="MODERADO">Moderado</option>
            <option value="LEVE">Leve</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
          <label className="form-label">Porcentaje de discapacidad</label>
          <input
            {...register("porcentaje", {
              required: {
                value: true,
                message: "Porcentaje",
              },
              value: familiarRiesgos.porce_discapacidad,
            })}
            type="number"
            className="form-control"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-xl-6">
          <select
            {...register("evaluacionRiesgo", {
              onChange: (e) => {
                if (e.target.value != "") {
                  //setEnferme(JSON.parse(e.target.value));
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
            {evaluacionRiesgos.map((riesgo, index) => (
              <option key={index} value={JSON.stringify(riesgo)}>
                {riesgo.nom_evaluacion}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-xl-6">
          {listaEvaluacionRiesgo.map((enfermedad, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {enfermedad.nom_evaluacion}
                <span>
                  <button
                    onClick={() => {
                      handleUpdateEvaluacionRiesgo({
                        accion: false,
                        id_evaluacion: enfermedad.csctbevaluacionid,
                        id_familia: params.id,
                        id_evaluacionFamilia: familiaEvaluacionRiesgos.find(
                          (a) =>
                            a.csctbevaluacionid == enfermedad.csctbevaluacionid
                        )?.csctbevaluariesgoid,
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
                {listaEvaluacionRiesgo.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>
      <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
        <button onClick={()=>(push("/buscarFicha"))} type="button" className="btn btn-danger">
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          Actualizar y Continuar
        </button>
      </div>
    </form>
  );
}
