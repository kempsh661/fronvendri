import type { SvgIconComponent } from "@mui/icons-material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export type AppNavItem = {
  label: string;
  path: string;
  icon: SvgIconComponent;
  enabled: boolean;
  badge?: number;
};

export const navigationItems: AppNavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardOutlinedIcon,
    enabled: true,
  },
  {
    label: "Clientes",
    path: "/clients",
    icon: PeopleOutlinedIcon,
    enabled: true,
  },
  {
    label: "Proveedores",
    path: "/suppliers",
    icon: LocalShippingOutlinedIcon,
    enabled: true,
  },
  {
    label: "Productos",
    path: "/products",
    icon: Inventory2OutlinedIcon,
    enabled: true,
  },
  {
    label: "Inventario",
    path: "/inventory",
    icon: WarehouseOutlinedIcon,
    enabled: true,
  },
  {
    label: "Pedidos",
    path: "/orders",
    icon: ShoppingBagOutlinedIcon,
    enabled: true,
    badge: 24,
  },
  {
    label: "Ventas",
    path: "/sales",
    icon: PointOfSaleOutlinedIcon,
    enabled: true,
  },
  {
    label: "Usuarios",
    path: "/users",
    icon: GroupOutlinedIcon,
    enabled: true,
  },
  {
    label: "Reportes",
    path: "/reports",
    icon: AssessmentOutlinedIcon,
    enabled: true,
  },
  {
    label: "Configuración",
    path: "/settings",
    icon: SettingsOutlinedIcon,
    enabled: true,
  },
];
