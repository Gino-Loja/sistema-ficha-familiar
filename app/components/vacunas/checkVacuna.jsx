"use client";
import { guardarVacunas } from "@/app/action";
import { useForm } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ModalVacuna from "../modal/modal";

export default function CheckVacuna({ enfermedades, result }) {
  const [modalShow, setModalShow] = useState(false);
  const [enfer, setEnferme] = useState({});
  const [listaEnfermedades, setListaEnfermdades] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const resul = await guardarVacunas(data, listaEnfermedades );

  });
  const seachParams = useSearchParams();
  const pathname = usePathname();
  const { replace , refresh} = useRouter();
  
  const handleOnchange = (termino) => {
    const params = new URLSearchParams(seachParams);
    if (termino) {
      params.set("query", termino);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalVacuna
        show={modalShow}
        tittle={
          "Desea agregar la enfermedad: " + enfer.nom_enfermedad
          // JSON.parse(watch("enfermedad") ? watch("enfermedad") : "{}")
          //   .nom_enfermedad
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
              setListaEnfermdades([...listaEnfermedades, enfer]);
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalVacuna>

      <div className="row">
        <div className="col-12">
          <a
            className="btn btn-primary mb-2"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Link with href
          </a>

          <div className="collapse" id="collapseExample">
            <div className="card card-body border-light overflow-x-auto">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Rango de Edad</th>
                    <th scope="col">Nombre de la Vacuna</th>
                    <th scope="col">check</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((vacunas) => (
                    <tr key={vacunas.csctbvacunasid}>
                      <td>{vacunas.csctbvacunasid}</td>
                      <td>{vacunas.rango_edad}</td>
                      <td>{vacunas.nom_vacuna}</td>

                      <td>
                        <div className="form-check form-switch">
                          <input
                            {...register(vacunas.csctbvacunasid.toString(), {
                              setValueAs: (e) => e.target.checked,
                            })}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-xl-6">
          <input
            className="form-control"
            defaultValue={""}
            onChange={(e) => handleOnchange(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-xl-6">
          <select
            {...register("enfermedad", {
              onChange: (e) => {
                if (e.target.value != "") {
                  setEnferme(JSON.parse(e.target.value));
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
            {enfermedades.map((enfermedad, index) => (
              <option key={index} value={JSON.stringify(enfermedad)}>
                {enfermedad.nom_enfermedad + " " + enfermedad.cog_enfermedad}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-xl-6">
          {listaEnfermedades.map((enfermedad, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {enfermedad.nom_enfermedad + " " + enfermedad.cog_enfermedad}{" "}
                {listaEnfermedades.length == index + 1 ? (
                  <span class="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>
      <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
        <button className="btn btn-danger">Cerrar</button>
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>
      </div>
    </form>
  );
}
