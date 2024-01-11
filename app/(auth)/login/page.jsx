"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

//import IsUser from "./action";
function LoginUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    const { username, password } = data;
    const result = await signIn("credentials", {
      user: username,
      password,
      redirect: false,
    });
    if (result.error) {
      console.log(result.error)
    } else {
      router.push("/");
      router.refresh();
    }

    //IsUser(username, password);
  });
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center ">
      <div
        style={{ height: "80%", margin: "20px" }}
        className="card text-center"
      >
        <img
          style={{ width: "100%", height: "40%" }}
          src="./logoministerio.jpg"
          className="m-auto"
          alt="..."
        />

        <div className="card-body">
          <h3 className="card-title mb-4">Sistema Ficha Familiar</h3>
          <form onSubmit={onSubmit}>
            {errors.username && (
              <span className="calert alert-warning">
                {" "}
                {errors.username.message}
              </span>
            )}
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="su cedula"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Ingrese el usuario",
                  },
                })}
              />
              <label className="form-label">Usuario </label>
            </div>
            {errors.password && (
              <span className="calert alert-warning">
                {" "}
                {errors.password.message}
              </span>
            )}
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingrese su password",
                  },
                })}
              />
              <label className="form-label">Contrasena</label>
            </div>
            <button className="btn btn-primary">Iniciar Sesion</button>
          </form>
          <h6 className="mt-4">Olvidaste tu password?</h6>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
