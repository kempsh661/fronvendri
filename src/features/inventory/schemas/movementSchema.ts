import { z } from "zod";

export const movementSchema = z.object({
  type: z.enum(["entry", "exit"], {
    message: "Selecciona el tipo de movimiento",
  }),
  productId: z.string().min(1, "Selecciona un producto"),
  quantity: z
    .string()
    .min(1, "La cantidad es obligatoria")
    .refine(
      (value) =>
        Number.isInteger(Number(value)) &&
        !Number.isNaN(Number(value)) &&
        Number(value) > 0,
      "Ingresa una cantidad válida",
    ),
  notes: z.string(),
});

export type MovementFormData = z.infer<typeof movementSchema>;

export const movementFormDefaults: MovementFormData = {
  type: "entry",
  productId: "",
  quantity: "",
  notes: "",
};
