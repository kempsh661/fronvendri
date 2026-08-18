import { API_BASE_URL } from "./config";
import { ApiError, type ApiErrorBody } from "./errors";
import { clearSession, getAccessToken } from "./tokenStorage";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
  auth?: boolean;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

async function parseErrorBody(response: Response): Promise<ApiErrorBody | null> {
  try {
    return (await response.json()) as ApiErrorBody;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    token,
    auth = true,
    headers: customHeaders,
    signal,
  } = options;

  const headers = new Headers(customHeaders);
  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const accessToken = token === undefined ? getAccessToken() : token;
  if (auth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (response.status === 401 && auth) {
    clearSession();
  }

  if (!response.ok) {
    const errorBody = await parseErrorBody(response);
    throw new ApiError(
      response.status,
      errorBody?.message || response.statusText || "Error de API",
      errorBody,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("Content-Type") ?? "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),

  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiRequest<T>(path, { ...options, method: "POST", body }),

  put: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiRequest<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => apiRequest<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
