import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearSession,
  getAccessToken,
  getStoredSessionUser,
  setAccessToken,
  setStoredSessionUser,
} from "@/shared/api";

import {
  login as loginRequest,
  register as registerRequest,
} from "@/features/auth/services/authService";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/auth.types";

import { can, canAny, type Permission } from "./permissions";
import { isUserRole, userRoleLabels, type UserRole } from "./roles";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string;
  companyName: string;
  avatarInitials: string;
};

type AuthContextValue = {
  user: SessionUser | null;
  role: UserRole | null;
  roleLabel: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
  can: (permission: Permission) => boolean;
  canAny: (permissions: Permission[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function toSessionUser(payload: AuthResponse): SessionUser | null {
  if (!isUserRole(payload.role)) return null;

  return {
    id: payload.userId,
    name: payload.fullName,
    email: payload.email,
    role: payload.role,
    companyId: payload.companyId,
    companyName: payload.companyName,
    avatarInitials: getInitials(payload.fullName),
  };
}

function readPersistedSession(): SessionUser | null {
  const token = getAccessToken();
  const stored = getStoredSessionUser<SessionUser>();
  if (!token || !stored || !isUserRole(stored.role)) {
    clearSession();
    return null;
  }
  return stored;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(() =>
    readPersistedSession(),
  );

  const applyAuthResponse = useCallback((response: AuthResponse) => {
    const nextUser = toSessionUser(response);

    if (!nextUser) {
      throw new Error("El rol recibido no es válido");
    }

    setAccessToken(response.accessToken);
    setStoredSessionUser(nextUser);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      const response = await loginRequest(credentials);
      applyAuthResponse(response);
    },
    [applyAuthResponse],
  );

  const register = useCallback(
    async (payload: RegisterRequest) => {
      const response = await registerRequest(payload);
      applyAuthResponse(response);
    },
    [applyAuthResponse],
  );

  const value = useMemo<AuthContextValue>(() => {
    const role = user?.role ?? null;

    return {
      user,
      role,
      roleLabel: role ? userRoleLabels[role] : null,
      isAuthenticated: Boolean(user && getAccessToken()),
      isBootstrapping: false,
      login,
      register,
      logout,
      can: (permission) => (role ? can(role, permission) : false),
      canAny: (permissions) => (role ? canAny(role, permissions) : false),
    };
  }, [user, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
