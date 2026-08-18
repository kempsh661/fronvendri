import { z } from "zod";

const optionalNonNegativeNumber = z
  .string()
  .refine(
    (value) => value === "" || (!Number.isNaN(Number(value)) && Number(value) >= 0),
    "Ingresa un número válido",
  );

export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  category: z.string().min(1, "La categoría es obligatoria"),
  salePrice: z
    .string()
    .min(1, "El precio de venta es obligatorio")
    .refine(
      (value) => !Number.isNaN(Number(value)) && Number(value) > 0,
      "Ingresa un precio válido",
    ),
  purchasePrice: optionalNonNegativeNumber,
  stock: z
    .string()
    .min(1, "El stock es obligatorio")
    .refine(
      (value) =>
        Number.isInteger(Number(value)) &&
        !Number.isNaN(Number(value)) &&
        Number(value) >= 0,
      "Ingresa un stock válido",
    ),
  unit: z.string(),
  description: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const productFormDefaults: ProductFormData = {
  name: "",
  category: "",
  salePrice: "",
  purchasePrice: "",
  stock: "",
  unit: "",
  description: "",
};
