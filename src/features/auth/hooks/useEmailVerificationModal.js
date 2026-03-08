import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/authService";

const RESEND_COOLDOWN_SECONDS = 60;
const REDIRECT_DELAY_MS = 3000;
const VERIFY_ERROR_MESSAGE =
  "Kod təsdiqlənərkən xəta baş verdi. Yenidən cəhd edin.";

export function useEmailVerificationModal(open, email, onClose) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setCode("");
      setError("");
      setIsLoading(false);
      setResendSeconds(RESEND_COOLDOWN_SECONDS);
    }
  }, [open]);

  useEffect(() => {
    if (step !== 2) return;
    const timer = setTimeout(() => navigate("/login"), REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [step, navigate]);

  useEffect(() => {
    if (!open || resendSeconds <= 0) return;
    const timer = setTimeout(
      () => setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearTimeout(timer);
  }, [open, resendSeconds]);

  function handleCodeChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (code.length !== 6) return;
    setIsLoading(true);
    setError("");
    try {
      await verifyOtp({ email, code });
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.message ?? VERIFY_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }

  function handleResend() {
    if (resendSeconds > 0) return;
    setResendSeconds(RESEND_COOLDOWN_SECONDS);
    setCode("");
    setError("");
  }

  function handleContinue() {
    navigate("/login");
  }

  return {
    step,
    code,
    error,
    isLoading,
    resendSeconds,
    handleCodeChange,
    handleSubmit,
    handleResend,
    handleContinue,
  };
}
