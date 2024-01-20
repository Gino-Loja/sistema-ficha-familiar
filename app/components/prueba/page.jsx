"use client";
import Genogram from "./Genogram.js";
import Explain from "./Explain.js";
import { useEffect, useState } from "react";
import { getFamiliaEnfermedadById } from "@/app/action";
import { Suspense } from "react";

//import "./App.css";

// const genoData = [
//   { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["C", "F", "K"] },
//   { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["B", "H", "K"] },
//   { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"] },
//   { key: 3, n: "Barbara", s: "F", a: ["C"] },
//   { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E", "H"] },
//   { key: 5, n: "Brooke", s: "F", a: ["B", "H", "L"] },
//   { key: 6, n: "Claire", s: "F", m: 1, f: 0, a: ["C"] },
//   { key: 7, n: "Carol", s: "F", m: 1, f: 0, a: ["C", "I"] },
//   { key: 8, n: "Chloe", s: "F", m: 1, f: 0, vir: 9, a: ["E"] },
//   { key: 9, n: "Chris", s: "M", a: ["B", "H"] },
//   { key: 10, n: "Ellie", s: "F", m: 3, f: 2, a: ["E", "G"] },
//   { key: 11, n: "Dan", s: "M", m: 3, f: 2, a: ["B", "J"] },
//   { key: 12, n: "Elizabeth", s: "F", vir: 13, a: ["J"] },
//   { key: 13, n: "David", s: "M", m: 5, f: 4, a: ["B", "H"] },
//   { key: 14, n: "Emma", s: "N", m: 5, f: 4, a: ["S"] },
//   { key: 15, n: "Evan", s: "M", m: 8, f: 9, a: ["F", "H"] },
//   { key: 16, n: "Ethan", s: "M", m: 8, f: 9, a: ["D", "K"] },
//   { key: 17, n: "Eve", s: "F", vir: 16, a: ["B", "F", "L"] },
//   { key: 18, n: "Emily", s: "F", m: 8, f: 9 },
//   { key: 19, n: "Fred", s: "F", m: 17, f: 16, t: "d" },
//   { key: 20, n: "Faith", s: "F", m: 17, f: 16, t: "d" },
//   { key: 21, n: "Felicia", s: "F", m: 12, f: 13, a: ["H"] },
//   { key: 22, n: "Frank", s: "M", m: 12, f: 13, a: ["B", "H"] },

//   // "Aaron"'s ancestors
// ];

//para dibujar el arbol familiar debo sacar las relacciones de aqui pero como el algoritmo se basa
// en una raiz es decir papa y mama (por algo es arbol familiar) entonces por simple logica empezarian por los
//padres luego si tienen hermano esos padres tienen hijos los hijos de los hijos tienen hijos y asi
// se supone que si los padres tienen 4 hijos esos hijos son hermanos
const relacionesFamiliares = {
  1: "JEFE/A DEL NUCLEO DEL HOGAR", //Por que poner esto? no le veo el sentido
  2: "ESPOSO/A", //se supone que si tienen hijos estan casados
  3: "CONVIVIENTE", //queda fuera del arbol por que no tiene asignado padres en comun
  4: "HIJO/A",
  5: "HIJASTRO/A",
  6: "PADRE",
  7: "MADRE",
  8: "SUEGRO/A", //queda fuera del arbol por que no tiene asignado padres en comun
  9: "YERNO", //queda fuera del arbol por que no tiene asignado padres en comun
  10: "NUERA", //queda fuera del arbol por que no tiene asignado padres en comun
  11: "NIETO/A",
  12: "HERMANO/A",
  13: "CUÑADO/A", //queda fuera del arbol por que no tiene asignado padres en comun
  14: "ABUELO/A",
  15: "TIO/A",
  16: "PRIMO/A",
  17: "OTRO FAMILIAR", //queda fuera del arbol por que no tiene asignado padres en comun
  18: "NO FAMILIAR", //queda fuera del arbol por que no tiene asignado padres en comun
};

// Ejemplo de acceso a la descripción de una relación por su número
// "JEFE/A DEL NUCLEO DEL HOGAR"

function obetnerEtiquetas(dato) {
  const resultado = [];

  dato.forEach((enfermedad) => {
    const nombre = enfermedad.nom_enfermedad.toLowerCase();

    if (nombre.includes("pulmon") || nombre.includes("pul")) {
      resultado.push("E");
    } else if (nombre.includes("tumor")) {
      resultado.push("J");
    } else if (nombre.includes("ovario") || nombre.includes("ovarios")) {
      resultado.push("B", "J");
    } else if (nombre.includes("leucemia")) {
      resultado.push("M");
    } else {
      resultado.push("O"); // Otra categoría, puedes asignar otra letra o manejar de acuerdo a tus necesidades
    }
  });

  return resultado;
}

