import apiClient from "./api/apiClient";

export const analyzeDSAWithAI = async () => {
  const response = await apiClient.post("/ai/dsa/analyze", {}, {
    timeout: 60000, // 60s timeout for Gemini reasoning
  });
  return response.data;
};

export const getDSAAIReport = async () => {
  const response = await apiClient.get("/ai/dsa/report");
  return response.data;
};

export const sendDSAChatMessage = async (message) => {
  const response = await apiClient.post("/ai/dsa/chat", { message }, {
    timeout: 60000,
  });
  return response.data;
};

export const getDSAChatHistory = async () => {
  const response = await apiClient.get("/ai/dsa/chat");
  return response.data;
};

export const clearDSAChatHistory = async () => {
  const response = await apiClient.delete("/ai/dsa/chat");
  return response.data;
};
