import axios from "./axios";

// Obtener todos los afiliados
export const getAffiliates = () => axios.get("/afiliados");

// Obtener un afiliado por ID
export const getAffiliateById = (id) => axios.get(`/afiliados/${id}`);

// Crear un nuevo afiliado
export const createAffiliate = (affiliate) => axios.post("/afiliados", affiliate);

// Actualizar un afiliado por ID
export const updateAffiliate = (id, affiliate) =>
  axios.put(`/afiliados/${id}`, affiliate);

// Cambiar el estado (activar/desactivar) de un afiliado
export const deleteAffiliate = (id) => axios.delete(`/afiliados/${id}`);


export const getAfiliadosByTitular = (id) => 
  axios.get(`/titulares/${id}/afiliados`);

export const deleteAfiliado = (id) => axios.delete(`/afiliados/${id}`);