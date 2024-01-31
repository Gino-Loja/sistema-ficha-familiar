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
              router.push("/buscarFicha/");
            }}
            className="btn btn-primary mx-2"
          >
            Aceptar
          </button>
        </div>
      </ModalFinalizar>
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">
            <h5>Ultima Fecha de Menstruacion</h5>
          </label>
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
          <label className="form-label">
            <h5>Fecha Probable de Parto</h5>
          </label>
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
            <h5>{"N de controles prenatales < 20 sem.."}</h5>
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
            <h5>{"N de controles prenatales > 20 sem.."}</h5>
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
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          {" "}
          <label className="form-label">
            <h5>Semanas de Gestacion</h5>
          </label>
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
          <label className="form-label">
            <h5>Gestas</h5>
          </label>
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
          <label className="form-label">
            <h5>Partos</h5>
          </label>
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
          <label className="form-label">
            <h5>abortos</h5>{" "}
          </label>
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
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-12 col-xl-12">
          {" "}
          <label className="form-label">
            <h5>Antecedentes Patologicos</h5>
          </label>
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
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <label className="form-label">
            <h5>Selecione el nivel del Riesgo</h5>
          </label>
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
          <label className="form-label">
            <h5>Riesgo Obstetrico</h5>
          </label>

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
          <label className="form-label">
            <h5>Cesarias</h5>
          </label>
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

        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <label className="form-label">
            <h5>Tipo aborto</h5>
          </label>
          <select
            {...register("tipoAborto", {
              required: {
                value: true,
                message: "Seleccione",
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            <option value="ESPONTÁNEO">ESPONTÁNEO</option>
            <option value="INDUCIDO">INDUCIDO</option>
            <option value="NINGUNO">NINGUNO</option>
          </select>
        </div>
      </div>
      <div className=" h-25 d-flex justify-content-end mt-2 align-items-center">
        <button type="submit" className="btn btn-primary">
          guardar Y finalizar
        </button>
      </div>
    </form>
  );
}
