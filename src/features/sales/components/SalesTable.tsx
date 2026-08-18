import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { useAuth } from "@/shared/auth";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import {
  deliveryStatusConfig,
  paymentMethodLabels,
  paymentMethodTone,
  saleStatusConfig,
} from "../constants/saleStatus";
import {
  SALES_PAGE_SIZE,
  salesButtonSx,
  salesCardSx,
} from "../constants/salesUi";
import type { Sale, SaleStatusFilter } from "../types/sales.types";
import { formatSaleDateTime } from "../utils/formatSaleDateTime";

type SalesTableProps = {
  sales: Sale[];
  search: string;
  onView: (sale: Sale) => void;
  onEdit: (sale: Sale) => void;
  onDelete: (sale: Sale) => void;
};

export function SalesTable({
  sales,
  search,
  onView,
  onEdit,
  onDelete,
}: SalesTableProps) {
  const { can } = useAuth();
  const canUpdate = can("sales:update");
  const canDelete = can("sales:delete");

  const [statusFilter, setStatusFilter] = useState<SaleStatusFilter>("all");
  const [page, setPage] = useState(1);

  const filteredSales = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return sales.filter((sale) => {
      const matchesStatus =
        statusFilter === "all" || sale.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        sale.saleNumber.toLowerCase().includes(normalizedSearch) ||
        sale.customerName.toLowerCase().includes(normalizedSearch) ||
        (sale.orderNumber?.toLowerCase().includes(normalizedSearch) ?? false);

      return matchesStatus && matchesSearch;
    });
  }, [sales, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSales.length / SALES_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * SALES_PAGE_SIZE;
    return filteredSales.slice(start, start + SALES_PAGE_SIZE);
  }, [filteredSales, currentPage]);

  const rangeStart =
    filteredSales.length === 0 ? 0 : (currentPage - 1) * SALES_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * SALES_PAGE_SIZE,
    filteredSales.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...salesCardSx,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Lista de ventas
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <VendriInput
            select
            size="small"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as SaleStatusFilter);
            }}
            aria-label="Filtrar por estado"
            sx={{
              minWidth: 180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "background.default",
              },
            }}
          >
            <MenuItem value="all">Todos los estados</MenuItem>
            <MenuItem value="paid">Pagadas</MenuItem>
            <MenuItem value="pending">Pendientes</MenuItem>
            <MenuItem value="refunded">Reembolsadas</MenuItem>
          </VendriInput>

          <VendriButton
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              ...salesButtonSx,
              whiteSpace: "nowrap",
            }}
          >
            Exportar
          </VendriButton>
        </Box>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 920 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Pedido</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Método de pago</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Pago</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Entrega</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedSales.map((sale) => {
              const status =
                saleStatusConfig[sale.status] ?? saleStatusConfig.pending;
              const delivery =
                deliveryStatusConfig[sale.deliveryStatus ?? "pending"];
              const paymentLabel =
                paymentMethodLabels[sale.paymentMethod] ?? "Otro";
              const paymentTone =
                paymentMethodTone[sale.paymentMethod] ?? "neutral";

              return (
                <TableRow key={sale.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {formatSaleDateTime(sale.soldAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        #{sale.saleNumber}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{sale.customerName}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {sale.orderNumber ? `#${sale.orderNumber}` : "—"}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrencyCOP(sale.total)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={paymentLabel} tone={paymentTone} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={delivery.label} tone={delivery.tone} />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label={`Ver ${sale.saleNumber}`}
                      size="small"
                      onClick={() => onView(sale)}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    {canUpdate && (
                      <IconButton
                        aria-label={`Editar ${sale.saleNumber}`}
                        size="small"
                        onClick={() => onEdit(sale)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    )}
                    {canDelete && (
                      <IconButton
                        aria-label={`Eliminar ${sale.saleNumber}`}
                        size="small"
                        onClick={() => onDelete(sale)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {paginatedSales.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay ventas para este filtro.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Mostrando {rangeStart} a {rangeEnd} de {filteredSales.length} ventas
        </Typography>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="small"
        />
      </Box>
    </VendriCard>
  );
}
