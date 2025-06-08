import axios from "axios";

const instance = axios.create({
 baseURL: "/api", // relativo al mismo dominio
  withCredentials: true,
});

export default instance;