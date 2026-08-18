import { vendriButtonSx } from "@/shared/styles/buttonSx";
import { vendriSurfaceCardSx } from "@/shared/styles/cardSx";

import type { SettingsSectionId } from "../types/settings.types";

export const settingsCardSx = vendriSurfaceCardSx;

export const settingsButtonSx = vendriButtonSx;

export const settingsSections: {
  id: SettingsSectionId;
  label: string;
  description: string;
}[] = [
  {
    id: "business",
    label: "Negocio",
    description: "Datos de tu empresa",
  },
  {
    id: "preferences",
    label: "Preferencias",
    description: "Moneda e inventario",
  },
  {
    id: "notifications",
    label: "Notificaciones",
    description: "Alertas y avisos",
  },
  {
    id: "security",
    label: "Seguridad",
    description: "Contraseña de acceso",
  },
];
