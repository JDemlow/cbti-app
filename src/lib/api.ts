// src/lib/api.ts

import { getAuthToken, clearAuthToken } from "./auth";

// Define base API URL based on environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Generic API error response type
interface ApiErrorResponse {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

/**
 * Core API client for making requests to the backend
 */
export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, requireAuth = true } = options;

  // Build request URL
  const url = `${API_BASE_URL}${endpoint}`;

  // Prepare headers with content type for JSON
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Add authentication token if required
  if (requireAuth) {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required");
    }
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Build request configuration
  const config: RequestInit = {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, config);

    // Handle potential JSON parsing errors
    let data: T | ApiErrorResponse | string;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = (await response.json()) as T | ApiErrorResponse;
    } else {
      data = await response.text();
    }

    // Handle API error responses
    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        // Clear expired tokens on auth errors
        clearAuthToken();

        // You could redirect to login here or handle in the component
        throw new Error("Authentication failed");
      }

      // Format error based on API response structure
      const errorData = data as ApiErrorResponse;
      const errorMessage =
        typeof errorData === "object" && errorData !== null
          ? errorData.detail || errorData.message || "An unknown error occurred"
          : String(data);
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error) {
    // Rethrow with enhanced context
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("Failed to fetch data from API");
  }
}

/**
 * Convenience methods for common HTTP operations
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<ApiOptions, "method" | "body">) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Omit<ApiOptions, "method">
  ) => apiClient<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: Omit<ApiOptions, "method">
  ) => apiClient<T>(endpoint, { ...options, method: "PUT", body }),

  delete: <T>(endpoint: string, options?: Omit<ApiOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
