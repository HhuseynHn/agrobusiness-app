export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-emerald-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 text-xs text-emerald-500">
        <p>© {new Date().getFullYear()} AgroBusiness.</p>
        <p className="hidden sm:block">
          Dayanıqlı kənd təsərrüfatı üçün rəqəmsal həll.
        </p>
      </div>
    </footer>
  );
}
