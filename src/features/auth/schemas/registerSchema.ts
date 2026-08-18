import { z } from "zod";

export const registerSchema = z
  .object({
    companyName: z
      .string()
      .min(1, "El nombre de la empresa es obligatorio")
      .max(100, "Máximo 100 caracteres"),
    companyContactEmail: z
      .string()
      .min(1, "El email de contacto es obligatorio")
      .email("Ingresa un correo válido")
      .max(150, "Máximo 150 caracteres"),
    ownerFullName: z
      .string()
      .min(1, "Tu nombre es obligatorio")
      .max(150, "Máximo 150 caracteres"),
    ownerEmail: z
      .string()
      .min(1, "Tu correo es obligatorio")
      .email("Ingresa un correo válido")
      .max(150, "Máximo 150 caracteres"),
    password: z
      .string()
      .min(1, "La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(72, "Máximo 72 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
