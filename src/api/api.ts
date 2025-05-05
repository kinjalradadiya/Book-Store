// Base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Supported HTTP methods
type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

//   Core request function for API handling
//   @param method HTTP method to use (GET, POST, etc.)
//  @endpoint API endpoint to call (without base URL)
//   @data Optional data to send with request
//   @returns Promise with response data of type T
//   @throws Error if request fails

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  data?: unknown
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `API Error: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    console.error(`[API ERROR] ${method} ${endpoint}:`, error.message);
    throw error;
  }
}
// API helper object with common HTTP methods
export const api = {
  get: <T>(endpoint: string) => request<T>("GET", endpoint),
  post: <T>(endpoint: string, data: unknown) =>
    request<T>("POST", endpoint, data),
  delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
};
