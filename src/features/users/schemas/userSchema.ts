import { z } from "zod";

const assignableRole = z.enum(["ADMIN", "STAFF"], {
  message: "Selecciona un rol",
});

const baseFields = {
  name: z.string().min(1, "El nombre completo es obligatorio"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo electrónico válido"),
  role: assignableRole,
  status: z.enum(["active", "inactive"], {
    message: "Selecciona un estado",
  }),
};

export const createUserSchema = z
  .object({
    ...baseFields,
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(72, "La contraseña no puede superar 72 caracteres"),
    confirmPassword: z.string().min(1, "Confirma la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z
  .object({
    ...baseFields,
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const password = data.password.trim();
    const confirm = data.confirmPassword.trim();

    if (!password && !confirm) {
      return;
    }

    if (password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña debe tener al menos 8 caracteres",
        path: ["password"],
      });
    }

    if (password.length > 72) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña no puede superar 72 caracteres",
        path: ["password"],
      });
    }

    if (password !== confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type UserFormData = CreateUserFormData | UpdateUserFormData;

export const userFormDefaults: CreateUserFormData = {
  name: "",
  email: "",
  role: "STAFF",
  status: "active",
  password: "",
  confirmPassword: "",
};
