import {
  getFamiliaEmbarazadaById,
  getRiesgosObstetricos,
  insertEmbarazadaAndRiesgoObstetricos,
  getFamiliaEmbarazadaRiesgoById
} from "@/app/action";
import Embarazada from "./embarazada";

async function IndexEmbarazada({ data, id_familia }) {
  // const result = await getVacunas(16);
  const [embarazadaById] = data.embarazo
    ? await getFamiliaEmbarazadaById(id_familia)
    : [];
  const riesgosEmbarazo = data.embarazo
  ? await getFamiliaEmbarazadaRiesgoById(embarazadaById.csctbembarazadasid)
  : [];
  return (
    <div className="container-fluid">
      <Embarazada
        data={data}
        riesgoObstetrico={getRiesgosObstetricos}
        insertEmbarazadaAndRiesgoObstetricos={
          insertEmbarazadaAndRiesgoObstetricos
        }
        embarazadaById={embarazadaById}
        riesgosEmbarazo={riesgosEmbarazo}
      ></Embarazada>
    </div>
  );
}
export default IndexEmbarazada;
