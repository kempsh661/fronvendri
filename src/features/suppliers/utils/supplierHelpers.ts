import type { SupplierFormData } from "../schemas/supplierSchema";
import type { Supplier } from "../types/suppliers.types";

export function getSupplierInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function supplierToFormValues(supplier: Supplier): SupplierFormData {
  return {
    name: supplier.name,
    contact: supplier.contact,
    email: supplier.email,
    phone: supplier.phone,
    city: supplier.city,
    address: supplier.address ?? "",
    notes: supplier.notes ?? "",
  };
}

export function createSupplierFromForm(data: SupplierFormData): Supplier {
  const today = new Date().toISOString().slice(0, 10);

  return {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    contact: data.contact.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    city: data.city,
    address: data.address.trim(),
    notes: data.notes.trim(),
    status: "active",
    lastPurchase: today,
    avatarInitials: getSupplierInitials(data.name),
  };
}

export function updateSupplierFromForm(
  supplier: Supplier,
  data: SupplierFormData,
): Supplier {
  return {
    ...supplier,
    name: data.name.trim(),
    contact: data.contact.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    city: data.city,
    address: data.address.trim(),
    notes: data.notes.trim(),
    avatarInitials: getSupplierInitials(data.name),
  };
}
