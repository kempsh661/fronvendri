import type { ApiProduct } from "../services/productsService";
import type { Product } from "../types/products.types";

export function mapApiProductToProduct(api: ApiProduct): Product {
  return {
    id: api.id,
    name: api.name,
    sku: api.sku ?? "",
    category: api.categoryName,
    salePrice: Number(api.price),
    stock: api.stock,
    description: api.description ?? undefined,
    status: api.active ? "active" : "inactive",
  };
}
