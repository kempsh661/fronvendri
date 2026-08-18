import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { VendriCard } from "@/shared/components/VendriCard";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { reportsCardSx } from "../constants/reportsUi";
import { reportsTopProductsByPeriod } from "../mocks/reports.mock";
import type { ReportPeriod } from "../types/reports.types";

type ReportsTopProductsProps = {
  period: ReportPeriod;
};

export function ReportsTopProducts({ period }: ReportsTopProductsProps) {
  const products = reportsTopProductsByPeriod[period];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...reportsCardSx,
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Productos más vendidos
      </Typography>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 420 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Unidades
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Ingresos
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "8px",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "rgba(123, 47, 247, 0.12)",
                      color: "primary.main",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {product.rank}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">{product.units}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrencyCOP(product.revenue)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </VendriCard>
  );
}
