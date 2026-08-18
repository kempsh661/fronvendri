export type SupplierSummaryAccent = "primary" | "success" | "warning" | "info";

export type SupplierSummaryId =
  | "registered"
  | "new-month"
  | "active"
  | "month-purchases";

export type SupplierSummaryCardData = {
  id: SupplierSummaryId;
  label: string;
  value: string;
  accent: SupplierSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type SupplierStatus = "active" | "inactive";

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  notes?: string;
  status: SupplierStatus;
  lastPurchase: string;
  avatarInitials: string;
};

export type SupplierStatusFilter = "all" | SupplierStatus;
