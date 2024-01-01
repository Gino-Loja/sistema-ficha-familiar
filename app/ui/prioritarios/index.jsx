import { getFamiliaPrioritarioById, getFamiliaVulnerableById, getPrioritarios, getVulnerables } from "@/app/action";
import Prioritario from "./prioritarios";

async function IndexPrioritarios({ id_familia ,data}) {
  const vulnerables = await getVulnerables();
  const prioritarios = await getPrioritarios();
  const familiaPrioritarios = await getFamiliaPrioritarioById(id_familia)
  const familiaVulnerable = await getFamiliaVulnerableById(id_familia)
  //const result = await getVacunas(16);
  //const evaluacionRiesgos = await getEvaluacionRiesgos();
  return (
    <Prioritario
      vulnerables={vulnerables}
      prioritarios={prioritarios}
      familiaPrioritarios={familiaPrioritarios}
      familiaVulnerable={familiaVulnerable}
      data={data}
    ></Prioritario>
  );
}
export default IndexPrioritarios;
