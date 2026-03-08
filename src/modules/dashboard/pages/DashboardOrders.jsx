import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../store/slices/orderSlice";
import { selectOrders } from "../../../store/slices/orderSlice";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";

export default function DashboardOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-900">Sifarisler</h1>
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-lg">Sifariş siyahısı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-emerald-100 text-left text-emerald-700">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Tarix</th>
                  <th className="pb-2 font-medium">Məbləğ</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-emerald-50">
                    <td className="py-2">{o.id}</td>
                    <td className="py-2">{o.orderDate ? new Date(o.orderDate).toLocaleDateString("az-AZ") : "—"}</td>
                    <td className="py-2">{Number(o.totalAmount).toFixed(2)} ₼</td>
                    <td className="py-2">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
