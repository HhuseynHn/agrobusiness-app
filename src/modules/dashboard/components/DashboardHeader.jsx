import { useState } from "react";
import { Search, Bell, MessageCircle, User, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../../../store/slices/uiSlice";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export function DashboardHeader({ onSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    else if (searchQuery.trim()) navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-emerald-100 bg-white/95 px-4 backdrop-blur">
      <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
          <Input
            type="search"
            placeholder="Axtarış..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-emerald-200"
          />
        </div>
        <Button type="submit" variant="outline" className="ml-2 shrink-0">
          Axtar
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
          aria-label="Theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
          aria-label="Bildirişlər"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
          aria-label="Mesajlar"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-emerald-700 hover:bg-emerald-50"
        >
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Profil</span>
        </button>
      </div>
    </header>
  );
}
