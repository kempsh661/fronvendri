import type { ProductFormData } from "../schemas/productSchema";
import type { Product } from "../types/products.types";

const categorySkuPrefix: Record<string, string> = {
  Bolsos: "BOL",
  Ropa: "ROP",
  Accesorios: "ACC",
  Calzado: "CAL",
};

export function generateProductSku(category: string) {
  const prefix = categorySkuPrefix[category] ?? "PRD";
  const suffix = String(Math.floor(Math.random() * 900) + 100);
  return `${prefix}-${suffix}`;
}

export function productToFormValues(product: Product): ProductFormData {
  return {
    name: product.name,
    category: product.category,
    salePrice: String(product.salePrice),
    purchasePrice:
      product.purchasePrice != null ? String(product.purchasePrice) : "",
    stock: String(product.stock),
    unit: product.unit ?? "",
    description: product.description ?? "",
  };
}

export function createProductFromForm(data: ProductFormData): Product {
  const purchasePrice =
    data.purchasePrice.trim() === ""
      ? undefined
      : Number(data.purchasePrice);

  return {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    sku: generateProductSku(data.category),
    category: data.category,
    salePrice: Number(data.salePrice),
    purchasePrice,
    stock: Number(data.stock),
    unit: data.unit || undefined,
    description: data.description.trim() || undefined,
    status: "active",
  };
}

export function updateProductFromForm(
  product: Product,
  data: ProductFormData,
): Product {
  const purchasePrice =
    data.purchasePrice.trim() === ""
      ? undefined
      : Number(data.purchasePrice);

  return {
    ...product,
    name: data.name.trim(),
    category: data.category,
    salePrice: Number(data.salePrice),
    purchasePrice,
    stock: Number(data.stock),
    unit: data.unit || undefined,
    description: data.description.trim() || undefined,
  };
}
