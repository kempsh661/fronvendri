import { apiClient } from "@/shared/api";

export type ApiTopProduct = {
  productId: string;
  productName: string;
  quantitySold: number;
};

export type ApiDashboardSummary = {
  ordersToday: number;
  salesTodayAmount: number;
  activeClients: number;
  activeProducts: number;
  lowStockProducts: number;
  topProducts: ApiTopProduct[];
};

export async function getDashboardSummary() {
  return apiClient.get<ApiDashboardSummary>("/dashboard/summary");
}
