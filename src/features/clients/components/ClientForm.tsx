import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import { clientsButtonSx, clientsCardSx } from "../constants/clientsUi";
import { citiesMock } from "@/shared/mocks/cities.mock";
import {
  clientFormDefaults,
  clientSchema,
  type ClientFormData,
} from "../schemas/clientSchema";
import type { Client } from "../types/clients.types";
import { clientToFormValues } from "../utils/clientHelpers";

type ClientFormProps = {
  client?: Client | null;
  onCancel: () => void;
  onSubmitSuccess: (data: ClientFormData) => void;
};

export function ClientForm({
  client = null,
  onCancel,
  onSubmitSuccess,
}: ClientFormProps) {
  const isEditing = Boolean(client);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: client ? clientToFormValues(client) : clientFormDefaults,
  });

  useEffect(() => {
    reset(client ? clientToFormValues(client) : clientFormDefaults);
  }, [client, reset]);

  const onSubmit = async (data: ClientFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    onSubmitSuccess(data);
    reset(clientFormDefaults);
  };

  const handleCancel = () => {
    reset(clientFormDefaults);
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...clientsCardSx,
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
          {isEditing ? "Editar cliente" : "Nuevo cliente"}
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
              placeholder="Ej. Laura Gómez"
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
              type="email"
              label="Correo electrónico"
              placeholder="Ej. laura@email.com"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              label="Teléfono"
              placeholder="Ej. 300 123 4567"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              label="Ciudad"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="">
                <em>Seleccionar ciudad</em>
              </MenuItem>
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
              label="Dirección"
              placeholder="Ej. Calle 123 #45-67"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              multiline
              minRows={3}
              label="Notas (opcional)"
              placeholder="Información adicional..."
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
            sx={clientsButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...clientsButtonSx, boxShadow: "none" }}
          >
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Guardar cliente"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