function mapearDatosGenograma(datos) {
  const genoData = [];
  const genoDataMap = [];

  // Función para obtener o crear un nodo en el genograma
  function obtenerCrearNodo(id, nombre, genero, a, estado_civil, anios) {
    let nodo = genoData.find((n) => n.key === id);
    if (!nodo) {
      nodo = {
        key: id,
        n: nombre,
        // m: null,
        // f: null,
        // ux: null,
        ec: estado_civil,
        anios: anios,
        s: genero == "FEMENINO" ? "F" : "M",
        a: a,
      };
      genoData.push(nodo);
    }
    return nodo;
  }

  // Mapear datos a genograma

  datos.forEach((dato) => {
    const { csctbfamiliaid, nom_fam, genero, a, estado_civil, anios } = dato;
    console.log(dato);
    const nodo = obtenerCrearNodo(
      csctbfamiliaid,
      nom_fam,
      genero,
      a,
      estado_civil,
      anios
    );

    if (
      dato.nom_parentesco == relacionesFamiliares[6] &&
      dato.genero == "MASCULINO"
    ) {
      nodo.ux = datos.find(
        (persona) => persona.nom_parentesco == relacionesFamiliares[7]
      )?.csctbfamiliaid;
      nodo.s = "M";
    } else if (dato.nom_parentesco == relacionesFamiliares[4]) {
      //const padreMadre = dato.genero === "MASCULINO" ? "m" : "f";
      //nodo[padreMadre] = dato.csctbfamiliaid;
      nodo.f = datos.find(
        (persona) => persona.nom_parentesco == relacionesFamiliares[6]
      )?.csctbfamiliaid;
      nodo.m = datos.find(
        (persona) => persona.nom_parentesco == relacionesFamiliares[7]
      )?.csctbfamiliaid;
      nodo.s = dato.genero == "MASCULINO" ? "M" : "F";
    } else if (
      dato.nom_parentesco == relacionesFamiliares[7] &&
      dato.genero == "FEMENINO"
    ) {
      nodo.s = "F";
    } else if (dato.nom_parentesco == relacionesFamiliares[11]) {
      if (
        genoDataMap.find(
          (persona) => persona.f != undefined && persona.s == "M"
        )
      ) {
        nodo.f = genoDataMap.find(
          (persona) => persona.f != undefined && persona.s == "M"
        )?.key;
        nodo.m = datos.find(
          (persona) => persona.nom_parentesco == relacionesFamiliares[10]
        )?.csctbfamiliaid;
      } else {
        nodo.m = genoDataMap.find(
          (persona) => persona.f != undefined && persona.s == "F"
        )?.key;
        nodo.f = datos.find(
          (persona) => persona.nom_parentesco == relacionesFamiliares[9]
        )?.csctbfamiliaid;
      }
    } else if (dato.nom_parentesco == relacionesFamiliares[10]) {
      nodo.vir = genoDataMap.find(
        (persona) => persona.f != undefined && persona.s == "M"
      )?.key;
    } else if (dato.nom_parentesco == relacionesFamiliares[9]) {
      nodo.ux = genoDataMap.find(
        (persona) => persona.f != undefined && persona.s == "F"
      )?.key;
    } else if (dato.nom_parentesco == relacionesFamiliares[5]) {
      // hijastro
      nodo.f = datos.find(
        (persona) => persona.nom_parentesco == relacionesFamiliares[6]
      )?.csctbfamiliaid;
      nodo.m = datos.find(
        (persona) => persona.nom_parentesco == relacionesFamiliares[7]
      )?.csctbfamiliaid;
      nodo.s = dato.genero == "MASCULINO" ? "M" : "F";

      nodo.h = nodo.s == "M" ? "hijastro" : "hijastra";
    }
    genoDataMap.push(nodo);
  });

  return genoDataMap;
}

const MostrarGenograma = ({ familiares }) => {
  const [familiarEtiquetado, setfamiliiarEtiquetado] = useState([]);
  useEffect(() => {
    const getEnfermedades = async () => {
      return await Promise.all(
        familiares.map(async (familiar) => {
          const data = await getFamiliaEnfermedadById(familiar.csctbfamiliaid);
          const etiquetas = obetnerEtiquetas(data);
          return { ...familiar, a: etiquetas };
        })
      );
    };
    getEnfermedades().then((data) => {
      setfamiliiarEtiquetado(mapearDatosGenograma(data));
    });
  }, []);
  // const nuevo = mapearDatosGenograma([
  //   {
  //     nom_fam: "JOSE",
  //     ape_fam: "111111111",
  //     genero: "MASCULINO",
  //     nom_parentesco: "PADRE",
  //     anios: 36,
  //     csctbfamiliaid: 429,
  //   },
  //   {
  //     nom_fam: "ARIANA",
  //     ape_fam: "111111111",
  //     genero: "FEMENINO",
  //     nom_parentesco: "MADRE",
  //     anios: 46,
  //     csctbfamiliaid: 430,
  //   },
  //   {
  //     nom_fam: "JOSEFINA",
  //     ape_fam: "!11111",
  //     genero: "FEMENINO",
  //     nom_parentesco: "HIJO/A",
  //     anios: 46,
  //     csctbfamiliaid: 431,
  //   },
  //   {
  //     nom_fam: "ADRIAN",
  //     ape_fam: "!11111",
  //     genero: "FEMENINO",
  //     nom_parentesco: "NIETO/A",
  //     anios: 46,
  //     csctbfamiliaid: 432,
  //   },
  //   {
  //     nom_fam: "BLADIMIR",
  //     ape_fam: "!11111",
  //     genero: "MASCULINO",
  //     nom_parentesco: "YERNO",
  //     anios: 46,
  //     csctbfamiliaid: 433,
  //   },
  // ]);
  return (
    <div>
      {familiarEtiquetado.length > 0 ? (
        <Genogram Genogram={familiarEtiquetado} />
      ) : (
        <div className="w-100 vh-100 align-items-center d-flex justify-content-center">
          <div className="text-center d-flex flex-column">
            <center>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div>Cargando Genograma</div>
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostrarGenograma;
