"use server";
import conn from "@/database/connection";
export default async function IsUser(cedula, password) {
  //console.log(cedula, password)
  try {
    const result = await conn.query(
      `SELECT nombresp, apellido_pat, apellido_mat FROM csctbpersonal WHERE cedula = $1 AND pass = $2;`,
      [cedula, password]
    );
    console.log(result.rows)
    return result.rows
  } catch (error) {
     console.error("Error al consultar la base de datos:", error);
    throw error;
  }

  
  //console.log(a.rows)
}
