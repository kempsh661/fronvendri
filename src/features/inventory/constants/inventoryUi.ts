import { vendriButtonSx } from "@/shared/styles/buttonSx";
import { vendriSurfaceCardSx } from "@/shared/styles/cardSx";

import type { InventorySummaryAccent } from "../types/inventory.types";

export const inventoryCardSx = vendriSurfaceCardSx;

export const inventoryButtonSx = vendriButtonSx;

export const inventoryAccentStyles: Record<
  InventorySummaryAccent,
  { iconBg: string; iconColor: string }
> = {
  primary: {
    iconBg: "rgba(123, 47, 247, 0.12)",
    iconColor: "primary.main",
  },
  success: {
    iconBg: "rgba(34, 197, 94, 0.12)",
    iconColor: "success.main",
  },
  warning: {
    iconBg: "rgba(245, 158, 11, 0.14)",
    iconColor: "warning.main",
  },
  info: {
    iconBg: "rgba(59, 130, 246, 0.12)",
    iconColor: "info.main",
  },
};

export const inventoryActionAccentStyles: Record<
  "success" | "danger" | "info",
  { iconBg: string; iconColor: string }
> = {
  success: {
    iconBg: "rgba(34, 197, 94, 0.12)",
    iconColor: "success.main",
  },
  danger: {
    iconBg: "rgba(239, 68, 68, 0.12)",
    iconColor: "error.main",
  },
  info: {
    iconBg: "rgba(59, 130, 246, 0.12)",
    iconColor: "info.main",
  },
};

export const INVENTORY_PAGE_SIZE = 7;
