"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { insertViviendaServicio } from "@/app/action";

export default function ServicioVivienda(props) {
  const { data: session, status, update } = useSession();
  const { refresh } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const resul = await insertViviendaServicio(
      data,
      session.user.email?.id_familia
    );
    if (resul.error) {
      console.log(resul.error);
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
          <p className="fw-bold fs-4">Servicio de Vivienda</p>
        </div>
      <form onSubmit={onSubmit}>
        <div className="row ">
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Tratamiento del Agua:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("tratamientoAgua", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion:</option>
                <option value="COMPRAN AGUA PURIFICA">
                  COMPRAN AGUA PURIFICA
                </option>
                <option value="COMPRAN AGUA PURIFICA">
                  COMPRAN AGUA PURIFICA
                </option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4 ">
            <label className="form-label">
              <h5>Tipo de servicio higienico:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("tipoServicioHigienico", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="EXCUSADO/INODORO Y POZO SEPTICO">
                  EXCUSADO/INODORO Y POZO SEPTICO
                </option>
                <option value="EXCUSADO/INODORO Y ALCANTARRILLADO">
                  DEPARTAMENTO
                </option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>EL servicio Higienico es:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("servicioHigienico", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="FUERA DE LA VIVIENDA">
                  FUERA DE LA VIVIENDA
                </option>
                <option value="DENTRO DE LA VIVIENDA">
                  DENTRO DE LA VIVIENDA
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>El servicio de ducha es:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("ducha", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="EXCLUSIVO DEL HOGAR">EXCLUSIVO DEL HOGAR</option>
                <option value="COMPARTIDO">COMPARTIDO</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4 ">
            <label className="form-label">
              <h5>Como elimina la basura:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("basura", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="OTRO">OTRO</option>
                <option value="SERVICIO MUNICIPAL">SERVICIO MUNICIPAL</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Cuenta con Servicio de Internet:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("internet", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value={true}>SI </option>
                <option value={false}>NO</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Tipo de Alumbrado:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("alumbrado", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="EMPRESA ELECTRICA PUBLICA">
                  EMPRESA ELECTRICA PUBLICA
                </option>
                <option value="OTROS">OTROS</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4 ">
            <label className="form-label">
              <h5>En el hogar se cocina con:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("cocina", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="ELECTRICIDAD">ELECTRICIDAD</option>
                <option value="GAS">GAS</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>La cocina esta dentro del dormitorio:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("cocinaDormitorio", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value={true}>SI </option>
                <option value={false}>NO</option>
              </select>
            </div>
          </div>
        </div>

        <div className=" h-25 d-flex justify-content-end my-2 align-items-center">
          <button  type="submit" className="btn btn-primary">
            Guardar y Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
