export type ReportSummaryAccent = "primary" | "success" | "warning" | "info";

export type ReportSummaryId =
  | "period-sales"
  | "period-orders"
  | "avg-ticket"
  | "estimated-profit";

export type ReportSummaryCardData = {
  id: ReportSummaryId;
  label: string;
  value: string;
  accent: ReportSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type ReportPeriod = "week" | "month" | "year";

export type ReportSalesPoint = {
  label: string;
  amount: number;
};

export type ReportCategoryPoint = {
  category: string;
  amount: number;
};

export type ReportPaymentPoint = {
  method: string;
  amount: number;
  percent: number;
};

export type ReportTopProduct = {
  id: string;
  rank: number;
  name: string;
  units: number;
  revenue: number;
};
