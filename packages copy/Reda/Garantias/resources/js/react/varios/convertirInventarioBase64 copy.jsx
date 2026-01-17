import { convertirUrlArchivo } from "../varios";

export const convertirInventarioBase64 = async (archivosInventarioBase64, archivosInventarioObjeto, archivosInventarioRef) => {
  if (archivosInventarioBase64 != null && archivosInventarioBase64 != '')
  {
    var archivosConvertidos = [];
    for (let i = 0; i < archivosInventarioBase64.length; i++) 
    {
      await convertirUrlArchivo(archivosInventarioBase64[i].nombreArchivo, archivosInventarioBase64[i].extensionArchivo, archivosInventarioBase64[i].archivoBase64, archivosInventarioObjeto);
      archivosConvertidos.push({file : archivosInventarioObjeto.current}); 
    }
    archivosInventarioRef.current = archivosConvertidos;
  }
  return;
}