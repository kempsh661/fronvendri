import { apiClient, pageQuery, type PageResponse } from "@/shared/api";

export type ApiProduct = {
  id: string;
  name: string;
  description: string | null;
  sku: string | null;
  price: number;
  stock: number;
  imageKey: string | null;
  active: boolean;
  categoryId: string;
  categoryName: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductPayload = {
  name: string;
  description?: string;
  sku?: string;
  price: number;
  stock: number;
  imageKey?: string;
  categoryId: string;
};

export type UpdateProductPayload = CreateProductPayload & {
  active: boolean;
};

export async function listProducts(page = 0, size = 100) {
  return apiClient.get<PageResponse<ApiProduct>>(
    `/products?${pageQuery(page, size, "name,asc")}`,
  );
}

export async function createProduct(payload: CreateProductPayload) {
  return apiClient.post<ApiProduct>("/products", payload);
}

export async function updateProduct(id: string, payload: UpdateProductPayload) {
  return apiClient.put<ApiProduct>(`/products/${id}`, payload);
}

export async function deleteProduct(id: string) {
  return apiClient.delete<void>(`/products/${id}`);
}
