import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import {
  listClients,
  type ApiClient,
} from "@/features/clients/services/clientsService";
import {
  listOrders,
  type ApiOrder,
} from "@/features/orders/services/ordersService";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import {
  deliveryStatusConfig,
  paymentMethodLabels,
  saleStatusConfig,
} from "../constants/saleStatus";
import { salesButtonSx, salesCardSx } from "../constants/salesUi";
import {
  saleFormDefaults,
  saleSchema,
  type SaleFormData,
} from "../schemas/saleSchema";
import type { PaymentMethod, Sale } from "../types/sales.types";
import { getSaleTotalsFromForm, saleToFormValues } from "../utils/saleHelpers";

type SaleFormProps = {
  sale?: Sale | null;
  onCancel: () => void;
  onSubmitSuccess: (
    data: SaleFormData,
    meta: { customerName: string },
  ) => void | Promise<void>;
};

function MoneyField({
  name,
  control,
  label,
  required = false,
  placeholder,
}: {
  name: "subtotal" | "discount" | "shipping";
  control: ReturnType<typeof useForm<SaleFormData>>["control"];
  label: string;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <VendriInput
          {...field}
          fullWidth
          required={required}
          type="number"
          label={label}
          placeholder={placeholder}
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
  );
}

export function SaleForm({
  sale = null,
  onCancel,
  onSubmitSuccess,
}: SaleFormProps) {
  const isEditing = Boolean(sale);
  const [clients, setClients] = useState<ApiClient[]>([]);
  const [orders, setOrders] = useState<ApiOrder[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
    defaultValues: sale ? saleToFormValues(sale) : saleFormDefaults,
  });

  const clientId = useWatch({ control, name: "clientId" });
  const orderId = useWatch({ control, name: "orderId" });
  const watchedTotals = useWatch({
    control,
    name: ["subtotal", "discount", "shipping"],
  });

  useEffect(() => {
    reset(sale ? saleToFormValues(sale) : saleFormDefaults);
  }, [sale, reset]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [clientsPage, ordersPage] = await Promise.all([
          listClients(0, 100),
          listOrders(0, 100),
        ]);
        if (!cancelled) {
          setClients(clientsPage.content.filter((client) => client.active));
          setOrders(
            ordersPage.content.filter((order) => order.status !== "CANCELLED"),
          );
        }
      } catch {
        if (!cancelled) {
          setClients([]);
          setOrders([]);
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

  const clientOrders = useMemo(() => {
    if (!clientId) {
      return [];
    }
    return orders
      .filter((order) => order.clientId === clientId)
      .filter((order) =>
        isEditing ? true : order.status === "PENDING" || order.status === "CONFIRMED",
      )
      .slice(0, 15);
  }, [orders, clientId, isEditing]);

  const selectedOrder = useMemo(
    () => clientOrders.find((order) => order.id === orderId) ?? null,
    [clientOrders, orderId],
  );

  const previewTotal = (() => {
    const [subtotal, discount, shipping] = watchedTotals;
    if (
      subtotal === undefined ||
      discount === undefined ||
      shipping === undefined ||
      subtotal === "" ||
      Number.isNaN(Number(subtotal)) ||
      Number.isNaN(Number(discount)) ||
      Number.isNaN(Number(shipping))
    ) {
      return null;
    }

    return getSaleTotalsFromForm({
      ...saleFormDefaults,
      subtotal,
      discount,
      shipping,
    }).total;
  })();

  const onSubmit = async (data: SaleFormData) => {
    const customerName =
      selectedClient?.name ??
      sale?.customerName ??
      "Cliente";
    await onSubmitSuccess(data, { customerName });
    reset(saleFormDefaults);
  };

  const handleCancel = () => {
    reset(saleFormDefaults);
    onCancel();
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...salesCardSx,
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
          {isEditing ? "Editar venta" : "Nueva venta"}
        </Typography>

        <IconButton
          aria-label="Cerrar formulario"
          onClick={handleCancel}
          size="small"
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      {isEditing && sale && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Venta #{sale.saleNumber}
        </Typography>
      )}

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
          name="clientId"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              options={clients}
              value={selectedClient}
              onChange={(_event, value) => {
                field.onChange(value?.id ?? "");
                setValue("customerPhone", value?.phone ?? "");
                setValue("orderId", "");
                setValue("orderNumber", "");
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
                    option.phone.toLowerCase().includes(query),
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

        <Controller
          name="customerPhone"
          control={control}
          render={({ field }) => (
            <VendriInput
              {...field}
              fullWidth
              label="Teléfono"
              placeholder="Se completa al elegir cliente"
              disabled
            />
          )}
        />

        <Controller
          name="orderId"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              options={clientOrders}
              value={selectedOrder}
              disabled={!clientId}
              onChange={(_event, value) => {
                field.onChange(value?.id ?? "");
                setValue("orderNumber", value?.orderNumber ?? "");
                if (value) {
                  setValue("subtotal", String(Math.round(Number(value.totalAmount))));
                  setValue("discount", "0");
                  setValue("shipping", "0");
                  if (value.notes) {
                    setValue("notes", value.notes);
                  }
                }
              }}
              getOptionLabel={(option) => {
                const statusLabel =
                  option.status === "COMPLETED"
                    ? "Entregado"
                    : option.status === "CONFIRMED"
                      ? "Pagado"
                      : "Pendiente";
                return `${option.orderNumber} · ${formatCurrencyCOP(Number(option.totalAmount))} · ${statusLabel}`;
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText={
                clientId
                  ? "Sin pedidos recientes para este cliente"
                  : "Selecciona un cliente primero"
              }
              renderInput={(params) => (
                <VendriInput
                  {...params}
                  label="N° pedido"
                  placeholder="Últimos pedidos del cliente"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ??
                    (clientId
                      ? "Elige un pedido reciente para completar la venta"
                      : "Primero selecciona el cliente")
                  }
                />
              )}
            />
          )}
        />

        <MoneyField
          name="subtotal"
          control={control}
          label="Subtotal"
          required
          placeholder="Ej. 295000"
        />
        <MoneyField
          name="discount"
          control={control}
          label="Descuento"
          placeholder="Ej. 10000"
        />
        <MoneyField
          name="shipping"
          control={control}
          label="Envío"
          placeholder="Ej. 8000"
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            py: 1.25,
            borderRadius: 2,
            backgroundColor: "rgba(123, 47, 247, 0.08)",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Total
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {previewTotal !== null && previewTotal >= 0
              ? formatCurrencyCOP(previewTotal)
              : "—"}
          </Typography>
        </Box>

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Método de pago"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {(Object.keys(paymentMethodLabels) as PaymentMethod[]).map(
                (key) => (
                  <MenuItem key={key} value={key}>
                    {paymentMethodLabels[key]}
                  </MenuItem>
                ),
              )}
            </VendriInput>
          )}
        />

        <Controller
          name="paymentStatus"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Estado de pago"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ?? "Pagado = cobro de la venta"
              }
            >
              <MenuItem value="paid">{saleStatusConfig.paid.label}</MenuItem>
              <MenuItem value="pending">
                {saleStatusConfig.pending.label}
              </MenuItem>
            </VendriInput>
          )}
        />

        <Controller
          name="deliveryStatus"
          control={control}
          render={({ field, fieldState }) => (
            <VendriInput
              {...field}
              select
              fullWidth
              required
              label="Estado de entrega"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ??
                "Entregado actualiza el pedido a entregado"
              }
            >
              <MenuItem value="delivered">
                {deliveryStatusConfig.delivered.label}
              </MenuItem>
              <MenuItem value="pending">
                {deliveryStatusConfig.pending.label}
              </MenuItem>
            </VendriInput>
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
              minRows={2}
              label="Notas (opcional)"
              placeholder="Detalle de la venta..."
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
            sx={salesButtonSx}
          >
            Cancelar
          </VendriButton>

          <VendriButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SaveOutlinedIcon />}
            sx={{ ...salesButtonSx, boxShadow: "none" }}
          >
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Registrar venta"}
          </VendriButton>
        </Box>
      </Box>
    </VendriCard>
  );
}
