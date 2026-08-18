import { apiClient, pageQuery, type PageResponse } from "@/shared/api";

export type ApiClient = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  address: string | null;
  notes: string | null;
  active: boolean;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateClientPayload = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  address?: string;
  notes?: string;
};

export type UpdateClientPayload = CreateClientPayload & {
  active: boolean;
};

export async function listClients(page = 0, size = 100) {
  return apiClient.get<PageResponse<ApiClient>>(
    `/clients?${pageQuery(page, size, "name,asc")}`,
  );
}

export async function createClient(payload: CreateClientPayload) {
  return apiClient.post<ApiClient>("/clients", payload);
}

export async function updateClient(id: string, payload: UpdateClientPayload) {
  return apiClient.put<ApiClient>(`/clients/${id}`, payload);
}

export async function deleteClient(id: string) {
  return apiClient.delete<void>(`/clients/${id}`);
}
