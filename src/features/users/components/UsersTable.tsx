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

import {
  userRoleConfig,
  userStatusConfig,
} from "../constants/userStatus";
import {
  USERS_PAGE_SIZE,
  usersButtonSx,
  usersCardSx,
} from "../constants/usersUi";
import type {
  AppUser,
  UserRoleFilter,
  UserStatusFilter,
} from "../types/users.types";
import { formatUserLastAccess } from "../utils/userHelpers";

type UsersTableProps = {
  users: AppUser[];
  search: string;
  onEdit: (user: AppUser) => void;
  onDelete: (user: AppUser) => void;
};

export function UsersTable({
  users,
  search,
  onEdit,
  onDelete,
}: UsersTableProps) {
  const { can } = useAuth();
  const canUpdate = can("users:update");
  const canDelete = can("users:delete");
  const showActions = canUpdate || canDelete;

  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>("all");
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>("all");
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        userRoleConfig[user.role].label.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesRole && matchesSearch;
    });
  }, [users, search, statusFilter, roleFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, roleFilter]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PAGE_SIZE;
    return filteredUsers.slice(start, start + USERS_PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const rangeStart =
    filteredUsers.length === 0
      ? 0
      : (currentPage - 1) * USERS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * USERS_PAGE_SIZE,
    filteredUsers.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...usersCardSx,
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
          Lista de usuarios
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
          <VendriInput
            select
            size="small"
            value={roleFilter}
            onChange={(event) => {
              setRoleFilter(event.target.value as UserRoleFilter);
            }}
            aria-label="Filtrar por rol"
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "background.default",
              },
            }}
          >
            <MenuItem value="all">Todos los roles</MenuItem>
            <MenuItem value="OWNER">Propietario</MenuItem>
            <MenuItem value="ADMIN">Administrador</MenuItem>
            <MenuItem value="STAFF">Personal</MenuItem>
          </VendriInput>

          <VendriInput
            select
            size="small"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as UserStatusFilter);
            }}
            aria-label="Filtrar por estado"
            sx={{
              minWidth: 160,
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
              ...usersButtonSx,
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
              <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actualizado</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              {showActions && (
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((user) => {
              const status = userStatusConfig[user.status];
              const role = userRoleConfig[user.role];

              return (
                <TableRow key={user.id} hover>
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
                        {user.avatarInitials}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700 }}
                          noWrap
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={role.label} tone={role.tone} />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatUserLastAccess(user.lastAccess)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  {showActions && (
                    <TableCell align="right">
                      {user.role !== "OWNER" && canUpdate && (
                        <IconButton
                          aria-label={`Editar ${user.name}`}
                          size="small"
                          onClick={() => onEdit(user)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      )}
                      {user.role !== "OWNER" && canDelete && (
                        <IconButton
                          aria-label={`Eliminar ${user.name}`}
                          size="small"
                          onClick={() => onDelete(user)}
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

            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={showActions ? 5 : 4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay usuarios para este filtro.
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
          Mostrando {rangeStart} a {rangeEnd} de {filteredUsers.length}{" "}
          usuarios
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
