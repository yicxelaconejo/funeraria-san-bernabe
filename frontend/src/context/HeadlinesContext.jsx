import { createContext, useContext, useState, useCallback } from "react";
import {
  createHeadlines,
  getHeadlines,
  deleteHeadlines,
  getHeadlinesId,
  updateHeadlines,
} from "../api/headline";
import axios from "../api/axios";
import { getAfiliadosByTitular } from "../api/afiliado"; // Función para afiliados

const HeadlineContext = createContext();

export const useHeadline = () => {
  const context = useContext(HeadlineContext);
  if (!context) throw new Error("no hay titular");
  return context;
};

export function HeadlineProvider({ children }) {
  const [headlines, setheadlines] = useState([]);
  const [afiliados, setAfiliados] = useState([]); // Estado para afiliados

  const getHeadline = async () => {
    try {
      const res = await getHeadlines();
      setheadlines(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function createHeadline(data) {
    const res = await axios.post("/headlines", data);
    return res.data;
  }

  const deleteHeadline = async (id) => {
    try {
      const res = await deleteHeadlines(id);
      if (res.status === 204) {
        setheadlines(headlines.filter((headline) => headline._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHeadlineid = async (id) => {
    try {
      const res = await getHeadlinesId(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateHeadlineId = async (id, headline) => {
    try {
      await updateHeadlines(id, headline);
    } catch (error) {
      console.error(error);
    }
  };

  // Memoizamos esta función para evitar que cambie y cause re-render infinito
  const getAfiliados = useCallback(async (titularId) => {
    try {
      const res = await getAfiliadosByTitular(titularId);
      setAfiliados(res.data);
    } catch (error) {
      console.error("Error al obtener afiliados:", error);
    }
  }, []);

  const toggleEstadoTitular = async (id) => {
    try {
      const response = await axios.put(`/headlines/${id}/estado`);
      return response.data;
    } catch (error) {
      console.error("Error al cambiar estado del titular:", error);
      return null;
    }
  };

  return (
    <HeadlineContext.Provider
      value={{
        headlines,
        createHeadline,
        getHeadline,
        deleteHeadline,
        getHeadlineid,
        updateHeadlineId,
        toggleEstadoTitular,
        afiliados,
        getAfiliados, // función memoizada aquí
      }}
    >
      {children}
    </HeadlineContext.Provider>
  );
}
