"use client";
import { saveEvaluarRiesgo } from "@/app/action";
import { useForm } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalGenerico from "../modal/modalGenerico";
import { useSession } from "next-auth/react";

export default function Riesgos({ evaluacionRiesgos }) {
  const { data: session, status } = useSession();
  
  const [modalShow, setModalShow] = useState(false);
  const [listaEvaluacionRiesgo, setListaEvaluacionRiesgo] = useState([]);

//   useEffect(() => {
//     if (status == "authenticated") {
//       console.log(session.user.email);
//       const { anios, meses, dias } = session.user.email;
//       obtenerVacunas(anios, meses, dias).then((data) => {
//         setListaVacunas(data);
//       });
//     }
//   }, [status]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const result = await saveEvaluarRiesgo(
      data,
      listaEvaluacionRiesgo,
      session.user.email.id_familia
    );
    if (result.error) {
      console.log(result.error);
    } else {
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
    }
  });
  const seachParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  return (
    <form onSubmit={onSubmit}>
      <ModalGenerico
        show={modalShow}
        tittle={
          "Desea agregar la enfermedad: " + 
          JSON.parse(watch("evaluacionRiesgo") ? watch("evaluacionRiesgo") : "{}").nom_evaluacion
           
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
              setListaEvaluacionRiesgo([...listaEvaluacionRiesgo, JSON.parse(watch("evaluacionRiesgo"))]);
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalGenerico>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Riesgos y discapacidad</p>
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
                {enfermedad.nom_evaluacion }
                {listaEvaluacionRiesgo.length == index + 1 ? (
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
