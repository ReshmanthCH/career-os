import apiClient from "./api/apiClient";

export const getConnectedPlatforms = async () => {
  const response = await apiClient.get("/integrations");
  return response.data;
};

export const connectPlatform = async (platform, username) => {
  const response = await apiClient.post(`/integrations/${platform}/connect`, { username });
  return response.data;
};

export const disconnectPlatform = async (platform) => {
  const response = await apiClient.delete(`/integrations/${platform}`);
  return response.data;
};

export const syncPlatform = async (platform) => {
  const response = await apiClient.post(`/integrations/${platform}/sync`);
  return response.data;
};

export const syncAllPlatforms = async () => {
  const response = await apiClient.post("/integrations/sync-all");
  return response.data;
};

export const getSyncHistory = async () => {
  const response = await apiClient.get("/integrations/history");
  return response.data;
};
