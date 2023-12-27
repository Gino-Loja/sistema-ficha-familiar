"use server";
import conn from "@/database/connection";
import {
  obtenerCsctbedadesid,
  obtenerCsctbedadesidRiesgos,
} from "./utils/rangoEdad";
import { obetnerIdsAndMerge } from "./utils/obtenerId";
export async function saveFamilia(formData, id) {
  const id_jefe =
    id == null
      ? `CURRVAL('public.csctbfamilia_csctbfamiliaid_seq')`
      : id.toString();
  try {
    const text = `INSERT INTO public.csctbfamilia (
      csctbocupacionid, 
      csctbinstruccionid, 
      csctbparentescoid, 
      cedula_fam, 
      nom_fam, 
      ape_fam, 
      fecha_na_fam,
      anios, 
      meses, 
      dias,
       genero, 
      control_bucal, 
      observacion, 
      estado_fam, 
      fecreacion_fam,
        id_jefe_hogar,
      estado_civil, csctbetniaid, csctbpueblosid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,
       $9, $10, $11, $12, $13, $14, current_timestamp,${id_jefe},$15, $16, $17)
        RETURNING csctbfamiliaid,nom_fam, ape_fam,genero,csctbparentescoid`;

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
      formData.estadoCivil,
      formData.etnia,
      formData.pueblos,
    ];

    const res = await conn.query(text, values);

    return res.rows;
  } catch (error) {
    //console.log(error);
    return { error: "No se ha podido ingresar sus datos" }; // Lanzar el error nuevamente para que sea manejado por el código que llama a la función
  }
}

export async function getEtnia() {
  const result = await conn.query(
    "SELECT csctbetniaid, nom_etnia FROM csctbetnia;"
  );
  return result.rows;
}

