export type InventorySummaryAccent = "primary" | "success" | "warning" | "info";

export type InventorySummaryId =
  | "products-in-stock"
  | "total-stock"
  | "low-stock"
  | "month-movements";

export type InventorySummaryCardData = {
  id: InventorySummaryId;
  label: string;
  value: string;
  accent: InventorySummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type StockLevel = "optimal" | "low" | "critical";

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  availableStock: number;
  minStock: number;
  maxStock: number;
  imageUrl?: string;
};

export type StockLevelFilter = "all" | StockLevel;

export type InventoryMovementType = "entry" | "exit";

export type InventoryMovement = {
  id: string;
  type: InventoryMovementType;
  productName: string;
  quantity: number;
  occurredAt: string;
  notes?: string;
};

export type InventoryQuickActionId = "entry" | "exit" | "history";

export type InventoryQuickAction = {
  id: InventoryQuickActionId;
  title: string;
  description: string;
  accent: "success" | "danger" | "info";
};
