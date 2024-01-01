import {
  getRiesgosAmbientales,
  getRiesgosSocioeconomicos,
  getRiesgosBiologicos,
  getFamiliaRiesgosBiologicosById,
  getFamiliaRiesgosSocioeconomicosById,
  getFamiliaRiesgosAmbientalById,
} from "@/app/action";
import Biologico from "./biologicos";

async function IndexBiologicos({ data , id_familia}) {
  // const result = await getVacunas(16);
  const riesgosBiologicosById = await getFamiliaRiesgosBiologicosById(id_familia);
  const riesgosSocioeconomicosById  = await getFamiliaRiesgosSocioeconomicosById(id_familia);
  const riesgosAmbientalesById = await getFamiliaRiesgosAmbientalById(id_familia);
  return (
    <div className="container-fluid">
      <Biologico
        data={data}
        biologicos={getRiesgosBiologicos}
        socioeconomicos={getRiesgosSocioeconomicos}
        ambientales={getRiesgosAmbientales}
        riesgosAmbientalesById={riesgosAmbientalesById}
        riesgosSocioeconomicosById={riesgosSocioeconomicosById}
        riesgosBiologicosById={riesgosBiologicosById}
      ></Biologico>
    </div>
  );
}
export default IndexBiologicos;
