import apiClient from "./api/apiClient";

export const sendOTP = async (email, purpose = "REGISTER") => {
  const response = await apiClient.post("/auth/send-otp", { email, purpose });
  return response.data;
};

export const verifyOTP = async (email, otp, purpose = "REGISTER") => {
  const response = await apiClient.post("/auth/verify-otp", { email, otp, purpose });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};