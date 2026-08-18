import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { VendriButton } from "@/shared/components/VendriButton";

import { salesButtonSx } from "../constants/salesUi";
import type { Sale } from "../types/sales.types";

type DeleteSaleDialogProps = {
  sale: Sale | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteSaleDialog({
  sale,
  onCancel,
  onConfirm,
}: DeleteSaleDialogProps) {
  return (
    <Dialog open={Boolean(sale)} onClose={onCancel}>
      <DialogTitle>Eliminar venta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Seguro que deseas eliminar la venta{" "}
          <strong>#{sale?.saleNumber}</strong>? Esta acción no se puede
          deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton variant="outlined" onClick={onCancel} sx={salesButtonSx}>
          Cancelar
        </VendriButton>
        <VendriButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ ...salesButtonSx, boxShadow: "none" }}
        >
          Eliminar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
