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

import { orderStatusConfig } from "../constants/orderStatus";
import {
  ORDERS_PAGE_SIZE,
  ordersButtonSx,
  ordersCardSx,
} from "../constants/ordersUi";
import type { Order, OrderStatusFilter } from "../types/orders.types";
import { formatOrderDateTime } from "../utils/formatOrderDateTime";

type OrdersTableProps = {
  orders: Order[];
  search: string;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
};

export function OrdersTable({
  orders,
  search,
  onView,
  onEdit,
  onDelete,
}: OrdersTableProps) {
  const { can } = useAuth();
  const canUpdate = can("orders:update");
  const canDelete = can("orders:delete");

  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        order.orderNumber.toLowerCase().includes(normalizedSearch) ||
        order.customerName.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ORDERS_PAGE_SIZE;
    return filteredOrders.slice(start, start + ORDERS_PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  const rangeStart =
    filteredOrders.length === 0
      ? 0
      : (currentPage - 1) * ORDERS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * ORDERS_PAGE_SIZE,
    filteredOrders.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...ordersCardSx,
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
          Lista de pedidos
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <VendriInput
            select
            size="small"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as OrderStatusFilter);
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
            <MenuItem value="pending">Pendientes</MenuItem>
            <MenuItem value="in_progress">En proceso</MenuItem>
            <MenuItem value="delivered">Entregados</MenuItem>
            <MenuItem value="cancelled">Cancelados</MenuItem>
          </VendriInput>

          <VendriButton
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              ...ordersButtonSx,
              whiteSpace: "nowrap",
            }}
          >
            Exportar
          </VendriButton>
        </Box>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 880 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Pedido</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedOrders.map((order) => {
              const status = orderStatusConfig[order.status];

              return (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      #{order.orderNumber}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{order.customerName}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {formatOrderDateTime(order.createdAt)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrencyCOP(order.total)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label={`Ver ${order.orderNumber}`}
                      size="small"
                      onClick={() => onView(order)}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    {canUpdate && (
                      <IconButton
                        aria-label={`Editar ${order.orderNumber}`}
                        size="small"
                        onClick={() => onEdit(order)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    )}
                    {canDelete && (
                      <IconButton
                        aria-label={`Eliminar ${order.orderNumber}`}
                        size="small"
                        onClick={() => onDelete(order)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay pedidos para este filtro.
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
          Mostrando {rangeStart} a {rangeEnd} de {filteredOrders.length}{" "}
          pedidos
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
