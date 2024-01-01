import {
  getEvaluacionRiesgos,
  getFamiliarEvaluacionRiesgoById,
  getFamiliarRiesgoById,
  saveEvaluarRiesgo,
} from "@/app/action";
import Riesgos from "./riesgos";

async function IndexRiesgos({ data, id_familia }) {
  // const result = await getVacunas(16);
  const evaluacionRiesgos = await getEvaluacionRiesgos();
  const [familiarRiesgos] = await getFamiliarRiesgoById(id_familia);
  const familiaEvaluacionRiesgos = await getFamiliarEvaluacionRiesgoById(
    id_familia
  );
  return (
    <div className="container-fluid">
      <Riesgos
        data={data}
        familiarRiesgos={familiarRiesgos}
        evaluacionRiesgos={evaluacionRiesgos}
        saveEvaluarRiesgos={saveEvaluarRiesgo}
        familiaEvaluacionRiesgos={familiaEvaluacionRiesgos}
      ></Riesgos>
    </div>
  );
}
export default IndexRiesgos;
