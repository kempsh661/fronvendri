import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import { productsButtonSx, productsCardSx } from "../constants/productsUi";
import { categoriesMock, unitsMock } from "../mocks/catalog.mock";
import {
  productFormDefaults,
  productSchema,
  type ProductFormData,
} from "../schemas/productSchema";
import type { Product } from "../types/products.types";
import { productToFormValues } from "../utils/productHelpers";

type ProductFormProps = {
  product?: Product | null;
  onCancel: () => void;
  onSubmitSuccess: (data: ProductFormData) => void;
};

export function ProductForm({
  product = null,
  onCancel,
  onSubmitSuccess,
}: ProductFormProps) {
  const isEditing = Boolean(product);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? productToFormValues(product)
      : productFormDefaults,
  });

  useEffect(() => {
    reset(product ? productToFormValues(product) : productFormDefaults);
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    onSubmitSuccess(data);
    reset(productFormDefaults);
  };

  const handleCancel = () => {
    reset(productFormDefaults);
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...productsCardSx,
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
          {isEditing ? "Editar producto" : "Nuevo producto"}
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
              label="Nombre del producto"
              placeholder="Ej. Bolso de mano Laura"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Categoría"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="">
                <em>Seleccionar categoría</em>
              </MenuItem>
              {categoriesMock.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </VendriInput>
          )}
        />

        <Controller
          name="salePrice"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              type="number"
              label="Precio de venta"
              placeholder="Ej. 120000"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
                htmlInput: { min: 0, step: 1 },
              }}
            />
          )}
        />

        <Controller
          name="purchasePrice"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              type="number"
              label="Precio de compra"
              placeholder="Ej. 80000"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
                htmlInput: { min: 0, step: 1 },
              }}
            />
          )}
        />

        <Controller
          name="stock"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              required
              type="number"
              label={isEditing ? "Stock" : "Stock inicial"}
              placeholder="Ej. 20"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                htmlInput: { min: 0, step: 1 },
              }}
            />
          )}
        />

        <Controller
          name="unit"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              label="Unidad de medida"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="">
                <em>Seleccionar unidad</em>
              </MenuItem>
              {unitsMock.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </VendriInput>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              multiline
              minRows={3}
              label="Descripción (opcional)"
              placeholder="Descripción del producto..."
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box
          sx={{
            border: "1px dashed",
            borderColor: "rgba(45, 20, 87, 0.2)",
            borderRadius: "12px",
            px: 2,
            py: 2.5,
            textAlign: "center",
            backgroundColor: "rgba(123, 47, 247, 0.03)",
          }}
        >
          <CloudUploadOutlinedIcon
            sx={{ color: "primary.main", fontSize: 28, mb: 0.75 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
            Haz clic para subir una imagen
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PNG, JPG o WEBP (máx. 2MB)
          </Typography>
        </Box>

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
            sx={productsButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...productsButtonSx, boxShadow: "none" }}
          >
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Guardar producto"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
