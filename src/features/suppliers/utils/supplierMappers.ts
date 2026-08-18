import type { ApiSupplier } from "../services/suppliersService";
import type { Supplier } from "../types/suppliers.types";
import { getSupplierInitials } from "./supplierHelpers";

export function mapApiSupplierToSupplier(api: ApiSupplier): Supplier {
  return {
    id: api.id,
    name: api.name,
    contact: api.contactName ?? "—",
    email: api.email ?? "",
    phone: api.phone ?? "",
    city: api.city?.trim() || "—",
    address: api.address ?? undefined,
    notes: api.notes ?? undefined,
    status: api.active ? "active" : "inactive",
    lastPurchase: "",
    avatarInitials: getSupplierInitials(api.name),
  };
}
