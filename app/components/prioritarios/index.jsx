import { getPrioritarios, getVulnerables } from "@/app/action";
import Prioritario from "./prioritarios";

async function IndexPrioritarios({ params }) {
  const vulnerables = await getVulnerables();
  const prioritarios = await getPrioritarios();
  //const result = await getVacunas(16);
  //const evaluacionRiesgos = await getEvaluacionRiesgos();
  return (
    <Prioritario
      vulnerables={vulnerables}
      prioritarios={prioritarios}
    ></Prioritario>
  );
}
export default IndexPrioritarios;
