"use server";
import conn from "@/database/connection";
export async function saveFamilia(formData) {
  try {
    const text = `INSERT INTO public.csctbfamilia (
      csctbocupacionid, csctbinstruccionid, csctbparentescoid, cedula_fam, nom_fam, ape_fam, fecha_na_fam,
      anios, meses, dias, genero, control_bucal, observacion, estado_fam, fecreacion_fam,
      estado_civil, csctbetniaid, csctbnacionalidadid, csctbpueblosid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING csctbfamiliaid`;

    const values = [
      formData.ocupacion,
      formData.instruccion,
      formData.parentesco,
      formData.cedula,
      formData.nombres,
      formData.apellidos,
      formData.fechaNacimiento,
      formData.anios,
      formData.meses,
      formData.dias,
      formData.genero,
      Boolean(formData.saludBucal),
      formData.observacion,
      true,
      new Date(),
      formData.estadoCivil,
      formData.etnia,
      formData.pueblos,
      formData.pueblos,
    ];

    const res = await conn.query(text, values);

    return res.rows;
  } catch (error) {
    // Manejar el error aquí
    //console.error('Error al insertar en la base de datos:', error.message);
    return { error: "No se ha podido ingresar sus datos" }; // Lanzar el error nuevamente para que sea manejado por el código que llama a la función
  }
}

export async function getEtnia() {
  const result = await conn.query(
    "SELECT csctbetniaid, nom_etnia FROM csctbetnia;"
  );
  return result.rows;
}

export async function getOcupacion() {
  const result = await conn.query(`SELECT csctbocupacionid, nom_ocupacion
	FROM public.csctbocupacion;`);
  return result.rows;
}

export async function getInstruccion() {
  const result = await conn.query(`SELECT csctbinstruccionid, nom_instruccion
    FROM public.csctbinstruccion;`);
  return result.rows;
}
export async function getPueblos() {
  const result = await conn.query(`SELECT csctbpueblosid, nom_pueblos
    FROM public.csctbpueblos;`);
  return result.rows;
}
export async function getParentesco() {
  const result = await conn.query(`SELECT csctbparentescoid, nom_parentesco
    FROM public.csctbparentesco;`);
  return result.rows;
}

export async function getVacunas(edad) {
  const result = await conn.query(
    `SELECT 
  csctbvacunas.csctbvacunasid, 
  csctbedades.rango_edad, 
  csctbvacunas.nom_vacuna
FROM 
  public.csctbedades, 
  public.csctbvacunas
WHERE 
  csctbedades.csctbedadesid = csctbvacunas.csctbedadesid and
  csctbvacunas.csctbedadesid = $1
`,
    [7]
  );

  return result.rows;
}

export async function guardarVacunas(vacunas, enfermedades) {
  const listaIdsVacunas = Object.keys(vacunas)
    .filter((key) => typeof vacunas[key] === "boolean" && vacunas[key])
    .map(Number);

  const listaIdsEnfermedades = enfermedades.map(
    (item) => item.csctbenfermedadid
  );

  let generarConsulta = `
  INSERT INTO public.csctbvacunafamilia(
    csctbvacunasid, csctbfamiliaid, fecha_cre_vacuna
  )
  VALUES
`;
  for (const id of listaIdsVacunas) {
    generarConsulta += `
    (${id}, 1, current_timestamp),`;
  }
  generarConsulta = generarConsulta.slice(0, -1)
  console.log(generarConsulta)
}
export async function searchEnfermedades(termino) {
  const text = `
  SELECT 
  csctbenfermedad.csctbenfermedadid, 
  csctbenfermedad.nom_enfermedad, 
  csctbenfermedad.cog_enfermedad
FROM 
  public.csctbenfermedad
WHERE 
  cog_enfermedad LIKE '%' || $1 || '%' OR
  nom_enfermedad LIKE '%' || $1 || '%'
ORDER BY 
  cog_enfermedad ASC, nom_enfermedad ASC;


  `;
  const values = [termino];
  const result = await conn.query(text, values);

  return result.rows;
}
