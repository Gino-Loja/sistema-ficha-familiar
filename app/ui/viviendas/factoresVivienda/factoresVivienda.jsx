"use client";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { insertFactoresVivienda, updateFactoresVivienda } from "@/app/action";

export default function FactoresViviendas({ factoresById, id_vivienda }) {
  const { data: session, status, update } = useSession();
  const { refresh, push } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const resul = await updateFactoresVivienda(data, id_vivienda);
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
                  {...register("agresividad", {
                    value: factoresById.ries_agresividad,
                  })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Agresividad</label>
              </div>
              <div className="form-check">
                <input
                  {...register("insalubridad", {
                    value: factoresById.ries_insalubridad,
                  })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Insalubridad</label>
              </div>
              <div className="form-check">
                <input
                  {...register("cantidad", {
                    value: factoresById.ries_cantidad,
                  })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Cantidad</label>
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
                  },
                  value: factoresById.conv_animales,
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
                  {...register("domesticos", {
                    value: factoresById.tipo_domestico,
                  })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Domesticos</label>
              </div>
              <div className="form-check">
                <input
                  {...register("Granja", { value: factoresById.tipo_granja })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Granja</label>
              </div>
              <div className="form-check">
                <input
                  {...register("silvestre", {
                    value: factoresById.tipo_silvestre,
                  })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Silvestres</label>
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
                  {...register("perro", { value: factoresById.dome_perro })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Perro</label>
              </div>
              <div className="form-check">
                <input
                  {...register("gato", { value: factoresById.dome_gato })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">gato</label>
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
                  {...register("pequena", { value: factoresById.perro_peque })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Raza pequeña</label>
              </div>
              <div className="form-check">
                <input
                  {...register("mediana", { value: factoresById.perro_medio })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Raza mediana</label>
              </div>
              <div className="form-check">
                <input
                  {...register("grande", { value: factoresById.perro_grande })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">Raza grande</label>
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
                  value: factoresById.vectores,
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
                  {...register("riesgov1", { value: factoresById.ries_vi1 })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">
                  Existe alto riesgo de incendio
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("riesgov2", { value: factoresById.ries_vi2 })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">
                  La ubicacion de la vivienda esta en zonas de inundaciones
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("riesgov3", { value: factoresById.ries_vi3 })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">
                  La ubicacion de la vivienda esta en zonas de deslizamiento
                </label>
              </div>
              <div className="form-check">
                <input
                  {...register("riesgov4", { value: factoresById.ries_vi4 })}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label">
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
                  },
                  value: factoresById.vulnerable,
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
                value: factoresById.num_gatos,
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
              {...register("proteccionVectores", {
                value: factoresById.provectores,
              })}
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
            Actualizar y Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
