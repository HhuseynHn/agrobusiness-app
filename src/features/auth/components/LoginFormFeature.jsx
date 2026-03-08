import { Link } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";
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
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginFormFeature() {
  const { form, serverError, onSubmit } = useLoginForm();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <Card className="max-h-[80vh] overflow-y-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AgroBusiness logo"
            className="h-10 w-10 rounded-full object-cover shadow-sm bg-emerald-50"
          />
          <div>
            <CardTitle>Daxil ol</CardTitle>
            <CardDescription>
              AgroBusiness hesabınıza daxil olaraq səbətinizə və məhsullarınıza
              baxın.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

          <div className="space-y-1.5">
            <Label htmlFor="password">Şifrə</Label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-emerald-400">
                <LockKeyhole className="h-4 w-4" />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="Şifrənizi daxil edin"
                className="pl-9"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-red-600">{serverError}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Gözləyin..." : "Daxil ol"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-emerald-600">
          Hesabınız yoxdur?{" "}
          <Link
            to="/register"
            className="font-medium text-emerald-700 underline-offset-2 hover:underline"
          >
            Qeydiyyatdan keç
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
