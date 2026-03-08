import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { fetchProducts } from "../../../store/slices/productSlice";
import { fetchOrders } from "../../../store/slices/orderSlice";
import { selectProducts, selectFeaturedProducts } from "../../../store/slices/productSlice";
import { selectOrders } from "../../../store/slices/orderSlice";
import { selectCartCount } from "../../../store/slices/cartSlice";
import { selectFavorites } from "../../../store/slices/favoriteSlice";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { mockReviews } from "../../../mock/data";

const CHART_COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];

const monthlySales = [
  { month: "Yan", satis: 1200 },
  { month: "Fev", satis: 980 },
  { month: "Mar", satis: 1450 },
  { month: "Apr", satis: 1320 },
  { month: "May", satis: 1680 },
  { month: "İyn", satis: 2100 },
];

const categorySales = [
  { name: "Meyvələr", value: 35, color: CHART_COLORS[0] },
  { name: "Tərəvəzlər", value: 28, color: CHART_COLORS[1] },
  { name: "Süd", value: 18, color: CHART_COLORS[2] },
  { name: "Ət", value: 12, color: CHART_COLORS[3] },
  { name: "Digər", value: 7, color: CHART_COLORS[4] },
];

export default function DashboardHome() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const featured = useSelector(selectFeaturedProducts);
  const orders = useSelector(selectOrders);
  const cartCount = useSelector(selectCartCount);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
    if (!orders.length) dispatch(fetchOrders());
  }, [dispatch, products.length, orders.length]);

  const activeOrders = orders.filter((o) => o.status !== "Çatdırıldı").length;
  const monthlyRevenue = orders
    .filter((o) => o.orderDate && o.orderDate.startsWith("2024-10"))
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const stats = [
    { label: "Ümumi məhsul sayı", value: products.length, icon: "📦" },
    { label: "Aktiv sifarişlər", value: activeOrders, icon: "📋" },
    { label: "Bu ay gəlir (₼)", value: monthlyRevenue.toFixed(1), icon: "💰" },
    { label: "Favori məhsullar", value: favorites.length, icon: "❤️" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden border-emerald-100 bg-white/80">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">{s.label}</p>
                  <p className="text-2xl font-bold text-emerald-900">{s.value}</p>
                </div>
                <span className="text-3xl">{s.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-lg">Aylıq satış</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis dataKey="month" tick={{ fill: "#047857" }} />
                  <YAxis tick={{ fill: "#047857" }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #d1fae5" }} />
                  <Line type="monotone" dataKey="satis" stroke="#059669" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-lg">Kateqoriyaya görə satış</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySales}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {categorySales.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-lg">Son sifarişlər</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-emerald-100 text-left text-emerald-700">
                  <th className="pb-2 font-medium">Sifariş ID</th>
                  <th className="pb-2 font-medium">Müştəri</th>
                  <th className="pb-2 font-medium">Tarix</th>
                  <th className="pb-2 font-medium">Məbləğ</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b border-emerald-50">
                    <td className="py-2 text-emerald-800">{o.id}</td>
                    <td className="py-2">{o.userId}</td>
                    <td className="py-2">{o.orderDate ? new Date(o.orderDate).toLocaleDateString("az-AZ") : "—"}</td>
                    <td className="py-2 font-medium">{Number(o.totalAmount).toFixed(2)} ₼</td>
                    <td className="py-2">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-xs font-medium " +
                          (o.status === "Çatdırıldı"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800")
                        }
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-lg">Məşhur məhsullar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(featured.length ? featured : products).slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-lg border border-emerald-50 p-2"
                >
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-emerald-100" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-emerald-900">{p.name}</p>
                    <p className="text-sm text-emerald-600">{Number(p.price).toFixed(2)} ₼</p>
                  </div>
                  <span className="text-xs text-emerald-500">{p.reviewCount || 0} rəy</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-lg">Son rəylər</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReviews.slice(0, 3).map((r) => (
                <div key={r.id} className="flex gap-3 rounded-lg border border-emerald-50 p-2">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-200" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">{r.userName}</p>
                    <p className="text-xs text-emerald-600 line-clamp-1">{r.comment}</p>
                    <p className="mt-1 text-xs text-emerald-500">
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
