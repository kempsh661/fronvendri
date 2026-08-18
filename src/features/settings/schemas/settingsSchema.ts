import { z } from "zod";

export const businessSettingsSchema = z.object({
  businessName: z.string().min(1, "El nombre del negocio es obligatorio"),
  nit: z.string().min(1, "El NIT es obligatorio"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo válido"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  address: z.string().min(1, "La dirección es obligatoria"),
});

export const preferenceSettingsSchema = z.object({
  currency: z.enum(["COP", "USD"], { message: "Selecciona una moneda" }),
  language: z.enum(["es", "en"], { message: "Selecciona un idioma" }),
  lowStockThreshold: z
    .string()
    .min(1, "El umbral es obligatorio")
    .refine(
      (value) => !Number.isNaN(Number(value)) && Number(value) >= 0,
      "Ingresa un número válido",
    ),
});

export const notificationSettingsSchema = z.object({
  emailOrders: z.boolean(),
  emailLowStock: z.boolean(),
  emailDailySummary: z.boolean(),
  pushSales: z.boolean(),
});

export const securitySettingsSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es obligatoria"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirma la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type BusinessSettingsFormData = z.infer<typeof businessSettingsSchema>;
export type PreferenceSettingsFormData = z.infer<
  typeof preferenceSettingsSchema
>;
export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;
export type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;

export const securityFormDefaults: SecuritySettingsFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
