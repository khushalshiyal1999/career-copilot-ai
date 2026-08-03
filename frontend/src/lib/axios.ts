import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { API_CONFIG } from "@/constants/config";
import type { ApiError } from "@/types/api";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const normalized: ApiError = {
      message:
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred",
      code: error.code,
      status: error.response?.status,
      details: error.response?.data?.details,
    };

    if (normalized.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }

    return Promise.reject(normalized);
  }
);
