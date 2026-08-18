import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getApiErrorMessage } from "@/shared/api";
import { useAuth } from "@/shared/auth";
import { VendriCard } from "@/shared/components/VendriCard";

import {
  loginSchema,
  type LoginFormData,
} from "../schemas/loginSchema";
import { authFormCardSx, authFormPanelSx } from "../styles/authUi";

import { AuthHeader } from "./AuthHeader";
import { ForgotPassword } from "./ForgotPassword";
import { LoginButton } from "./LoginButton";
import { LoginFields } from "./LoginFields";
import { RegisterLink } from "./RegisterLink";

export function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    try {
      await login(data);
      const from =
        typeof (location.state as { from?: unknown } | null)?.from === "string"
          ? (location.state as { from: string }).from
          : "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "No pudimos iniciar sesión. Revisa tus datos."),
      );
    }
  };

  return (
    <Box sx={authFormPanelSx}>
      <VendriCard
        elevation={0}
        sx={[
          authFormCardSx,
          {
            minHeight: {
              xs: "auto",
              sm: 720,
            },
          },
        ]}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <AuthHeader />

          {errorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}

          <LoginFields control={control} />

          <ForgotPassword />

          <LoginButton isLoading={isSubmitting} />

          <RegisterLink />
        </Box>
      </VendriCard>
    </Box>
  );
}
