import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useAuth } from "@/shared/auth";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";

import { settingsButtonSx, settingsCardSx } from "../constants/settingsUi";
import {
  notificationSettingsSchema,
  type NotificationSettingsFormData,
} from "../schemas/settingsSchema";
import type { NotificationSettings } from "../types/settings.types";

type NotificationsSettingsFormProps = {
  values: NotificationSettings;
  onSave: (data: NotificationSettings) => void;
};

const notificationFields: {
  name: keyof NotificationSettingsFormData;
  label: string;
  description: string;
}[] = [
  {
    name: "emailOrders",
    label: "Nuevos pedidos por correo",
    description: "Recibe un email cuando entre un pedido nuevo.",
  },
  {
    name: "emailLowStock",
    label: "Alertas de stock bajo",
    description: "Avisos cuando un producto llegue al umbral configurado.",
  },
  {
    name: "emailDailySummary",
    label: "Resumen diario",
    description: "Un correo al final del día con ventas y pedidos.",
  },
  {
    name: "pushSales",
    label: "Avisos de ventas",
    description: "Notificaciones en la app cuando se registre una venta.",
  },
];

export function NotificationsSettingsForm({
  values,
  onSave,
}: NotificationsSettingsFormProps) {
  const { can } = useAuth();
  const canUpdate = can("settings:update");
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: values,
  });

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  const onSubmit = async (data: NotificationSettingsFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    onSave(data);
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
          Notificaciones
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Elige qué alertas quieres recibir.
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Preferencias de notificación guardadas.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        {notificationFields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(123, 47, 247, 0.04)",
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      disabled={!canUpdate}
                      onChange={(event) => field.onChange(event.target.checked)}
                      color="primary"
                    />
                  }
                  label=""
                  sx={{ m: 0 }}
                />
              </Box>
            )}
          />
        ))}

        {canUpdate && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
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
