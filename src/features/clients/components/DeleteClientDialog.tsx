import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { VendriButton } from "@/shared/components/VendriButton";

import { clientsButtonSx } from "../constants/clientsUi";
import type { Client } from "../types/clients.types";

type DeleteClientDialogProps = {
  client: Client | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteClientDialog({
  client,
  onCancel,
  onConfirm,
}: DeleteClientDialogProps) {
  return (
    <Dialog open={Boolean(client)} onClose={onCancel}>
      <DialogTitle>Eliminar cliente</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Seguro que deseas eliminar a <strong>{client?.name}</strong>? Esta
          acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton variant="outlined" onClick={onCancel} sx={clientsButtonSx}>
          Cancelar
        </VendriButton>
        <VendriButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ ...clientsButtonSx, boxShadow: "none" }}
        >
          Eliminar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
