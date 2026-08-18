import type { AppSettings } from "../types/settings.types";

export const settingsMock: AppSettings = {
  business: {
    businessName: "Vendri Boutique",
    nit: "901.234.567-8",
    phone: "300 123 4567",
    email: "hola@vendri.co",
    city: "Bogotá",
    address: "Calle 123 #45-67",
  },
  preferences: {
    currency: "COP",
    language: "es",
    lowStockThreshold: 5,
  },
  notifications: {
    emailOrders: true,
    emailLowStock: true,
    emailDailySummary: false,
    pushSales: true,
  },
};
