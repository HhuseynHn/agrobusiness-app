import logo from "../../assets/icons/Logo_nw.png";

export default function Header() {
  return (
    <header className="w-full border-b border-emerald-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="AgroBusiness logo"
            className="h-9 w-9 rounded-full object-cover shadow-sm"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-emerald-900">
              AgroBusiness
            </p>
            <p className="text-xs text-emerald-500">
              Kənd təsərrüfatı məhsulları platforması
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
