import { apiClient, pageQuery, type PageResponse } from "@/shared/api";

export type ApiSupplier = {
  id: string;
  name: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  taxId: string | null;
  city: string | null;
  address: string | null;
  notes: string | null;
  active: boolean;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSupplierPayload = {
  name: string;
  contactName?: string;
  phone?: string;
  email?: string;
  taxId?: string;
  city?: string;
  address?: string;
  notes?: string;
};

export type UpdateSupplierPayload = CreateSupplierPayload & {
  active: boolean;
};

export async function listSuppliers(page = 0, size = 100) {
  return apiClient.get<PageResponse<ApiSupplier>>(
    `/suppliers?${pageQuery(page, size, "name,asc")}`,
  );
}

export async function createSupplier(payload: CreateSupplierPayload) {
  return apiClient.post<ApiSupplier>("/suppliers", payload);
}

export async function updateSupplier(id: string, payload: UpdateSupplierPayload) {
  return apiClient.put<ApiSupplier>(`/suppliers/${id}`, payload);
}

export async function deleteSupplier(id: string) {
  return apiClient.delete<void>(`/suppliers/${id}`);
}
