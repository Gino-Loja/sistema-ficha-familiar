import {
  getRiesgosAmbientales,
  getRiesgosSocioeconomicos,
  getRiesgosBiologicos,
} from "@/app/action";
import Biologico from "./biologicos";

async function IndexBiologicos({ params }) {
  // const result = await getVacunas(16);

  return (
    <div className="container-fluid">
      <Biologico
        biologicos={getRiesgosBiologicos}
        socioeconomicos={getRiesgosSocioeconomicos}
        ambientales={getRiesgosAmbientales}
      ></Biologico>
    </div>
  );
}
export default IndexBiologicos;
