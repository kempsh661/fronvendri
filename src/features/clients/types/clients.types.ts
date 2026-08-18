export type ClientSummaryAccent = "primary" | "success" | "warning" | "info";

export type ClientSummaryId =
  | "registered"
  | "new-month"
  | "with-orders"
  | "avg-spend";

export type ClientSummaryCardData = {
  id: ClientSummaryId;
  label: string;
  value: string;
  accent: ClientSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type ClientStatus = "active" | "inactive";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  notes?: string;
  totalOrders: number;
  totalSpend: number;
  status: ClientStatus;
  avatarInitials: string;
};

export type ClientStatusFilter = "all" | ClientStatus;
