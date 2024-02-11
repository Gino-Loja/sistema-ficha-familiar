"use server";
import conn from "@/database/connection";
import {
  obtenerCsctbedadesid,
  obtenerCsctbedadesidRiesgos,
} from "./utils/rangoEdad";
import { obetnerIdsAndMerge } from "./utils/obtenerId";
import { Cookie } from "next/font/google";

import { writeFile } from "fs/promises";
import path, { format } from "path";
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
      estado_civil, csctbetniaid, csctbpueblosid, fallecido, informante)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,
       $9, $10, $11, $12, $13, $14, current_timestamp,${id_jefe},$15, $16, $17,$18, $19)
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
      formData.saludBucal,
      formData.observacion,
      true,
      formData.estadoCivil,
      formData.etnia,
      formData.pueblos,
      formData.fallecido,
      formData.informante,
    ];

    const res = await conn.query(text, values);

    await conn.query(
      `INSERT INTO public.csctbficha(
      csctbfamiliaid, ficha_creacion)
    VALUES ($1, current_timestamp);
    `,
      [res.rows[0].csctbfamiliaid]
    );

    if (formData.genero == "FEMENINO") {
      await conn.query(
        `INSERT INTO 
        public.csctbembarazadas(csctbfamiliaid)
        VALUES ($1); 
        `,
        [res.rows[0].csctbfamiliaid]
      );
    }
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
  LOWER(nom_enfermedad) LIKE '%' || LOWER($1) || '%'
ORDER BY 
  nom_enfermedad ASC;


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

    for (let i of [insertEvaluarRiesgos, insertRiesgos]) {
      var result = await conn.query(i);
    }
    return result.rows;
  } catch (error) {
    console.log(error);
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
    text1,
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
        gestas, partos, n_abortos_inducidos, cesarias, ante_patologicos, n_abortos_espontaneos)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12); 
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
        formData.abortosInducidos,
        formData.cesarias,
        formData.antecedentesPatologicos,
        formData.abortosEspontaneos,
      ]
    );

    result = await conn.query(`INSERT INTO public.csctbriesgoembarazada(
      csctbriesgobsteid , csctbfamiliaid, fecha_embarazada)
    VALUES (${id_riesgo}, ${id_familia}, CURRENT_TIMESTAMP);
    `);
    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido ingresar sus datos" };
  }
}

//AUN FALTA IMPLEMENTAR BIEN ESTO
export async function getFamiliares(accion, termino) {
  var text = "";

  if (accion == 1) {
    text = `SELECT 
    csctbfamilia.csctbfamiliaid,
    csctbfamilia.nom_fam, 
    csctbfamilia.ape_fam, 
    csctbfamilia.genero, 
    csctbfamilia.anios, 
    csctbparentesco.nom_parentesco, 
    csctbfamilia.id_jefe_hogar,
    csctbfamilia.cedula_fam,
    csctbfamilia.estado_civil,
    csctbfamilia.anios,
    csctbfamilia.fallecido,
    csctbfamilia.informante


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
      public.csctbficha

    WHERE 
	csctbfamilia.csctbfamiliaid = csctbficha.csctbfamiliaid and

    csctbficha.csctbfamiliaid = $1 LIMIT 1  
	)
  ORDER BY csctbfamiliaid ASC;
      
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
      csctbfamilia.id_jefe_hogar,
      csctbfamilia.cedula_fam,
    csctbfamilia.fallecido
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
      (LOWER(csctbfamilia.nom_fam) LIKE '%' || LOWER($1) || '%' OR 
      LOWER(csctbfamilia.ape_fam) LIKE '%' || LOWER($1) || '%')
      ORDER BY ape_fam ASC LIMIT 1 ) `;
    const result = await conn.query(text, [termino]);
    return result.rows;
  } else {
    text = ` SELECT 
    csctbfamilia.csctbfamiliaid,
    csctbfamilia.nom_fam, 
    csctbfamilia.ape_fam, 
    csctbfamilia.genero, 
    csctbfamilia.anios, 
    csctbparentesco.nom_parentesco, 
    csctbfamilia.id_jefe_hogar,
    csctbfamilia.cedula_fam,
    csctbfamilia.fallecido
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
    
    csctbfamilia.cedula_fam = $1 LIMIT 1  )
  `;
    const result = await conn.query(text, [termino]);
    return result.rows;
  }
}

