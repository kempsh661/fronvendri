export type UserRole = "OWNER" | "ADMIN" | "STAFF";

export const userRoleLabels: Record<UserRole, string> = {
  OWNER: "Propietario",
  ADMIN: "Administrador",
  STAFF: "Personal",
};

export function isUserRole(value: string): value is UserRole {
  return value === "OWNER" || value === "ADMIN" || value === "STAFF";
}
