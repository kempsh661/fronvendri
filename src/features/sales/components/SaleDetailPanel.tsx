import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

import { StatusBadge } from "@/shared/components/StatusBadge";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import {
  deliveryStatusConfig,
  paymentMethodLabels,
  paymentMethodTone,
  saleStatusConfig,
} from "../constants/saleStatus";
import { salesButtonSx, salesCardSx } from "../constants/salesUi";
import type { Sale } from "../types/sales.types";
import { formatSaleDateTime } from "../utils/formatSaleDateTime";

type SaleDetailPanelProps = {
  sale: Sale;
  onClose: () => void;
};

export function SaleDetailPanel({ sale, onClose }: SaleDetailPanelProps) {
  const statusMeta = saleStatusConfig[sale.status] ?? saleStatusConfig.pending;
  const deliveryMeta =
    deliveryStatusConfig[sale.deliveryStatus ?? "pending"];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...salesCardSx,
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Detalle de la venta
        </Typography>
        <IconButton aria-label="Cerrar detalle" onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Venta #{sale.saleNumber}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <StatusBadge label={statusMeta.label} tone={statusMeta.tone} />
          <StatusBadge
            label={deliveryMeta.label}
            tone={deliveryMeta.tone}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <InfoRow
          icon={PersonOutlineRoundedIcon}
          label="Cliente"
          value={sale.customerName}
        />
        <InfoRow
          icon={PhoneOutlinedIcon}
          label="Teléfono"
          value={sale.customerPhone}
        />
        <InfoRow
          icon={CalendarTodayOutlinedIcon}
          label="Fecha"
          value={formatSaleDateTime(sale.soldAt)}
        />
        <InfoRow
          icon={AccountBalanceWalletOutlinedIcon}
          label="Método de pago"
          valueNode={
            <StatusBadge
              label={paymentMethodLabels[sale.paymentMethod]}
              tone={paymentMethodTone[sale.paymentMethod]}
            />
          }
        />
        {sale.notes && (
          <InfoRow
            icon={NotesOutlinedIcon}
            label="Observaciones"
            value={sale.notes}
          />
        )}
      </Box>

      <Divider />

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
          Productos ({sale.items.length})
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) 0.8fr 0.6fr 0.8fr",
            gap: 1,
            mb: 1,
            px: 0.5,
          }}
        >
          {["Producto", "Precio", "Cant.", "Subtotal"].map((header) => (
            <Typography
              key={header}
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                textAlign: header === "Producto" ? "left" : "right",
              }}
            >
              {header}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
          {sale.items.map((item) => {
            const lineTotal = item.unitPrice * item.quantity;

            return (
              <Box
                key={item.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.4fr) 0.8fr 0.6fr 0.8fr",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: "rgba(123, 47, 247, 0.12)",
                      color: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                    {item.name}
                  </Typography>
                </Box>
                <Typography variant="body2" align="right">
                  {formatCurrencyCOP(item.unitPrice)}
                </Typography>
                <Typography variant="body2" align="right">
                  {item.quantity}
                </Typography>
                <Typography
                  variant="body2"
                  align="right"
                  sx={{ fontWeight: 600 }}
                >
                  {formatCurrencyCOP(lineTotal)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 0.5,
        }}
      >
        <TotalsRow label="Subtotal" value={formatCurrencyCOP(sale.subtotal)} />
        <TotalsRow
          label="Descuento"
          value={
            sale.discount > 0
              ? `-${formatCurrencyCOP(sale.discount)}`
              : formatCurrencyCOP(0)
          }
          danger={sale.discount > 0}
        />
        <TotalsRow label="Envío" value={formatCurrencyCOP(sale.shipping)} />
        <TotalsRow
          label="Total"
          value={formatCurrencyCOP(sale.total)}
          emphasize
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.25,
          pt: 0.5,
        }}
      >
        <VendriButton
          variant="outlined"
          startIcon={<PrintOutlinedIcon />}
          sx={salesButtonSx}
        >
          Imprimir
        </VendriButton>
        <VendriButton
          variant="contained"
          startIcon={<DescriptionOutlinedIcon />}
          sx={{ ...salesButtonSx, boxShadow: "none" }}
        >
          Ver comprobante
        </VendriButton>
      </Box>
    </VendriCard>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  valueNode,
}: {
  icon: SvgIconComponent;
  label: string;
  value?: string;
  valueNode?: ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          display: "grid",
          placeItems: "center",
          backgroundColor: "rgba(123, 47, 247, 0.12)",
          color: "primary.main",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
      <Box sx={{ minWidth: 0, pt: 0.25 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        {valueNode ?? (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function TotalsRow({
  label,
  value,
  emphasize = false,
  danger = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
  danger?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 2,
        minWidth: 180,
      }}
    >
      <Typography
        variant={emphasize ? "body1" : "body2"}
        color="text.secondary"
        sx={{ fontWeight: emphasize ? 700 : 500 }}
      >
        {label}
      </Typography>
      <Typography
        variant={emphasize ? "body1" : "body2"}
        sx={{
          fontWeight: emphasize ? 700 : 600,
          color: danger ? "error.main" : "text.primary",
          minWidth: 90,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
