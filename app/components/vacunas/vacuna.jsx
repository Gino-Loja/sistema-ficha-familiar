import { getVacunas, searchEnfermedades } from "@/app/action";
import CheckVacuna from "./checkVacuna";
async function Vacuna({ params }) {
 // const result = await getVacunas(16);
  const enfermedades = await searchEnfermedades(params.query);
  
  return (
    <div className="container-fluid">
      <CheckVacuna enfermedades={enfermedades} vacunas={getVacunas}></CheckVacuna>
    </div>
  );
}
export default Vacuna;
