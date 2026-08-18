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

import { suppliersButtonSx, suppliersCardSx } from "../constants/suppliersUi";
import { citiesMock } from "@/shared/mocks/cities.mock";
import {
  supplierFormDefaults,
  supplierSchema,
  type SupplierFormData,
} from "../schemas/supplierSchema";
import type { Supplier } from "../types/suppliers.types";
import { supplierToFormValues } from "../utils/supplierHelpers";

type SupplierFormProps = {
  supplier?: Supplier | null;
  onCancel: () => void;
  onSubmitSuccess: (data: SupplierFormData) => void | Promise<void>;
};

export function SupplierForm({
  supplier = null,
  onCancel,
  onSubmitSuccess,
}: SupplierFormProps) {
  const isEditing = Boolean(supplier);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: supplier
      ? supplierToFormValues(supplier)
      : supplierFormDefaults,
  });

  useEffect(() => {
    reset(supplier ? supplierToFormValues(supplier) : supplierFormDefaults);
  }, [supplier, reset]);

  const onSubmit = async (data: SupplierFormData) => {
    await onSubmitSuccess(data);
    reset(supplierFormDefaults);
  };

  const handleCancel = () => {
    reset(supplierFormDefaults);
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...suppliersCardSx,
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
          {isEditing ? "Editar proveedor" : "Nuevo proveedor"}
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
              label="Nombre / razón social"
              placeholder="Ej. Distribuidora Andina SAS"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="contact"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              label="Contacto"
              placeholder="Ej. Patricia Mejía"
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
              placeholder="Ej. contacto@empresa.com"
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
              placeholder="Ej. 601 555 0101"
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
              required
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
            sx={suppliersButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...suppliersButtonSx, boxShadow: "none" }}
          >
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Guardar proveedor"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
