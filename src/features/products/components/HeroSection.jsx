import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import backgroundImage from "../../../assets/images/Bckgrnd.jpg";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-emerald-900">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/70 to-emerald-800/50" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:py-20 md:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Təzə kənd təsərrüfatı məhsulları
        </h1>
        <p className="mt-4 text-lg text-emerald-100 sm:text-xl">
          Kənddən birbaşa süfrənizə
        </p>
        <Button
          size="lg"
          className="mt-8 bg-emerald-500 hover:bg-emerald-600"
          onClick={() => {
            document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Məhsullara keç
        </Button>
      </div>
    </section>
  );
}