export async function getNacionalidad() {
  const result = await conn.query(
    `SELECT csctbnacionalidadetnicaid, nom_nacionalidadetnica
    FROM public.csctbnacionalidadetnica;`
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

export async function getVacunas(anios, meses, dias) {
  const rango_edad = obtenerCsctbedadesid(anios, meses, dias);
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
    [rango_edad]
  );

  return result.rows;
}

export async function guardarEnfermedadVacunas(
  vacunas,
  enfermedades,
  id_familia
) {
  const listaIdsVacunas = Object.keys(vacunas)
    .filter((key) => typeof vacunas[key] === "boolean" && vacunas[key])
    .map(Number);

  const listaIdsEnfermedades = enfermedades.map(
    (item) => item.csctbenfermedadid
  );

  let insertVacuna = `
    INSERT INTO public.csctbvacunafamilia(csctbvacunasid, csctbfamiliaid, fecha_cre_vacuna)VALUES
  `;
  for (const id of listaIdsVacunas) {
    insertVacuna += `(${id}, ${id_familia}, current_timestamp),`;
  }
  insertVacuna = insertVacuna.slice(0, -1);

  let insertEnfermedad = `INSERT INTO public.csctbenferfam(csctbenfermedadid, csctbfamiliaid)VALUES`;
  for (const id of listaIdsEnfermedades) {
    insertEnfermedad += `(${id}, ${id_familia}),`;
  }
  insertEnfermedad = insertEnfermedad.slice(0, -1);
  try {
    //console.log([insertEnfermedad, insertVacuna])

    for (let i of [insertEnfermedad, insertVacuna]) {
      var result = await conn.query(i);
    }
    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido ingresar sus datos" };
  }
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

export async function getEvaluacionRiesgos() {
  const result = await conn.query(`SELECT csctbevaluacionid, nom_evaluacion
	    FROM public.csctbevaluacion;`);

  return result.rows;
}

export async function saveEvaluarRiesgo(data, riesgos, id_familia) {
  console.log(data);
  let insertEvaluarRiesgos = `INSERT INTO public.csctbevaluariesgo(
     csctbevaluacionid, csctbfamiliaid)
    VALUES`;
  const listaIdsRiesgos = riesgos.map((item) => item.csctbevaluacionid);
  for (const id of listaIdsRiesgos) {
    insertEvaluarRiesgos += `(${id}, ${id_familia}),`;
  }
  insertEvaluarRiesgos = insertEvaluarRiesgos.slice(0, -1);

  let insertRiesgos = `INSERT INTO public.csctbriesgos(
     csctbfamiliaid, riesgos, gra_discapacidad, gru_dispensa, porce_discapacidad)
    VALUES (${id_familia},'${data.riesgos}', '${data.discapacidad}', '${data.dispenserial}', '${data.porcentaje}')`;
  try {
    //console.log([insertEnfermedad, insertVacuna])

    console.log([insertEvaluarRiesgos, insertRiesgos]);
    for (let i of [insertEvaluarRiesgos, insertRiesgos]) {
      var result = await conn.query(i);
    }
    return result.rows;
  } catch (error) {
    return { error: "No se ha podido ingresar sus datos" };
  }
}

export async function getPrioritarios() {
  const result = await conn.query(`SELECT csctbprioritarioid, nom_prioritario
	FROM public.csctbprioritario;`);
  return result.rows;
}
export async function getVulnerables() {
  const result = await conn.query(`SELECT csctbvulnerableid, nom_vulnerable
	FROM public.csctbvulnerable;`);
  return result.rows;
}
export async function getRiesgosBiologicos(anios, meses, dias) {
  const id_edad = obtenerCsctbedadesidRiesgos(anios, meses, dias);
  const result =
    await conn.query(`SELECT csctbriesgobioloid, csctbedadesid, nom_rbiolo
	FROM public.csctbriesgobiolo WHERE csctbedadesid = ${id_edad} ;`);
  return result.rows;
}
export async function getRiesgosSocioeconomicos(anios, meses, dias) {
  const id_edad = obtenerCsctbedadesidRiesgos(anios, meses, dias);
  const result =
    await conn.query(`SELECT csctbrsocioid, csctbedadesid, nom_rsocio
    FROM public.csctbriesgosocio  WHERE csctbedadesid = ${id_edad}`);
  return result.rows;
}
export async function getRiesgosAmbientales() {
  const result = await conn.query(`SELECT csctbrambientalesid, nom_rambiental
    FROM public.csctbrambientales;`);
  return result.rows;
}

export async function insertRiesgosBiologicosAmbientalesSocioeconomicos(
  biologicos,
  ambientales,
  socioeconomico,
  id_familia
) {
  let text = `INSERT INTO public.csctbrbiolofamilia(
    csctbriesgobioloid , csctbfamiliaid)  
  VALUES 
  `;
  let text1 = `INSERT INTO public.csctbrambientalfamilia(
    csctbrambientalesid , csctbfamiliaid)
  VALUES 
  `;
  let text2 = `INSERT INTO public.csctbrsociofamilia(
    csctbrsocioid , csctbfamiliaid)
  VALUES 
  `;
  const idsBiologicos = obetnerIdsAndMerge(
    text,
    biologicos.map((item) => item.csctbriesgobioloid),
    id_familia
  );
  const idsAmbientales = obetnerIdsAndMerge(
    text1,
    ambientales.map((item) => item.csctbrambientalesid),
    id_familia
  );
  const idsSocioeconomico = obetnerIdsAndMerge(
    text2,
    socioeconomico.map((item) => item.csctbrsocioid),
    id_familia
  );

  try {
    for (let i of [idsBiologicos, idsAmbientales, idsSocioeconomico]) {
      var result = await conn.query(i);
    }
    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido ingresar sus datos" };
  }
}

export async function insertPrioritarioAndVulnerable(
  prioritarios,
  vulnerables,
  id_familia
) {
  let text = `INSERT INTO public.csctbprioritariofamilia(
    csctbprioritarioid , csctbfamiliaid)
   
  VALUES 
  `;
  let text1 = `INSERT INTO public.csctbvulnerablefamilia(
    csctbvulnerableid , csctbfamiliaid)  
  VALUES 
  `;
  const idPrioritarios = obetnerIdsAndMerge(
    text,
    prioritarios.map((item) => item.csctbprioritarioid),
    id_familia
  );
  const idVulnerbale = obetnerIdsAndMerge(
    text,
    vulnerables.map((item) => item.csctbvulnerableid),
    id_familia
  );
  try {
    for (let i of [idPrioritarios, idVulnerbale]) {
      var result = await conn.query(i);
    }
    return result.rows;
  } catch (error) {
    return { error: "No se ha podido ingresar sus datos" };
  }
}

export async function getRiesgosObstetricos(tipoRiesgo) {
  const result =
    await conn.query(`SELECT csctbriesgobsteid, csctbtiporiesgoid, nom_rieobste
	FROM public.csctbriesgobste WHERE csctbtiporiesgoid = ${tipoRiesgo}`);
  return result.rows;
}
// NO EXISTE LA COLUMNA idfamilia ustedes tienen una idembarazada
export async function insertEmbarazadaAndRiesgoObstetricos(
  formData,
  id_riesgo,
  id_familia
) {
  try {
    var result = await conn.query(
      `INSERT INTO 
      public.csctbembarazadas(csctbfamiliaid,
        fecha_menstruacion, 
        fecha_parto, control_menos20, control_mas20, semanas_gestacion, 
        gestas, partos, abortos, cesarias, ante_patologicos)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11); 
      `,
      [
        id_familia,
        formData.fechaUltimaMenstruacion,
        formData.fechaProbableDeParto,
        formData.controlMenos20,
        formData.controlMas20,
        formData.semanasGestacion,
        formData.gestas,
        formData.partos,
        formData.aborto,
        formData.cesarias,
        formData.antecedentesPatologicos,
      ]
    );

    result = await conn.query(`INSERT INTO public.csctbriesgoembarazada(
      csctbriesgobsteid , csctbembarazadasid, fecha_embarazada)
    VALUES (${id_riesgo}, (SELECT csctbembarazadasid
      FROM public.csctbembarazadas
      ORDER BY csctbembarazadasid DESC
      LIMIT 1
      ), CURRENT_TIMESTAMP);
    `);
    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido ingresar sus datos" };
  }
}

export async function getFamiliares(accion, termino) {

  console.log(accion, termino)
  var text = "";

  if (accion == 1) {
    text = `SELECT 
    csctbficha.num_ficha, 
    csctbfamilia.nom_fam, 
    csctbfamilia.ape_fam, 
    csctbfamilia.genero, 
    csctbfamilia.anios, 
    csctbparentesco.nom_parentesco, 
    csctbfamilia.id_jefe_hogar
  FROM 
    public.csctbficha,
    public.csctbfamilia, 
    public.csctbparentesco
  WHERE 
    csctbparentesco.csctbparentescoid = csctbfamilia.csctbparentescoid AND
    csctbfamilia.csctbfamiliaid = csctbfamilia.id_jefe_hogar AND 
    csctbficha.csctbfamiliaid = $1
  ORDER BY ape_fam ASC;
  
  `;

    const result = await conn.query(text, [parseInt(termino)]);
    return result.rows;
  } else if (accion == 2) {
    text = `	
    SELECT 
      csctbfamilia.csctbfamiliaid,
      csctbfamilia.nom_fam, 
      csctbfamilia.ape_fam, 
      csctbfamilia.genero, 
      csctbfamilia.anios, 
      csctbparentesco.nom_parentesco, 
      csctbfamilia.id_jefe_hogar
    FROM 
    
      public.csctbfamilia, 
      public.csctbparentesco
    WHERE 
      csctbparentesco.csctbparentescoid = csctbfamilia.csctbparentescoid AND
      csctbfamilia.id_jefe_hogar = (
    SELECT 
      csctbfamilia.id_jefe_hogar
    FROM 
      public.csctbfamilia, 
      public.csctbparentesco
    WHERE 
      csctbparentesco.csctbparentescoid = csctbfamilia.csctbparentescoid AND
      csctbfamilia.csctbfamiliaid = csctbfamilia.id_jefe_hogar AND 
      (csctbfamilia.nom_fam LIKE '%' || $1 || '%' OR 
      csctbfamilia.ape_fam LIKE '%' || $1 || '%')
      ORDER BY ape_fam ASC LIMIT 1 ) `;
    const result = await conn.query(text, [termino]);
    return result.rows;
  } else {
    text = `SELECT 
    csctbficha.num_ficha, 
    csctbfamilia.nom_fam, 
    csctbfamilia.ape_fam, 
    csctbfamilia.genero, 
    csctbfamilia.anios, 
    csctbparentesco.nom_parentesco, 
    csctbfamilia.id_jefe_hogar
  FROM 
    public.csctbficha,
    public.csctbfamilia, 
    public.csctbparentesco
  WHERE 
    csctbparentesco.csctbparentescoid = csctbfamilia.csctbparentescoid AND
    csctbficha.csctbfamiliaid = csctbfamilia.id_jefe_hogar AND 
    csctbfamilia.cedula_fam = $1
  ORDER BY ape_fam ASC;
  `;
  console.log(3)
    const result = await conn.query(text, [termino]);
    return result.rows;
  }
}
