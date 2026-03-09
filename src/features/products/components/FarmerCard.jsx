import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { LazyImage } from "../../../components/LazyImage";

export function FarmerCard({ farmer }) {
  const id = farmer.id;
  const name = farmer.name;
  const farmName = farmer.farmName;
  const location = farmer.location;
  const rating = farmer.rating;
  const reviewCount = farmer.reviewCount;
  const avatar = farmer.avatar;
  const coverImage = farmer.coverImage;
  const productCount = farmer.productCount;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <Link to={"/farmer/" + id} className="block">
        <div className="relative h-28 w-full overflow-hidden bg-emerald-100">
          {coverImage ? (
            <LazyImage
              src={coverImage}
              alt={farmName || name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-emerald-200 text-sm text-emerald-600">
              Təsərrüfat
            </div>
          )}
        </div>
        <div className="relative px-4 pb-4 pt-12">
          <div className="absolute left-4 top-0 flex h-16 w-16 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white bg-emerald-100 shadow">
            {avatar ? (
              <LazyImage src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xl font-bold text-emerald-700">
                {(name || "F").charAt(0)}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-emerald-900">{name}</h3>
          <p className="text-sm text-emerald-600">{farmName}</p>
          <p className="mt-1 text-xs text-emerald-500">{location}</p>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-0.5 font-medium text-amber-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {rating ?? "-"}
            </span>
            <span className="text-emerald-500">({reviewCount ?? 0} rəy)</span>
          </div>
          <p className="mt-1 text-xs text-emerald-600">{productCount ?? 0} məhsul</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Link to={"/farmer/" + id}>
          <Button variant="outline" className="w-full" size="sm">
            Bütün məhsullar
          </Button>
        </Link>
      </div>
    </article>
  );
}
