"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import ModalFinalizar from "@/app/components/modal/modalFinalizar";
import {
  updateFamiliaEmbarazadaById,
  updateRiesgosEmbarazada,
} from "@/app/action";
export default function Embarazada({
  riesgoObstetrico,
  insertEmbarazadaAndRiesgoObstetricos,
  embarazadaById,
  data,
  riesgosEmbarazo,
}) {
  const { params } = useParams();
  const [listaRiesgos, setListaRiesgos] = useState(riesgosEmbarazo);
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  //console.log(embarazadaById)
  //console.log(embarazadaById.gestas)


  useEffect(()=>{
    //router.back()
    //console.log(embarazadaById.gestas)
    router.refresh()
    //router.refresh()
  },[embarazadaById.gestas])
  useEffect(() => {
   // console.log(tabs[tabs.length - 1].style.display)
   //window.location.reload()
   //router.refresh()
   //console.log("nada")
    const riesgos = async () => await riesgoObstetrico(watch("tipoRiesgo"));
    if (watch("tipoRiesgo") != "") {
      riesgos().then((data) => {
        setListaRiesgos(data);
      });
    }
  }, [watch("tipoRiesgo")]);
  //console.log(embarazadaById);
  const onSubmit = handleSubmit(async (data) => {
    const result = await updateFamiliaEmbarazadaById(
      data,
      embarazadaById.csctbfamiliaid
    );
    const ressul = await updateRiesgosEmbarazada(
      watch("riesgoObstetrico"),
      embarazadaById.csctbfamiliaid
    );

    if (result.error) {
      console.log(result.error);
    } else {
      router.refresh();
      const tabs = document.querySelectorAll(".nav-link");
      const content = document.querySelectorAll(".tab-pane");

      setModalShowFinalizar(true);
    }
  });
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
              //router.refresh()

              router.push("/buscarFicha/");
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalFinalizar>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">Ultima Fecha de Menstruacion</label>
          <input
            {...register("fechaUltimaMenstruacion", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: new Date(embarazadaById.fecha_menstruacion)
                .toISOString()
                .split("T")[0],
            })}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">Fecha Probable de Parto</label>
          <input
            {...register("fechaProbableDeParto", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: new Date(embarazadaById.fecha_parto)
                .toISOString()
                .split("T")[0],
              maxLength: 10,
            })}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">
            {"Numeros de controles prenatales < a 20 sem.."}
          </label>
          <input
            {...register("controlMenos20", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: embarazadaById.control_menos20,
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">
            {"Numeros de controles prenatales > a 20 sem.."}
          </label>
          <input
            {...register("controlMas20", {
              required: {
                value: true,
                message: "Ingrese ",
              },
              value: embarazadaById.control_mas20,
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">Semanas de Gestacion</label>
          <input
            {...register("semanasGestacion", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: embarazadaById.semanas_gestacion,
            })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">Gestas</label>
          <input
            {...register("gestas", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: embarazadaById.gestas,
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">Partos</label>
          <input
            {...register("partos", {
              required: {
                value: true,
                message: "Ingrese ",
              },
              value: embarazadaById.partos,
              maxLength: 3,
            })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">N abortos Inducidos </label>
          <input
            {...register("abortosInducidos", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: embarazadaById.n_abortos_inducidos,
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-12 col-xl-12">
          {" "}
          <label className="form-label">Antecedentes Patologicos</label>
          <textarea
            {...register("antecedentesPatologicos", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: embarazadaById.ante_patologicos,
            })}
            type="number"
            className="form-control"
          />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <label className="form-label">Selecione el nivel del Riesgo</label>
          <select
            {...register("tipoRiesgo", {
              required: {
                value: true,
                message: "Seleccione un estado civil",
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            <option value={1}>RIESGO BAJO</option>
            <option value={2}>RIESGO ALTO</option>
            <option value={3}>RIESGO INMINENTE</option>
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <label className="form-label">Riesgo Obstetrico</label>

          <select {...register("riesgoObstetrico", {})} className="form-select">
            <option value="">Seleccione la opcion</option>
            {listaRiesgos.map((riesgo, index) => (
              <option key={index} value={riesgo.csctbriesgobsteid}>
                {riesgo.nom_rieobste}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">Cesarias</label>
          <input
            {...register("cesarias", {
              required: {
                value: true,
                message: "Ingrese ",
              },
              value: embarazadaById.cesarias,
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <label className="form-label">N abortos Espontaneo </label>
          <input
            {...register("abortosEspontaneos", {
              required: {
                value: true,
                message: "Ingrese",
              },
              value: embarazadaById.n_abortos_espontaneos,
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>
      </div>
      <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
        <button
          onClick={() => router.push("/buscarFicha")}
          type="button"
          className="btn btn-danger"
        >
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          Actualizar y finalizar
        </button>
      </div>
    </form>
  );
}
