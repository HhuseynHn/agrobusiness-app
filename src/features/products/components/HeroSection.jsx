import { Button } from "../../../components/ui/button";
import backgroundImage from "../../../assets/images/Bckgrnd.jpg";

const STATS = [
  { value: "500+", label: "Məhsul" },
  { value: "120+", label: "Fermer" },
  { value: "10K+", label: "Müştəri" },
];

export function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/75 to-emerald-800/60" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:py-20 md:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Təzə Kənd Təsərrüfatı Məhsulları
        </h1>
        <p className="mt-4 text-lg text-emerald-100 sm:text-xl">
          Birbaşa fermerlərdən, ən təzə məhsullar
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={scrollToProducts}
          >
            Məhsullara keç
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={scrollToProducts}
          >
            Kateqoriyalar
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-8 md:mt-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/10 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
              <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-emerald-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
