import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { seedDemoData } from "@/features/companies/services/companyService";
import { getApiErrorMessage } from "@/shared/api";

import { DeleteOrderDialog } from "../components/DeleteOrderDialog";
import { OrderDetailPanel } from "../components/OrderDetailPanel";
import { OrderForm } from "../components/OrderForm";
import { OrdersHeader } from "../components/OrdersHeader";
import { OrdersSummaryCards } from "../components/OrdersSummaryCards";
import { OrdersTable } from "../components/OrdersTable";
import type { OrderFormData } from "../schemas/orderSchema";
import {
  createOrder,
  deleteOrder,
  listOrders,
  updateOrderStatus,
} from "../services/ordersService";
import type { Order, OrderStatus, OrderSummaryCardData } from "../types/orders.types";
import {
  mapApiOrderToOrder,
  mapOrderStatusToApi,
} from "../utils/orderMappers";

export function OrdersPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        await seedDemoData().catch(() => undefined);
        const page = await listOrders();
        if (!cancelled) {
          setOrders(page.content.map(mapApiOrderToOrder));
        }
      } catch (err) {
        if (!cancelled) {
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

  const summaryCards = useMemo<OrderSummaryCardData[]>(() => {
    const countBy = (status: OrderStatus) =>
      orders.filter((order) => order.status === status).length;
    return [
      {
        id: "total",
        label: "Total",
        value: String(orders.length),
        accent: "primary",
      },
      {
        id: "pending",
        label: "Pendientes",
        value: String(countBy("pending")),
        accent: "warning",
      },
      {
        id: "in-progress",
        label: "Pagados",
        value: String(countBy("in_progress")),
        accent: "info",
      },
      {
        id: "delivered",
        label: "Entregados",
        value: String(countBy("delivered")),
        accent: "success",
      },
      {
        id: "cancelled",
        label: "Cancelados",
        value: String(countBy("cancelled")),
        accent: "danger",
      },
    ];
  }, [orders]);

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ?? null;

  const isSideOpen = isCreateOpen || Boolean(selectedOrder);

  const openDetail = (order: Order) => {
    setIsCreateOpen(false);
    setSelectedOrderId(order.id);
  };

  const closeSidePanel = () => {
    setSelectedOrderId(null);
    setIsCreateOpen(false);
  };

  const openCreateForm = () => {
    setSelectedOrderId(null);
    setIsCreateOpen(true);
  };

  const handleSaveStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const updated = await updateOrderStatus(
        orderId,
        mapOrderStatusToApi(status),
      );
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? mapApiOrderToOrder(updated) : order,
        ),
      );
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleCreateSuccess = async (data: OrderFormData) => {
    try {
      const created = await createOrder({
        clientId: data.clientId,
        notes: data.notes.trim() || undefined,
        items: data.items.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
        })),
      });
      setOrders((current) => [mapApiOrderToOrder(created), ...current]);
      closeSidePanel();
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) {
      return;
    }

    try {
      await deleteOrder(orderToDelete.id);
      setOrders((current) =>
        current.filter((order) => order.id !== orderToDelete.id),
      );

      if (selectedOrderId === orderToDelete.id) {
        closeSidePanel();
      }

      setOrderToDelete(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const sidePanel = isCreateOpen ? (
    <OrderForm onCancel={closeSidePanel} onSubmitSuccess={handleCreateSuccess} />
  ) : selectedOrder ? (
    <OrderDetailPanel
      order={selectedOrder}
      onClose={closeSidePanel}
      onSaveStatus={handleSaveStatus}
    />
  ) : null;

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pb: 2,
      }}
    >
      <OrdersHeader
        search={search}
        onSearchChange={setSearch}
        onNewOrder={openCreateForm}
      />
      <OrdersSummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando pedidos…
        </Typography>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: isSideOpen ? "minmax(0, 1fr) 360px" : "1fr",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        <OrdersTable
          orders={orders}
          search={search}
          onView={openDetail}
          onEdit={openDetail}
          onDelete={setOrderToDelete}
        />

        {isSideOpen && !isCompact && sidePanel}
      </Box>

      <Drawer
        anchor="right"
        open={isSideOpen && isCompact}
        onClose={closeSidePanel}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 400 },
              p: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%" }}>{sidePanel}</Box>
      </Drawer>

      <DeleteOrderDialog
        order={orderToDelete}
        onCancel={() => setOrderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
