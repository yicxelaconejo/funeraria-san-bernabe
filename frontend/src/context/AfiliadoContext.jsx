import { createContext, useContext, useState } from "react";
import {
  createAffiliate,
  getAffiliates,
  getAffiliateById,
  updateAffiliate,
} from "../api/afiliado";

// Creamos el contexto
const AfiliadoContext = createContext();

// Hook para consumir el contexto fácilmente
export const useAfiliado = () => {
  const context = useContext(AfiliadoContext);
  if (!context) throw new Error("No hay proveedor de afiliados");
  return context;
};

// Provider del contexto
export function AfiliadoProvider({ children }) {
  const [afiliados, setAfiliados] = useState([]);

  // Obtener todos los afiliados
  const getAfiliado = async () => {
    try {
      const res = await getAffiliates();
      setAfiliados(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Crear un afiliado
  const createAfiliado = async (afiliado) => {
    try {
      const res = await createAffiliate(afiliado);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener afiliado por ID
  const getAfiliadoId = async (id) => {
    try {
      const res = await getAffiliateById(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar afiliado
  const updateAfiliadoId = async (id, afiliado) => {
    try {
      await updateAffiliate(id, afiliado);
    } catch (error) {
      console.error(error);
    }
  };

//   // Activar o desactivar afiliado (según tu backend)
//   const cambiarEstadoAfiliado = async (id) => {
//     try {
//       const res = await toggleAffiliateEstado(id);
//       return res.data.afiliado; // depende cómo lo retorne tu backend
//     } catch (error) {
//       console.error("Error al cambiar estado del afiliado", error);
//     }
//   };

  return (
    <AfiliadoContext.Provider
      value={{
        getAfiliado,
        createAfiliado,
        getAfiliadoId,
        updateAfiliadoId,
      }}
    >
      {children}
    </AfiliadoContext.Provider>
  );
}
