export const obetnerIdsAndMerge = (text, listaIds, id_familia) => {
  for (const id of listaIds) {
    text += `(${id}, ${id_familia}),`;
  }
  text = text.slice(0, -1);
  return text;
};
