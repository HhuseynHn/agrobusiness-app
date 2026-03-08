import { Link } from "react-router-dom";
import { Mail, LockKeyhole, UserRound } from "lucide-react";
import logo from "../../../assets/icons/Logo_nw.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { useRegisterForm } from "../hooks/useRegisterForm";

export function RegisterFormFeature() {
  const {
    form,
    serverError,
    emailForVerification,
    isVerificationOpen,
    onSubmit,
    closeVerificationModal,
  } = useRegisterForm();

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <>
      <Card className="max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="AgroBusiness logo"
              className="h-10 w-10 rounded-full object-cover shadow-sm bg-emerald-50"
            />
            <div>
              <CardTitle>Yeni hesab yarat</CardTitle>
              <CardDescription>
                AgroBusiness platformasında qeydiyyatdan keçərək məhsullarınızı və
                sifarişlərini idarə edin.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Ad</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                    <UserRound className="h-4 w-4" />
                  </span>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Məs: Elvin"
                    className="pl-9"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="surname">Soyad</Label>
                <Input
                  id="surname"
                  type="text"
                  placeholder="Məs: Məmmədov"
                  {...register("surname")}
                />
                {errors.surname && (
                  <p className="text-xs text-red-500">{errors.surname.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="fermer@example.com"
                  className="pl-9"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="password">Şifrə</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                    <LockKeyhole className="h-4 w-4" />
                  </span>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 6 simvol"
                    className="pl-9"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Şifrə (təkrar)</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Şifrəni təkrarlayın"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Göndərilir..." : "Qeydiyyatdan keç"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-emerald-600">
            Artıq hesabınız var?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-700 underline-offset-2 hover:underline"
            >
              Daxil olun
            </Link>
          </p>
        </CardFooter>
      </Card>

      <EmailVerificationModal
        open={isVerificationOpen}
        email={emailForVerification}
        onClose={closeVerificationModal}
      />
    </>
  );
}
