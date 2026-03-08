import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authSchemas";
import { register as registerRequest } from "../services/authService";

const DEFAULT_VALUES = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SERVER_ERROR_MESSAGE =
  "Qeydiyyat zamanı xəta baş verdi. Yenidən cəhd edin.";

export function useRegisterForm() {
  const [serverError, setServerError] = useState("");
  const [emailForVerification, setEmailForVerification] = useState("");
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values) {
    setServerError("");
    try {
      await registerRequest(values);
      setEmailForVerification(values.email);
      setIsVerificationOpen(true);
    } catch (err) {
      setServerError(
        err?.response?.data?.message ?? SERVER_ERROR_MESSAGE
      );
    }
  }

  function closeVerificationModal() {
    setIsVerificationOpen(false);
  }

  return {
    form,
    serverError,
    emailForVerification,
    isVerificationOpen,
    onSubmit,
    closeVerificationModal,
  };
}
