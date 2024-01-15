export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/nuevaFicha/:path*",
    "/",
    "/nuevaFicha/agregarPersona/:path*",
    "/buscarFicha/:path*",
  ],
};
