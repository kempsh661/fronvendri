import { vendriButtonSx } from "@/shared/styles/buttonSx";
import { vendriSurfaceCardSx } from "@/shared/styles/cardSx";

import type { ProductSummaryAccent } from "../types/products.types";

export const productsCardSx = vendriSurfaceCardSx;

export const productsButtonSx = vendriButtonSx;

export const productsAccentStyles: Record<
  ProductSummaryAccent,
  { iconBg: string; iconColor: string }
> = {
  primary: {
    iconBg: "rgba(123, 47, 247, 0.12)",
    iconColor: "primary.main",
  },
  success: {
    iconBg: "rgba(34, 197, 94, 0.12)",
    iconColor: "success.main",
  },
  warning: {
    iconBg: "rgba(245, 158, 11, 0.14)",
    iconColor: "warning.main",
  },
  info: {
    iconBg: "rgba(59, 130, 246, 0.12)",
    iconColor: "info.main",
  },
};

export const PRODUCTS_PAGE_SIZE = 7;
