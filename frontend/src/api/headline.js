import axios from "./axios";

export const getHeadlines = () => axios.get(`/headlines`);

export const getHeadlinesId = (id) => axios.get(`/headlines/${id}`);

export const createHeadlines = (headline) => axios.post(`/headlines`, headline);

export const updateHeadlines = (id, headline) =>
  axios.put(`/headlines/${id}`, headline);

export const deleteHeadlines = (id) => axios.delete(`/headlines/${id}`);
