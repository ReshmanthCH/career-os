import apiClient from "./api/apiClient";

export const sendCopilotChatMessage = async (message, conversationId = null) => {
  const response = await apiClient.post("/copilot/chat", { message, conversationId });
  return response.data;
};

export const generateCopilotCareerAnalysis = async () => {
  const response = await apiClient.post("/copilot/career-analysis");
  return response.data;
};

export const getCopilotCareerAnalysis = async () => {
  const response = await apiClient.get("/copilot/career-analysis");
  return response.data;
};

export const generateCopilotRoadmap = async () => {
  const response = await apiClient.post("/copilot/roadmap");
  return response.data;
};

export const getCopilotRoadmap = async () => {
  const response = await apiClient.get("/copilot/roadmap");
  return response.data;
};

export const generateCopilotRecommendations = async () => {
  const response = await apiClient.post("/copilot/recommendations");
  return response.data;
};

export const getCopilotRecommendations = async () => {
  const response = await apiClient.get("/copilot/recommendations");
  return response.data;
};

export const getCopilotHistory = async () => {
  const response = await apiClient.get("/copilot/history");
  return response.data;
};

export const getCopilotHistoryById = async (id) => {
  const response = await apiClient.get(`/copilot/history/${id}`);
  return response.data;
};

export const deleteCopilotHistory = async (id) => {
  const response = await apiClient.delete(`/copilot/history/${id}`);
  return response.data;
};

export const togglePinCopilotHistory = async (id) => {
  const response = await apiClient.post(`/copilot/pin/${id}`);
  return response.data;
};
