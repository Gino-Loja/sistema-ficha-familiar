"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateFamiliaById } from "@/app/action";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function InfoPersonal(props) {
  const { refresh, push } = useRouter();
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    etnias,
    ocupaciones,
    instrucciones,
    pueblos,
    parentescos,
    datosFamiliar,
    data,
  } = props;
  const [control_bucal, setcontrol_bucal] = useState(
    datosFamiliar.control_bucal
  );
  const [isembarazada, setisembarazada] = useState(data.embarazo);
  const onSubmit = handleSubmit(async (data) => {
    const resul = await updateFamiliaById(data, params.id);
    console.log(resul);
    if (resul.error) {
      console.log(resul.error);
    } else {
      refresh();
      const tabs = document.querySelectorAll(".nav-link");
      const content = document.querySelectorAll(".tab-pane");
      const modal = document.getElementById("modalGuardar");

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

  useEffect(() => {
    //setValue("embarazada", "true");
    if (watch("embarazada") == undefined) {
      controlEmbarazada(isembarazada);
    } else {
      controlEmbarazada(watch("embarazada"));
    }
  }, [watch("embarazada"), isembarazada]);

  const controlEmbarazada = (control) => {
    const embarazadaTab = document.getElementById("pills-embarazada-tab");
    //console.log("yaaaaaaaa")
    document.querySelectorAll(".nav-link").forEach(function (tab, index) {
      tab.addEventListener("shown.bs.tab", function (event) {
        // Obtener el id del tab activo
        var activeTabIndex = index;
        console.log("Estás en la pestaña con índice:", activeTabIndex);
      });
    });
    //console.log(control)
    if (control == true || control == "true") {
      console.log("ya");
      //console.log(embarazadaTab)
      //embarazadaTab.classList.remove('active', "show");;
      embarazadaTab.style.display = "";
    } else {
      embarazadaTab.style.display = "none";
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">
          Informacion Personal:{" "}
          {datosFamiliar.nom_fam + " " + datosFamiliar.ape_fam}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <label className="form-label">Nombres</label>

            <input
              {...register("nombres", {
                required: {
                  value: true,
                  message: "Ingrese los nombres",
                },
                value: datosFamiliar.nom_fam,
              })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">Apellidos</label>
            <input
              {...register("apellidos", {
                required: {
                  value: true,
                  message: "Ingrese su apellido",
                },
                value: datosFamiliar.ape_fam,
              })}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">Cedula</label>
            <input
              {...register("cedula", {
                required: {
                  value: true,
                  message: "Ingrese la cedula",
                },
                maxLength: 10,
                value: datosFamiliar.cedula_fam,
              })}
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div className="d-flex justify-content-between">
              <div className="w-50" style={{ marginRight: "3px" }}>
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  {...register("fechaNacimiento", {
                    required: {
                      value: true,
                      message: "Seleccione su fecha de nacimiento",
                    },
                    value: new Date(datosFamiliar.fecha_na_fam)
                      .toISOString()
                      .split("T")[0],
                    validate: (value) => {
                      const fechaNacimiento = new Date(value);
                      const fechaActual = new Date();
                      // Verificar si la fecha de nacimiento es en el futuro
                      if (fechaNacimiento > fechaActual) {
                        return false;
                      }

                      // Resto de la lógica de validación aquí (si es necesario)

                      return true; // Si la fecha de nacimiento es válida
                    },
                    onChange: () => {
                      var fechaNacimientoStr = watch("fechaNacimiento");
                      var fechaNacimiento = new Date(fechaNacimientoStr);

                      var fechaActual = new Date();
                      var diferenciaTiempo =
                        fechaActual.getFullYear() -
                        fechaNacimiento.getFullYear();
                      var meses = fechaNacimiento.getMonth();
                      var dias = fechaNacimiento.getDate();
                      var anos = diferenciaTiempo;
                      setValue("anios", anos);
                      setValue("meses", meses);
                      setValue("dias", dias);
                    },
                  })}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="d-flex w-50 justify-content-around align-items-end">
                <div className="">
                  <label className="form-label">Años</label>
                  <input
                    {...register("anios", {
                      value: datosFamiliar.anios,
                    })}
                    disabled
                    className="form-control form-control"
                    type="text"
                  />
                </div>

                <div className="mx-1">
                  <label className="form-label">meses</label>
                  <input
                    {...register("meses", { value: datosFamiliar.meses })}
                    disabled
                    className="form-control form-control"
                    type="text"
                  />
                </div>
                <div className="">
                  <label className="form-label">Dias</label>
                  <input
                    {...register("dias", { value: datosFamiliar.dias })}
                    disabled
                    className="form-control form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Genero</label>
            <select
              {...register("genero", {
                required: {
                  value: true,
                  message: "Seleccione el genero",
                },
                value: datosFamiliar.genero,
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMENINO">Femenino</option>
            </select>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {watch("genero") == "FEMENINO" ? (
              <>
                <label id="embarazada" className="form-label">
                  Esta Embarazada
                </label>
                <div id="embarazada">
                  <div className="form-check form-check-inline">
                    <input
                      {...register("embarazada", {
                        onChange: (e) => {
                          setValue("embarazada", e.target.value);
                          setisembarazada(e.target.value == "true");
                        },
                      })}
                      className="form-check-input"
                      type="radio"
                      value="true"
                      checked={isembarazada == true}
                    />
                    <label className="form-check-label">Si</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      {...register("embarazada", {
                        onChange: (e) => {
                          setValue("embarazada", e.target.value);

                          setisembarazada(e.target.value == "true");
                        },
                      })}
                      className="form-check-input"
                      type="radio"
                      value="false"
                      checked={isembarazada == false}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">Salud Bucal</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  {...register("saludBucal", {
                    onChange: (e) => {
                      setValue("saludBucal", e.target.value);
                      setcontrol_bucal(e.target.value == "true");
                    },
                  })}
                  className="form-check-input"
                  type="radio"
                  value={true}
                  checked={control_bucal == true}
                />
                <label className="form-check-label">Si</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  {...register("saludBucal", {
                    onChange: (e) => {
                      setValue("saludBucal", e.target.value);
                      setcontrol_bucal(e.target.value == "true");
                    },
                  })}
                  className="form-check-input"
                  type="radio"
                  value={false}
                  checked={control_bucal == false}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Estado Civil</label>
            <select
              {...register("estadoCivil", {
                required: {
                  value: true,
                  message: "Seleccione un estado civil",
                },
                value: datosFamiliar.estado_civil,

                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              <option value="CASADO/A">Casado/a</option>
              <option value="UNION LIBRE SEPARADADOS">
                {" "}
                UNION LIBRE SEPARADADOS
              </option>
              <option value="VIUDO/A">Viudo/a</option>
              <option value={"UNIÓN LIBRE"}>Union Libre</option>
              <option value={"SEPARACIÓN"}>Separacion</option>
              <option value={"DIVORCIO"}>Divorcio</option>
              <option value={"SOLTERO/A"}>Soltero/a</option>

              <option value={"UNIÓN CONSANGUÍNEA"}>Union Consaguinea</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Auto Identificacion Etnica</label>
            <select
              {...register("etnia", {
                required: {
                  value: true,
                  message: "Seleccione una etnia",
                },
                value: datosFamiliar.csctbetniaid,

                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              {etnias.map((etnia) => (
                <option key={etnia.csctbetniaid} value={etnia.csctbetniaid}>
                  {etnia.nom_etnia}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Pueblos</label>
            <select
              {...register("pueblos", {
                required: {
                  value: true,
                  message: "Seleccione el pueblo",
                },
                value: datosFamiliar.csctbpueblosid,
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              {pueblos.map((pueblo) => (
                <option
                  key={pueblo.csctbpueblosid}
                  value={pueblo.csctbpueblosid}
                >
                  {pueblo.nom_pueblos}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Ocupacion</label>
            <select
              {...register("ocupacion", {
                required: {
                  value: true,
                  message: "Seleccione el pueblo",
                },
                value: datosFamiliar.csctbocupacionid,
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              {ocupaciones.map((ocupacion) => (
                <option
                  key={ocupacion.csctbocupacionid}
                  value={ocupacion.csctbocupacionid}
                >
                  {ocupacion.nom_ocupacion}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Nivel de Instrucion</label>
            <select
              {...register("instruccion", {
                required: {
                  value: true,
                  message: "Seleccione el pueblo",
                },
                value: datosFamiliar.csctbinstruccionid,
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              {instrucciones.map((instrucion) => (
                <option
                  key={instrucion.csctbinstruccionid}
                  value={instrucion.csctbinstruccionid}
                >
                  {instrucion.nom_instruccion}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <label className="form-label">Parentesto</label>
            <select
              {...register("parentesco", {
                required: {
                  value: true,
                  message: "Selecccione el parentesco",
                },
                value: datosFamiliar.csctbparentescoid,

                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              {parentescos.map((parentesco) => (
                <option
                  key={parentesco.csctbparentescoid}
                  value={parentesco.csctbparentescoid}
                >
                  {parentesco.nom_parentesco}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">Observaciones</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              {...register("observacion", {
                required: {
                  value: false,
                },
                value: datosFamiliar.observacion,

                validate: (value) => value !== "",
              })}
            ></textarea>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">Fallecido</label>
            <div>
              {console.log(datosFamiliar.fallecido)}
              <div className="form-check form-check-inline">
                <input
                  {...register("fallecido", {})}
                  className="form-check-input"
                  type="radio"
                  value={true}
                  defaultChecked={datosFamiliar.fallecido == true}
                />
                <label className="form-check-label">Si</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  {...register("fallecido", {})}
                  className="form-check-input"
                  type="radio"
                  value={false}
                  defaultChecked={datosFamiliar.fallecido == false}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">
              <h5>Informante</h5>
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  {...register("informante", {})}
                  className="form-check-input"
                  type="radio"
                  value="true"
                  defaultChecked={datosFamiliar.informante == true}
                />
                <label className="form-check-label">Si</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  {...register("informante")}
                  className="form-check-input"
                  type="radio"
                  value="false"
                  defaultChecked={datosFamiliar.informante == false}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div className="d-flex justify-content-between">
              <div className="w-50" style={{ marginRight: "3px" }}>
                <label className="form-label">
                  <h5>Fecha de Union</h5>
                </label>

                <input
                  {...register("fechaUnion", {
                    value: new Date(datosFamiliar.fecha_union)
                      .toISOString()
                      .split("T")[0],
                    validate: (value) => {
                      const fechaNacimiento = new Date(value);
                      const fechaActual = new Date();

                      // Verificar si la fecha de nacimiento es en el futuro
                      if (fechaNacimiento > fechaActual) {
                        return false;
                      }

                      // Resto de la lógica de validación aquí (si es necesario)

                      return true; // Si la fecha de nacimiento es válida
                    },
                  })}
                  type="date"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            {" "}
            <label className="form-label">
              <h5>Pertence al nucleo familiar</h5>
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  {...register("nucleoFamiliar", {})}
                  className="form-check-input"
                  type="radio"
                  value="true"
                  defaultChecked={datosFamiliar.nucleo_familiar == true}
                />
                <label className="form-check-label">Si</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  {...register("nucleoFamiliar")}
                  className="form-check-input"
                  type="radio"
                  value="false"
                  defaultChecked={datosFamiliar.nucleo_familiar == false}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>
        </div>

        <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
          <button
            type="button"
            onClick={() => push("/buscarFicha/")}
            className="btn btn-danger"
          >
            Cerrar
          </button>
          <button type="submit" className="btn btn-primary">
            Actulizar y continuar
          </button>
        </div>
      </form>
    </div>
  );
}
