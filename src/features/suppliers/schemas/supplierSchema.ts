import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, "El nombre o razón social es obligatorio"),
  contact: z.string().min(1, "El contacto es obligatorio"),
  email: z.union([
    z.literal(""),
    z.string().email("Ingresa un correo electrónico válido"),
  ]),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  address: z.string(),
  notes: z.string(),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;

export const supplierFormDefaults: SupplierFormData = {
  name: "",
  contact: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  notes: "",
};
