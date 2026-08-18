import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useAuth } from "@/shared/auth";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import { settingsButtonSx, settingsCardSx } from "../constants/settingsUi";
import {
  preferenceSettingsSchema,
  type PreferenceSettingsFormData,
} from "../schemas/settingsSchema";
import type { PreferenceSettings } from "../types/settings.types";

type PreferencesSettingsFormProps = {
  values: PreferenceSettings;
  onSave: (data: PreferenceSettings) => void;
};

export function PreferencesSettingsForm({
  values,
  onSave,
}: PreferencesSettingsFormProps) {
  const { can } = useAuth();
  const canUpdate = can("settings:update");
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PreferenceSettingsFormData>({
    resolver: zodResolver(preferenceSettingsSchema),
    defaultValues: {
      currency: values.currency,
      language: values.language,
      lowStockThreshold: String(values.lowStockThreshold),
    },
  });

  useEffect(() => {
    reset({
      currency: values.currency,
      language: values.language,
      lowStockThreshold: String(values.lowStockThreshold),
    });
  }, [values, reset]);

  const onSubmit = async (data: PreferenceSettingsFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    onSave({
      currency: data.currency,
      language: data.language,
      lowStockThreshold: Number(data.lowStockThreshold),
    });
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
          Preferencias
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Define cómo se muestran montos e inventario en Vendri.
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Preferencias guardadas.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="currency"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              disabled={!canUpdate}
              label="Moneda"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="COP">Peso colombiano (COP)</MenuItem>
              <MenuItem value="USD">Dólar (USD)</MenuItem>
            </VendriInput>
          )}
        />

        <Controller
          name="language"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              disabled={!canUpdate}
              label="Idioma"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </VendriInput>
          )}
        />

        <Controller
          name="lowStockThreshold"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              disabled={!canUpdate}
              type="number"
              label="Umbral de stock bajo"
              helperText={
                fieldState.error?.message ??
                "Se marcará stock bajo cuando llegue a este valor"
              }
              error={!!fieldState.error}
              slotProps={{
                htmlInput: { min: 0, step: 1 },
              }}
            />
          )}
        />

        {canUpdate && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <VendriButton
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={<SaveOutlinedIcon />}
              sx={{ ...settingsButtonSx, boxShadow: "none" }}
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </VendriButton>
          </Box>
        )}
      </Box>
    </VendriCard>
  );
}
