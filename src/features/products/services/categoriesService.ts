import { apiClient, pageQuery, type PageResponse } from "@/shared/api";

export type ApiCategory = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export async function listCategories(page = 0, size = 100) {
  return apiClient.get<PageResponse<ApiCategory>>(
    `/categories?${pageQuery(page, size, "name,asc")}`,
  );
}
