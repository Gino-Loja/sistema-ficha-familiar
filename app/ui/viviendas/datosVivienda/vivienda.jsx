"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { updateViviendaById } from "@/app/action";

export default function Vivienda({ viviendaById }) {
  const { data: session, status, update } = useSession();
  const { refresh, push } = useRouter();
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const resul = await updateViviendaById(data, params.id);
    if (resul.error) {
      console.log(resul.error);
    } else {
      refresh()
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
        <p className="fw-bold fs-4">Datos Vivienda</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Condicion de la Ocupacion</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("conVivienda", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  value: viviendaById.con_vivienda,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="RIESGO ARQUITECTONICO">
                  RIESGO ARQUITECTONICO
                </option>
                <option value="EN CONSTRUCCION">EN CONSTRUCCION</option>
              </select>
              <input
                {...register("checkCondicion", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkCondicion") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detCondicion", {
                    value: viviendaById.det_condicion,
                  })}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4 ">
            <label className="form-label">
              <h5>Tipo de Vivienda</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("tipoVivienda", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  value: viviendaById.tipo_vivienda,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="MEDIAGUA">MEDIAGUA</option>
                <option value="DEPARTAMENTO">DEPARTAMENTO</option>
              </select>

              <input
                {...register("checkTipo", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkTipo") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detTipo", { value: viviendaById.det_tipovi })}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Via Acceso Vivienda</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("viaAcceso", {
                  required: {
                    value: true,
                  },
                  value: viviendaById.via_acceso,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="LASTRADO/CALLE DE TIERRA">
                  LASTRADO/CALLE DE TIERRA
                </option>
                <option value="CARRETERA/CALLE">CARRETERA/CALLE</option>
              </select>

              <input
                {...register("checkAcceso", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkAcceso") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detViaAcceso", {
                    value: viviendaById.det_acceso,
                  })}
                ></textarea>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Material techo</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("techo", {
                  required: {
                    value: true,
                  },
                  value: viviendaById.techo,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="HORMIGON/LOZA/CEMENTO">
                  HORMIGON/LOZA/CEMENTO
                </option>
                <option value="ZIN">ZIN</option>
              </select>

              <input
                {...register("checkTecho", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkTecho") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detTecho", { value: viviendaById.det_techo })}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4 ">
            <label className="form-label">
              <h5>Material piso</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("piso", {
                  required: {
                    value: true,
                  },
                  value: viviendaById.piso,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="DUELA/PARKET/TABLON TRATADO/TABLONCILLO/PISO FLOTANTE">
                  DUELA/PARKET/TABLON TRATADO/TABLONCILLO/PISO FLOTANTE
                </option>
                <option value="CEMENTO/LADRILLO">CEMENTO/LADRILLO</option>
              </select>

              <input
                {...register("checkPiso", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkPiso") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detPiso", { value: viviendaById.det_piso })}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Material Paredes</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("paredes", {
                  required: {
                    value: true,
                  },
                  value: viviendaById.paredes,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="HORMIGON/BLOQUE/LADRILLO">
                  HORMIGON/BLOQUE/LADRILLO
                </option>
                <option value="BLOQUE/LADRILLO RUSTICO">
                  BLOQUE/LADRILLO RUSTICO
                </option>
              </select>

              <input
                {...register("checkParedes", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkParedes") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detParedes", {
                    value: viviendaById.det_paredes,
                  })}
                ></textarea>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>La vivienda que ocupa es:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("propiedad", {
                  required: {
                    value: true,
                    message: "Seleccione el genero",
                  },
                  value: viviendaById.propiedad,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="PROPIA TOTALMENTE PAGADA">
                  PROPIA TOTALMENTE PAGADA
                </option>
                <option value="PROPIA LO ESTA PAGANDO">
                  PROPIA LO ESTA PAGANDO
                </option>
              </select>

              <input
                {...register("checkPropiedad", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkPropiedad") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detpPropiedad", {
                    value: viviendaById.det_propiedad,
                  })}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4 ">
            <label className="form-label">
              <h5>Procedimiento del Agua:</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("proAgua", {
                  required: {
                    value: true,
                  },
                  value: viviendaById.prov_agua,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="RED PUBLICA">RED PUBLICA</option>
                <option value="RED PRIVADA">RED PRIVADA</option>
              </select>

              <input
                {...register("checkproAgua", {})}
                className="form-check-input m-1"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              {watch("checkproAgua") ? (
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  {...register("detproAgua", {
                    value: viviendaById.det_provagua,
                  })}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-xl-4">
            <label className="form-label">
              <h5>Medio que recibe el Agua</h5>
            </label>
            <div className="d-flex">
              <select
                {...register("canalAgua", {
                  required: {
                    value: true,
                  },
                  value: viviendaById.canalizacionagua,
                  validate: (value) => value !== "",
                })}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Seleccione la opcion</option>
                <option value="POR TUBERIA DENTRO DE LA VIVIENDA">
                  POR TUBERIA DENTRO DE LA VIVIENDA
                </option>
                <option value="POR TUBERIA">POR TUBERIA</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-2 col-xl-2 ">
            <label className="form-label">
              <h5># de cuartos</h5>
            </label>

            <input
              {...register("cuartos", {
                required: {
                  value: true,
                },
                value: viviendaById.num_cuartos,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 ">
            <label className="form-label">
              <h5># de Dormitorios</h5>
            </label>

            <input
              {...register("dormitorios", {
                required: {
                  value: true,
                },
                value: viviendaById.dormitorios,
              })}
              type="number"
              className="form-control"
            />
          </div>
        </div>
        <div className=" h-25 d-flex justify-content-between my-2 align-items-center">
          <button
          type="button"
            onClick={() => push("/buscarFicha")}
            className="btn btn-danger"
          >
            Cerrar
          </button>
          <button type="submit" className="btn btn-primary">
            Actualizar y Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
