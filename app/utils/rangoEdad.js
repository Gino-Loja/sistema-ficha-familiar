export const obtenerCsctbedadesid = (anios, meses, dias) => {
  let edadEnDias = anios * 365 + meses * 30 + dias; // Aproximación, ten en cuenta que no todos los años tienen la misma cantidad de días
  let csctbedadesid;

  if (edadEnDias >= 0 && edadEnDias <= 28) {
    csctbedadesid = 1;
  } else if (edadEnDias >= 29 && edadEnDias <= 330) {
    csctbedadesid = 2;
  } else if (edadEnDias <= 365) {
    csctbedadesid = 8;
  } else if (edadEnDias >= 365 && edadEnDias <= 690) {
    csctbedadesid = 9;
  } else if (edadEnDias >= 691 && edadEnDias <= 1095) {
    csctbedadesid = 10;
  } else if (edadEnDias >= 1096 && edadEnDias <= 1825) {
    csctbedadesid = 11;
  } else if (edadEnDias >= 1826 && edadEnDias <= 2185) {
    csctbedadesid = 12;
  } else if (edadEnDias >= 3286 && edadEnDias <= 3644) {
    csctbedadesid = 13;
  } else if (edadEnDias >= 5475 && edadEnDias <= 5840) {
    csctbedadesid = 14;
  } else {
    csctbedadesid = 15;
  }
  console.log(csctbedadesid);

  return csctbedadesid;
};

export const obtenerCsctbedadesidRiesgos = (anios, meses, dias) => {
  let edadEnDias = anios * 365 + meses * 30 + dias; // Aproximación, ten en cuenta que no todos los años tienen la misma cantidad de días
  let csctbedadesid;

  if (edadEnDias >= 0 && edadEnDias <= 28) {
    csctbedadesid = 1;
  } else if (edadEnDias >= 29 && edadEnDias <= 330) {
    csctbedadesid = 2;
  } else if (edadEnDias >= 365 && edadEnDias <= 1825) {
    csctbedadesid = 3;
  } else if (edadEnDias >= 1826 && edadEnDias <= 3650) {
    csctbedadesid = 4;
  } else if (edadEnDias >= 3651 && edadEnDias <= 7300) {
    csctbedadesid = 5;
  } else if (edadEnDias >= 7301 && edadEnDias <= 23360) {
    csctbedadesid = 6;
  } else if (edadEnDias >= 23361) {
    csctbedadesid = 7;
  }

  return csctbedadesid;
};
