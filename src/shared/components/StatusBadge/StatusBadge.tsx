import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type StatusTone =
  | "warning"
  | "success"
  | "info"
  | "primary"
  | "neutral"
  | "danger";

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
};

const toneStyles: Record<
  StatusTone,
  { backgroundColor: string; color: string }
> = {
  warning: {
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    color: "#B45309",
  },
  success: {
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    color: "#15803D",
  },
  info: {
    backgroundColor: "rgba(59, 130, 246, 0.14)",
    color: "#1D4ED8",
  },
  primary: {
    backgroundColor: "rgba(123, 47, 247, 0.12)",
    color: "#6D28D9",
  },
  neutral: {
    backgroundColor: "rgba(107, 114, 128, 0.12)",
    color: "#4B5563",
  },
  danger: {
    backgroundColor: "rgba(239, 68, 68, 0.14)",
    color: "#B91C1C",
  },
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const styles = toneStyles[tone];

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.25,
        py: 0.5,
        borderRadius: "8px",
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        whiteSpace: "nowrap",
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Box>
  );
}
