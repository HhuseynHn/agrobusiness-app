import Header from "./header";
import Footer from "./footer";
import backgroundImage from "../../assets/images/Bckgrnd.jpg";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen text-emerald-900 flex flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={backgroundImage}
          alt="AgroBusiness background"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-900/40 to-emerald-900/60" />
      </div>

      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
          <section className="hidden w-full md:block md:w-1/2">
            <div className="relative overflow-hidden rounded-2xl bg-emerald-700/90 px-6 py-8 text-emerald-50 shadow-xl shadow-emerald-900/40">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/40 blur-2xl" />
              <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-lime-400/40 blur-2xl" />
              <div className="relative space-y-4">
                <h1 className="text-2xl font-semibold leading-snug">
                  Kənd təsərrüfatı məhsullarınızı rəqəmsal bazara çıxarın.
                </h1>
                <p className="text-sm text-emerald-100/90">
                  AgroBusiness ilə fermerlər məhsullarını birbaşa alıcılara
                  təqdim edir, vasitəçiləri azaldır və daha ədalətli qiymət
                  alır.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                    Məhsullarınızı rahat idarə edin
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                    Real vaxtda sifariş və səbət izləmə
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                    Təhlükəsiz qeydiyyat və giriş
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="w-full md:w-1/2">{children}</section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
