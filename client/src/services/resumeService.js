import apiClient from "./api/apiClient";

export const uploadResume = async (formData) => {
  const response = await apiClient.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60000, // 60s timeout for AI text extraction + Gemini API
  });
  return response.data;
};

export const getResume = async () => {
  const response = await apiClient.get("/resume");
  return response.data;
};

export const runAIAnalysis = async () => {
  const response = await apiClient.post("/resume/ai-analyze", {}, {
    timeout: 60000, // 60s timeout for Gemini AI analysis
  });
  return response.data;
};

export const getResumeReport = async (id) => {
  const response = await apiClient.get(`/resume/report/${id}`);
  return response.data;
};

export const reanalyzeResume = async (id) => {
  const response = await apiClient.post(`/resume/reanalyze/${id}`, {}, {
    timeout: 60000, // 60s timeout for Gemini AI re-analysis
  });
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await apiClient.delete(`/resume/${id}`);
  return response.data;
};
