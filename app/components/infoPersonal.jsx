"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function InfoPersonal(props) {
  const { data: session, status, update } = useSession();
  const { refresh } = useRouter();

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
    saveFamilia,
  } = props;
  const onSubmit = handleSubmit(async (data) => {
    const resul = await saveFamilia(data, session.user.email?.id);
    if (resul.errors) {
      console.log(resul.errors);
    } else {
      const { anios, meses, dias } = data;
      console.log(resul, "qqqqqqqqqqq");
      if (session.user.email?.id == null) {
        update({
          email: {
            anios,
            meses,
            dias,
            id: resul[0].csctbfamiliaid,
            id_familia: resul[0].csctbfamiliaid,
            genero: watch("genero"),
            parentesco: parentescos.find(
              (item) => item.csctbparentescoid === resul[0].csctbparentescoid
            ).nom_parentesco,
            nombre: resul[0].nom_fam + " " + resul[0].ape_fam,
          },
        });
      } else {
        update({
          email: {
            anios,
            meses,
            dias,
            id: session.user.email.id,
            id_familia: resul[0].csctbfamiliaid,
            genero: watch("genero"),
            parentesco: parentescos.find(
              (item) => item.csctbparentescoid === resul[0].csctbparentescoid
            ).nom_parentesco,
            nombre: resul[0].nom_fam + " " + resul[0].ape_fam,
          },
        });
      }

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
    controlEmbarazada(watch("embarazada"));
  }, [watch("embarazada")]);

  const controlEmbarazada = (control) => {
    const embarazadaTab = document.getElementById("pills-embarazada-tab");

    document.querySelectorAll(".nav-link").forEach(function (tab, index) {
      tab.addEventListener("shown.bs.tab", function (event) {
        // Obtener el id del tab activo
        var activeTabIndex = index;
        console.log("Estás en la pestaña con índice:", activeTabIndex);
      });
    });
    if (control == "true") {
      //embarazadaTab.classList.remove('active', "show");;
      embarazadaTab.style.display = "";
    } else {
      embarazadaTab.style.display = "none";
    }
  };

  return (
    <div className="container-fluid">
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
                    onChange: () => {
                      var fechaNacimientoStr = watch("fechaNacimiento");
                      var fechaNacimiento = new Date(fechaNacimientoStr);

                      var fechaActual = new Date();
                      var diferenciaTiempo =
                        fechaActual.getFullYear() -
                        fechaNacimiento.getFullYear();
                      var meses =
                        fechaActual.getMonth() - fechaNacimiento.getMonth();
                      var dias =
                        fechaActual.getDate() - fechaNacimiento.getDate();
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
                    {...register("anios", {})}
                    disabled
                    className="form-control form-control"
                    type="text"
                  />
                </div>

                <div className="mx-1">
                  <label className="form-label">meses</label>
                  <input
                    {...register("meses", {})}
                    disabled
                    className="form-control form-control"
                    type="text"
                  />
                </div>
                <div className="">
                  <label className="form-label">Dias</label>
                  <input
                    {...register("dias", {})}
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
                      {...register("embarazada")}
                      className="form-check-input"
                      type="radio"
                      value="true"
                    />
                    <label className="form-check-label">Si</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      {...register("embarazada")}
                      className="form-check-input"
                      type="radio"
                      value="false"
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
                  {...register("saludBucal")}
                  className="form-check-input"
                  type="radio"
                  value="true"
                />
                <label className="form-check-label">Si</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  {...register("saludBucal")}
                  className="form-check-input"
                  type="radio"
                  value="false"
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
                validate: (value) => value !== "",
              })}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Seleccione la opcion</option>
              <option value="CASADO/A">Casado/a</option>
              <option value="SOLTERO/A">Soltero/a</option>
              <option value="VIUDO/A">Viudo/a</option>
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
                validate: (value) => value !== "",
              })}
            ></textarea>
          </div>
        </div>
        {props.children}
      </form>
    </div>
  );
}