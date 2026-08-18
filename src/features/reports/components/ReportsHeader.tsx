import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { useAuth } from "@/shared/auth";

import { NotificationsBell } from "@/features/notifications";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriInput } from "@/shared/components/VendriInput";

import { reportPeriodLabels, reportsButtonSx } from "../constants/reportsUi";
import type { ReportPeriod } from "../types/reports.types";

type ReportsHeaderProps = {
  period: ReportPeriod;
  onPeriodChange: (period: ReportPeriod) => void;
};

export function ReportsHeader({ period, onPeriodChange }: ReportsHeaderProps) {
  const { can } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.2,
            mb: 0.25,
          }}
        >
          Reportes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Analiza el rendimiento de tu negocio por periodo.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <VendriInput
          select
          size="small"
          value={period}
          onChange={(event) =>
            onPeriodChange(event.target.value as ReportPeriod)
          }
          aria-label="Periodo del reporte"
          sx={{
            minWidth: 160,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "background.paper",
            },
          }}
        >
          {(Object.keys(reportPeriodLabels) as ReportPeriod[]).map((key) => (
            <MenuItem key={key} value={key}>
              {reportPeriodLabels[key]}
            </MenuItem>
          ))}
        </VendriInput>

        <NotificationsBell />

        {can("reports:export") && (
          <VendriButton
            variant="contained"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              ...reportsButtonSx,
              px: 2.25,
              boxShadow: "none",
              whiteSpace: "nowrap",
            }}
          >
            Exportar reporte
          </VendriButton>
        )}
      </Box>
    </Box>
  );
}
