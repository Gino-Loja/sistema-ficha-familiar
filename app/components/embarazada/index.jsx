import {
  getRiesgosObstetricos,
  insertEmbarazadaAndRiesgoObstetricos,
} from "@/app/action";
import Embarazada from "./embarazada";

async function IndexEmbarazada({ params }) {
  // const result = await getVacunas(16);

  return (
    <div className="container-fluid">
      <Embarazada
        riesgoObstetrico={getRiesgosObstetricos}
        insertEmbarazadaAndRiesgoObstetricos={
          insertEmbarazadaAndRiesgoObstetricos
        }
      ></Embarazada>
    </div>
  );
}
export default IndexEmbarazada;
