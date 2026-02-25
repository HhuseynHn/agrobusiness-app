import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Mail, LockKeyhole, UserRound } from "lucide-react";
import logo from "../../assets/icons/Logo_nw.png";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(60);

  // Demo məqsədi üçün 6 rəqəmli kod
  const DEMO_CODE = "123456";

  useEffect(() => {
    if (!isVerifyModalOpen || resendSeconds <= 0) return;

    const timer = setTimeout(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVerifyModalOpen, resendSeconds]);

  useEffect(() => {
    if (!isSuccessModalOpen) return;

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSuccessModalOpen, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Ad soyad mütləqdir.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email mütləqdir.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email formatı yanlışdır.";
    }

    if (!form.password) {
      newErrors.password = "Şifrə mütləqdir.";
    } else if (form.password.length < 6) {
      newErrors.password = "Şifrə minimum 6 simvol olmalıdır.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Şifrə təkrar mütləqdir.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Şifrələr eyni deyil.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");

    if (!validate()) return;

    setIsLoading(true);

    // Qeydiyyat + email göndərmə simulyasiyası
    setTimeout(() => {
      setIsLoading(false);
      setVerificationCode("");
      setVerificationError("");
      setResendSeconds(60);
      setIsVerifyModalOpen(true);
    }, 1000);
  }

  function handleVerificationCodeChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
    if (verificationError) setVerificationError("");
  }

  function handleVerifySubmit(e) {
    e.preventDefault();
    if (verificationCode.length !== 6) return;

    setIsVerifying(true);
    setVerificationError("");

    setTimeout(() => {
      setIsVerifying(false);

      if (verificationCode === DEMO_CODE) {
        setIsVerifyModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        setVerificationError("Daxil etdiyiniz kod yanlışdır. Yenidən cəhd edin.");
      }
    }, 800);
  }

  function handleResendCode() {
    if (resendSeconds > 0) return;
    setResendSeconds(60);
    setVerificationCode("");
    setVerificationError("");
  }

  function handleContinueToLogin() {
    navigate("/login");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="AgroBusiness logo"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <div>
              <CardTitle>Yeni hesab yarat</CardTitle>
              <CardDescription>
                AgroBusiness platformasında qeydiyyatdan keçərək məhsullarını və
                sifarişlərini idarə et.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Ad, soyad</Label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                  <UserRound className="h-4 w-4" />
                </span>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Məs: Elvin Məmmədov"
                  value={form.fullName}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="fermer@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Şifrə</Label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                  <LockKeyhole className="h-4 w-4" />
                </span>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 simvol"
                  value={form.password}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Şifrə (təkrar)</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Şifrəni təkrarlayın"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {generalError && (
              <p className="text-sm text-red-600">{generalError}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Gözləyin..." : "Qeydiyyatdan keç"}
            </Button>

            <p className="text-[11px] text-emerald-500">
              Demo məqsədi üçün təsdiq kodu: <span className="font-mono">123456</span>
            </p>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-emerald-600">
            Artıq hesabınız var?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-700 hover:text-emerald-800 underline-offset-2 hover:underline"
            >
              Daxil olun
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Modal 1 – Email təsdiqləmə */}
      <Dialog open={isVerifyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email təsdiqləmə</DialogTitle>
            <DialogDescription>
              Email ünvanınıza 6 rəqəmli təsdiq kodu göndərildi. Zəhmət olmasa
              kodu daxil edib təsdiq edin.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="verificationCode">Təsdiq kodu</Label>
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="6 rəqəmli kod"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                maxLength={6}
                className="text-center tracking-[0.4em] font-mono text-lg"
              />
              {verificationError && (
                <p className="text-xs text-red-500">{verificationError}</p>
              )}
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendSeconds > 0}
                className="text-xs font-medium text-emerald-700 hover:text-emerald-800 disabled:text-emerald-400 underline-offset-2 hover:underline"
              >
                {resendSeconds > 0
                  ? `Kodu yenidən göndər (${resendSeconds}s)`
                  : "Kodu yenidən göndər"}
              </button>

              <Button
                type="submit"
                disabled={verificationCode.length !== 6 || isVerifying}
              >
                {isVerifying ? "Təsdiqlənir..." : "Təsdiq et"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal 2 – Uğurlu təsdiqləmə */}
      <Dialog open={isSuccessModalOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <DialogTitle>Email təsdiqləndi!</DialogTitle>
              <DialogDescription>
                Email ünvanınız uğurla təsdiqləndi. 3 saniyə sonra avtomatik
                giriş səhifəsinə yönləndiriləcəksiniz.
              </DialogDescription>
            </div>
          </DialogHeader>

          <DialogFooter className="justify-center">
            <Button onClick={handleContinueToLogin}>
              Davam et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
