export type SummaryAccent = "primary" | "success" | "warning" | "info";

export type SummaryCardId = "orders" | "sales" | "clients" | "products";

export type SummaryCardData = {
  id: SummaryCardId;
  label: string;
  value: string;
  accent: SummaryAccent;
  trend?: {
    percent: number;
    label: string;
  };
  sparkline?: number[];
  action?: {
    label: string;
    href: string;
  };
};

export type SalesPeriod = "week" | "month";

export type SalesPoint = {
  label: string;
  amount: number;
};

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export type RecentOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  timeAgo: string;
  status: OrderStatus;
  avatarInitials: string;
};

export type QuickSummaryItem = {
  id: string;
  label: string;
  value: string;
  accent: SummaryAccent;
};

export type TopProduct = {
  id: string;
  rank: number;
  name: string;
  salesCount: number;
  price: number;
  accent: SummaryAccent;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  accent: SummaryAccent;
};
