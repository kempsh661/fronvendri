import type { MovementFormData } from "../schemas/movementSchema";
import type {
  InventoryItem,
  InventoryMovement,
  InventoryMovementType,
} from "../types/inventory.types";

export function createMovementFromForm(
  data: MovementFormData,
  productName: string,
): InventoryMovement {
  return {
    id: crypto.randomUUID(),
    type: data.type,
    productName,
    quantity: Number(data.quantity),
    occurredAt: new Date().toISOString(),
  };
}

export function applyMovementToItem(
  item: InventoryItem,
  type: InventoryMovementType,
  quantity: number,
): InventoryItem {
  const nextStock =
    type === "entry"
      ? item.availableStock + quantity
      : Math.max(0, item.availableStock - quantity);

  return {
    ...item,
    availableStock: nextStock,
  };
}
