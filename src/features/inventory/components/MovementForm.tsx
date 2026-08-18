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

import { inventoryButtonSx, inventoryCardSx } from "../constants/inventoryUi";
import {
  movementFormDefaults,
  movementSchema,
  type MovementFormData,
} from "../schemas/movementSchema";
import type {
  InventoryItem,
  InventoryMovementType,
} from "../types/inventory.types";

type MovementFormProps = {
  items: InventoryItem[];
  initialType?: InventoryMovementType;
  initialProductId?: string;
  onCancel: () => void;
  onSubmitSuccess: (data: MovementFormData) => void | Promise<void>;
};

export function MovementForm({
  items,
  initialType = "entry",
  initialProductId = "",
  onCancel,
  onSubmitSuccess,
}: MovementFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { isSubmitting },
  } = useForm<MovementFormData>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      ...movementFormDefaults,
      type: initialType,
      productId: initialProductId,
    },
  });

  useEffect(() => {
    reset({
      ...movementFormDefaults,
      type: initialType,
      productId: initialProductId,
    });
  }, [initialType, initialProductId, reset]);

  const selectedProductId = watch("productId");
  const selectedType = watch("type");
  const selectedItem = items.find((item) => item.id === selectedProductId);

  const onSubmit = async (data: MovementFormData) => {
    const item = items.find((current) => current.id === data.productId);

    if (!item) {
      setError("productId", { message: "Selecciona un producto válido" });
      return;
    }

    const quantity = Number(data.quantity);

    if (data.type === "exit" && quantity > item.availableStock) {
      setError("quantity", {
        message: `Solo hay ${item.availableStock} unidades disponibles`,
      });
      return;
    }

    await onSubmitSuccess(data);
    reset({
      ...movementFormDefaults,
      type: initialType,
      productId: initialProductId,
    });
  };

  const handleCancel = () => {
    reset({
      ...movementFormDefaults,
      type: initialType,
      productId: initialProductId,
    });
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...inventoryCardSx,
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
          Registrar movimiento
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
          name="type"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Tipo de movimiento"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="entry">Entrada</MenuItem>
              <MenuItem value="exit">Salida</MenuItem>
            </VendriInput>
          )}
        />

        <Controller
          name="productId"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Producto"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="">
                <em>Seleccionar producto</em>
              </MenuItem>
              {items.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name} ({item.sku})
                </MenuItem>
              ))}
            </VendriInput>
          )}
        />

        {selectedItem && (
          <Typography variant="caption" color="text.secondary">
            Stock disponible: {selectedItem.availableStock} und.
            {selectedType === "exit"
              ? ` · Mín. ${selectedItem.minStock}`
              : ` · Máx. ${selectedItem.maxStock}`}
          </Typography>
        )}

        <Controller
          name="quantity"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              type="number"
              label="Cantidad"
              placeholder="Ej. 10"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                htmlInput: { min: 1, step: 1 },
              }}
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
              placeholder="Motivo del movimiento..."
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
            sx={inventoryButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...inventoryButtonSx, boxShadow: "none" }}
          >
            {isSubmitting ? "Guardando..." : "Registrar movimiento"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
