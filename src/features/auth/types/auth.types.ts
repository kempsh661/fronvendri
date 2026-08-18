import type { UserRole } from "@/shared/auth/roles";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  companyName: string;
  companyContactEmail: string;
  ownerFullName: string;
  ownerEmail: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  companyId: string;
  companyName: string;
};
