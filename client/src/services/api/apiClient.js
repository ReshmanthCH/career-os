import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  timeout: 30000, // 30 seconds default
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach appropriate JWT token
apiClient.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");

    // If calling admin APIs (/admin/...), prioritize adminToken
    if (config.url && (config.url.includes("/admin") || config.url.startsWith("admin"))) {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      } else if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    } else {
      // Standard student API routes
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 unauthorized errors automatically
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If student endpoint failed 401, clear student token
      if (error.config && !error.config.url?.includes("/admin")) {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;