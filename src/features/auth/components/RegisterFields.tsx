import { useState, type ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import type { RegisterFormData } from "../schemas/registerSchema";
import { authFieldLabelSx, authFieldSx } from "../styles/authUi";

type RegisterFieldsProps = {
  control: Control<RegisterFormData>;
};

type FieldShellProps = {
  label: string;
  children: ReactNode;
};

function FieldShell({ label, children }: FieldShellProps) {
  return (
    <Box>
      <Typography component="label" sx={authFieldLabelSx}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export function RegisterFields({ control }: RegisterFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.15,
      }}
    >
      <Controller
        name="companyName"
        control={control}
        render={({ field, fieldState }) => (
          <FieldShell label="Nombre de la empresa">
            <TextField
              {...field}
              fullWidth
              placeholder="Ej. Boutique Luna"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={authFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FieldShell>
        )}
      />

      <Controller
        name="companyContactEmail"
        control={control}
        render={({ field, fieldState }) => (
          <FieldShell label="Correo de la empresa">
            <TextField
              {...field}
              fullWidth
              placeholder="contacto@tuempresa.com"
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
          </FieldShell>
        )}
      />

      <Controller
        name="ownerFullName"
        control={control}
        render={({ field, fieldState }) => (
          <FieldShell label="Nombre completo">
            <TextField
              {...field}
              fullWidth
              placeholder="Ingresa tu nombre completo"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={authFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FieldShell>
        )}
      />

      <Controller
        name="ownerEmail"
        control={control}
        render={({ field, fieldState }) => (
          <FieldShell label="Correo electrónico">
            <TextField
              {...field}
              fullWidth
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
          </FieldShell>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <FieldShell label="Contraseña">
            <TextField
              {...field}
              fullWidth
              placeholder="Crea una contraseña"
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
          </FieldShell>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <FieldShell label="Confirmar contraseña">
            <TextField
              {...field}
              fullWidth
              placeholder="Confirma tu contraseña"
              type={showConfirmPassword ? "text" : "password"}
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
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        edge="end"
                        aria-label={
                          showConfirmPassword
                            ? "Ocultar confirmación"
                            : "Mostrar confirmación"
                        }
                      >
                        {showConfirmPassword ? (
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
          </FieldShell>
        )}
      />
    </Box>
  );
}
