import type { InventoryItem, StockLevel } from "../types/inventory.types";

export function deriveStockLevel(
  availableStock: number,
  minStock: number,
): StockLevel {
  if (availableStock < minStock) {
    return "critical";
  }

  if (availableStock <= Math.ceil(minStock * 1.25)) {
    return "low";
  }

  return "optimal";
}

export function getInventoryItemLevel(item: InventoryItem): StockLevel {
  return deriveStockLevel(item.availableStock, item.minStock);
}
