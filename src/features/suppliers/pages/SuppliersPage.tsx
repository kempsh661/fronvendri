import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { seedDemoData } from "@/features/companies/services/companyService";
import { getApiErrorMessage } from "@/shared/api";

import { DeleteSupplierDialog } from "../components/DeleteSupplierDialog";
import { SupplierForm } from "../components/SupplierForm";
import { SuppliersHeader } from "../components/SuppliersHeader";
import { SuppliersSummaryCards } from "../components/SuppliersSummaryCards";
import { SuppliersTable } from "../components/SuppliersTable";
import type { SupplierFormData } from "../schemas/supplierSchema";
import {
  createSupplier,
  deleteSupplier,
  listSuppliers,
  updateSupplier,
} from "../services/suppliersService";
import type { Supplier, SupplierSummaryCardData } from "../types/suppliers.types";
import { mapApiSupplierToSupplier } from "../utils/supplierMappers";

export function SuppliersPage() {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        await seedDemoData().catch(() => undefined);
        const page = await listSuppliers();
        if (!cancelled) {
          setSuppliers(page.content.map(mapApiSupplierToSupplier));
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

  const summaryCards = useMemo<SupplierSummaryCardData[]>(() => {
    const active = suppliers.filter((s) => s.status === "active").length;
    return [
      {
        id: "registered",
        label: "Proveedores",
        value: String(suppliers.length),
        accent: "primary",
        helper: "Total registrados",
      },
      {
        id: "new-month",
        label: "Activos",
        value: String(active),
        accent: "success",
        helper: "Disponibles",
      },
      {
        id: "active",
        label: "Inactivos",
        value: String(suppliers.length - active),
        accent: "warning",
        helper: "Sin actividad",
      },
      {
        id: "month-purchases",
        label: "Contactos",
        value: String(suppliers.filter((s) => s.phone).length),
        accent: "info",
        helper: "Con teléfono",
      },
    ];
  }, [suppliers]);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingSupplier(null);
  };

  const openCreateForm = () => {
    setEditingSupplier(null);
    setIsFormOpen(true);
  };

  const openEditForm = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleSubmitSuccess = async (data: SupplierFormData) => {
    try {
      if (editingSupplier) {
        const updated = await updateSupplier(editingSupplier.id, {
          name: data.name.trim(),
          contactName: data.contact.trim() || undefined,
          phone: data.phone.trim() || undefined,
          email: data.email.trim() || undefined,
          city: data.city.trim() || undefined,
          address: data.address.trim() || undefined,
          notes: data.notes.trim() || undefined,
          active: editingSupplier.status === "active",
        });
        setSuppliers((current) =>
          current.map((supplier) =>
            supplier.id === editingSupplier.id
              ? mapApiSupplierToSupplier(updated)
              : supplier,
          ),
        );
      } else {
        const created = await createSupplier({
          name: data.name.trim(),
          contactName: data.contact.trim() || undefined,
          phone: data.phone.trim() || undefined,
          email: data.email.trim() || undefined,
          city: data.city.trim() || undefined,
          address: data.address.trim() || undefined,
          notes: data.notes.trim() || undefined,
        });
        setSuppliers((current) => [
          mapApiSupplierToSupplier(created),
          ...current,
        ]);
      }
      closeForm();
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleConfirmDelete = async () => {
    if (!supplierToDelete) {
      return;
    }

    try {
      await deleteSupplier(supplierToDelete.id);
      setSuppliers((current) =>
        current.filter((supplier) => supplier.id !== supplierToDelete.id),
      );

      if (editingSupplier?.id === supplierToDelete.id) {
        closeForm();
      }

      setSupplierToDelete(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const form = isFormOpen ? (
    <SupplierForm
      supplier={editingSupplier}
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
      <SuppliersHeader
        search={search}
        onSearchChange={setSearch}
        onNewSupplier={openCreateForm}
      />
      <SuppliersSummaryCards cards={summaryCards} />

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Cargando proveedores…
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
        <SuppliersTable
          suppliers={suppliers}
          search={search}
          onEdit={openEditForm}
          onDelete={setSupplierToDelete}
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

      <DeleteSupplierDialog
        supplier={supplierToDelete}
        onCancel={() => setSupplierToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