/// ESTAS FUNCIONES SON PARA EDITAR

export async function getFamiliarById(id) {
  const result = await conn.query(
    `SELECT 
    csctbfamilia.cedula_fam, 
    csctbfamilia.nom_fam, 
    csctbfamilia.ape_fam, 
    csctbfamilia.genero, 
    csctbparentesco.csctbparentescoid, 
    csctbparentesco.nom_parentesco,
    csctbocupacion.csctbocupacionid, 
    csctbinstruccion.csctbinstruccionid, 
    csctbfamilia.control_bucal, 
    csctbfamilia.observacion, 
    csctbfamilia.fecha_na_fam, 
    csctbfamilia.anios, 
    csctbfamilia.meses, 
    csctbfamilia.dias, 
    csctbfamilia.csctbfamiliaid, 
    csctbfamilia.estado_civil, 
    csctbetnia.csctbetniaid, 
    csctbnacionalidadetnica.nom_nacionalidadetnica, 
    csctbpueblos.csctbpueblosid,
    csctbfamilia.fallecido,
    csctbfamilia.informante

  FROM 
    public.csctbfamilia
    LEFT JOIN public.csctbparentesco ON csctbparentesco.csctbparentescoid = csctbfamilia.csctbparentescoid
    LEFT JOIN public.csctbocupacion ON csctbocupacion.csctbocupacionid = csctbfamilia.csctbocupacionid
    LEFT JOIN public.csctbinstruccion ON csctbinstruccion.csctbinstruccionid = csctbfamilia.csctbinstruccionid
    LEFT JOIN public.csctbetnia ON csctbetnia.csctbetniaid = csctbfamilia.csctbetniaid
    LEFT JOIN public.csctbnacionalidadetnica ON csctbnacionalidadetnica.csctbnacionalidadetnicaid = csctbfamilia.csctbnacionalidadid
    LEFT JOIN public.csctbpueblos ON csctbpueblos.csctbpueblosid = csctbfamilia.csctbpueblosid 
  WHERE 
    csctbfamilia.csctbfamiliaid = $1
  order by csctbfamiliaid asc;
  `,
    [id]
  );
  return result.rows;
}

export async function updateFamiliaById(formData, id) {
  try {
    const text = `UPDATE public.csctbfamilia
    SET 
      csctbocupacionid = $1, 
      csctbinstruccionid = $2, 
      csctbparentescoid = $3, 
      cedula_fam = $4, 
      nom_fam = $5, 
      ape_fam = $6, 
      fecha_na_fam = $7,
      anios = $8, 
      meses = $9, 
      dias = $10,
      genero = $11, 
      control_bucal = $12, 
      observacion = $13, 
      estado_fam = $14, 
      fecreacion_fam = current_timestamp,
      estado_civil = $15,
      csctbetniaid = $16,
      csctbpueblosid = $17,
      fallecido = $18,
      informante = $19
    WHERE csctbfamiliaid = ${id}`;

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
      formData.fallecido,
      formData.informante,
    ];
    const res = await conn.query(text, values);

    return res.rows;
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron los datos" };
  }
}

export async function getFamiliaVacunaById(id) {
  const result =
    await conn.query(`SELECT csctbvacunafamiliaid, csctbvacunasid, csctbfamiliaid
	FROM public.csctbvacunafamilia WHERE csctbfamiliaid = ${id};`);
  return result.rows;
}

export async function updateVacunas(
  accion,
  id_vacuna,
  id_familia,
  id_vacunaFamilia
) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbvacunafamilia
      (csctbvacunasid, csctbfamiliaid, fecha_cre_vacuna)VALUES($1,$2,current_timestamp)
      `,
        [id_vacuna, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbvacunafamilia
      WHERE csctbvacunafamiliaid = $1
      `,
        [id_vacunaFamilia]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}

