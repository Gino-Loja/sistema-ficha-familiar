export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/nada/:path*", "/", "/nuevaFicha/agregarPersona/:path*"],
};
