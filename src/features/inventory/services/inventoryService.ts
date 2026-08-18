import { apiClient, pageQuery, type PageResponse } from "@/shared/api";

export type ApiStockMovementType =
  | "IN"
  | "OUT"
  | "ADJUST"
  | "SALE"
  | "SALE_CANCEL";

export type ApiStockMovement = {
  id: string;
  productId: string;
  productName: string;
  type: ApiStockMovementType;
  quantity: number;
  stockBefore: number;
  stockAfter: number;
  reason: string | null;
  referenceId: string | null;
  supplierId: string | null;
  supplierName: string | null;
  createdAt: string;
};

export async function listMovements(page = 0, size = 50, productId?: string) {
  const query = pageQuery(page, size, "createdAt,desc");
  const productParam = productId ? `&productId=${productId}` : "";
  return apiClient.get<PageResponse<ApiStockMovement>>(
    `/inventory/movements?${query}${productParam}`,
  );
}

export async function registerIncoming(payload: {
  productId: string;
  quantity: number;
  supplierId?: string;
  reason?: string;
}) {
  return apiClient.post<ApiStockMovement>("/inventory/in", payload);
}

export async function registerOutgoing(payload: {
  productId: string;
  quantity: number;
  reason?: string;
}) {
  return apiClient.post<ApiStockMovement>("/inventory/out", payload);
}
