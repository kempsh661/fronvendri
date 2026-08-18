import { Navigate, type RouteObject } from "react-router-dom";

import { AppLayout } from "@/layouts";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ClientsPage } from "@/features/clients/pages/ClientsPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { InventoryPage } from "@/features/inventory/pages/InventoryPage";
import { OrdersPage } from "@/features/orders/pages/OrdersPage";
import { ProductsPage } from "@/features/products/pages/ProductsPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { SalesPage } from "@/features/sales/pages/SalesPage";
import { SettingsPage } from "@/features/settings/pages/SettingsPage";
import { SuppliersPage } from "@/features/suppliers/pages/SuppliersPage";
import { UsersPage } from "@/features/users/pages/UsersPage";
import { RequireAuth, RequirePermission } from "@/shared/auth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <RequirePermission permission="dashboard:view">
            <DashboardPage />
          </RequirePermission>
        ),
      },
      {
        path: "/clients",
        element: (
          <RequirePermission permission="clients:view">
            <ClientsPage />
          </RequirePermission>
        ),
      },
      {
        path: "/suppliers",
        element: (
          <RequirePermission permission="suppliers:view">
            <SuppliersPage />
          </RequirePermission>
        ),
      },
      {
        path: "/products",
        element: (
          <RequirePermission permission="products:view">
            <ProductsPage />
          </RequirePermission>
        ),
      },
      {
        path: "/inventory",
        element: (
          <RequirePermission permission="inventory:view">
            <InventoryPage />
          </RequirePermission>
        ),
      },
      {
        path: "/orders",
        element: (
          <RequirePermission permission="orders:view">
            <OrdersPage />
          </RequirePermission>
        ),
      },
      {
        path: "/sales",
        element: (
          <RequirePermission permission="sales:view">
            <SalesPage />
          </RequirePermission>
        ),
      },
      {
        path: "/users",
        element: (
          <RequirePermission permission="users:view">
            <UsersPage />
          </RequirePermission>
        ),
      },
      {
        path: "/reports",
        element: (
          <RequirePermission permission="reports:view">
            <ReportsPage />
          </RequirePermission>
        ),
      },
      {
        path: "/settings",
        element: (
          <RequirePermission permission="settings:view">
            <SettingsPage />
          </RequirePermission>
        ),
      },
    ],
  },
];
