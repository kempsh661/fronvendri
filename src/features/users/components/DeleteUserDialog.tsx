import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { VendriButton } from "@/shared/components/VendriButton";

import { usersButtonSx } from "../constants/usersUi";
import type { AppUser } from "../types/users.types";

type DeleteUserDialogProps = {
  user: AppUser | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteUserDialog({
  user,
  onCancel,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <Dialog open={Boolean(user)} onClose={onCancel}>
      <DialogTitle>Eliminar usuario</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Seguro que deseas eliminar a <strong>{user?.name}</strong>? Esta
          acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton variant="outlined" onClick={onCancel} sx={usersButtonSx}>
          Cancelar
        </VendriButton>
        <VendriButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ ...usersButtonSx, boxShadow: "none" }}
        >
          Eliminar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
