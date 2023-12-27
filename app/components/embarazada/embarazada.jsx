"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalFinalizar from "../modal/modalFinalizar";
export default function Embarazada({
  riesgoObstetrico,
  insertEmbarazadaAndRiesgoObstetricos,
}) {
  const { data: session } = useSession();
  const [listaRiesgos, setListaRiesgos] = useState([]);
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const riesgos = async () => await riesgoObstetrico(watch("tipoRiesgo"));
    if (watch("tipoRiesgo") != "") {
      riesgos().then((data) => {
        setListaRiesgos(data);
      });
    }
  }, [watch("tipoRiesgo")]);
  const onSubmit = handleSubmit(async (data) => {
    const id_familia = session.user.email.id_familia;
    const result = await insertEmbarazadaAndRiesgoObstetricos(
      data,
      watch("riesgoObstetrico"),
      id_familia
    );
    if (result.error) {
      console.log(result.error);
    } else {
      const tabs = document.querySelectorAll(".nav-link");
      const content = document.querySelectorAll(".tab-pane");

      setModalShowFinalizar(true);
    }
  });
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
              router.push("/nuevaFicha/");
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
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">abortos </label>
          <input
            {...register("aborto", {
              required: {
                value: true,
                message: "Ingrese",
              },
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
              maxLength: 10,
            })}
            type="number"
            className="form-control"
          />
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
