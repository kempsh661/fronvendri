import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useAuth } from "@/shared/auth";

import { NotificationsBell } from "@/features/notifications";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriInput } from "@/shared/components/VendriInput";

import { productsButtonSx } from "../constants/productsUi";

type ProductsHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onNewProduct: () => void;
};

export function ProductsHeader({
  search,
  onSearchChange,
  onNewProduct,
}: ProductsHeaderProps) {
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
          Productos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Administra tu catálogo de productos.
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
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar producto..."
          size="small"
          aria-label="Buscar producto"
          sx={{
            width: { xs: "100%", sm: 220, md: 280 },
            order: { xs: 3, sm: 0 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "background.paper",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{ color: "text.secondary", fontSize: 20 }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        <NotificationsBell />

        {can("products:create") && (
          <VendriButton
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onNewProduct}
            sx={{
              ...productsButtonSx,
              px: 2.25,
              boxShadow: "none",
              whiteSpace: "nowrap",
            }}
          >
            Nuevo producto
          </VendriButton>
        )}
      </Box>
    </Box>
  );
}
