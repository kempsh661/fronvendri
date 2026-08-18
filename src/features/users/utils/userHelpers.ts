import type { UserFormData } from "../schemas/userSchema";
import type { AppUser } from "../types/users.types";

export function getUserInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatUserLastAccess(value?: string) {
  if (!value) {
    return "Sin acceso";
  }

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function userToFormValues(user: AppUser): UserFormData {
  const role = user.role === "OWNER" ? "STAFF" : user.role;
  return {
    name: user.name,
    email: user.email,
    role,
    status: user.status,
    password: "",
    confirmPassword: "",
  };
}
