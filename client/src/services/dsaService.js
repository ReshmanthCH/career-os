import apiClient from "./api/apiClient";

export const getDSAProblems = async (params = {}) => {
  const response = await apiClient.get("/dsa", { params });
  return response.data;
};

export const getDSAAnalytics = async () => {
  const response = await apiClient.get("/dsa/analytics");
  return response.data;
};

export const getDSAProblemById = async (id) => {
  const response = await apiClient.get(`/dsa/${id}`);
  return response.data;
};

export const createDSAProblem = async (data) => {
  const response = await apiClient.post("/dsa", data);
  return response.data;
};

export const updateDSAProblem = async (id, data) => {
  const response = await apiClient.put(`/dsa/${id}`, data);
  return response.data;
};

export const deleteDSAProblem = async (id) => {
  const response = await apiClient.delete(`/dsa/${id}`);
  return response.data;
};

export const reviseDSAProblem = async (id) => {
  const response = await apiClient.post(`/dsa/revise/${id}`);
  return response.data;
};
