import type { StatusTone } from "@/shared/components/StatusBadge";

import type { StockLevel } from "../types/inventory.types";

export const stockLevelConfig: Record<
  StockLevel,
  { label: string; tone: StatusTone }
> = {
  optimal: { label: "Óptimo", tone: "success" },
  low: { label: "Bajo", tone: "warning" },
  critical: { label: "Crítico", tone: "danger" },
};
