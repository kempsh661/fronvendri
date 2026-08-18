import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { listProducts } from "@/features/products/services/productsService";
import { getApiErrorMessage } from "@/shared/api";
import { useAuth } from "@/shared/auth";

import { InventoryHeader } from "../components/InventoryHeader";
import { InventoryQuickActions } from "../components/InventoryQuickActions";
import { InventorySummaryCards } from "../components/InventorySummaryCards";
import { InventoryTable } from "../components/InventoryTable";
import { MovementForm } from "../components/MovementForm";
import { MovementHistoryDialog } from "../components/MovementHistoryDialog";
import { RecentMovements } from "../components/RecentMovements";
import type { MovementFormData } from "../schemas/movementSchema";
import {
  listMovements,
  registerIncoming,
  registerOutgoing,
} from "../services/inventoryService";
import type {
  InventoryItem,
  InventoryMovement,
  InventoryMovementType,
  InventoryQuickActionId,
  InventorySummaryCardData,
} from "../types/inventory.types";
import {
  mapApiMovementToInventoryMovement,
  mapApiProductToInventoryItem,
} from "../utils/inventoryMappers";

export function InventoryPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));
  const { can } = useAuth();
  const canManage = can("inventory:manage");

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [initialType, setInitialType] =
    useState<InventoryMovementType>("entry");
  const [initialProductId, setInitialProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsPage, movementsPage] = await Promise.all([
        listProducts(0, 100),
        listMovements(0, 50),
      ]);
      setItems(productsPage.content.map(mapApiProductToInventoryItem));
      setMovements(
        movementsPage.content.map(mapApiMovementToInventoryMovement),
      );
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const summaryCards = useMemo<InventorySummaryCardData[]>(() => {
    const inStock = items.filter((item) => item.availableStock > 0).length;
    const totalStock = items.reduce((sum, item) => sum + item.availableStock, 0);
    const lowStock = items.filter(
      (item) => item.availableStock <= item.minStock,
    ).length;
    return [
      {
        id: "products-in-stock",
        label: "Con stock",
        value: String(inStock),
        accent: "primary",
        helper: "Productos disponibles",
      },
      {
        id: "total-stock",
        label: "Unidades",
        value: String(totalStock),
        accent: "success",
        helper: "Stock total",
      },
      {
        id: "low-stock",
        label: "Stock bajo",
        value: String(lowStock),
        accent: "warning",
        helper: "≤ mínimo",
      },
      {
        id: "month-movements",
        label: "Movimientos",
        value: String(movements.length),
        accent: "info",
        helper: "Recientes",
      },
    ];
  }, [items, movements]);

  const closeForm = () => {
    setIsFormOpen(false);
    setInitialProductId("");
  };

  const openMovementForm = (
    type: InventoryMovementType = "entry",
    productId = "",
  ) => {
    if (!canManage) {
      return;
    }

    setInitialType(type);
    setInitialProductId(productId);
    setIsFormOpen(true);
  };

  const openHistory = () => {
    setIsHistoryOpen(true);
  };

  const handleViewItem = (item: InventoryItem) => {
    if (canManage) {
      openMovementForm("entry", item.id);
      return;
    }

    openHistory();
  };

  const handleQuickAction = (id: InventoryQuickActionId) => {
    if (id === "entry") {
      openMovementForm("entry");
      return;
    }

    if (id === "exit") {
      openMovementForm("exit");
      return;
    }

    if (id === "history") {
      openHistory();
    }
  };

  const handleSubmitSuccess = async (data: MovementFormData) => {
    const quantity = Number(data.quantity);
    const reason = data.notes.trim() || undefined;

    try {
      if (data.type === "entry") {
        await registerIncoming({
          productId: data.productId,
          quantity,
          reason,
        });
      } else {
        await registerOutgoing({
          productId: data.productId,
          quantity,
          reason,
        });
      }
      await loadData();
      closeForm();
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const form = isFormOpen ? (
    <MovementForm
      items={items}
      initialType={initialType}
      initialProductId={initialProductId}
      onCancel={closeForm}
      onSubmitSuccess={handleSubmitSuccess}
    />
  ) : null;

  const sidePanel = isFormOpen ? (
    form
  ) : (
    <>
      <InventoryQuickActions onAction={handleQuickAction} />
      <RecentMovements
        movements={movements.slice(0, 5)}
        onViewAll={openHistory}
      />
    </>
  );

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
      <InventoryHeader
        search={search}
        onSearchChange={setSearch}
        onRegisterMovement={(type) => openMovementForm(type)}
      />
      <InventorySummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando inventario…
        </Typography>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1fr) 320px",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        <InventoryTable
          items={items}
          search={search}
          onView={handleViewItem}
          onRegisterMovement={(item, type) => openMovementForm(type, item.id)}
        />

        {!isCompact && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {sidePanel}
          </Box>
        )}
      </Box>

      {isCompact && !isFormOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <InventoryQuickActions onAction={handleQuickAction} />
          <RecentMovements
            movements={movements.slice(0, 5)}
            onViewAll={openHistory}
          />
        </Box>
      )}

      <Drawer
        anchor="right"
        open={isFormOpen && isCompact}
        onClose={closeForm}
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
        <Box sx={{ p: 2, height: "100%" }}>{form}</Box>
      </Drawer>

      <MovementHistoryDialog
        open={isHistoryOpen}
        movements={movements}
        onClose={() => setIsHistoryOpen(false)}
      />
    </Box>
  );
}
