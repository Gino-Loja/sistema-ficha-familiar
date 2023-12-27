"use client";
import { insertPrioritarioAndVulnerable } from "@/app/action";
import { useForm } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ModalGenerico from "../modal/modalGenerico";
import { useSession } from "next-auth/react";
export default function Prioritario({ vulnerables, prioritarios }) {
  const { data: session, status } = useSession();

  const [modalShow, setModalShow] = useState(false);
  const [listaPrioritario, setListaPrioritario] = useState([]);
  const [listaVulnerable, setListaVulnerable] = useState([]);
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
  const seachParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const handleChange = () => {
    if (prioritarioOrVulnerable?.nom_prioritario !== undefined) {
      setListaPrioritario([...listaPrioritario, prioritarioOrVulnerable]);
    } else {
      setListaVulnerable([...listaVulnerable, prioritarioOrVulnerable]);
    }
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
        <p className="fw-bold fs-4">Prioritarios</p>
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
                {listaVulnerable.length == index + 1 ? (
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
