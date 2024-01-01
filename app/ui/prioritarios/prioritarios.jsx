"use client";
import {
  insertPrioritarioAndVulnerable,
  updatePrioritarioFamilia,
  updateVulnerableFamilia,
} from "@/app/action";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ModalGenerico from "@/app/components/modal/modalGenerico";
import { useSession } from "next-auth/react";
export default function Prioritario({
  vulnerables,
  prioritarios,
  familiaPrioritarios,
  familiaVulnerable,
  data
}) {
  const { data: session, status } = useSession();
  const [modalShow, setModalShow] = useState(false);
  const [listaPrioritario, setListaPrioritario] = useState(familiaPrioritarios);
  const [listaVulnerable, setListaVulnerable] = useState(familiaVulnerable);
  const [prioritarioOrVulnerable, setPrioritarioOrVulnerable] = useState({});

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
    const result = await insertPrioritarioAndVulnerable(
      listaPrioritario,
      listaVulnerable,
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

  const params = useParams();

  const { replace, refresh, push } = useRouter();
  const handleChange = () => {
    if (prioritarioOrVulnerable?.nom_prioritario !== undefined) {
      updatePrioritarioFamilia({
        accion: true,
        id_prioritario: prioritarioOrVulnerable.csctbprioritarioid,
        id_familia: params.id,
      });
      setListaPrioritario([...listaPrioritario, prioritarioOrVulnerable]);
    } else {
      updateVulnerableFamilia({
        accion: true,
        id_vulnerable: prioritarioOrVulnerable.csctbvulnerableid,
        id_familia: params.id,
      });
      setListaVulnerable([...listaVulnerable, prioritarioOrVulnerable]);
    }
  };

  const handleUpdateVulnerable = async (params) => {
    await updateVulnerableFamilia(params).then(() => {
      refresh();
      setListaVulnerable((prev) =>
        prev.filter((dato) => dato.csctbvulnerableid !== params.id_vulnerable)
      );
    });
  };

  const handleUpdatePrioritario = async (params) => {
    await updatePrioritarioFamilia(params).then(() => {
      refresh();
      setListaPrioritario((prev) =>
        prev.filter((dato) => dato.csctbprioritarioid !== params.id_prioritario)
      );
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <ModalGenerico
        show={modalShow}
        tittle={
          "Desea agregar: " +
          (prioritarioOrVulnerable?.nom_prioritario !== undefined
            ? prioritarioOrVulnerable?.nom_prioritario
            : prioritarioOrVulnerable?.nom_vulnerable)
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
              handleChange();
            }}
            className="btn btn-primary mx-2"
          >
            Continuar
          </button>
        </div>
      </ModalGenerico>
      <div className="d-flex justify-content-center">
        <p className="fw-bold fs-4">Prioritarios: {data.nombre}</p>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label className="form-label">Prioritario</label>
          <select
            {...register("prioritario", {
              required: {
                value: true,
                message: "Seleccione la prioridad",
              },
              onChange: (e) => {
                if (e.target.value != "") {
                  setPrioritarioOrVulnerable(JSON.parse(e.target.value));
                  //console.log(e.target.value)
                  setModalShow(true);
                  return;
                }
                setModalShow(false);
                return;
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            {prioritarios.map((prioritario) => (
              <option
                key={prioritario.csctbprioritarioid}
                value={JSON.stringify(prioritario)}
              >
                {prioritario.nom_prioritario}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label className="form-label">Vulnerable</label>

          <select
            {...register("vulnerable", {
              required: {
                value: true,
                message: "Seleccione la prioridad",
              },
              onChange: (e) => {
                if (e.target.value != "") {
                  setPrioritarioOrVulnerable(JSON.parse(e.target.value));
                  setModalShow(true);
                  return;
                }
                setModalShow(false);
                return;
              },
              validate: (value) => value !== "",
            })}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Seleccione la opcion</option>
            {vulnerables.map((vulnerable) => (
              <option
                key={vulnerable.csctbvulnerableid}
                value={JSON.stringify(vulnerable)}
              >
                {vulnerable.nom_vulnerable}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label className="form-label">Lista de Prioritarios</label>
          {listaPrioritario.map((prioritario, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {prioritario.nom_prioritario}
                <span>
                  <button
                    onClick={() => {
                      handleUpdatePrioritario({
                        accion: false,
                        id_prioritario: prioritario.csctbprioritarioid,
                        id_familia: params.id,
                        id_prioritarioFamilia: familiaPrioritarios.find(
                          (a) =>
                            a.csctbprioritarioid ==
                            prioritario.csctbprioritarioid
                        )?.csctbprioritariofamiliaid,
                      });
                    }}
                    type="button"
                    className="btn btn-danger mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </span>
                {listaPrioritario.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label className="form-label">Lista de Vulnerables</label>
          {listaVulnerable.map((vulnerable, index) => {
            return (
              <h6 className="alert alert-light" key={index}>
                {vulnerable.nom_vulnerable}
                <span>
                  <button
                    onClick={() => {
                      handleUpdateVulnerable({
                        accion: false,
                        id_vulnerable: vulnerable.csctbvulnerableid,
                        id_familia: params.id,
                        id_vulnerableFamilia: familiaVulnerable.find(
                          (a) =>
                            a.csctbvulnerableid == vulnerable.csctbvulnerableid
                        )?.csctbvulnerablefamiliaid,
                      });
                    }}
                    type="button"
                    className="btn btn-danger mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </span>
                {listaVulnerable.length == index + 1 ? (
                  <span className="badge bg-secondary">New</span>
                ) : null}
              </h6>
            );
          })}
        </div>
      </div>

      <div className=" h-25 d-flex justify-content-between mt-2 align-items-center">
        <button onClick={()=>(push("/buscarFicha"))} type="button" className="btn btn-danger">
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>
      </div>
    </form>
  );
}
