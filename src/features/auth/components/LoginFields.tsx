import { useState } from "react";
import { Controller, type Control } from "react-hook-form";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import type { LoginFormData } from "../schemas/loginSchema";
import { authFieldSx } from "../styles/authUi";

type LoginFieldsProps = {
  control: Control<LoginFormData>;
};

export function LoginFields({ control }: LoginFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.25,
      }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            type="email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={authFieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type={showPassword ? "text" : "password"}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={authFieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((previous) => !previous)}
                      edge="end"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </Box>
  );
}
