import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-emerald-50/50 px-4">
      <p className="text-8xl font-bold text-emerald-200">404</p>
      <h1 className="text-xl font-semibold text-emerald-900">Səhifə tapılmadı</h1>
      <p className="max-w-sm text-center text-sm text-emerald-700">
        Axtardığınız səhifə mövcud deyil və ya köçürülüb.
      </p>
      <Link to="/">
        <Button>Ana səhifəyə qayıt</Button>
      </Link>
    </div>
  );
}
