import type { UserRole } from "@/shared/auth/roles";

export type UserSummaryAccent = "primary" | "success" | "warning" | "info";

export type UserSummaryId =
  | "registered"
  | "active"
  | "admins"
  | "new-month";

export type UserSummaryCardData = {
  id: UserSummaryId;
  label: string;
  value: string;
  accent: UserSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type UserStatus = "active" | "inactive";

export type { UserRole };

export type AppUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  lastAccess?: string;
  notes?: string;
  avatarInitials: string;
};

export type UserStatusFilter = "all" | UserStatus;
export type UserRoleFilter = "all" | UserRole;
