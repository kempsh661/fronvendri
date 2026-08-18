import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { getApiErrorMessage } from "@/shared/api";

import { DeleteUserDialog } from "../components/DeleteUserDialog";
import { UserForm } from "../components/UserForm";
import { UsersHeader } from "../components/UsersHeader";
import { UsersSummaryCards } from "../components/UsersSummaryCards";
import { UsersTable } from "../components/UsersTable";
import type { UserFormData } from "../schemas/userSchema";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "../services/usersService";
import type { AppUser, UserSummaryCardData } from "../types/users.types";
import { mapApiUserToAppUser } from "../utils/userMappers";

export function UsersPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const [users, setUsers] = useState<AppUser[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const page = await listUsers();
        if (!cancelled) {
          setUsers(page.content.map(mapApiUserToAppUser));
        }
      } catch (err) {
        if (!cancelled) {
          setError(getApiErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const summaryCards = useMemo<UserSummaryCardData[]>(() => {
    const active = users.filter((user) => user.status === "active").length;
    const admins = users.filter((user) => user.role === "ADMIN").length;
    const staff = users.filter((user) => user.role === "STAFF").length;
    return [
      {
        id: "registered",
        label: "Usuarios",
        value: String(users.length),
        accent: "primary",
        helper: "Total en la empresa",
      },
      {
        id: "active",
        label: "Activos",
        value: String(active),
        accent: "success",
        helper: "Pueden iniciar sesión",
      },
      {
        id: "admins",
        label: "Administradores",
        value: String(admins),
        accent: "warning",
        helper: "Rol ADMIN",
      },
      {
        id: "new-month",
        label: "Personal",
        value: String(staff),
        accent: "info",
        helper: "Rol STAFF",
      },
    ];
  }, [users]);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const openCreateForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user: AppUser) => {
    if (user.role === "OWNER") {
      return;
    }
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSubmitSuccess = async (data: UserFormData) => {
    try {
      if (editingUser) {
        const password = data.password.trim();
        const updated = await updateUser(editingUser.id, {
          fullName: data.name.trim(),
          role: data.role,
          active: data.status === "active",
          ...(password ? { password } : {}),
        });
        setUsers((current) =>
          current.map((user) =>
            user.id === editingUser.id ? mapApiUserToAppUser(updated) : user,
          ),
        );
      } else {
        const created = await createUser({
          fullName: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
          role: data.role,
        });
        setUsers((current) => [mapApiUserToAppUser(created), ...current]);
      }
      closeForm();
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      await deleteUser(userToDelete.id);
      setUsers((current) =>
        current.filter((user) => user.id !== userToDelete.id),
      );

      if (editingUser?.id === userToDelete.id) {
        closeForm();
      }

      setUserToDelete(null);
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const form = isFormOpen ? (
    <UserForm
      user={editingUser}
      onCancel={closeForm}
      onSubmitSuccess={handleSubmitSuccess}
    />
  ) : null;

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pb: 2,
      }}
    >
      <UsersHeader
        search={search}
        onSearchChange={setSearch}
        onNewUser={openCreateForm}
      />
      <UsersSummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando usuarios…
        </Typography>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: isFormOpen ? "minmax(0, 1fr) 360px" : "1fr",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        <UsersTable
          users={users}
          search={search}
          onEdit={openEditForm}
          onDelete={setUserToDelete}
        />

        {isFormOpen && !isCompact && form}
      </Box>

      <Drawer
        anchor="right"
        open={isFormOpen && isCompact}
        onClose={closeForm}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 400 },
              p: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%" }}>{form}</Box>
      </Drawer>

      <DeleteUserDialog
        user={userToDelete}
        onCancel={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
