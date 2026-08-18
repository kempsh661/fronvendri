export type SettingsSectionId =
  | "business"
  | "preferences"
  | "notifications"
  | "security";

export type BusinessSettings = {
  businessName: string;
  nit: string;
  phone: string;
  email: string;
  city: string;
  address: string;
};

export type PreferenceSettings = {
  currency: "COP" | "USD";
  language: "es" | "en";
  lowStockThreshold: number;
};

export type NotificationSettings = {
  emailOrders: boolean;
  emailLowStock: boolean;
  emailDailySummary: boolean;
  pushSales: boolean;
};

export type AppSettings = {
  business: BusinessSettings;
  preferences: PreferenceSettings;
  notifications: NotificationSettings;
};
