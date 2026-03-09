import { LazyImage } from "../../../components/LazyImage";
import { Card } from "../../../components/ui/card";

export function AgriculturalTips({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card key={item.id} className="overflow-hidden border-emerald-100 transition-shadow hover:shadow-md">
          <div className="relative h-40 overflow-hidden bg-emerald-50">
            {item.image ? (
              <LazyImage
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-emerald-400">
                Şəkil
              </div>
            )}
            {item.season && (
              <span className="absolute right-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-xs text-white">
                {item.season}
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-emerald-900">{item.title}</h3>
            <p className="mt-1 text-sm text-emerald-600">{item.description}</p>
            {item.items && item.items.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1">
                {item.items.map((x, i) => (
                  <li
                    key={i}
                    className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            )}
            {item.months && item.crops && (
              <div className="mt-2 text-xs text-emerald-700">
                <span>{item.months.join(", ")}</span>
                <span className="mx-1">–</span>
                <span>{item.crops.join(", ")}</span>
              </div>
            )}
            {item.tips && item.tips.length > 0 && (
              <ul className="mt-2 list-inside list-disc space-y-0.5 text-sm text-emerald-700">
                {item.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
