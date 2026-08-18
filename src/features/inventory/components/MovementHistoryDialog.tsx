import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import { VendriButton } from "@/shared/components/VendriButton";

import {
  inventoryActionAccentStyles,
  inventoryButtonSx,
} from "../constants/inventoryUi";
import type { InventoryMovement } from "../types/inventory.types";
import { formatMovementDateTime } from "../utils/formatMovementDateTime";

type MovementHistoryDialogProps = {
  open: boolean;
  movements: InventoryMovement[];
  onClose: () => void;
};

export function MovementHistoryDialog({
  open,
  movements,
  onClose,
}: MovementHistoryDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Historial de movimientos</DialogTitle>
      <DialogContent dividers>
        {movements.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aún no hay movimientos registrados.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {movements.map((movement) => {
              const isEntry = movement.type === "entry";
              const accent =
                inventoryActionAccentStyles[isEntry ? "success" : "danger"];
              const Icon = isEntry
                ? ArrowDownwardRoundedIcon
                : ArrowUpwardRoundedIcon;

              return (
                <Box
                  key={movement.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      flexShrink: 0,
                      borderRadius: "10px",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: accent.iconBg,
                      color: accent.iconColor,
                    }}
                  >
                    <Icon sx={{ fontSize: 16 }} />
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700 }}
                      noWrap
                    >
                      {isEntry
                        ? "Entrada de inventario"
                        : "Salida de inventario"}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                    >
                      {movement.productName}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: isEntry ? "success.main" : "error.main",
                      }}
                    >
                      {isEntry ? "+" : "-"}
                      {movement.quantity} und.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatMovementDateTime(movement.occurredAt)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <VendriButton
          variant="contained"
          onClick={onClose}
          sx={{ ...inventoryButtonSx, boxShadow: "none" }}
        >
          Cerrar
        </VendriButton>
      </DialogActions>
    </Dialog>
  );
}
