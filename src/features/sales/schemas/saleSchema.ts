import { z } from "zod";

const moneyField = (label: string, { allowZero = true } = {}) =>
  z
    .string()
    .min(1, `${label} es obligatorio`)
    .refine(
      (value) => !Number.isNaN(Number(value)) && Number(value) >= 0,
      `Ingresa un ${label.toLowerCase()} válido`,
    )
    .refine(
      (value) => allowZero || Number(value) > 0,
      `Ingresa un ${label.toLowerCase()} válido`,
    );

export const saleSchema = z
  .object({
    clientId: z.string().min(1, "Selecciona un cliente de la lista"),
    customerPhone: z.string(),
    orderId: z.string().min(1, "Selecciona un pedido del cliente"),
    orderNumber: z.string(),
    subtotal: moneyField("Subtotal", { allowZero: false }),
    discount: moneyField("Descuento"),
    shipping: moneyField("Envío"),
    paymentMethod: z.enum(["cash", "nequi", "transfer", "card", "other"], {
      message: "Selecciona un método de pago",
    }),
    paymentStatus: z.enum(["paid", "pending"], {
      message: "Selecciona el estado de pago",
    }),
    deliveryStatus: z.enum(["delivered", "pending"], {
      message: "Selecciona el estado de entrega",
    }),
    notes: z.string(),
  })
  .superRefine((data, ctx) => {
    const subtotal = Number(data.subtotal);
    const discount = Number(data.discount);
    const shipping = Number(data.shipping);
    const total = subtotal - discount + shipping;

    if (discount > subtotal) {
      ctx.addIssue({
        code: "custom",
        path: ["discount"],
        message: "El descuento no puede ser mayor al subtotal",
      });
    }

    if (total <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["subtotal"],
        message: "El total de la venta debe ser mayor a 0",
      });
    }

    if (data.deliveryStatus === "delivered" && data.paymentStatus !== "paid") {
      ctx.addIssue({
        code: "custom",
        path: ["deliveryStatus"],
        message: "Para marcar entregado el pedido debe estar pagado",
      });
    }
  });

export type SaleFormData = z.infer<typeof saleSchema>;

export const saleFormDefaults: SaleFormData = {
  clientId: "",
  customerPhone: "",
  orderId: "",
  orderNumber: "",
  subtotal: "",
  discount: "0",
  shipping: "0",
  paymentMethod: "cash",
  paymentStatus: "paid",
  deliveryStatus: "delivered",
  notes: "",
};
