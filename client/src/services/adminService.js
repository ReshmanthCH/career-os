import apiClient from "./api/apiClient";

export const adminLogin = async (credentials) => {
  const response = await apiClient.post("/admin/login", credentials);
  return response.data;
};

export const getAdminStats = async () => {
  const token = localStorage.getItem("adminToken");
  const response = await apiClient.get("/admin/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAdminUsers = async (search = "") => {
  const token = localStorage.getItem("adminToken");
  const response = await apiClient.get("/admin/users", {
    params: { search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
