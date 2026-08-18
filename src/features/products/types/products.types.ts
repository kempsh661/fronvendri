export type ProductSummaryAccent = "primary" | "success" | "warning" | "info";

export type ProductSummaryId =
  | "registered"
  | "active"
  | "total-stock"
  | "inventory-value";

export type ProductSummaryCardData = {
  id: ProductSummaryId;
  label: string;
  value: string;
  accent: ProductSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type ProductStatus = "active" | "inactive";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  salePrice: number;
  purchasePrice?: number;
  stock: number;
  unit?: string;
  description?: string;
  imageUrl?: string;
  status: ProductStatus;
};

export type ProductStatusFilter = "all" | ProductStatus;
