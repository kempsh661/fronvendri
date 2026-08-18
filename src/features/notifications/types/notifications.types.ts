export type NotificationType = "order_pending" | "order_confirmed" | "low_stock";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  href: string;
  createdAt: string;
};
