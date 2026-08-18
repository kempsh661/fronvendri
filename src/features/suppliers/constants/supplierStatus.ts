import type { StatusTone } from "@/shared/components/StatusBadge";

import type { SupplierStatus } from "../types/suppliers.types";

export const supplierStatusConfig: Record<
  SupplierStatus,
  { label: string; tone: StatusTone }
> = {
  active: { label: "Activo", tone: "success" },
  inactive: { label: "Inactivo", tone: "neutral" },
};
