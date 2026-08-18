import Button from "@mui/material/Button";

type LoginButtonProps = {
  isLoading?: boolean;
};

export function LoginButton({
  isLoading = false,
}: LoginButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      size="large"
      disabled={isLoading}
      sx={{
        mt: 3,
        minHeight: 54,
        borderRadius: 2,
        fontSize: "1rem",
        fontWeight: 700,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(123, 47, 247, 0.25)",
        },
      }}
    >
      {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
    </Button>
  );
}