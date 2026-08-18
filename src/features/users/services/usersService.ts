import { apiClient, pageQuery, type PageResponse } from "@/shared/api";
import type { UserRole } from "@/shared/auth/roles";

export type ApiUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  active: boolean;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserPayload = {
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
};

export type UpdateUserPayload = {
  fullName: string;
  role: "ADMIN" | "STAFF" | "OWNER";
  active: boolean;
  password?: string;
};

export async function listUsers(page = 0, size = 100) {
  return apiClient.get<PageResponse<ApiUser>>(
    `/users?${pageQuery(page, size, "fullName,asc")}`,
  );
}

export async function createUser(payload: CreateUserPayload) {
  return apiClient.post<ApiUser>("/users", payload);
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  return apiClient.put<ApiUser>(`/users/${id}`, payload);
}

export async function deleteUser(id: string) {
  return apiClient.delete<void>(`/users/${id}`);
}
