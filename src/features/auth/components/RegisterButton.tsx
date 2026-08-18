import Button from "@mui/material/Button";

type RegisterButtonProps = {
  isLoading?: boolean;
};

export function RegisterButton({ isLoading = false }: RegisterButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      size="large"
      disabled={isLoading}
      sx={{
        mt: 1.75,
        minHeight: 44,
        borderRadius: 2.5,
        fontSize: "0.95rem",
        fontWeight: 700,
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: "#7B2FF7",
        "&:hover": {
          backgroundColor: "#6B21C9",
          boxShadow: "0 10px 24px rgba(123, 47, 247, 0.28)",
        },
      }}
    >
      {isLoading ? "Creando cuenta..." : "Crear cuenta"}
    </Button>
  );
}
