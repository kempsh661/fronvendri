import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { VendriButton } from "@/shared/components/VendriButton";

import { ordersButtonSx } from "../constants/ordersUi";
import type { Order } from "../types/orders.types";

type DeleteOrderDialogProps = {
  order: Order | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteOrderDialog({
  order,
  onCancel,
  onConfirm,
}: DeleteOrderDialogProps) {
  return (
    <Dialog open={Boolean(order)} onClose={onCancel}>
      <DialogTitle>Eliminar pedido</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Seguro que deseas eliminar el pedido{" "}
          <strong>#{order?.orderNumber}</strong>? Esta acción no se puede
          deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton variant="outlined" onClick={onCancel} sx={ordersButtonSx}>
          Cancelar
        </VendriButton>
        <VendriButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ ...ordersButtonSx, boxShadow: "none" }}
        >
          Eliminar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
