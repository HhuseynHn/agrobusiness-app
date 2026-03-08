import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MessageCircle, MapPin } from "lucide-react";
import { fetchFarmers, selectFarmers } from "../../../store/slices/farmerSlice";
import { fetchProducts, selectProducts } from "../../../store/slices/productSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { LazyImage } from "../../../components/LazyImage";

export default function FarmerDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const farmers = useSelector(selectFarmers);
  const products = useSelector(selectProducts);
  const farmer = farmers.find((f) => f.id === Number(id));

  useEffect(() => {
    if (!farmers.length) dispatch(fetchFarmers());
    if (!products.length) dispatch(fetchProducts());
  }, [dispatch, farmers.length, products.length]);

  if (!farmer) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  const farmerProducts = products.filter((p) => p.farmerId === farmer.id);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <Card className="overflow-hidden border-emerald-100">
        <div className="h-40 bg-gradient-to-r from-emerald-400 to-emerald-600" />
        <div className="relative px-6 pb-6">
          <div className="-mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-emerald-100 shadow" />
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-emerald-900">{farmer.name}</h1>
            <p className="text-emerald-600">{farmer.farmName}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-emerald-700">
              <MapPin className="h-4 w-4" />
              {farmer.location}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span>★ {farmer.rating} ({farmer.reviewCount} rey)</span>
              <span>{farmer.productCount} mehsul</span>
              <span>{farmer.followers} izleyici</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button>Izle</Button>
              <Button variant="outline">
                <MessageCircle className="mr-1 h-4 w-4" />
                Mesaj gonder
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-emerald-100">
        <h2 className="text-lg font-semibold text-emerald-900">Haqqinda</h2>
        <p className="mt-2 text-emerald-700">{farmer.bio}</p>
        {farmer.contact && (
          <div className="mt-4 space-y-1 text-sm text-emerald-700">
            {farmer.contact.phone && <p>Tel: {farmer.contact.phone}</p>}
            {farmer.contact.email && <p>Email: {farmer.contact.email}</p>}
          </div>
        )}
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-emerald-900">Mehsullar</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {farmerProducts.slice(0, 8).map((p) => (
            <Link key={p.id} to={"/product/" + p.id}>
              <Card className="overflow-hidden border-emerald-100 hover:shadow-md">
                <div className="aspect-[4/3] bg-emerald-50">
                  {p.images?.[0] ? (
                    <LazyImage src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="p-3">
                  <p className="font-medium text-emerald-900 line-clamp-1">{p.name}</p>
                  <p className="text-sm font-semibold text-emerald-700">{(p.price ?? 0).toFixed(2)} AZN</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
