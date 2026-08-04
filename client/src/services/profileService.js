import apiClient from "./api/apiClient";

export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

export const submitOnboarding = async (onboardingData) => {
  const response = await apiClient.post("/onboarding", onboardingData);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await apiClient.put("/profile", profileData);
  return response.data;
};
