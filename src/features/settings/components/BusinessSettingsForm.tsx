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
import { citiesMock } from "@/shared/mocks/cities.mock";

import { settingsButtonSx, settingsCardSx } from "../constants/settingsUi";
import {
  businessSettingsSchema,
  type BusinessSettingsFormData,
} from "../schemas/settingsSchema";
import type { BusinessSettings } from "../types/settings.types";

type BusinessSettingsFormProps = {
  values: BusinessSettings;
  onSave: (data: BusinessSettings) => void;
};

export function BusinessSettingsForm({
  values,
  onSave,
}: BusinessSettingsFormProps) {
  const { can } = useAuth();
  const canUpdate = can("settings:update");
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<BusinessSettingsFormData>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: values,
  });

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  const onSubmit = async (data: BusinessSettingsFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    onSave({
      businessName: data.businessName.trim(),
      nit: data.nit.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      city: data.city,
      address: data.address.trim(),
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
          Datos del negocio
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Esta información aparece en comprobantes y reportes.
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Datos del negocio guardados.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="businessName"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              disabled={!canUpdate}
              label="Nombre del negocio"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="nit"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              disabled={!canUpdate}
              label="NIT"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <VendriInput
                {...field}
                fullWidth
                required
                disabled={!canUpdate}
                label="Teléfono"
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
                disabled={!canUpdate}
                type="email"
                label="Correo"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>

        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              disabled={!canUpdate}
              label="Ciudad"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {citiesMock.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </VendriInput>
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              disabled={!canUpdate}
              label="Dirección"
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
