import type { ApiClient } from "../services/clientsService";
import type { Client } from "../types/clients.types";

import { getClientInitials } from "./clientHelpers";

export function mapApiClientToClient(api: ApiClient): Client {
  return {
    id: api.id,
    name: api.name,
    email: api.email ?? "",
    phone: api.phone,
    city: api.city?.trim() || "—",
    address: api.address ?? undefined,
    notes: api.notes ?? undefined,
    totalOrders: 0,
    totalSpend: 0,
    status: api.active ? "active" : "inactive",
    avatarInitials: getClientInitials(api.name),
  };
}
