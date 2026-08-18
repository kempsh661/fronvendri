import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import {
  listClients,
  type ApiClient,
} from "@/features/clients/services/clientsService";
import {
  listProducts,
  type ApiProduct,
} from "@/features/products/services/productsService";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { ordersButtonSx, ordersCardSx } from "../constants/ordersUi";
import {
  orderFormDefaults,
  orderSchema,
  type OrderFormData,
} from "../schemas/orderSchema";

type OrderFormProps = {
  onCancel: () => void;
  onSubmitSuccess: (data: OrderFormData) => void | Promise<void>;
};

export function OrderForm({ onCancel, onSubmitSuccess }: OrderFormProps) {
  const [clients, setClients] = useState<ApiClient[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: orderFormDefaults,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const clientId = useWatch({ control, name: "clientId" });
  const watchedItems = useWatch({ control, name: "items" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [clientsPage, productsPage] = await Promise.all([
          listClients(0, 100),
          listProducts(0, 100),
        ]);
        if (!cancelled) {
          setClients(clientsPage.content.filter((client) => client.active));
          setProducts(
            productsPage.content.filter(
              (product) => product.active && product.stock > 0,
            ),
          );
        }
      } catch {
        if (!cancelled) {
          setLoadError("No se pudieron cargar clientes o productos");
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === clientId) ?? null,
    [clients, clientId],
  );

  const estimatedTotal = useMemo(() => {
    return (watchedItems ?? []).reduce((sum, item) => {
      const product = products.find(
        (entry) => entry.id === item.productId,
      );
      const qty = Number(item.quantity) || 0;
      if (!product || qty <= 0) {
        return sum;
      }
      return sum + Number(product.price) * qty;
    }, 0);
  }, [watchedItems, products]);

  const onSubmit = async (data: OrderFormData) => {
    await onSubmitSuccess(data);
    reset(orderFormDefaults);
  };

  const handleCancel = () => {
    reset(orderFormDefaults);
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...ordersCardSx,
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
          Nuevo pedido
        </Typography>

        <IconButton
          aria-label="Cerrar formulario"
          onClick={handleCancel}
          size="small"
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      {loadError ? (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {loadError}
        </Typography>
      ) : null}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        <Controller
          name="clientId"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              options={clients}
              value={selectedClient}
              onChange={(_event, value) => {
                field.onChange(value?.id ?? "");
              }}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              filterOptions={(options, state) => {
                const query = state.inputValue.trim().toLowerCase();
                if (!query) {
                  return options;
                }
                return options.filter(
                  (option) =>
                    option.name.toLowerCase().includes(query) ||
                    option.phone.toLowerCase().includes(query) ||
                    (option.email ?? "").toLowerCase().includes(query),
                );
              }}
              renderInput={(params) => (
                <VendriInput
                  {...params}
                  label="Cliente"
                  required
                  placeholder="Escribe para buscar..."
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />

        {selectedClient ? (
          <Typography variant="caption" color="text.secondary">
            {selectedClient.phone}
            {selectedClient.city ? ` · ${selectedClient.city}` : ""}
            {selectedClient.address ? ` · ${selectedClient.address}` : ""}
          </Typography>
        ) : null}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Productos
            </Typography>
            <VendriButton
              type="button"
              variant="outlined"
              size="small"
              startIcon={<AddRoundedIcon />}
              onClick={() => append({ productId: "", quantity: "1" })}
              sx={{ ...ordersButtonSx, py: 0.5 }}
            >
              Agregar
            </VendriButton>
          </Box>

          {typeof errors.items?.message === "string" ? (
            <Typography variant="caption" color="error">
              {errors.items.message}
            </Typography>
          ) : null}

          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 88px auto",
                gap: 1,
                alignItems: "start",
              }}
            >
              <Controller
                name={`items.${index}.productId`}
                control={control}
                render={({ field: itemField, fieldState }) => (
                  <VendriInput
                    {...itemField}
                    select
                    fullWidth
                    required
                    label={index === 0 ? "Producto" : undefined}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name} —{" "}
                        {formatCurrencyCOP(Number(product.price))} (stock{" "}
                        {product.stock})
                      </MenuItem>
                    ))}
                  </VendriInput>
                )}
              />

              <Controller
                name={`items.${index}.quantity`}
                control={control}
                render={({ field: itemField, fieldState }) => (
                  <VendriInput
                    {...itemField}
                    fullWidth
                    required
                    type="number"
                    label={index === 0 ? "Cant." : undefined}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                      htmlInput: { min: 1, step: 1 },
                    }}
                  />
                )}
              />

              <IconButton
                aria-label="Quitar producto"
                onClick={() => {
                  if (fields.length === 1) {
                    return;
                  }
                  remove(index);
                }}
                disabled={fields.length === 1}
                sx={{ mt: index === 0 ? 3.5 : 0.5 }}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              fullWidth
              multiline
              minRows={2}
              label="Observaciones (opcional)"
              placeholder="Notas del pedido..."
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {estimatedTotal > 0 && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: "10px",
              backgroundColor: "rgba(123, 47, 247, 0.04)",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Total estimado {formatCurrencyCOP(estimatedTotal)} ·{" "}
              {fields.length} producto{fields.length === 1 ? "" : "s"}
            </Typography>
          </Box>
        )}

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
            sx={ordersButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...ordersButtonSx, boxShadow: "none" }}
          >
            {isSubmitting ? "Guardando..." : "Crear pedido"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