export async function updateEnfermdad({
  accion,
  id_enfermedad,
  id_familia,
  id_enfermedadFamilia,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbenferfam(
           csctbenfermedadid, csctbfamiliaid)
          VALUES ($1, $2);
      `,
        [id_enfermedad, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbenferfam
        WHERE  csctbenfermeriesgoid = $1
      `,
        [id_enfermedadFamilia]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}

export async function getFamiliaEnfermedadById(id) {
  const result = await conn.query(
    `SELECT 
csctbenferfam.csctbenfermeriesgoid,
csctbenfermedad.nom_enfermedad, 
csctbenfermedad.csctbenfermedadid,
csctbenfermedad.cog_enfermedad
FROM 
public.csctbenferfam, 
public.csctbenfermedad, 
public.csctbfamilia
WHERE 
csctbenferfam.csctbfamiliaid = csctbfamilia.csctbfamiliaid AND
csctbenferfam.csctbenfermedadid = csctbenfermedad.csctbenfermedadid and 
csctbenferfam.csctbfamiliaid = $1;`,
    [id]
  );
  return result.rows;
}

export async function getFamiliarRiesgoById(id) {
  const result = await conn.query(
    `SELECT 
  csctbriesgos.csctbriesgosid, 
  csctbriesgos.riesgos, 
  csctbriesgos.gra_discapacidad, 
  csctbriesgos.gru_dispensa, 
  csctbriesgos.porce_discapacidad
FROM 
  public.csctbfamilia, 
  public.csctbriesgos
WHERE 
  csctbriesgos.csctbfamiliaid = csctbfamilia.csctbfamiliaid and
  csctbriesgos.csctbfamiliaid = $1;`,
    [id]
  );

  return result.rows;
}
export async function getFamiliarEvaluacionRiesgoById(id) {
  const result = await conn.query(
    `SELECT 
    csctbevaluariesgo.csctbevaluariesgoid, 
    csctbevaluariesgo.csctbevaluacionid,
    csctbevaluacion.nom_evaluacion
  FROM 
    public.csctbfamilia, 
    public.csctbevaluariesgo, 
    public.csctbevaluacion
  WHERE 
    csctbevaluariesgo.csctbfamiliaid = csctbfamilia.csctbfamiliaid AND
    csctbevaluacion.csctbevaluacionid = csctbevaluariesgo.csctbevaluacionid AND
    csctbfamilia.csctbfamiliaid = $1;
  `,
    [id]
  );

  return result.rows;
}

export async function updateEvaluacionRiesgos({
  accion,
  id_evaluacion,
  id_familia,
  id_evaluacionFamilia,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbevaluariesgo(
           csctbevaluacionid, csctbfamiliaid)
          VALUES ( $1, $2);;
      `,
        [id_evaluacion, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbevaluariesgo
        WHERE csctbevaluariesgoid=$1;
      `,
        [id_evaluacionFamilia]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}

export async function updateFamiliarEvaluacionRiesgoById(id_familia, formData) {
  const result = await conn.query(
    `UPDATE public.csctbriesgos
      SET 
       riesgos=$1, 
       gra_discapacidad=$2,
        gru_dispensa=$3, 
        porce_discapacidad=$4
      WHERE csctbfamiliaid=$5;
    `,
    [
      formData.riesgos,
      formData.discapacidad,
      formData.dispenserial,
      formData.porcentaje,
      id_familia,
    ]
  );

  return result.rows;
}

//
export async function updateVulnerableFamilia({
  accion,
  id_vulnerable,
  id_familia,
  id_vulnerableFamilia,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbvulnerablefamilia(
          csctbvulnerableid , csctbfamiliaid)  
        VALUES  ( $1, $2);
      `,
        [id_vulnerable, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbvulnerablefamilia
        WHERE csctbvulnerablefamiliaid=$1;
      `,
        [id_vulnerableFamilia]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}

export async function updatePrioritarioFamilia({
  accion,
  id_prioritario,
  id_familia,
  id_prioritarioFamilia,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbprioritariofamilia(
          csctbprioritarioid , csctbfamiliaid)
        VALUES  ( $1, $2);
      `,
        [id_prioritario, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbprioritariofamilia
        WHERE csctbprioritariofamiliaid=$1;
      `,
        [id_prioritarioFamilia]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}

export async function getFamiliaPrioritarioById(id) {
  const result = await conn.query(
    `SELECT 
    csctbprioritariofamilia.csctbprioritariofamiliaid, 
    csctbprioritario.nom_prioritario,
    csctbprioritario.csctbprioritarioid,
    csctbfamilia.csctbfamiliaid
  FROM 
    public.csctbprioritario, 
    public.csctbfamilia, 
    public.csctbprioritariofamilia
  WHERE 
    csctbprioritario.csctbprioritarioid = csctbprioritariofamilia.csctbprioritarioid AND
    csctbprioritariofamilia.csctbfamiliaid = csctbfamilia.csctbfamiliaid and 
    csctbfamilia.csctbfamiliaid = $1;
  `,
    [id]
  );
  return result.rows;
}
export async function getFamiliaVulnerableById(id) {
  const result = await conn.query(
    `SELECT 
    csctbvulnerablefamilia.csctbvulnerablefamiliaid, 
    csctbvulnerable.nom_vulnerable,
    csctbvulnerable.csctbvulnerableid,
    csctbvulnerablefamilia.csctbfamiliaid
  FROM 
    public.csctbvulnerable, 
    public.csctbvulnerablefamilia, 
    public.csctbfamilia
  WHERE 
    csctbvulnerable.csctbvulnerableid = csctbvulnerablefamilia.csctbvulnerableid AND
    csctbfamilia.csctbfamiliaid = csctbvulnerablefamilia.csctbfamiliaid and
    csctbvulnerablefamilia.csctbfamiliaid = $1;
  `,
    [id]
  );
  return result.rows;
}

// RIESGOS
export async function getFamiliaRiesgosBiologicosById(id) {
  const result = await conn.query(
    `SELECT 
  csctbrbiolofamilia.csctbrbiolofamiliaid,
  csctbriesgobiolo.csctbriesgobioloid, 
  csctbriesgobiolo.nom_rbiolo
FROM 
  public.csctbrbiolofamilia, 
  public.csctbfamilia, 
  public.csctbriesgobiolo
WHERE 
  csctbfamilia.csctbfamiliaid = csctbrbiolofamilia.csctbfamiliaid AND
  csctbriesgobiolo.csctbriesgobioloid = csctbrbiolofamilia.csctbriesgobioloid and 
  csctbrbiolofamilia.csctbfamiliaid = $1;
`,
    [id]
  );
  return result.rows;
}
export async function getFamiliaRiesgosSocioeconomicosById(id) {
  const result = await conn.query(
    `SELECT 
    csctbrsociofamilia.csctbrsociofamiliaid, 
    csctbriesgosocio.csctbrsocioid,
    csctbriesgosocio.nom_rsocio
  FROM 
    public.csctbfamilia, 
    public.csctbriesgosocio, 
    public.csctbrsociofamilia
  WHERE 
    csctbfamilia.csctbfamiliaid = csctbrsociofamilia.csctbfamiliaid AND
    csctbriesgosocio.csctbrsocioid = csctbrsociofamilia.csctbrsocioid and
    csctbrsociofamilia.csctbfamiliaid = $1;
`,
    [id]
  );
  return result.rows;
}
export async function getFamiliaRiesgosAmbientalById(id) {
  const result = await conn.query(
    `SELECT 
    csctbrambientalfamilia.csctbrambientalfamiliaid, 
    csctbrambientales.nom_rambiental,
    csctbrambientales.csctbrambientalesid
  FROM 
    public.csctbfamilia, 
    public.csctbrambientalfamilia, 
    public.csctbrambientales
  WHERE 
    csctbfamilia.csctbfamiliaid = csctbrambientalfamilia.csctbfamiliaid AND
    csctbrambientales.csctbrambientalesid = csctbrambientalfamilia.csctbrambientalesid and 
    csctbrambientalfamilia.csctbfamiliaid = $1;
  
`,
    [id]
  );
  return result.rows;
}

export async function updateRiesgosBiologicos({
  accion,
  id_i,
  id_familia,
  id_d,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbrbiolofamilia(
          csctbriesgobioloid , csctbfamiliaid)  
        VALUES( $1, $2);
      `,
        [id_i, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbrbiolofamilia
        WHERE csctbrbiolofamiliaid=$1;
      `,
        [id_d]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}
export async function updateRiesgosSocieconomicos({
  accion,
  id_i,
  id_familia,
  id_d,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbrsociofamilia(
          csctbrsocioid , csctbfamiliaid)
        VALUES( $1, $2);
      `,
        [id_i, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbrsociofamilia
        WHERE csctbrsociofamiliaid=$1;
      `,
        [id_d]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}
export async function updateRiesgosAmbientales({
  accion,
  id_i,
  id_familia,
  id_d,
}) {
  try {
    if (accion) {
      const result = await conn.query(
        `INSERT INTO public.csctbrambientalfamilia(
          csctbrambientalesid , csctbfamiliaid)
        VALUES ( $1, $2);
      `,
        [id_i, id_familia]
      );
      return result.rows;
    } else {
      const result = await conn.query(
        `DELETE FROM public.csctbrambientalfamilia
        WHERE csctbrambientalfamiliaid=$1;
      `,
        [id_d]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    return { error: "no se actualizaron sus datos" };
  }
}
// OBTENER EL ID SI ESTA EMBARAZADA

export async function getFamiliaEmbarazo(id) {
  const result = await conn.query(
    `SELECT  csctbfamiliaid,
    fecha_menstruacion,
     fecha_parto, 
     control_menos20,
      control_mas20,
       esquema_vacunacion,
        ante_gineco, ante_patologicos, semanas_gestacion,
         gestas, partos, abortos,
          cesarias, tipo_aborto
      FROM public.csctbembarazadas WHERE csctbfamiliaid= $1 LIMIT 1;
  `,
    [id]
  );
  return result.rows;
}

export async function getFamiliaEmbarazadaById(id) {
  const result = await conn.query(
    `SELECT 
  csctbembarazadas.csctbembarazadasid, 
  csctbembarazadas.fecha_menstruacion, 
  csctbembarazadas.fecha_parto, 
  csctbembarazadas.control_menos20, 
  csctbembarazadas.control_mas20, 
  csctbembarazadas.esquema_vacunacion, 
  csctbembarazadas.ante_patologicos, 
  csctbembarazadas.semanas_gestacion, 
  csctbembarazadas.gestas, 
  csctbembarazadas.partos, 
  csctbembarazadas.n_abortos_espontaneos, 
  csctbembarazadas.cesarias,
  csctbembarazadas.n_abortos_inducidos,
  csctbembarazadas.csctbfamiliaid
FROM 
  public.csctbembarazadas, 
  public.csctbfamilia
WHERE 
  csctbembarazadas.csctbfamiliaid = csctbfamilia.csctbfamiliaid and
  csctbfamilia.csctbfamiliaid = $1 LIMIT 1;
`,
    [id]
  );
  return result.rows;
}
export async function getFamiliaEmbarazadaRiesgoById(id) {
  const result = await conn.query(
    `SELECT
    csctbriesembarazadaid,
     csctbriesgobsteid,
    csctbfamiliaid
 
    FROM public.csctbriesgoembarazada
    WHERE csctbfamiliaid = $1 LIMIT 1
    ;
`,
    [id]
  );
  return result.rows;
}

export async function updateFamiliaEmbarazadaById(formData, id_familia) {
  try {
    const result = await conn.query(
      `UPDATE public.csctbembarazadas
    SET 
      fecha_menstruacion=$1,
      fecha_parto=$2,
      control_menos20=$3,
        control_mas20=$4,
        ante_patologicos=$5, 
        semanas_gestacion=$6, 
        gestas=$7, 
        partos=$8, 
        n_abortos_espontaneos=$9,
        cesarias=$10,
        n_abortos_inducidos=$11
    WHERE csctbfamiliaid = $12;`,
      [
        formData.fechaUltimaMenstruacion,
        formData.fechaProbableDeParto,
        formData.controlMenos20,
        formData.controlMas20,
        formData.antecedentesPatologicos,
        formData.semanasGestacion,
        formData.gestas,
        formData.partos,
        formData.abortosEspontaneos,
        formData.cesarias,
        formData.abortosInducidos,
        id_familia,
      ]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "no se han podido actualizar tus datos" };
  }
}
export async function updateRiesgosEmbarazada(id_riesgo, id_embarazada) {
  const result = await conn.query(
    `UPDATE public.csctbriesgoembarazada
	SET 
   csctbriesgobsteid=$1
	WHERE csctbriesembarazadaid=$2;`,
    [id_riesgo, id_embarazada]
  );
  return result.rows;
}

export async function insertViviendaFamilia(formData, id_familia) {
  try {
    const result = await conn.query(
      `INSERT INTO public.csctbvivienda(csctbfamiliaid,
       con_vivienda, det_condicion,
        tipo_vivienda, det_tipovi, 
        via_acceso, det_acceso, 
        techo, det_techo,
        piso, det_piso,
        paredes, det_paredes,
        propiedad, det_propiedad,
        num_cuartos, dormitorios,
        prov_agua, det_provagua,
       canalizacionagua)
    VALUES ($1, $2,
       $3, $4,
       $5, $6,
        $7, $8, 
        $9, $10,
         $11,$12, 
         $13, $14,
          $15, $16,
           $17, $18,
            $19, $20) returning csctbviviendaid; 
    `,
      [
        id_familia,
        formData.conVivienda,
        formData.detCondicion,
        formData.tipoVivienda,
        formData.detTipo,
        formData.viaAcceso,
        formData.detViaAcceso,
        formData.techo,
        formData.detTecho,
        formData.piso,
        formData.detPiso,
        formData.paredes,
        formData.detParedes,
        formData.propiedad,
        formData.detpPropiedad,
        formData.cuartos,
        formData.dormitorios,
        formData.proAgua,
        formData.detproAgua,
        formData.canalAgua,
      ]
    );

    return result.rows;
  } catch (error) {
    return { error: "No se ingresaron tus datos" };
  }
}

export async function insertViviendaServicio(formData, id_familia) {
  try {
    const result = await conn.query(
      `UPDATE public.csctbvivienda
      SET tratamientoagua=$2, 
      servicio_higienico=$3,
       ubicacionsh=$4, 
       ducha=$5, basura=$6,
        servicio_internet=$7, 
        alumbrado=$8, cocina=$9,
         anidentro=$10
      WHERE csctbfamiliaid =$1;
    
    `,
      [
        id_familia,
        formData.tratamientoAgua,
        formData.tipoServicioHigienico,
        formData.servicioHigienico,
        formData.ducha,
        formData.basura,
        formData.internet,
        formData.alumbrado,
        formData.cocina,
        formData.cocinaDormitorio,
      ]
    );

    return result.rows;
  } catch (error) {
    return { error: "No se ingresaron tus datos" };
  }
}

export async function insertFactoresVivienda(formData, id_vivienda) {
  try {
    const result = await conn.query(
      `INSERT INTO public.csctbriesgoavivienda(
        ries_agresividad,
         ries_insalubridad, ries_cantidad,
          conv_animales, 
         tipo_domestico,
          tipo_granja, 
         tipo_silvestre,
          dome_perro, dome_gato, 
          perro_peque, perro_medio,
           perro_grande,
        num_gatos, 
        ries_vi1, ries_vi2, ries_vi3, ries_vi4,
         csctbviviendaid,
          vectores,
           provectores, vulnerable)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,
       $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21);
    
    `,
      [
        formData.agresividad,
        formData.insalubridad,
        formData.cantidad,
        formData.convAnimales,
        formData.domesticos,
        formData.Granja,
        formData.silvestre,
        formData.perro,
        formData.gato,
        formData.pequena,
        formData.mediana,
        formData.grande,
        formData.numeroGatos,
        formData.riesgov1,
        formData.riesgov2,
        formData.riesgov3,
        formData.riesgov4,
        id_vivienda,
        formData.vectores,
        formData.proteccionVectores,
        formData.vulnerable,
      ]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se ingresaron tus datos" };
  }
}

export async function insertUbicacionVivienda(formData, id_familia) {
  try {
    const result = await conn.query(
      `UPDATE public.csctbvivienda
      SET 
      num_celular=$2,
      num_telefono=$3, 
      longitud1=$4, 
      latitud1=$5,
       altitud1=$6, 
      canton=$7,
       parroquia=$8,
      csctbbarriochamboid=$9, 
      sector=$10, 
      cprincipal=$11,
       csecundaria=$12, 
      num_casa=$13,
       referenciadom=$14
      WHERE csctbfamiliaid =$1;
    `,
      [
        id_familia,
        formData.celular,
        formData.convencional,
        formData.longitud,
        formData.latitud,
        formData.altitud,
        formData.canton,
        formData.parroquia,
        formData.barriosComunidad,
        formData.sector,
        formData.callePrincipal,
        formData.calleSecundaria,
        formData.numeroCasa,
        formData.referencia,
      ]
    );

    return result.rows;
  } catch (error) {
    console.log(error);

    return { error: "No se ingresaron tus datos" };
  }
}

export async function getBarriosVivienda() {
  const result =
    await conn.query(`SELECT csctbbarriosid, nom_barrio, nom_eaisbarrios
	FROM public.csctbbarrioschambo;`);
  return await result.rows;
}

export async function getViviendaById(id) {
  const result = await conn.query(
    `SELECT 
  csctbvivienda.csctbviviendaid, 
  csctbvivienda.latitud1, 
  csctbvivienda.longitud1, 
  csctbvivienda.altitud1, 
  csctbvivienda.con_vivienda, 
  csctbvivienda.det_condicion, 
  csctbvivienda.tipo_vivienda, 
  csctbvivienda.det_tipovi, 
  csctbvivienda.via_acceso, 
  csctbvivienda.det_acceso, 
  csctbvivienda.techo, 
  csctbvivienda.det_techo, 
  csctbvivienda.piso, 
  csctbvivienda.det_piso, 
  csctbvivienda.paredes, 
  csctbvivienda.det_paredes, 
  csctbvivienda.propiedad, 
  csctbvivienda.num_cuartos, 
  csctbvivienda.dormitorios, 
  csctbvivienda.prov_agua, 
  csctbvivienda.det_provagua, 
  csctbvivienda.canalizacionagua, 
  csctbvivienda.tratamientoagua, 
  csctbvivienda.servicio_higienico, 
  csctbvivienda.ubicacionsh, 
  csctbvivienda.ducha, 
  csctbvivienda.basura, 
  csctbvivienda.alumbrado, 
  csctbvivienda.cocina, 
  csctbvivienda.det_cocina, 
  csctbvivienda.anidentro, 
  csctbvivienda.num_celular, 
  csctbvivienda.num_telefono, 
  csctbvivienda.parroquia, 
  csctbvivienda.canton, 
  csctbvivienda.cprincipal, 
  csctbvivienda.csecundaria, 
  csctbvivienda.num_casa, 
  csctbvivienda.referenciadom, 
  csctbvivienda.det_propiedad, 
  csctbvivienda.servicio_internet, 
  csctbbarrioschambo.nom_barrio, 
  csctbbarrioschambo.csctbbarriosid,
  csctbvivienda.sector,
  csctbfamilia.nom_fam,
  csctbfamilia.ape_fam
FROM 
    public.csctbfamilia
    JOIN public.csctbvivienda ON csctbvivienda.csctbfamiliaid = csctbfamilia.csctbfamiliaid
    JOIN public.csctbbarrioschambo ON csctbbarrioschambo.csctbbarriosid = csctbvivienda.csctbbarriochamboid
    WHERE 
    csctbfamilia.csctbfamiliaid = $1;
`,
    [id]
  );
  return await result.rows;
}

export async function getViviendaFactoresById(id) {
  const result = await conn.query(
    `SELECT 
    csctbriesgoavivienda.csctbriesgoavivid, 
    csctbriesgoavivienda.ries_agresividad, 
    csctbriesgoavivienda.ries_insalubridad, 
    csctbriesgoavivienda.ries_cantidad, 
    csctbriesgoavivienda.conv_animales, 
    csctbriesgoavivienda.tipo_domestico, 
    csctbriesgoavivienda.tipo_granja, 
    csctbriesgoavivienda.tipo_silvestre, 
    csctbriesgoavivienda.dome_perro, 
    csctbriesgoavivienda.dome_gato, 
    csctbriesgoavivienda.perro_peque, 
    csctbriesgoavivienda.perro_medio, 
    csctbriesgoavivienda.perro_grande, 
    csctbriesgoavivienda.num_gatos, 
    csctbriesgoavivienda.ries_vi1, 
    csctbriesgoavivienda.ries_vi2, 
    csctbriesgoavivienda.ries_vi3, 
    csctbriesgoavivienda.ries_vi4,
    csctbriesgoavivienda.vectores,
    csctbriesgoavivienda.provectores,
    csctbriesgoavivienda.vulnerable
  FROM 
    public.csctbriesgoavivienda
  
    where csctbriesgoavivienda.csctbviviendaid = $1;
  
`,
    [id]
  );
  return await result.rows;
}

export async function updateViviendaById(formData, id_familia) {
  const result = await conn.query(
    `UPDATE public.csctbvivienda
    SET
      con_vivienda = $2,
      det_condicion = $3,
      tipo_vivienda = $4,
      det_tipovi = $5,
      via_acceso = $6,
      det_acceso = $7,
      techo = $8,
      det_techo = $9,
      piso = $10,
      det_piso = $11,
      paredes = $12,
      det_paredes = $13,
      propiedad = $14,
      det_propiedad = $15,
      num_cuartos = $16,
      dormitorios = $17,
      prov_agua = $18,
      det_provagua = $19,
      canalizacionagua = $20
    WHERE
      csctbfamiliaid = $1;
    
`,
    [
      id_familia,
      formData.conVivienda,
      formData.detCondicion,
      formData.tipoVivienda,
      formData.detTipo,
      formData.viaAcceso,
      formData.detViaAcceso,
      formData.techo,
      formData.detTecho,
      formData.piso,
      formData.detPiso,
      formData.paredes,
      formData.detParedes,
      formData.propiedad,
      formData.detpPropiedad,
      formData.cuartos,
      formData.dormitorios,
      formData.proAgua,
      formData.detproAgua,
      formData.canalAgua,
    ]
  );
  return result.rows;
}

export async function updateFactoresVivienda(formData, id_vivienda) {
  try {
    const result = await conn.query(
      `UPDATE public.csctbriesgoavivienda
      SET
        ries_agresividad = $1,
        ries_insalubridad = $2,
        ries_cantidad = $3,
        conv_animales = $4,
        tipo_domestico = $5,
        tipo_granja = $6,
        tipo_silvestre = $7,
        dome_perro = $8,
        dome_gato = $9,
        perro_peque = $10,
        perro_medio = $11,
        perro_grande = $12,
        num_gatos = $13,
        ries_vi1 = $14,
        ries_vi2 = $15,
        ries_vi3 = $16,
        ries_vi4 = $17,
        vectores = $18,
        provectores = $19,
        vulnerable = $20
      WHERE
        csctbviviendaid = $21;
      
      
    
    `,
      [
        formData.agresividad,
        formData.insalubridad,
        formData.cantidad,
        formData.convAnimales,
        formData.domesticos,
        formData.Granja,
        formData.silvestre,
        formData.perro,
        formData.gato,
        formData.pequena,
        formData.mediana,
        formData.grande,
        formData.numeroGatos,
        formData.riesgov1,
        formData.riesgov2,
        formData.riesgov3,
        formData.riesgov4,
        formData.vectores,
        formData.proteccionVectores,
        formData.vulnerable,
        id_vivienda,
      ]
    );
    return result.rows;
  } catch (error) {
    return { error: "No se ingresaron tus datos" };
  }
}

export async function insertTipoFamilia(id_familia) {
  try {
    const result = await conn.query(
      `INSERT INTO csctbtipofamilia(
        idjefe_hogar_familia)
      VALUES ($1);`,
      [id_familia]
    );

    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se podido ingresar tu datos" };
  }
}
export async function updateTipoFamilia(data, id_familia) {
  try {
    const result = await conn.query(
      `UPDATE public.csctbtipofamilia
      SET  
      tipo_familia=$1, 
      ciclo_vital=$2,
       primer_hijo=$3, 
      hijo_edad_preescolar=$4, 
      hijo_edad_escolar=$5, 
      hijo_edad_adolescente=$6, 
      hijo_edad_adulta=$7, 
      apgar_familiar=$8,
      observacion = $9
      WHERE idjefe_hogar_familia = $10;`,
      [
        data.tipoFamilia,
        data.cicloVital,
        data.primerHijo,
        data.hijoEdadPreescolar,
        data.hijoEdadEscolar,
        data.hijoEdadAdolescente,
        data.hijoEdadAdulta,
        data.apgarFamiliar,
        data.observacion,

        id_familia,
      ]
    );

    return result.rows;
  } catch (error) {
    console.log(error);
    return { error: "No se podido ingresar tu datos" };
  }
}

export async function getTipoFamilia(id_familia) {
  const result = await conn.query(
    `SELECT idcsctbtipofamilia, tipo_familia,
     ciclo_vital, primer_hijo,
      hijo_edad_preescolar,
       hijo_edad_escolar,
        hijo_edad_adolescente,
         hijo_edad_adulta,
          apgar_familiar,
           idjefe_hogar_familia,
           observacion
    FROM csctbtipofamilia
    WHERE idjefe_hogar_familia = $1;`,
    [id_familia]
  );
  return result.rows;
}

export async function saveImagenGenograma(img, id) {
  //const dataURL = await img;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const filePath = path.join(
    process.cwd(),
    "public/genogramas",
    `${id}_${formattedDate}.svg`
  );
  await writeFile(filePath, img);
  const result = await conn.query(
    `
    INSERT INTO "csctbHistorialGenograma"(
    imagen,  "fechaRegistro", idjefedehogar)
    VALUES ( $1, current_timestamp, $2);
  `,
    [`${id}_${formattedDate}.svg`, id]
  );

  return filePath;
}
