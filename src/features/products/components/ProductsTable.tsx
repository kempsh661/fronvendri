import { useEffect, useMemo, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { useAuth } from "@/shared/auth";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { productStatusConfig } from "../constants/productStatus";
import {
  PRODUCTS_PAGE_SIZE,
  productsButtonSx,
  productsCardSx,
} from "../constants/productsUi";
import type { Product, ProductStatusFilter } from "../types/products.types";

type ProductsTableProps = {
  products: Product[];
  search: string;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductsTable({
  products,
  search,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const { can } = useAuth();
  const canUpdate = can("products:update");
  const canDelete = can("products:delete");
  const showActions = canUpdate || canDelete;

  const [statusFilter, setStatusFilter] = useState<ProductStatusFilter>("all");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.sku.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [products, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PAGE_SIZE;
    return filteredProducts.slice(start, start + PRODUCTS_PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const rangeStart =
    filteredProducts.length === 0
      ? 0
      : (currentPage - 1) * PRODUCTS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    currentPage * PRODUCTS_PAGE_SIZE,
    filteredProducts.length,
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...productsCardSx,
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
          Lista de productos
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <VendriInput
            select
            size="small"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as ProductStatusFilter);
            }}
            aria-label="Filtrar por estado"
            sx={{
              minWidth: 180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "background.default",
              },
            }}
          >
            <MenuItem value="all">Todos los estados</MenuItem>
            <MenuItem value="active">Activos</MenuItem>
            <MenuItem value="inactive">Inactivos</MenuItem>
          </VendriInput>

          <VendriButton
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              ...productsButtonSx,
              whiteSpace: "nowrap",
            }}
          >
            Exportar
          </VendriButton>
        </Box>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 880 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Precio de venta
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Stock
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              {showActions && (
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.map((product) => {
              const status = productStatusConfig[product.status];

              return (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                    >
                      <Avatar
                        src={product.imageUrl}
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
                          {product.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          SKU: {product.sku}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{product.category}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrencyCOP(product.salePrice)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {product.stock}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </TableCell>

                  {showActions && (
                    <TableCell align="right">
                      {canUpdate && (
                        <IconButton
                          aria-label={`Editar ${product.name}`}
                          size="small"
                          onClick={() => onEdit(product)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          aria-label={`Eliminar ${product.name}`}
                          size="small"
                          onClick={() => onDelete(product)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}

            {paginatedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={showActions ? 6 : 5} align="center" sx={{ py: 4 }}>
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
          Mostrando {rangeStart} a {rangeEnd} de {filteredProducts.length}{" "}
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
    </VendriCard>
  );
}
