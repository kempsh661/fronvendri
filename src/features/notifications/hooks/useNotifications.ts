import { useCallback, useEffect, useMemo, useState } from "react";

import { listOrders } from "@/features/orders/services/ordersService";
import { listProducts } from "@/features/products/services/productsService";
import { useAuth } from "@/shared/auth";

import type { AppNotification } from "../types/notifications.types";
import {
  loadReadNotificationIds,
  saveReadNotificationIds,
} from "../utils/readStorage";

const LOW_STOCK_THRESHOLD = 5;

export function useNotifications() {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<AppNotification[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setReadIds(new Set());
      return;
    }
    setReadIds(loadReadNotificationIds(user.id, user.companyId));
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setItems([]);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [ordersPage, productsPage] = await Promise.all([
          listOrders(0, 20),
          listProducts(0, 100),
        ]);

        if (cancelled) {
          return;
        }

        const notifications: AppNotification[] = [];

        for (const order of ordersPage.content) {
          if (order.status === "PENDING") {
            notifications.push({
              id: `order-pending-${order.id}`,
              type: "order_pending",
              title: "Pedido pendiente",
              message: `${order.orderNumber} · ${order.clientName}`,
              href: "/orders",
              createdAt: order.createdAt,
            });
          } else if (order.status === "CONFIRMED") {
            notifications.push({
              id: `order-confirmed-${order.id}`,
              type: "order_confirmed",
              title: "Pedido confirmado",
              message: `${order.orderNumber} · ${order.clientName}`,
              href: "/orders",
              createdAt: order.createdAt,
            });
          }
        }

        for (const product of productsPage.content) {
          if (product.active && product.stock <= LOW_STOCK_THRESHOLD) {
            notifications.push({
              id: `low-stock-${product.id}`,
              type: "low_stock",
              title: "Stock bajo",
              message: `${product.name} · ${product.stock} uds`,
              href: "/products",
              createdAt: product.updatedAt,
            });
          }
        }

        notifications.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setItems(notifications);
      } catch {
        if (!cancelled) {
          setItems([]);
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
  }, [isAuthenticated, user]);

  const unreadCount = useMemo(
    () => items.filter((item) => !readIds.has(item.id)).length,
    [items, readIds],
  );

  const markAllRead = useCallback(() => {
    if (!user || items.length === 0) {
      return;
    }
    const next = new Set(readIds);
    for (const item of items) {
      next.add(item.id);
    }
    setReadIds(next);
    saveReadNotificationIds(user.id, user.companyId, next);
  }, [items, readIds, user]);

  const markRead = useCallback(
    (id: string) => {
      if (!user) {
        return;
      }
      if (readIds.has(id)) {
        return;
      }
      const next = new Set(readIds);
      next.add(id);
      setReadIds(next);
      saveReadNotificationIds(user.id, user.companyId, next);
    },
    [readIds, user],
  );

  return {
    items,
    unreadCount,
    loading,
    isRead: (id: string) => readIds.has(id),
    markRead,
    markAllRead,
  };
}
