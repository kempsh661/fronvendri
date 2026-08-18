import { useEffect, useState } from "react";

import { seedDemoData } from "@/features/companies/services/companyService";
import { listOrders } from "@/features/orders/services/ordersService";
import { listProducts } from "@/features/products/services/productsService";
import { getApiErrorMessage } from "@/shared/api";

import {
  getDashboardSummary,
  type ApiDashboardSummary,
} from "../services/dashboardService";
import type {
  QuickSummaryItem,
  RecentOrder,
  SummaryCardData,
  TopProduct,
} from "../types/dashboard.types";
import {
  buildQuickSummary,
  buildSummaryCards,
  buildTopProducts,
  formatTimeAgo,
  getInitials,
  mapApiStatusToDashboard,
} from "../utils/dashboardMappers";

type DashboardData = {
  summaryCards: SummaryCardData[];
  quickSummary: QuickSummaryItem[];
  topProducts: TopProduct[];
  recentOrders: RecentOrder[];
  loading: boolean;
  error: string | null;
};

const emptySummary: ApiDashboardSummary = {
  ordersToday: 0,
  salesTodayAmount: 0,
  activeClients: 0,
  activeProducts: 0,
  lowStockProducts: 0,
  topProducts: [],
};

export function useDashboardData(): DashboardData {
  const [summaryCards, setSummaryCards] = useState<SummaryCardData[]>([]);
  const [quickSummary, setQuickSummary] = useState<QuickSummaryItem[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        await seedDemoData().catch(() => undefined);

        const [summary, ordersPage, productsPage] = await Promise.all([
          getDashboardSummary(),
          listOrders(0, 5),
          listProducts(0, 100),
        ]);

        if (cancelled) {
          return;
        }

        const priceByProductId = Object.fromEntries(
          productsPage.content.map((product) => [
            product.id,
            Number(product.price),
          ]),
        );

        setSummaryCards(buildSummaryCards(summary));
        setQuickSummary(buildQuickSummary(summary));
        setTopProducts(buildTopProducts(summary, priceByProductId));
        setRecentOrders(
          ordersPage.content
            .map((order) => {
              const status = mapApiStatusToDashboard(order.status);
              if (!status) {
                return null;
              }
              return {
                id: order.id,
                orderNumber: order.orderNumber.startsWith("#")
                  ? order.orderNumber
                  : `#${order.orderNumber}`,
                customerName: order.clientName,
                amount: Number(order.totalAmount),
                timeAgo: formatTimeAgo(order.createdAt),
                status,
                avatarInitials: getInitials(order.clientName),
              } satisfies RecentOrder;
            })
            .filter((order): order is RecentOrder => order !== null),
        );
      } catch (err) {
        if (!cancelled) {
          setSummaryCards(buildSummaryCards(emptySummary));
          setQuickSummary(buildQuickSummary(emptySummary));
          setTopProducts([]);
          setRecentOrders([]);
          setError(getApiErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    summaryCards,
    quickSummary,
    topProducts,
    recentOrders,
    loading,
    error,
  };
}
