import axios, { AxiosInstance } from "axios";

export const useApiClient = (): { apiClient: AxiosInstance } => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  return { apiClient };
};
