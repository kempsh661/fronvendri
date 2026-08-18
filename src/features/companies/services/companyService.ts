import { apiClient } from "@/shared/api";

export type SeedDemoResponse = {
  seeded: boolean;
  message: string;
};

export async function seedDemoData() {
  return apiClient.post<SeedDemoResponse>("/companies/me/seed-demo");
}
