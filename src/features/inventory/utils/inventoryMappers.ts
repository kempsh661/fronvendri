import type { ApiStockMovement } from "../services/inventoryService";
import type { InventoryItem, InventoryMovement } from "../types/inventory.types";
import type { ApiProduct } from "@/features/products/services/productsService";

export function mapApiProductToInventoryItem(api: ApiProduct): InventoryItem {
  return {
    id: api.id,
    name: api.name,
    sku: api.sku ?? "",
    category: api.categoryName,
    availableStock: api.stock,
    minStock: 5,
    maxStock: Math.max(api.stock, 50),
  };
}

export function mapApiMovementToInventoryMovement(
  api: ApiStockMovement,
): InventoryMovement {
  const type =
    api.type === "IN" || api.type === "SALE_CANCEL" ? "entry" : "exit";

  return {
    id: api.id,
    type,
    productName: api.productName,
    quantity: api.quantity,
    occurredAt: api.createdAt,
    notes: api.reason ?? undefined,
  };
}
