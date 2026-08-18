import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useAuth } from "@/shared/auth";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import {
  userRoleConfig,
  userStatusConfig,
} from "../constants/userStatus";
import { usersButtonSx, usersCardSx } from "../constants/usersUi";
import {
  createUserSchema,
  updateUserSchema,
  userFormDefaults,
  type UserFormData,
} from "../schemas/userSchema";
import type { AppUser, UserStatus } from "../types/users.types";
import { userToFormValues } from "../utils/userHelpers";

type UserFormProps = {
  user?: AppUser | null;
  onCancel: () => void;
  onSubmitSuccess: (data: UserFormData) => void | Promise<void>;
};

export function UserForm({
  user = null,
  onCancel,
  onSubmitSuccess,
}: UserFormProps) {
  const isEditing = Boolean(user);
  const { role: actorRole } = useAuth();

  const assignableRoles = useMemo(() => {
    if (actorRole === "ADMIN") {
      return ["STAFF"] as const;
    }
    return ["ADMIN", "STAFF"] as const;
  }, [actorRole]);

  const schema = isEditing ? updateUserSchema : createUserSchema;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: user ? userToFormValues(user) : userFormDefaults,
  });

  useEffect(() => {
    reset(user ? userToFormValues(user) : userFormDefaults);
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    await onSubmitSuccess(data);
    reset(userFormDefaults);
  };

  const handleCancel = () => {
    reset(userFormDefaults);
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...usersCardSx,
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {isEditing ? "Editar usuario" : "Nuevo usuario"}
        </Typography>

        <IconButton
          aria-label="Cerrar formulario"
          onClick={handleCancel}
          size="small"
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              label="Nombre completo"
              placeholder="Ej. Juan Pérez"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              type="email"
              label="Correo electrónico"
              placeholder="Ej. juan@vendri.co"
              disabled={isEditing}
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ??
                (isEditing ? "El correo no se puede cambiar" : undefined)
              }
            />
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Rol"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {assignableRoles.map((key) => (
                <MenuItem key={key} value={key}>
                  {userRoleConfig[key].label}
                </MenuItem>
              ))}
            </VendriInput>
          )}
        />

        {isEditing ? (
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <VendriInput
                {...field}
                select
                fullWidth
                required
                label="Estado"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {(Object.keys(userStatusConfig) as UserStatus[]).map((key) => (
                  <MenuItem key={key} value={key}>
                    {userStatusConfig[key].label}
                  </MenuItem>
                ))}
              </VendriInput>
            )}
          />
        ) : null}

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required={!isEditing}
              type="password"
              autoComplete="new-password"
              label={isEditing ? "Nueva contraseña (opcional)" : "Contraseña"}
              placeholder="Mínimo 8 caracteres"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ??
                (isEditing
                  ? "Déjala vacía para no cambiarla"
                  : "La usará para iniciar sesión")
              }
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required={!isEditing}
              type="password"
              autoComplete="new-password"
              label="Confirmar contraseña"
              placeholder="Repite la contraseña"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.25,
            mt: "auto",
            pt: 1,
          }}
        >
          <VendriButton
            type="button"
            variant="outlined"
            onClick={handleCancel}
            sx={usersButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...usersButtonSx, boxShadow: "none" }}
          >
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Guardar usuario"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
