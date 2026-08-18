import { useEffect, useMemo, useState } from "react";

import Avatar from "@mui/material/Avatar";
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

import { useAuth } from "@/shared/auth";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import { supplierStatusConfig } from "../constants/supplierStatus";
import {
  SUPPLIERS_PAGE_SIZE,
  suppliersButtonSx,
  suppliersCardSx,
} from "../constants/suppliersUi";
import type { Supplier, SupplierStatusFilter } from "../types/suppliers.types";
import { formatLastPurchase } from "../utils/formatLastPurchase";

type SuppliersTableProps = {
  suppliers: Supplier[];
  search: string;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
};

export function SuppliersTable({
  suppliers,
  search,
  onEdit,
  onDelete,
}: SuppliersTableProps) {
  const { can } = useAuth();
  const canUpdate = can("suppliers:update");
  const canDelete = can("suppliers:delete");
  const showActions = canUpdate || canDelete;

  const [statusFilter, setStatusFilter] = useState<SupplierStatusFilter>("all");
  const [page, setPage] = useState(1);

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesStatus =
        statusFilter === "all" || supplier.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        supplier.name.toLowerCase().includes(normalizedSearch) ||
        supplier.contact.toLowerCase().includes(normalizedSearch) ||
        supplier.email.toLowerCase().includes(normalizedSearch) ||
        supplier.phone.toLowerCase().includes(normalizedSearch) ||
        supplier.city.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [suppliers, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSuppliers.length / SUPPLIERS_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * SUPPLIERS_PAGE_SIZE;
    return filteredSuppliers.slice(start, start + SUPPLIERS_PAGE_SIZE);
  }, [filteredSuppliers, currentPage]);

  const rangeStart =
    filteredSuppliers.length === 0
      ? 0
      : (currentPage - 1) * SUPPLIERS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * SUPPLIERS_PAGE_SIZE,
    filteredSuppliers.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...suppliersCardSx,
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
          Lista de proveedores
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <VendriInput
            select
            size="small"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as SupplierStatusFilter);
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
            <MenuItem value="active">Activos</MenuItem>
            <MenuItem value="inactive">Inactivos</MenuItem>
          </VendriInput>

          <VendriButton
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              ...suppliersButtonSx,
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
              <TableCell sx={{ fontWeight: 700 }}>Proveedor</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contacto</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Teléfono</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ciudad</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Última compra</TableCell>
              {showActions && (
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedSuppliers.map((supplier) => {
              const status = supplierStatusConfig[supplier.status];

              return (
                <TableRow key={supplier.id} hover>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "primary.main",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {supplier.avatarInitials}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700 }}
                          noWrap
                        >
                          {supplier.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {supplier.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{supplier.contact}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{supplier.phone}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{supplier.city}</Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {formatLastPurchase(supplier.lastPurchase)}
                    </Typography>
                  </TableCell>

                  {showActions && (
                    <TableCell align="right">
                      {canUpdate && (
                        <IconButton
                          aria-label={`Editar ${supplier.name}`}
                          size="small"
                          onClick={() => onEdit(supplier)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          aria-label={`Eliminar ${supplier.name}`}
                          size="small"
                          onClick={() => onDelete(supplier)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}

            {paginatedSuppliers.length === 0 && (
              <TableRow>
                <TableCell colSpan={showActions ? 7 : 6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay proveedores para este filtro.
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
          Mostrando {rangeStart} a {rangeEnd} de {filteredSuppliers.length}{" "}
          proveedores
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
