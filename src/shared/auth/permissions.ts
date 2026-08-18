import type { UserRole } from "./roles";

export type Permission =
  | "dashboard:view"
  | "clients:view"
  | "clients:create"
  | "clients:update"
  | "clients:delete"
  | "suppliers:view"
  | "suppliers:create"
  | "suppliers:update"
  | "suppliers:delete"
  | "products:view"
  | "products:create"
  | "products:update"
  | "products:delete"
  | "inventory:view"
  | "inventory:manage"
  | "orders:view"
  | "orders:create"
  | "orders:update"
  | "orders:delete"
  | "sales:view"
  | "sales:create"
  | "sales:update"
  | "sales:delete"
  | "users:view"
  | "users:create"
  | "users:update"
  | "users:delete"
  | "reports:view"
  | "reports:export"
  | "settings:view"
  | "settings:update";

const allPermissions: Permission[] = [
  "dashboard:view",
  "clients:view",
  "clients:create",
  "clients:update",
  "clients:delete",
  "suppliers:view",
  "suppliers:create",
  "suppliers:update",
  "suppliers:delete",
  "products:view",
  "products:create",
  "products:update",
  "products:delete",
  "inventory:view",
  "inventory:manage",
  "orders:view",
  "orders:create",
  "orders:update",
  "orders:delete",
  "sales:view",
  "sales:create",
  "sales:update",
  "sales:delete",
  "users:view",
  "users:create",
  "users:update",
  "users:delete",
  "reports:view",
  "reports:export",
  "settings:view",
  "settings:update",
];

/** Alineado con @PreAuthorize del backend para STAFF. */
const staffPermissions: Permission[] = [
  "dashboard:view",
  "clients:view",
  "clients:create",
  "clients:update",
  "suppliers:view",
  "products:view",
  "inventory:view",
  "orders:view",
  "orders:create",
  "orders:update",
  "sales:view",
  "sales:create",
  "sales:update",
  "reports:view",
  "settings:view",
];

export const rolePermissions: Record<UserRole, Permission[]> = {
  OWNER: allPermissions,
  ADMIN: allPermissions,
  STAFF: staffPermissions,
};

export const routeViewPermission: Record<string, Permission> = {
  "/dashboard": "dashboard:view",
  "/clients": "clients:view",
  "/suppliers": "suppliers:view",
  "/products": "products:view",
  "/inventory": "inventory:view",
  "/orders": "orders:view",
  "/sales": "sales:view",
  "/users": "users:view",
  "/reports": "reports:view",
  "/settings": "settings:view",
};

export function can(role: UserRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function canAny(role: UserRole, permissions: Permission[]) {
  return permissions.some((permission) => can(role, permission));
}

export function getAllowedNavPaths(role: UserRole) {
  return Object.entries(routeViewPermission)
    .filter(([, permission]) => can(role, permission))
    .map(([path]) => path);
}
