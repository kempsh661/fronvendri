import type {
  ReportCategoryPoint,
  ReportPaymentPoint,
  ReportPeriod,
  ReportSalesPoint,
  ReportSummaryCardData,
  ReportTopProduct,
} from "../types/reports.types";

export const reportsSummaryByPeriod: Record<
  ReportPeriod,
  ReportSummaryCardData[]
> = {
  week: [
    {
      id: "period-sales",
      label: "Ventas del periodo",
      value: "$3.240.000",
      accent: "primary",
      trend: { percent: 8, label: "vs semana anterior" },
    },
    {
      id: "period-orders",
      label: "Pedidos",
      value: "24",
      accent: "success",
      helper: "Esta semana",
    },
    {
      id: "avg-ticket",
      label: "Ticket promedio",
      value: "$135.000",
      accent: "warning",
      helper: "Por venta",
    },
    {
      id: "estimated-profit",
      label: "Ganancia estimada",
      value: "$980.000",
      accent: "info",
      helper: "Margen ~30%",
    },
  ],
  month: [
    {
      id: "period-sales",
      label: "Ventas del periodo",
      value: "$12.450.000",
      accent: "primary",
      trend: { percent: 12, label: "vs mes anterior" },
    },
    {
      id: "period-orders",
      label: "Pedidos",
      value: "86",
      accent: "success",
      helper: "Este mes",
    },
    {
      id: "avg-ticket",
      label: "Ticket promedio",
      value: "$144.767",
      accent: "warning",
      helper: "Por venta",
    },
    {
      id: "estimated-profit",
      label: "Ganancia estimada",
      value: "$4.180.000",
      accent: "info",
      helper: "Margen ~33%",
    },
  ],
  year: [
    {
      id: "period-sales",
      label: "Ventas del periodo",
      value: "$98.600.000",
      accent: "primary",
      trend: { percent: 18, label: "vs año anterior" },
    },
    {
      id: "period-orders",
      label: "Pedidos",
      value: "642",
      accent: "success",
      helper: "Este año",
    },
    {
      id: "avg-ticket",
      label: "Ticket promedio",
      value: "$153.582",
      accent: "warning",
      helper: "Por venta",
    },
    {
      id: "estimated-profit",
      label: "Ganancia estimada",
      value: "$31.200.000",
      accent: "info",
      helper: "Margen ~32%",
    },
  ],
};

export const reportsSalesByPeriod: Record<ReportPeriod, ReportSalesPoint[]> = {
  week: [
    { label: "Lun", amount: 420_000 },
    { label: "Mar", amount: 380_000 },
    { label: "Mié", amount: 510_000 },
    { label: "Jue", amount: 460_000 },
    { label: "Vie", amount: 620_000 },
    { label: "Sáb", amount: 540_000 },
    { label: "Dom", amount: 310_000 },
  ],
  month: [
    { label: "Sem 1", amount: 2_800_000 },
    { label: "Sem 2", amount: 3_150_000 },
    { label: "Sem 3", amount: 2_950_000 },
    { label: "Sem 4", amount: 3_550_000 },
  ],
  year: [
    { label: "Ene", amount: 6_200_000 },
    { label: "Feb", amount: 7_100_000 },
    { label: "Mar", amount: 8_400_000 },
    { label: "Abr", amount: 7_800_000 },
    { label: "May", amount: 9_200_000 },
    { label: "Jun", amount: 8_900_000 },
    { label: "Jul", amount: 10_100_000 },
    { label: "Ago", amount: 9_600_000 },
    { label: "Sep", amount: 8_300_000 },
    { label: "Oct", amount: 7_900_000 },
    { label: "Nov", amount: 8_700_000 },
    { label: "Dic", amount: 6_400_000 },
  ],
};

export const reportsCategoriesByPeriod: Record<
  ReportPeriod,
  ReportCategoryPoint[]
> = {
  week: [
    { category: "Bolsos", amount: 980_000 },
    { category: "Ropa", amount: 860_000 },
    { category: "Calzado", amount: 720_000 },
    { category: "Accesorios", amount: 680_000 },
  ],
  month: [
    { category: "Bolsos", amount: 3_850_000 },
    { category: "Ropa", amount: 3_420_000 },
    { category: "Calzado", amount: 2_910_000 },
    { category: "Accesorios", amount: 2_270_000 },
  ],
  year: [
    { category: "Bolsos", amount: 28_400_000 },
    { category: "Ropa", amount: 26_100_000 },
    { category: "Calzado", amount: 24_800_000 },
    { category: "Accesorios", amount: 19_300_000 },
  ],
};

export const reportsPaymentsByPeriod: Record<
  ReportPeriod,
  ReportPaymentPoint[]
> = {
  week: [
    { method: "Efectivo", amount: 1_120_000, percent: 35 },
    { method: "Nequi", amount: 980_000, percent: 30 },
    { method: "Tarjeta", amount: 720_000, percent: 22 },
    { method: "Transferencia", amount: 420_000, percent: 13 },
  ],
  month: [
    { method: "Efectivo", amount: 4_100_000, percent: 33 },
    { method: "Nequi", amount: 3_600_000, percent: 29 },
    { method: "Tarjeta", amount: 2_900_000, percent: 23 },
    { method: "Transferencia", amount: 1_850_000, percent: 15 },
  ],
  year: [
    { method: "Efectivo", amount: 32_000_000, percent: 32 },
    { method: "Nequi", amount: 28_500_000, percent: 29 },
    { method: "Tarjeta", amount: 22_800_000, percent: 23 },
    { method: "Transferencia", amount: 15_300_000, percent: 16 },
  ],
};

export const reportsTopProductsByPeriod: Record<
  ReportPeriod,
  ReportTopProduct[]
> = {
  week: [
    { id: "1", rank: 1, name: "Bolso de mano Laura", units: 12, revenue: 1_440_000 },
    { id: "2", rank: 2, name: "Vestido floral", units: 9, revenue: 855_000 },
    { id: "3", rank: 3, name: "Zapatillas Urban Run", units: 6, revenue: 1_080_000 },
    { id: "4", rank: 4, name: "Gafas de sol Luxe", units: 8, revenue: 640_000 },
    { id: "5", rank: 5, name: "Jeans mom fit", units: 7, revenue: 665_000 },
  ],
  month: [
    { id: "1", rank: 1, name: "Bolso de mano Laura", units: 48, revenue: 5_760_000 },
    { id: "2", rank: 2, name: "Tenis blancos Mint", units: 22, revenue: 4_620_000 },
    { id: "3", rank: 3, name: "Vestido floral", units: 35, revenue: 3_325_000 },
    { id: "4", rank: 4, name: "Chaqueta denim", units: 18, revenue: 2_700_000 },
    { id: "5", rank: 5, name: "Mochila Urbana", units: 20, revenue: 2_700_000 },
  ],
  year: [
    { id: "1", rank: 1, name: "Bolso de mano Laura", units: 310, revenue: 37_200_000 },
    { id: "2", rank: 2, name: "Tenis blancos Mint", units: 145, revenue: 30_450_000 },
    { id: "3", rank: 3, name: "Vestido floral", units: 260, revenue: 24_700_000 },
    { id: "4", rank: 4, name: "Jeans mom fit", units: 210, revenue: 19_950_000 },
    { id: "5", rank: 5, name: "Chaqueta denim", units: 120, revenue: 18_000_000 },
  ],
};
