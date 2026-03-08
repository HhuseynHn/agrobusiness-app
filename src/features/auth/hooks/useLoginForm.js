import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validation/authSchemas";
import { useAuth } from "../../../context/AuthContext";

const DEFAULT_VALUES = { email: "", password: "" };

const SERVER_ERROR_MESSAGE =
  "Daxil olarkən xəta baş verdi. Məlumatları yoxlayın.";

export function useLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values) {
    setServerError("");
    try {
      await login(values);
      navigate("/");
    } catch (err) {
      setServerError(err?.response?.data?.message ?? SERVER_ERROR_MESSAGE);
    }
  }

  return { form, serverError, onSubmit };
}
