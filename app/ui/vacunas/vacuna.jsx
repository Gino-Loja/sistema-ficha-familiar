import {
  getFamiliaEnfermedadById,
  getFamiliaVacunaById,
  getVacunas,
  searchEnfermedades,
} from "@/app/action";
import CheckVacuna from "./checkVacuna";
async function Vacuna({ params, id_familia, data }) {
  // const result = await getVacunas(16);
  const enfermedades = await searchEnfermedades(params.query);
  const familiarVacuna = await getFamiliaVacunaById(id_familia);
  const familiarEnfermedad = await getFamiliaEnfermedadById(id_familia);
  return (
    <div className="container-fluid">
      <CheckVacuna
        familiarVacuna={familiarVacuna}
        enfermedades={enfermedades}
        vacunas={getVacunas}
        data={data}
        familiarEnfermedad={familiarEnfermedad}
      ></CheckVacuna>
    </div>
  );
}
export default Vacuna;
