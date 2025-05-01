const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log;
type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

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

export const api = {
  get: <T>(endpoint: string) => request<T>("GET", endpoint),
  post: <T>(endpoint: string, data: unknown) =>
    request<T>("POST", endpoint, data),
  delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
};
