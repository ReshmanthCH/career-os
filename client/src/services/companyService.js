import apiClient from "./api/apiClient";

export const getCompanies = async (params = {}) => {
  const response = await apiClient.get("/companies", { params });
  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await apiClient.get(`/companies/${id}`);
  return response.data;
};

export const getBookmarkedCompanies = async () => {
  const response = await apiClient.get("/companies/bookmarks");
  return response.data;
};

export const addCompanyBookmark = async (id) => {
  const response = await apiClient.post(`/companies/bookmarks/${id}`);
  return response.data;
};

export const removeCompanyBookmark = async (id) => {
  const response = await apiClient.delete(`/companies/bookmarks/${id}`);
  return response.data;
};

export const compareCompanies = async (companyIds = []) => {
  const idsQuery = companyIds.join(",");
  const response = await apiClient.get(`/companies/compare?ids=${idsQuery}`);
  return response.data;
};
