"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { insertFactoresVivienda, insertViviendaServicio } from "@/app/action";

export default function FactoresViviendas(props) {
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
    const resul = await insertFactoresVivienda(
      data,
      session.user.email?.id_vivienda
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
        <p className="fw-bold fs-4">Factores Vivienda</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Riesgos por animales:</h5>
            </label>
            <div className="d-flex flex-column">
              <div className="form-check">
                <input
                  {...register("agresividad", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Agresividad
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("insalubridad", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Insalubridad
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("cantidad", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Cantidad
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Convive con animales que:</h5>
            </label>
            <div className="d-flex  flex-column">
              <select
                {...register("convAnimales", {
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
                <option value={true}>SI</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3">
            <label className="form-label">
              <h5>Tipo de Animales:</h5>
            </label>
            <div className="d-flex flex-column">
              <div className="form-check">
                <input
                  {...register("domesticos", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Domesticos
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("Granja", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Granja
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("silvestre", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">
                  Silvestres
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3">
            <label className="form-label">
              <h5>Tipo de animal domestico:</h5>
            </label>
            <div className="d-flex flex-column">
              <div className="form-check">
                <input
                  {...register("perro", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Perro
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("gato", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  gato
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Raza de perros:</h5>
            </label>
            <div className="d-flex flex-column">
              <div className="form-check">
                <input
                  {...register("pequena", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Raza pequeña
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("mediana", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Raza mediana
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("grande", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Raza grande
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Vectores:</h5>
            </label>
            <div className="d-flex  flex-column">
              <select
                {...register("vectores", {
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
                <option value={true}>SI</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3">
            <label className="form-label">
              <h5>Riesgo Ubicacion de la Vivienda:</h5>
            </label>
            <div className="d-flex flex-column">
              <div className="form-check">
                <input
                  {...register("riesgov1", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  Existe alto riesgo de incendio
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("riesgov2", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  La ubicacion de la vivienda esta en zonas de inundaciones
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("riesgov3", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  La ubicacion de la vivienda esta en zonas de deslizamiento
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("riesgov4", {})}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" >
                  La ubicación de la vivienda está en zonas de alto tráfico
                  vehicular
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3">
            <label className="form-label">
              <h5>Vulnerable:</h5>
            </label>
            <div className="d-flex  flex-column">
              <select
                {...register("vulnerable", {
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
                <option value={true}>SI</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-2 col-xl-2 ">
            <label className="form-label">
              <h5>Numero de gatos:</h5>
            </label>
            <input
              {...register("numeroGatos", {
                required: {
                  value: true,
                },
                maxLength: 10,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-xl-6 ">
            <label className="form-label">
              <h5>Proteccion ante vectores:</h5>
            </label>
            <textarea
              className="form-control"
              rows="1"
              {...register("proteccionVectores", {})}
            ></textarea>
          </div>
        </div>
        <div className=" h-25 d-flex justify-content-end my-2 align-items-center">
          <button type="submit" className="btn btn-primary">
            Guardar y Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
