import { Link } from "react-router-dom";
import { Facebook, Instagram, Send } from "lucide-react";
import logo from "../../../assets/icons/Logo_nw.png";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const FOOTER_LINKS = [
  { to: "/about", label: "Haqqımızda" },
  { to: "/contact", label: "Əlaqə" },
  { to: "/delivery", label: "Çatdırılma" },
  { to: "/returns", label: "Geri qaytarma" },
];

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="AgroBusiness" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-semibold text-emerald-800">AgroBusiness</span>
            </Link>
            <p className="mt-3 text-sm text-emerald-600">
              Kənd təsərrüfatı məhsullarını birbaşa fermerlərdən sizə çatdırırıq.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-emerald-900">Keçidlər</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-emerald-600 hover:text-emerald-800">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-emerald-900">Bizi izləyin</h3>
            <div className="mt-3 flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-emerald-600 hover:bg-emerald-50"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-emerald-600 hover:bg-emerald-50"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-emerald-900">Xəbər bülleteni</h3>
            <p className="mt-2 text-sm text-emerald-600">Yeni məhsullar və təkliflər haqqında məlumat alın.</p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Email"
                className="flex-1"
              />
              <Button type="submit" className="shrink-0 px-3">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-100 pt-6 text-center text-sm text-emerald-600">
          © {new Date().getFullYear()} AgroBusiness. Bütün hüquqlar qorunur.
        </div>
      </div>
    </footer>
  );
}
