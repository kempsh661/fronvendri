import type { StatusTone } from "@/shared/components/StatusBadge";
import { userRoleLabels } from "@/shared/auth/roles";

import type { UserRole, UserStatus } from "../types/users.types";

export const userStatusConfig: Record<
  UserStatus,
  { label: string; tone: StatusTone }
> = {
  active: { label: "Activo", tone: "success" },
  inactive: { label: "Inactivo", tone: "neutral" },
};

export const userRoleConfig: Record<
  UserRole,
  { label: string; tone: StatusTone }
> = {
  OWNER: { label: userRoleLabels.OWNER, tone: "primary" },
  ADMIN: { label: userRoleLabels.ADMIN, tone: "info" },
  STAFF: { label: userRoleLabels.STAFF, tone: "warning" },
};
