import type { StatusTone } from "@/shared/components/StatusBadge";

import type { ProductStatus } from "../types/products.types";

export const productStatusConfig: Record<
  ProductStatus,
  { label: string; tone: StatusTone }
> = {
  active: { label: "Activo", tone: "success" },
  inactive: { label: "Inactivo", tone: "neutral" },
};
