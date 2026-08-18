import { useEffect, useMemo, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { useAuth } from "@/shared/auth";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";

import { stockLevelConfig } from "../constants/stockLevel";
import {
  INVENTORY_PAGE_SIZE,
  inventoryButtonSx,
  inventoryCardSx,
} from "../constants/inventoryUi";
import type {
  InventoryItem,
  InventoryMovementType,
  StockLevelFilter,
} from "../types/inventory.types";
import { getInventoryItemLevel } from "../utils/stockLevel";

type InventoryTableProps = {
  items: InventoryItem[];
  search: string;
  onView: (item: InventoryItem) => void;
  onRegisterMovement: (
    item: InventoryItem,
    type: InventoryMovementType,
  ) => void;
};

export function InventoryTable({
  items,
  search,
  onView,
  onRegisterMovement,
}: InventoryTableProps) {
  const { can } = useAuth();
  const canManage = can("inventory:manage");

  const [levelFilter, setLevelFilter] = useState<StockLevelFilter>("all");
  const [page, setPage] = useState(1);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuItem, setMenuItem] = useState<InventoryItem | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      const level = getInventoryItemLevel(item);
      const matchesLevel = levelFilter === "all" || level === levelFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.sku.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch);

      return matchesLevel && matchesSearch;
    });
  }, [items, search, levelFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / INVENTORY_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, levelFilter]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * INVENTORY_PAGE_SIZE;
    return filteredItems.slice(start, start + INVENTORY_PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const rangeStart =
    filteredItems.length === 0
      ? 0
      : (currentPage - 1) * INVENTORY_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * INVENTORY_PAGE_SIZE,
    filteredItems.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...inventoryCardSx,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Existencias por producto
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <VendriInput
            select
            size="small"
            value={levelFilter}
            onChange={(event) => {
              setLevelFilter(event.target.value as StockLevelFilter);
            }}
            aria-label="Filtrar por estado de stock"
            sx={{
              minWidth: 180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "background.default",
              },
            }}
          >
            <MenuItem value="all">Todos los productos</MenuItem>
            <MenuItem value="optimal">Óptimo</MenuItem>
            <MenuItem value="low">Bajo</MenuItem>
            <MenuItem value="critical">Crítico</MenuItem>
          </VendriInput>

          <VendriButton
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              ...inventoryButtonSx,
              whiteSpace: "nowrap",
            }}
          >
            Exportar
          </VendriButton>
        </Box>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 920 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Stock disponible
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Stock mínimo
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Stock máximo
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedItems.map((item) => {
              const level = getInventoryItemLevel(item);
              const status = stockLevelConfig[level];

              return (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                    >
                      <Avatar
                        src={item.imageUrl}
                        variant="rounded"
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "rgba(123, 47, 247, 0.12)",
                          color: "primary.main",
                        }}
                      >
                        <Inventory2OutlinedIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700 }}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          SKU: {item.sku}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{item.category}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.availableStock}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2">{item.minStock}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2">{item.maxStock}</Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label={`Ver historial de ${item.name}`}
                      size="small"
                      onClick={() => onView(item)}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    {canManage && (
                      <IconButton
                        aria-label={`Más acciones de ${item.name}`}
                        size="small"
                        onClick={(event) => {
                          setMenuAnchor(event.currentTarget);
                          setMenuItem(item);
                        }}
                      >
                        <KeyboardArrowDownRoundedIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {paginatedItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay productos para este filtro.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Mostrando {rangeStart} a {rangeEnd} de {filteredItems.length}{" "}
          productos
        </Typography>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="small"
        />
      </Box>

      {canManage && (
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => {
            setMenuAnchor(null);
            setMenuItem(null);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              if (menuItem) {
                onRegisterMovement(menuItem, "entry");
              }
              setMenuAnchor(null);
              setMenuItem(null);
            }}
          >
            Registrar entrada
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (menuItem) {
                onRegisterMovement(menuItem, "exit");
              }
              setMenuAnchor(null);
              setMenuItem(null);
            }}
          >
            Registrar salida
          </MenuItem>
        </Menu>
      )}
    </VendriCard>
  );
}
