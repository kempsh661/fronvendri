import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

import { useAuth } from "@/shared/auth";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import { settingsButtonSx, settingsCardSx } from "../constants/settingsUi";
import {
  securityFormDefaults,
  securitySettingsSchema,
  type SecuritySettingsFormData,
} from "../schemas/settingsSchema";

export function SecuritySettingsForm() {
  const { can } = useAuth();
  const canUpdate = can("settings:update");
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SecuritySettingsFormData>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: securityFormDefaults,
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    reset(securityFormDefaults);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...settingsCardSx,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Seguridad
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cambia la contraseña de tu cuenta (simulación local).
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Contraseña actualizada.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              disabled={!canUpdate}
              type="password"
              label="Contraseña actual"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              disabled={!canUpdate}
              type="password"
              label="Nueva contraseña"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
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
              required
              disabled={!canUpdate}
              type="password"
              label="Confirmar nueva contraseña"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {canUpdate && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <VendriButton
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={<LockResetOutlinedIcon />}
              sx={{ ...settingsButtonSx, boxShadow: "none" }}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
            </VendriButton>
          </Box>
        )}
      </Box>
    </VendriCard>
  );
}
