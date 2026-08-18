import { useState } from "react";

import Box from "@mui/material/Box";

import { BusinessSettingsForm } from "../components/BusinessSettingsForm";
import { NotificationsSettingsForm } from "../components/NotificationsSettingsForm";
import { PreferencesSettingsForm } from "../components/PreferencesSettingsForm";
import { SecuritySettingsForm } from "../components/SecuritySettingsForm";
import { SettingsHeader } from "../components/SettingsHeader";
import { SettingsNav } from "../components/SettingsNav";
import { settingsMock } from "../mocks/settings.mock";
import type {
  AppSettings,
  BusinessSettings,
  NotificationSettings,
  PreferenceSettings,
  SettingsSectionId,
} from "../types/settings.types";

export function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSectionId>("business");
  const [settings, setSettings] = useState<AppSettings>(settingsMock);

  const saveBusiness = (business: BusinessSettings) => {
    setSettings((current) => ({ ...current, business }));
  };

  const savePreferences = (preferences: PreferenceSettings) => {
    setSettings((current) => ({ ...current, preferences }));
  };

  const saveNotifications = (notifications: NotificationSettings) => {
    setSettings((current) => ({ ...current, notifications }));
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pb: 2,
      }}
    >
      <SettingsHeader />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "280px minmax(0, 1fr)",
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        <SettingsNav
          activeSection={activeSection}
          onChange={setActiveSection}
        />

        <Box>
          {activeSection === "business" && (
            <BusinessSettingsForm
              values={settings.business}
              onSave={saveBusiness}
            />
          )}
          {activeSection === "preferences" && (
            <PreferencesSettingsForm
              values={settings.preferences}
              onSave={savePreferences}
            />
          )}
          {activeSection === "notifications" && (
            <NotificationsSettingsForm
              values={settings.notifications}
              onSave={saveNotifications}
            />
          )}
          {activeSection === "security" && <SecuritySettingsForm />}
        </Box>
      </Box>
    </Box>
  );
}
