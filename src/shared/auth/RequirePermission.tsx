import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";
import type { Permission } from "./permissions";

type RequirePermissionProps = {
  permission: Permission;
  children: ReactNode;
};

export function RequirePermission({
  permission,
  children,
}: RequirePermissionProps) {
  const { can, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!can(permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
