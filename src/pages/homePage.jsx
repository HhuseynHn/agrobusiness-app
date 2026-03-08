import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react";
import logo from "../assets/icons/Logo_nw.png";
import { ProductCard } from "../features/products/components/ProductCard";
import { ProductFilters } from "../features/products/components/ProductFilters";
import { fetchProducts } from "../features/products/services/productService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchProducts({ ...filters, search });
        setProducts(Array.isArray(data) ? data : data.items ?? []);
      } catch {
        // ignore for now
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [filters, search]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleAddToCart(product) {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Burada gələcəkdə səbət funksionallığı olacaq
    console.log("Add to cart", product.id);
  }

  return (
    <div className="min-h-screen bg-emerald-950/90 text-emerald-50">
      <header className="sticky top-0 z-20 border-b border-emerald-800 bg-emerald-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="AgroBusiness logo"
              className="h-9 w-9 rounded-full object-cover shadow-sm"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold">AgroBusiness</p>
              <p className="text-xs text-emerald-300">
                Kənd təsərrüfatı məhsulları bazarı
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 rounded-full border border-emerald-700 bg-emerald-900 px-3 py-1.5">
            <Search className="h-4 w-4 text-emerald-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Məhsul axtar..."
              className="h-7 border-none bg-transparent text-sm text-emerald-50 placeholder:text-emerald-500 focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Daxil ol
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Qeydiyyat
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-300 hover:bg-red-900/30 hover:text-red-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Çıxış</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <ProductFilters onChange={setFilters} />
        </aside>

        <section className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-emerald-50">
              Məhsullar
            </h1>
            <div className="md:hidden">
              {/* Mobil filter button - gələcəkdə drawer ilə açılacaq */}
            </div>
          </div>

          {isLoading ? (
            <p className="text-sm text-emerald-200">Yüklənir...</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-emerald-200">
              Şərtlərə uyğun məhsul tapılmadı.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={() => handleAddToCart(p)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
