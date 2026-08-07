import apiClient from "./api/apiClient";

export const submitUserFeedback = async (payload) => {
  const response = await apiClient.post("/feedback", payload);
  return response.data;
};
