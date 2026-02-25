import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";
import logo from "../../assets/icons/Logo_nw.png";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email mütləqdir.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email formatı yanlışdır.";
    }

    if (!form.password) {
      newErrors.password = "Şifrə mütləqdir.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");
    setSuccessMessage("");

    if (!validate()) return;

    setIsLoading(true);

    // Login simulyasiyası
    setTimeout(() => {
      setIsLoading(false);
      // Burada real API çağırışı olacaq (hazırda yalnız simulyasiya)
      setSuccessMessage("Uğurla daxil oldunuz (simulyasiya).");
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AgroBusiness logo"
            className="h-10 w-10 rounded-full object-cover shadow-sm"
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
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
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
                placeholder="Şifrənizi daxil edin"
                value={form.password}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {generalError && (
            <p className="text-sm text-red-600">{generalError}</p>
          )}
          {successMessage && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
              {successMessage}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Gözləyin..." : "Daxil ol"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-emerald-600">
          Hesabınız yoxdur?{" "}
          <Link
            to="/register"
            className="font-medium text-emerald-700 hover:text-emerald-800 underline-offset-2 hover:underline"
          >
            Qeydiyyatdan keç
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
