import {
  getFamiliaEmbarazadaById,
  getRiesgosObstetricos,
  insertEmbarazadaAndRiesgoObstetricos,
  getFamiliaEmbarazadaRiesgoById,
} from "@/app/action";
import Embarazada from "./embarazada";

async function IndexEmbarazada({ data, id_familia }) {
  //console.log(data);
  // const result = await getVacunas(16);
  const [embarazadaById] = await getFamiliaEmbarazadaById(id_familia);
  //console.log(embarazadaById)

  const riesgosEmbarazo = await  getFamiliaEmbarazadaRiesgoById(embarazadaById.csctbembarazadasid)
   
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
