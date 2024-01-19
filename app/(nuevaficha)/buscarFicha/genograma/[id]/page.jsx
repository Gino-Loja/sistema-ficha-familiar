"use client";
import MostrarGenograma from "@/app/components/prueba/page";
import { useEffect, useState } from "react";
import { getFamiliares, getTipoFamilia, updateTipoFamilia } from "@/app/action";
import { useForm } from "react-hook-form";
import Explain from "@/app/components/prueba/Explain";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

export default function GenogramaPage({ params, searchParams }) {
  var i = 0;
  const [listaFamilia, setlistaFamilia] = useState([]);
  const [listaTipoFamilia, setTipolistaTipoFamilia] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const getFamilia = async () => {
    return await getFamiliares(1, params.id);
  };
  const getTipoFamiliaC = async () => {
    return await getTipoFamilia(params.id);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    // var idPanel2 = document.getElementById("panel2")
    // var idPanel3 = document.getElementById("panel2")
    // var idPanel4 = document.getElementById("panel2")

    getTipoFamiliaC().then((data) => {
      setTipolistaTipoFamilia(data[0]);
      router.refresh();
    });
    getFamilia().then((data) => {
      setlistaFamilia(data);
      router.refresh();
    });
  }, []);

  useEffect(() => {
    i++;

    // Lógica que solo debe ejecutarse en la primera carga
    if (!firstLoad) {
      // Lógica que solo debe ejecutarse en la primera carga

      (async () => {
        const result = await updateTipoFamilia(
          {
            tipoFamilia: getValues("tipoFamilia"),
            hijoEdadAdulta: getValues("hijoEdadAdulta"),
            cicloVital: getValues("cicloVital"),
            primerHijo: getValues("primerHijo"),
            hijoEdadPreescolar: getValues("hijoEdadPreescolar"),
            hijoEdadEscolar: getValues("hijoEdadEscolar"),
            hijoEdadAdolescente: getValues("hijoEdadAdolescente"),
            hijoEdadAdulta: getValues("hijoEdadAdulta"),
            apgarFamiliar: getValues("apgarFamiliar"),
          },
          params.id
        ).then(() => router.refresh());
      })();
    }
    if (i == 2) {
      setFirstLoad(false);
    }
  }, [
    watch("tipoFamilia"),
    watch("hijoEdadAdulta"),
    watch("cicloVital"),
    watch("primerHijo"),
    watch("hijoEdadPreescolar"),
    watch("hijoEdadEscolar"),
    watch("hijoEdadAdolescente"),
    watch("hijoEdadAdulta"),
    watch("apgarFamiliar"),
  ]);

  const onChanges = (e) => {
    if (e.target.checked) {
      setValue("cicloVital", null);
    }
  };

  const OnchangesCicloVital = () => {
    setValue("primerHijo", false);
    setValue("hijoEdadPreescolar", false);
    setValue("hijoEdadEscolar", false);
    setValue("hijoEdadAdolescente", false);
    setValue("hijoEdadAdulta", false);
  };
  return listaFamilia.length > 0 ? (
    <>
      <div className="row container-fluid bg-body-tertiary">
        <div className="col-sm-12 col-md-9">
          <MostrarGenograma familiares={listaFamilia} />
        </div>
        <div className="col-sm-12 col-md-3 ">
          <Explain></Explain>
        </div>
      </div>
      <div style={{ height: "30vh" }} className="row p-2 container-fluid">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 border border-dark-subtle">
          <label className="form-label">
            <h5>TIPO DE FAMILIA (HOGAR)</h5>
          </label>
          <div className="d-flex  flex-column">
            <div className="form-check">
              <input
                {...register("tipoFamilia", {
                  onChange: onChanges,
                })}
                className="form-check-input"
                type="radio"
                value={"Familia extensa"}
                defaultChecked={
                  listaTipoFamilia.tipo_familia === "Familia extensa"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia extensa
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("tipoFamilia", { onChange: onChanges })}
                className="form-check-input"
                type="radio"
                value={"Familia nuclear"}
                defaultChecked={
                  listaTipoFamilia.tipo_familia === "Familia nuclear"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia nuclear
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("tipoFamilia", {})}
                className="form-check-input"
                type="radio"
                value={"Personas sin familia"}
                defaultChecked={
                  listaTipoFamilia.tipo_familia === "Personas sin familia"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Personas sin familia
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("tipoFamilia", { onChange: onChanges })}
                className="form-check-input"
                type="radio"
                value={"Equivalentes familiares"}
                defaultChecked={
                  listaTipoFamilia.tipo_familia === "Equivalentes familiares"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Equivalentes familiares{" "}
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("tipoFamilia", { onChange: onChanges })}
                className="form-check-input"
                type="radio"
                value={"Familia Ampliada"}
                defaultChecked={
                  listaTipoFamilia.tipo_familia === "Familia Ampliada"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia Ampliada{" "}
              </label>
            </div>
          </div>
        </div>
        <div
          style={
            !(watch("tipoFamilia") == "Personas sin familia")
              ? { pointerEvents: "none", opacity: "0.4" }
              : { pointerEvents: "auto", opacity: "1" }
          }
          className="col-sm-12 col-md-6 col-lg-4 col-xl-3 border border-dark-subtle"
        >
          <label className="form-label">
            <h5>CICLO VITAL FAMILIAR</h5>
          </label>
          <div className="d-flex w-100 flex-column">
            <div className="form-check">
              <input
                {...register("cicloVital", { onChange: OnchangesCicloVital })}
                className="form-check-input"
                type="radio"
                value={"FAMILIA EN FORMACIÓN"}
                defaultChecked={
                  listaTipoFamilia.ciclo_vital === "FAMILIA EN FORMACIÓN"
                }
              />
              <label
                className="form-check-label fs-6 lh-1"
                for="flexRadioDefault1"
              >
                FAMILIA EN FORMACIÓN 1 Pr.4 Pareja que aún no tiene hijos
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("cicloVital", {})}
                className="form-check-input"
                type="radio"
                value={"FAMILIA EN EXPANSIÓN"}
                defaultChecked={
                  listaTipoFamilia.ciclo_vital === "FAMILIA EN EXPANSIÓN"
                }
              />
              <label
                className="form-check-label fs-6 lh-1"
                for="flexRadioDefault1"
              >
                FAMILIA EN EXPANSIÓN
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("cicloVital", { onChange: OnchangesCicloVital })}
                className="form-check-input"
                type="radio"
                value={"FAMILIA EN DISPERSIÓN"}
                defaultChecked={
                  listaTipoFamilia.ciclo_vital === "FAMILIA EN DISPERSIÓN"
                }
              />
              <label
                className="form-check-label fs-6 lh-1"
                for="flexRadioDefault1"
              >
                FAMILIA EN DISPERSIÓN Desde que se inicia la partida del primer
                hijo hasta que lo hace el último.
              </label>
            </div>

            <div className="form-check">
              <input
                {...register("cicloVital", {
                  onChange: OnchangesCicloVital,
                })}
                className="form-check-input"
                type="radio"
                value={"FAMILIA EN CONTRACCIÓN"}
                defaultChecked={
                  listaTipoFamilia.ciclo_vital === "FAMILIA EN CONTRACCIÓN"
                }
              />
              <label
                className="form-check-label fs-6 lh-1"
                for="flexRadioDefault1"
              >
                FAMILIA EN CONTRACCIÓN Han partido los hijos y Pr.4 la pareja
                queda sola. (o uno de los dos esposos por 4 muerte de uno)
              </label>
            </div>
          </div>
        </div>
        <div
          style={
            !(watch("cicloVital") == "FAMILIA EN EXPANSIÓN")
              ? { pointerEvents: "none", opacity: "0.4" }
              : { pointerEvents: "auto", opacity: "1" }
          }
          className="col-sm-12 col-md-6 col-lg-4 col-xl-3 border border-dark-subtle"
        >
          <label className="form-label">
            <h5>CICLO VITAL FAMILIAR</h5>
          </label>
          <div className="d-flex w-100 flex-column">
            <div className="form-check">
              <input
                {...register("primerHijo", {
                  value: listaTipoFamilia.primer_hijo,
                })}
                className="form-check-input"
                type="checkbox"
                value=""
              />
              <label className="form-check-label " for="flexRadioDefault1">
                Pareja con nacimiento del 1er hijo
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("hijoEdadPreescolar", {
                  value: listaTipoFamilia.hijo_edad_preescolar,
                })}
                className="form-check-input"
                type="checkbox"
                value=""
              />
              <label className="form-check-label " for="flexRadioDefault1">
                Pareja con hijo en edad pre-escolar
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("hijoEdadEscolar", {
                  value: listaTipoFamilia.hijo_edad_escolar,
                })}
                className="form-check-input"
                type="checkbox"
                value=""
              />
              <label className="form-check-label " for="flexRadioDefault1">
                Pareja con hijo en edad escolar
              </label>
            </div>

            <div className="form-check">
              <input
                {...register("hijoEdadAdolescente", {
                  value: listaTipoFamilia.hijo_edad_adolescente,
                })}
                className="form-check-input"
                type="checkbox"
                value=""
              />
              <label className="form-check-label " for="flexRadioDefault1">
                Pareja con hijo adolescente
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("hijoEdadAdulta", {
                  value: listaTipoFamilia.hijo_edad_adulta,
                })}
                className="form-check-input"
                type="checkbox"
                value=""
              />
              <label className="form-check-label " for="flexRadioDefault1">
                Pareja con hijo en edad adulta
              </label>
            </div>
          </div>
        </div>

        <div
          style={
            !(
              watch("cicloVital") == "FAMILIA EN FORMACIÓN" ||
              watch("cicloVital") == "FAMILIA EN DISPERSIÓN" ||
              watch("cicloVital") == "FAMILIA EN CONTRACCIÓN"
            )
              ? { pointerEvents: "none", opacity: "0.4" }
              : { pointerEvents: "auto", opacity: "1" }
          }
          className="col-sm-12 col-md-6 col-lg-4 col-xl-3 border border-dark-subtle"
        >
          <label className="form-label">
            <h5>APGAR FAMILIAR PROMEDIO</h5>
          </label>
          <div className="d-flex  flex-column">
            <div className="form-check">
              <input
                {...register("apgarFamiliar", {})}
                className="form-check-input"
                type="radio"
                value={"Familia funcional"}
                defaultChecked={
                  listaTipoFamilia.apgar_familiar === "Familia funcional"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia funcional
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("apgarFamiliar", {})}
                className="form-check-input"
                type="radio"
                value={"Familia con disfunción leve"}
                defaultChecked={
                  listaTipoFamilia.apgar_familiar ===
                  "Familia con disfunción leve"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia con disfunción leve
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("apgarFamiliar", {})}
                className="form-check-input"
                type="radio"
                value={"Familia con disfunción moderada"}
                defaultChecked={
                  listaTipoFamilia.apgar_familiar ===
                  "Familia con disfunción moderada"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia con disfunción moderada
              </label>
            </div>
            <div className="form-check">
              <input
                {...register("apgarFamiliar", {})}
                className="form-check-input"
                type="radio"
                value={"Familia con disfunción severa"}
                defaultChecked={
                  listaTipoFamilia.apgar_familiar ===
                  "Familia con disfunción severa"
                }
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Familia con disfunción severa
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="w-100 vh-100 align-items-center d-flex justify-content-center">
      <div className="text-center d-flex flex-column">
        <center>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Cargando sus datos</div>
        </center>
      </div>
    </div>
  );
}
