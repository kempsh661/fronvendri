import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { VendriButton } from "@/shared/components/VendriButton";

import { productsButtonSx } from "../constants/productsUi";
import type { Product } from "../types/products.types";

type DeleteProductDialogProps = {
  product: Product | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteProductDialog({
  product,
  onCancel,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Dialog open={Boolean(product)} onClose={onCancel}>
      <DialogTitle>Eliminar producto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Seguro que deseas eliminar <strong>{product?.name}</strong>? Esta
          acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton
          variant="outlined"
          onClick={onCancel}
          sx={productsButtonSx}
        >
          Cancelar
        </VendriButton>
        <VendriButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ ...productsButtonSx, boxShadow: "none" }}
        >
          Eliminar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
