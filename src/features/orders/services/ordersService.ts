import { apiClient, pageQuery, type PageResponse } from "@/shared/api";

export type ApiOrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type ApiOrderItem = {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type ApiOrder = {
  id: string;
  orderNumber: string;
  status: ApiOrderStatus;
  notes: string | null;
  totalAmount: number;
  clientId: string;
  clientName: string;
  companyId: string;
  items: ApiOrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderPayload = {
  clientId: string;
  notes?: string;
  items: Array<{ productId: string; quantity: number }>;
};

export async function listOrders(page = 0, size = 100, status?: ApiOrderStatus) {
  const query = pageQuery(page, size, "createdAt,desc");
  const statusParam = status ? `&status=${status}` : "";
  return apiClient.get<PageResponse<ApiOrder>>(
    `/orders?${query}${statusParam}`,
  );
}

export async function createOrder(payload: CreateOrderPayload) {
  return apiClient.post<ApiOrder>("/orders", payload);
}

export async function updateOrderStatus(id: string, status: ApiOrderStatus) {
  return apiClient.patch<ApiOrder>(`/orders/${id}/status`, { status });
}

export async function deleteOrder(id: string) {
  return apiClient.delete<void>(`/orders/${id}`);
}
