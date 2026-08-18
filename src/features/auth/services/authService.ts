import { apiClient } from "@/shared/api";

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/login", credentials, {
    auth: false,
  });
}

export async function register(
  payload: RegisterRequest,
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/register", payload, {
    auth: false,
  });
}
