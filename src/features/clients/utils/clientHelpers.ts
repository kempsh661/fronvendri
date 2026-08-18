import type { Client } from "../types/clients.types";
import type { ClientFormData } from "../schemas/clientSchema";

export function getClientInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function clientToFormValues(client: Client): ClientFormData {
  return {
    name: client.name,
    email: client.email,
    phone: client.phone,
    city: client.city,
    address: client.address ?? "",
    notes: client.notes ?? "",
  };
}

export function createClientFromForm(data: ClientFormData): Client {
  return {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    city: data.city,
    address: data.address.trim(),
    notes: data.notes.trim(),
    totalOrders: 0,
    totalSpend: 0,
    status: "active",
    avatarInitials: getClientInitials(data.name),
  };
}

export function updateClientFromForm(
  client: Client,
  data: ClientFormData,
): Client {
  return {
    ...client,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    city: data.city,
    address: data.address.trim(),
    notes: data.notes.trim(),
    avatarInitials: getClientInitials(data.name),
  };
}
