import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { VendriButton } from "@/shared/components/VendriButton";

import { suppliersButtonSx } from "../constants/suppliersUi";
import type { Supplier } from "../types/suppliers.types";

type DeleteSupplierDialogProps = {
  supplier: Supplier | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteSupplierDialog({
  supplier,
  onCancel,
  onConfirm,
}: DeleteSupplierDialogProps) {
  return (
    <Dialog open={Boolean(supplier)} onClose={onCancel}>
      <DialogTitle>Eliminar proveedor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Seguro que deseas eliminar a <strong>{supplier?.name}</strong>? Esta
          acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton
          variant="outlined"
          onClick={onCancel}
          sx={suppliersButtonSx}
        >
          Cancelar
        </VendriButton>
        <VendriButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ ...suppliersButtonSx, boxShadow: "none" }}
        >
          Eliminar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
