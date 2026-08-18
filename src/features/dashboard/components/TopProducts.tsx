import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { VendriCard } from "@/shared/components/VendriCard";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import {
  accentSolidColors,
  dashboardCardSx,
} from "../constants/dashboardUi";
import type { TopProduct } from "../types/dashboard.types";

type TopProductsProps = {
  products: TopProduct[];
  loading?: boolean;
};

export function TopProducts({ products, loading = false }: TopProductsProps) {
  return (
    <VendriCard
      elevation={0}
      sx={{
        ...dashboardCardSx,
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 1.25,
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Productos más vendidos
        </Typography>

        <Link
          href="/products"
          underline="hover"
          sx={{ fontSize: 13, fontWeight: 600, color: "primary.main" }}
        >
          Ver todos
        </Link>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: products.length ? "space-between" : "center",
          gap: 1,
        }}
      >
        {loading && products.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Cargando productos…
          </Typography>
        ) : products.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aún no hay ventas de productos.
          </Typography>
        ) : (
          products.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: 16, fontWeight: 700, fontSize: 13 }}
              >
                {product.rank}
              </Typography>

              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  backgroundColor: accentSolidColors[product.accent],
                  opacity: 0.85,
                  flexShrink: 0,
                }}
                aria-hidden
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: 13 }}
                  noWrap
                >
                  {product.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product.salesCount} ventas
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>
                {formatCurrencyCOP(product.price)}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </VendriCard>
  );
}
