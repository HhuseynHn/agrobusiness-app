import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";

function countdownFrom(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s };
}

export function DailyOfferBanner() {
  const [secondsLeft, setSecondsLeft] = useState(24 * 3600); // 24h

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const { h, m, s } = countdownFrom(secondsLeft);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-emerald-900">Günün təklifi</h3>
          <p className="text-sm text-emerald-700">Seçilmiş məhsulda endirim bu günə qədər keçərlidir.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-800 px-2 py-1 font-mono text-white">{String(h).padStart(2, "0")}</span>
          <span className="text-emerald-600">:</span>
          <span className="rounded bg-emerald-800 px-2 py-1 font-mono text-white">{String(m).padStart(2, "0")}</span>
          <span className="text-emerald-600">:</span>
          <span className="rounded bg-emerald-800 px-2 py-1 font-mono text-white">{String(s).padStart(2, "0")}</span>
        </div>
        <Button onClick={() => document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" })}>
          Məhsullara bax
        </Button>
      </div>
    </section>
  );
}
