"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { insertUbicacionVivienda } from "@/app/action";
import ModalFinalizar from "@/app/components/modal/modalFinalizar";

export default function UbicacionVivienda({ barrios, viviendaById }) {
  const { data: session, status, update } = useSession();
  const { refresh, push } = useRouter();
  const [modalShowFinalizar, setModalShowFinalizar] = useState(false);
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const resul = await insertUbicacionVivienda(data, params.id);
    if (resul.error) {
      console.log(resul.error);
    } else {
      setModalShowFinalizar(true);
    }
  });

  return (
    <div className="container-fluid">
      <ModalFinalizar
        show={modalShowFinalizar}
        tittle={`A Finalizado el registro de la vivienda de: ${
          viviendaById.nom_fam + " " + viviendaById.ape_fam
        }`}
      >
        <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
          <button
            onClick={() => {
              setModalShowFinalizar(false);
              push("/buscarFicha/");
              refresh();
            }}
            className="btn btn-primary mx-2"
          >
            Aceptar
          </button>
        </div>
      </ModalFinalizar>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Ubicacion Vivienda</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>N de celular:</h5>
            </label>
            <input
              {...register("celular", {
                required: {
                  value: true,
                },
                value: viviendaById.num_celular,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>N de telefono convencional:</h5>
            </label>
            <input
              {...register("convencional", {
                required: {
                  value: true,
                },
                value: viviendaById.num_telefono,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Longitud:</h5>
            </label>
            <input
              {...register("longitud", {
                required: {
                  value: true,
                },
                value: viviendaById.longitud1,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Latitud:</h5>
            </label>
            <input
              {...register("latitud", {
                required: {
                  value: true,
                },
                value: viviendaById.latitud1,
              })}
              type="number"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Altitud:</h5>
            </label>
            <input
              {...register("altitud", {
                required: {
                  value: true,
                  message: "Ingrese los nombres",
                },
                value: viviendaById.altitud1,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Canton:</h5>
            </label>
            <input
              {...register("canton", {
                required: {
                  value: true,
                  message: "Ingrese los nombres",
                },
                value: viviendaById.canton,
              })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Barrios Comunidad:</h5>
            </label>
            <select
              {...register("barriosComunidad", {
                required: {
                  value: true,
                },
                value: viviendaById.csctbbarriosid,
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>

              {barrios.map((barrio, index) => {
                return (
                  <option key={index} value={barrio.csctbbarriosid}>
                    {barrio.nom_barrio + " " + barrio.nom_eaisbarrios}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Sector:</h5>
            </label>
            <select
              {...register("sector", {
                required: {
                  value: true,
                },
                value: viviendaById.sector,
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              <option value="RURAL">RURAL</option>
              <option value="URBANO">URBANO</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Calle principal:</h5>
            </label>
            <input
              {...register("callePrincipal", {
                required: {
                  value: true,
                },
                value: viviendaById.cprincipal,
              })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Calle Secundaria:</h5>
            </label>
            <input
              {...register("calleSecundaria", {
                required: {
                  value: true,
                },
                value: viviendaById.csecundaria,
              })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>N de casa:</h5>
            </label>
            <input
              {...register("numeroCasa", {
                required: {
                  value: true,
                },
                value: viviendaById.num_casa,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 ">
            <label className="form-label">
              <h5>Parroquia:</h5>
            </label>
            <input
              {...register("parroquia", {
                required: {
                  value: true,
                },
                value: viviendaById.parroquia,
              })}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-xl-6 ">
            <label className="form-label">
              <h5>Lugar de referencia:</h5>
            </label>
            <textarea
              className="form-control"
              rows="1"
              {...register("referencia", { value: viviendaById.referenciadom })}
            ></textarea>
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
            Actualizar y Finalizar
          </button>
        </div>
      </form>
    </div>
  );
}
