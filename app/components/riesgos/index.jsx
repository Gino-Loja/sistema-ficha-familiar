import { getEvaluacionRiesgos , saveEvaluarRiesgo} from "@/app/action";
import Riesgos from "./riesgos";

async function IndexRiesgos({ params }) {
  // const result = await getVacunas(16);
  const evaluacionRiesgos = await getEvaluacionRiesgos();
  return (
    <div className="container-fluid">
      <Riesgos evaluacionRiesgos={evaluacionRiesgos} saveEvaluarRiesgos={saveEvaluarRiesgo}></Riesgos>
    </div>
  );
}
export default IndexRiesgos;
