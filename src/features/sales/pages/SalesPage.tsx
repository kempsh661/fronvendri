import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { seedDemoData } from "@/features/companies/services/companyService";
import {
  listOrders,
  updateOrderStatus,
} from "@/features/orders/services/ordersService";
import { getApiErrorMessage } from "@/shared/api";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { DeleteSaleDialog } from "../components/DeleteSaleDialog";
import { SaleDetailPanel } from "../components/SaleDetailPanel";
import { SaleForm } from "../components/SaleForm";
import { SalesHeader } from "../components/SalesHeader";
import { SalesSummaryCards } from "../components/SalesSummaryCards";
import { SalesTable } from "../components/SalesTable";
import type { SaleFormData } from "../schemas/saleSchema";
import type { Sale, SaleSummaryCardData } from "../types/sales.types";
import {
  createSaleFromForm,
  resolveOrderStatusFromSale,
  updateSaleFromForm,
} from "../utils/saleHelpers";
import { mapOrderToSale } from "../utils/saleMappers";

export function SalesPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reloadSales = async () => {
    const [confirmed, completed] = await Promise.all([
      listOrders(0, 100, "CONFIRMED"),
      listOrders(0, 100, "COMPLETED"),
    ]);
    const merged = [...completed.content, ...confirmed.content]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map(mapOrderToSale);
    setSales(merged);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        await seedDemoData().catch(() => undefined);
        if (!cancelled) {
          await reloadSales();
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

  const summaryCards = useMemo<SaleSummaryCardData[]>(() => {
    const total = sales.reduce((sum, sale) => sum + sale.total, 0);
    const avg = sales.length ? total / sales.length : 0;
    return [
      {
        id: "month-sales",
        label: "Ventas",
        value: formatCurrencyCOP(total),
        accent: "primary",
        helper: "Pagadas y/o entregadas",
      },
      {
        id: "sales-count",
        label: "Cantidad",
        value: String(sales.length),
        accent: "success",
        helper: "Ventas registradas",
      },
      {
        id: "avg-ticket",
        label: "Ticket promedio",
        value: formatCurrencyCOP(avg),
        accent: "warning",
        helper: "Por venta",
      },
      {
        id: "profit",
        label: "Entregadas",
        value: String(
          sales.filter((sale) => sale.deliveryStatus === "delivered").length,
        ),
        accent: "info",
        helper: "Pedidos entregados",
      },
    ];
  }, [sales]);

  const selectedSale = sales.find((sale) => sale.id === selectedSaleId) ?? null;
  const isSideOpen = isFormOpen || Boolean(selectedSale);

  const closeSidePanel = () => {
    setSelectedSaleId(null);
    setIsFormOpen(false);
    setEditingSale(null);
  };

  const openDetail = (sale: Sale) => {
    setIsFormOpen(false);
    setEditingSale(null);
    setSelectedSaleId(sale.id);
  };

  const openCreateForm = () => {
    setSelectedSaleId(null);
    setEditingSale(null);
    setIsFormOpen(true);
  };

  const openEditForm = (sale: Sale) => {
    setSelectedSaleId(null);
    setEditingSale(sale);
    setIsFormOpen(true);
  };

  const handleSubmitSuccess = async (
    data: SaleFormData,
    meta: { customerName: string },
  ) => {
    try {
      if (editingSale) {
        const nextStatus = resolveOrderStatusFromSale(data);
        try {
          await updateOrderStatus(editingSale.id, nextStatus);
        } catch {
          // Si la transición no aplica, igual actualizamos la vista local
        }
        setSales((current) =>
          current.map((sale) =>
            sale.id === editingSale.id
              ? updateSaleFromForm(sale, data, meta.customerName)
              : sale,
          ),
        );
        await reloadSales();
      } else if (data.orderId) {
        const nextStatus = resolveOrderStatusFromSale(data);
        await updateOrderStatus(data.orderId, nextStatus);
        await reloadSales();
      } else {
        setSales((current) => [
          createSaleFromForm(data, current, meta.customerName),
          ...current,
        ]);
      }

      closeSidePanel();
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleConfirmDelete = () => {
    if (!saleToDelete) {
      return;
    }

    setSales((current) =>
      current.filter((sale) => sale.id !== saleToDelete.id),
    );

    if (
      selectedSaleId === saleToDelete.id ||
      editingSale?.id === saleToDelete.id
    ) {
      closeSidePanel();
    }

    setSaleToDelete(null);
  };

  const sidePanel = isFormOpen ? (
    <SaleForm
      sale={editingSale}
      onCancel={closeSidePanel}
      onSubmitSuccess={handleSubmitSuccess}
    />
  ) : selectedSale ? (
    <SaleDetailPanel sale={selectedSale} onClose={closeSidePanel} />
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
      <SalesHeader
        search={search}
        onSearchChange={setSearch}
        onNewSale={openCreateForm}
      />
      <SalesSummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando ventas…
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
        <SalesTable
          sales={sales}
          search={search}
          onView={openDetail}
          onEdit={openEditForm}
          onDelete={setSaleToDelete}
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

      <DeleteSaleDialog
        sale={saleToDelete}
        onCancel={() => setSaleToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
