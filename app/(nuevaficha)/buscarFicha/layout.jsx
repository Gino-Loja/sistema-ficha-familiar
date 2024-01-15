"use client";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function BuscarFichaLayout({ children, session }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
