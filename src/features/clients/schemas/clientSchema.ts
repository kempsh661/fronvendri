import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "El nombre completo es obligatorio"),
  email: z.union([
    z.literal(""),
    z.string().email("Ingresa un correo electrónico válido"),
  ]),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  city: z.string(),
  address: z.string(),
  notes: z.string(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const clientFormDefaults: ClientFormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  notes: "",
};
