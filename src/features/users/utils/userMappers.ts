import type { ApiUser } from "../services/usersService";
import type { AppUser } from "../types/users.types";
import { getUserInitials } from "./userHelpers";

export function mapApiUserToAppUser(api: ApiUser): AppUser {
  return {
    id: api.id,
    name: api.fullName,
    email: api.email,
    phone: "—",
    role: api.role,
    status: api.active ? "active" : "inactive",
    lastAccess: api.updatedAt,
    avatarInitials: getUserInitials(api.fullName),
  };
}
