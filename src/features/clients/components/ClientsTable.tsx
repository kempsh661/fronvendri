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
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { clientStatusConfig } from "../constants/clientStatus";
import {
  CLIENTS_PAGE_SIZE,
  clientsButtonSx,
  clientsCardSx,
} from "../constants/clientsUi";
import type { Client, ClientStatusFilter } from "../types/clients.types";

type ClientsTableProps = {
  clients: Client[];
  search: string;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
};

export function ClientsTable({
  clients,
  search,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  const { can } = useAuth();
  const canUpdate = can("clients:update");
  const canDelete = can("clients:delete");
  const showActions = canUpdate || canDelete;

  const [statusFilter, setStatusFilter] = useState<ClientStatusFilter>("all");
  const [page, setPage] = useState(1);

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === "all" || client.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        client.name.toLowerCase().includes(normalizedSearch) ||
        client.email.toLowerCase().includes(normalizedSearch) ||
        client.phone.toLowerCase().includes(normalizedSearch) ||
        client.city.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [clients, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / CLIENTS_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * CLIENTS_PAGE_SIZE;
    return filteredClients.slice(start, start + CLIENTS_PAGE_SIZE);
  }, [filteredClients, currentPage]);

  const rangeStart =
    filteredClients.length === 0
      ? 0
      : (currentPage - 1) * CLIENTS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * CLIENTS_PAGE_SIZE,
    filteredClients.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...clientsCardSx,
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
          Lista de clientes
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <VendriInput
            select
            size="small"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as ClientStatusFilter);
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
              ...clientsButtonSx,
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
              <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contacto</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ciudad</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Total pedidos
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Total compras
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              {showActions && (
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedClients.map((client) => {
              const status = clientStatusConfig[client.status];

              return (
                <TableRow key={client.id} hover>
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
                        {client.avatarInitials}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700 }}
                          noWrap
                        >
                          {client.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {client.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{client.phone}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{client.city}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {client.totalOrders}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrencyCOP(client.totalSpend)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  {showActions && (
                    <TableCell align="right">
                      {canUpdate && (
                        <IconButton
                          aria-label={`Editar ${client.name}`}
                          size="small"
                          onClick={() => onEdit(client)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          aria-label={`Eliminar ${client.name}`}
                          size="small"
                          onClick={() => onDelete(client)}
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

            {paginatedClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={showActions ? 7 : 6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay clientes para este filtro.
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
          Mostrando {rangeStart} a {rangeEnd} de {filteredClients.length}{" "}
          clientes
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
