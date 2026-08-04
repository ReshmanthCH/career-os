import apiClient from "./api/apiClient";

export const generateCompanyAIAnalysis = async (companyId) => {
  const response = await apiClient.post("/company-ai/readiness", { companyId }, {
    timeout: 60000,
  });
  return response.data;
};

export const getCompanyAIReport = async (companyId) => {
  const response = await apiClient.get(`/company-ai/report/${companyId}`);
  return response.data;
};

export const compareCompaniesAI = async (companyIds = []) => {
  const response = await apiClient.post("/company-ai/compare", { companyIds }, {
    timeout: 60000,
  });
  return response.data;
};

export const getCompanyAIHistory = async () => {
  const response = await apiClient.get("/company-ai/history");
  return response.data;
};
