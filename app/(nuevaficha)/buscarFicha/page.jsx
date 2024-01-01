"use client";
import Nav from "@/app/components/nav";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ModalUser from "@/app/components/modal/modalUser";
import { getFamiliares } from "@/app/action";
function buscarFicha() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [modalShow, setModalShow] = useState(false);

  const [listaFamilia, setlistaFamilia] = useState([]);
  const [iduser, setId] = useState(0);
  const onSubmit = handleSubmit(async (data) => {
    const result = await getFamiliares(watch("busqueda"), data.buscar);

    if (result.error) {
      console.log(result.errors);
    } else {
      setlistaFamilia(result);
    }
  });

  const handleUserId = (id) => {
    setModalShow(true);
    setId(id);
  };

  //IsUser(username, password);

  return (
    <>
      <Nav></Nav>
      <ModalUser show={modalShow} tittle={`Confirme lo siguiente: `}>
        <div className=" d-flex flex-column  align-items-center">
          <button
            onClick={() => {
              setModalShow(false);
              router.push(`/buscarFicha/editarFicha/${iduser}`);
            }}
            className="btn btn-primary m-2"
          >
            Editar Informacion Personal
          </button>
          <button
            onClick={() => {
              setModalShow(false);
              router.push(`/buscarFicha/editarFichaVivienda/${iduser}`);
            }}
            className="btn btn-primary m-2"
          >
            Editar Informacion Vivienda
          </button>
        </div>
      </ModalUser>
      <div className="w-100 h-100 ">
        <div className="container-fluid p-4">
          <div className="card container">
            <div className="card-body">
              <div className="text-center">
                <h3 className="card-title mb-1">Buscar Ficha Familiar </h3>
              </div>

              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-xl-6">
                    <label className="form-label">
                      Seleccione el Tipo de busqueda
                    </label>
                    <select
                      {...register("busqueda", {
                        required: {
                          value: true,
                          message: "Seleccione el genero",
                        },
                        validate: (value) => value !== "",
                      })}
                      className="form-select my-2"
                      aria-label="Default select example"
                    >
                      <option value="">Seleccione la opcion</option>
                      <option value={1}>Numero de Ficha Familiar</option>
                      <option value={2}>Apellidos y nombre</option>
                      <option value={3}>Numero de Cedula</option>
                    </select>
                  </div>
                </div>
                <div className="row d-flex flex-row-reverse ">
                  <div className="col-sm-12 col-md-6 col-xl-6">
                    <input
                      {...register("buscar", {
                        required: {
                          value: true,
                          message: "Ingrese",
                        },
                      })}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="d-flex flex-row-reverse my-3">
                      <button
                        type="submit"
                        //onClick={handlePushNuevaFicha}
                        className="btn btn-primary mx-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        Buscar{" "}
                      </button>
                      <button type="button" className="btn btn-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-stars"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                        Limpiar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="card mt-2 container card-body border-light overflow-x-auto">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col"># de ficha</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Parentesco</th>
                    <th scope="col">Id_Jefe</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {listaFamilia.map((familia, index) => (
                    <tr key={index}>
                      <td>{familia.csctbfamiliaid}</td>
                      <td>{familia.nom_fam}</td>
                      <td>{familia.ape_fam}</td>
                      <td>{familia.genero}</td>
                      <td>{familia.anios}</td>
                      <td>{familia.nom_parentesco}</td>
                      <td>{familia.id_jefe_hogar}</td>
                      <td>
                        <div className="d-flex justify-content-between w-100">
                          <button
                            type="button"
                            onClick={() => handleUserId(familia.csctbfamiliaid)}
                            className="btn btn-info"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                          </button>
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
    </>
  );
}

export default buscarFicha;
