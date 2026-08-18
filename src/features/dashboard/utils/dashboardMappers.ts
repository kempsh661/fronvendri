import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import type { ApiDashboardSummary } from "../services/dashboardService";
import type {
  OrderStatus,
  QuickSummaryItem,
  SummaryCardData,
  TopProduct,
} from "../types/dashboard.types";

const topAccents = ["primary", "warning", "success", "info"] as const;

export function buildSummaryCards(
  summary: ApiDashboardSummary,
): SummaryCardData[] {
  return [
    {
      id: "orders",
      label: "Pedidos hoy",
      value: String(summary.ordersToday),
      accent: "primary",
    },
    {
      id: "sales",
      label: "Ventas hoy",
      value: formatCurrencyCOP(Number(summary.salesTodayAmount)),
      accent: "success",
    },
    {
      id: "clients",
      label: "Clientes",
      value: String(summary.activeClients),
      accent: "warning",
    },
    {
      id: "products",
      label: "Productos",
      value: String(summary.activeProducts),
      accent: "info",
      action: {
        label: "Ver productos",
        href: "/products",
      },
    },
  ];
}

export function buildQuickSummary(
  summary: ApiDashboardSummary,
): QuickSummaryItem[] {
  return [
    {
      id: "month-sales",
      label: "Ventas de hoy",
      value: formatCurrencyCOP(Number(summary.salesTodayAmount)),
      accent: "success",
    },
    {
      id: "month-orders",
      label: "Pedidos de hoy",
      value: String(summary.ordersToday),
      accent: "primary",
    },
    {
      id: "month-clients",
      label: "Clientes activos",
      value: String(summary.activeClients),
      accent: "warning",
    },
    {
      id: "month-profit",
      label: "Stock bajo",
      value: String(summary.lowStockProducts),
      accent: "info",
    },
  ];
}

export function buildTopProducts(
  summary: ApiDashboardSummary,
  priceByProductId: Record<string, number> = {},
): TopProduct[] {
  return (summary.topProducts ?? []).slice(0, 4).map((product, index) => ({
    id: product.productId,
    rank: index + 1,
    name: product.productName,
    salesCount: Number(product.quantitySold),
    price: priceByProductId[product.productId] ?? 0,
    accent: topAccents[index % topAccents.length],
  }));
}

export function mapApiStatusToDashboard(
  status: string,
): OrderStatus | null {
  switch (status) {
    case "PENDING":
      return "pending";
    case "CONFIRMED":
      return "confirmed";
    case "COMPLETED":
      return "delivered";
    default:
      return null;
  }
}

export function formatTimeAgo(isoDate: string): string {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.floor(diffMs / 60_000));
  if (minutes < 60) {
    return `Hace ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Hace ${hours}h`;
  }
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
