import { vendriButtonSx } from "@/shared/styles/buttonSx";
import { vendriSurfaceCardSx } from "@/shared/styles/cardSx";

import type { ReportPeriod, ReportSummaryAccent } from "../types/reports.types";

export const reportsCardSx = vendriSurfaceCardSx;

export const reportsButtonSx = vendriButtonSx;

export const reportsAccentStyles: Record<
  ReportSummaryAccent,
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

export const reportPeriodLabels: Record<ReportPeriod, string> = {
  week: "Esta semana",
  month: "Este mes",
  year: "Este año",
};
