import { z } from "zod";

const quantityField = z
  .string()
  .min(1, "La cantidad es obligatoria")
  .refine(
    (value) =>
      Number.isInteger(Number(value)) &&
      !Number.isNaN(Number(value)) &&
      Number(value) > 0,
    "Ingresa una cantidad válida",
  );

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Selecciona un producto"),
  quantity: quantityField,
});

export const orderSchema = z.object({
  clientId: z.string().min(1, "Selecciona un cliente de la lista"),
  items: z
    .array(orderItemSchema)
    .min(1, "Agrega al menos un producto")
    .refine(
      (items) => {
        const ids = items.map((item) => item.productId).filter(Boolean);
        return new Set(ids).size === ids.length;
      },
      { message: "No repitas el mismo producto; suma la cantidad" },
    ),
  notes: z.string(),
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type OrderItemFormData = z.infer<typeof orderItemSchema>;

export const orderFormDefaults: OrderFormData = {
  clientId: "",
  items: [{ productId: "", quantity: "1" }],
  notes: "",
};
