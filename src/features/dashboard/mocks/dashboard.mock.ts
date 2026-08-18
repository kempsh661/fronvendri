import type {
  QuickAction,
  QuickSummaryItem,
  RecentOrder,
  SalesPoint,
  SummaryCardData,
  TopProduct,
} from "../types/dashboard.types";

export const summaryCardsMock: SummaryCardData[] = [
  {
    id: "orders",
    label: "Pedidos hoy",
    value: "24",
    accent: "primary",
    trend: {
      percent: 12,
      label: "vs ayer",
    },
    sparkline: [8, 10, 9, 14, 12, 16, 18, 15, 20, 22, 19, 24],
  },
  {
    id: "sales",
    label: "Ventas hoy",
    value: "$1.250.000",
    accent: "success",
    trend: {
      percent: 18,
      label: "vs ayer",
    },
    sparkline: [40, 45, 42, 55, 60, 58, 70, 68, 80, 85, 90, 95],
  },
  {
    id: "clients",
    label: "Clientes",
    value: "128",
    accent: "warning",
    trend: {
      percent: 8,
      label: "vs ayer",
    },
    sparkline: [90, 92, 95, 98, 100, 105, 108, 112, 115, 118, 122, 128],
  },
  {
    id: "products",
    label: "Productos",
    value: "86",
    accent: "info",
    action: {
      label: "Ver productos",
      href: "/products",
    },
  },
];

export const salesOverviewMock: SalesPoint[] = [
  { label: "Lun", amount: 620_000 },
  { label: "Mar", amount: 880_000 },
  { label: "Mié", amount: 740_000 },
  { label: "Jue", amount: 1_150_000 },
  { label: "Vie", amount: 980_000 },
  { label: "Sáb", amount: 1_320_000 },
  { label: "Dom", amount: 1_050_000 },
];

export const recentOrdersMock: RecentOrder[] = [
  {
    id: "1",
    orderNumber: "#VND-00024",
    customerName: "Laura Gómez",
    amount: 85_000,
    timeAgo: "Hace 1h",
    status: "pending",
    avatarInitials: "LG",
  },
  {
    id: "2",
    orderNumber: "#VND-00023",
    customerName: "Carlos Ruiz",
    amount: 120_000,
    timeAgo: "Hace 2h",
    status: "confirmed",
    avatarInitials: "CR",
  },
  {
    id: "3",
    orderNumber: "#VND-00022",
    customerName: "Ana Torres",
    amount: 64_500,
    timeAgo: "Hace 3h",
    status: "shipped",
    avatarInitials: "AT",
  },
  {
    id: "4",
    orderNumber: "#VND-00021",
    customerName: "Diego Pérez",
    amount: 210_000,
    timeAgo: "Hace 5h",
    status: "delivered",
    avatarInitials: "DP",
  },
  {
    id: "5",
    orderNumber: "#VND-00020",
    customerName: "Sofía Méndez",
    amount: 45_000,
    timeAgo: "Hace 6h",
    status: "confirmed",
    avatarInitials: "SM",
  },
];

export const quickSummaryMock: QuickSummaryItem[] = [
  {
    id: "month-sales",
    label: "Ventas del mes",
    value: "$12.450.000",
    accent: "success",
  },
  {
    id: "month-orders",
    label: "Pedidos del mes",
    value: "312",
    accent: "primary",
  },
  {
    id: "month-clients",
    label: "Clientes activos",
    value: "84",
    accent: "warning",
  },
  {
    id: "month-profit",
    label: "Ganancia estimada",
    value: "$3.280.000",
    accent: "info",
  },
];


export const topProductsMock: TopProduct[] = [
  {
    id: "1",
    rank: 1,
    name: "Bolso de mano Laura",
    salesCount: 48,
    price: 85_000,
    accent: "primary",
  },
  {
    id: "2",
    rank: 2,
    name: "Set de maquillaje Soft",
    salesCount: 36,
    price: 120_000,
    accent: "warning",
  },
  {
    id: "3",
    rank: 3,
    name: "Crema hidratante Glow",
    salesCount: 29,
    price: 64_500,
    accent: "success",
  },
  {
    id: "4",
    rank: 4,
    name: "Aretes perla Rosa",
    salesCount: 22,
    price: 45_000,
    accent: "info",
  },
];

export const quickActionsMock: QuickAction[] = [
  {
    id: "new-order",
    title: "Nuevo pedido",
    description: "Crea un pedido rápido",
    href: "/orders",
    accent: "primary",
  },
  {
    id: "add-product",
    title: "Agregar producto",
    description: "Suma al catálogo",
    href: "/products",
    accent: "info",
  },
  {
    id: "view-clients",
    title: "Ver clientes",
    description: "Tu base de contactos",
    href: "/clients",
    accent: "warning",
  },
  {
    id: "view-reports",
    title: "Ver reportes",
    description: "Analiza tu negocio",
    href: "/reports",
    accent: "success",
  },
];

