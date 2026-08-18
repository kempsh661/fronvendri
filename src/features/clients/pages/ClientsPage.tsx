import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { getApiErrorMessage } from "@/shared/api";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { ClientForm } from "../components/ClientForm";
import { ClientsHeader } from "../components/ClientsHeader";
import { ClientsSummaryCards } from "../components/ClientsSummaryCards";
import { ClientsTable } from "../components/ClientsTable";
import { DeleteClientDialog } from "../components/DeleteClientDialog";
import type { ClientFormData } from "../schemas/clientSchema";
import {
  createClient,
  deleteClient,
  listClients,
  updateClient,
} from "../services/clientsService";
import type { Client, ClientSummaryCardData } from "../types/clients.types";
import { mapApiClientToClient } from "../utils/clientMappers";
import { seedDemoData } from "@/features/companies/services/companyService";

export function ClientsPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        await seedDemoData().catch(() => undefined);
        const page = await listClients();
        if (!cancelled) {
          setClients(page.content.map(mapApiClientToClient));
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

  const summaryCards = useMemo<ClientSummaryCardData[]>(() => {
    const active = clients.filter((client) => client.status === "active").length;
    return [
      {
        id: "registered",
        label: "Clientes registrados",
        value: String(clients.length),
        accent: "primary",
        helper: "Total de clientes",
      },
      {
        id: "new-month",
        label: "Activos",
        value: String(active),
        accent: "success",
        helper: "Clientes activos",
      },
      {
        id: "with-orders",
        label: "Inactivos",
        value: String(clients.length - active),
        accent: "warning",
        helper: "Sin actividad",
      },
      {
        id: "avg-spend",
        label: "Gasto promedio",
        value: formatCurrencyCOP(0),
        accent: "info",
        helper: "Por cliente",
      },
    ];
  }, [clients]);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  const openCreateForm = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const openEditForm = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleSubmitSuccess = async (data: ClientFormData) => {
    try {
      if (editingClient) {
        const updated = await updateClient(editingClient.id, {
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim() || undefined,
          city: data.city.trim() || undefined,
          address: data.address.trim() || undefined,
          notes: data.notes.trim() || undefined,
          active: editingClient.status === "active",
        });
        setClients((current) =>
          current.map((client) =>
            client.id === editingClient.id
              ? mapApiClientToClient(updated)
              : client,
          ),
        );
      } else {
        const created = await createClient({
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim() || undefined,
          city: data.city.trim() || undefined,
          address: data.address.trim() || undefined,
          notes: data.notes.trim() || undefined,
        });
        setClients((current) => [mapApiClientToClient(created), ...current]);
      }
      closeForm();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleConfirmDelete = async () => {
    if (!clientToDelete) {
      return;
    }

    try {
      await deleteClient(clientToDelete.id);
      setClients((current) =>
        current.filter((client) => client.id !== clientToDelete.id),
      );

      if (editingClient?.id === clientToDelete.id) {
        closeForm();
      }

      setClientToDelete(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const form = isFormOpen ? (
    <ClientForm
      client={editingClient}
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
      <ClientsHeader
        search={search}
        onSearchChange={setSearch}
        onNewClient={openCreateForm}
      />
      <ClientsSummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando clientes…
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
        <ClientsTable
          clients={clients}
          search={search}
          onEdit={openEditForm}
          onDelete={setClientToDelete}
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

      <DeleteClientDialog
        client={clientToDelete}
        onCancel={() => setClientToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
