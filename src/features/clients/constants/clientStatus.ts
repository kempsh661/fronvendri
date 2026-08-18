import type { StatusTone } from "@/shared/components/StatusBadge";

import type { ClientStatus } from "../types/clients.types";

export const clientStatusConfig: Record<
  ClientStatus,
  { label: string; tone: StatusTone }
> = {
  active: { label: "Activo", tone: "success" },
  inactive: { label: "Inactivo", tone: "neutral" },
};
