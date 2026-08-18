import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getApiErrorMessage } from "@/shared/api";
import { useAuth } from "@/shared/auth";
import { VendriCard } from "@/shared/components/VendriCard";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";
import { registerFormCardSx, registerFormPanelSx } from "../styles/authUi";

import { LoginLink } from "./LoginLink";
import { RegisterButton } from "./RegisterButton";
import { RegisterFields } from "./RegisterFields";
import { RegisterHeader } from "./RegisterHeader";
import { RegisterSecurityNote } from "./RegisterSecurityNote";

export function RegisterForm() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: "",
      companyContactEmail: "",
      ownerFullName: "",
      ownerEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage(null);

    try {
      await register({
        companyName: data.companyName,
        companyContactEmail: data.companyContactEmail,
        ownerFullName: data.ownerFullName,
        ownerEmail: data.ownerEmail,
        password: data.password,
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "No pudimos crear tu cuenta. Revisa los datos e intenta de nuevo.",
        ),
      );
    }
  };

  return (
    <Box sx={registerFormPanelSx}>
      <VendriCard elevation={0} sx={registerFormCardSx}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <RegisterHeader />

          {errorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}

          <RegisterFields control={control} />

          <RegisterSecurityNote />

          <RegisterButton isLoading={isSubmitting} />

          <LoginLink />
        </Box>
      </VendriCard>
    </Box>
  );
}
