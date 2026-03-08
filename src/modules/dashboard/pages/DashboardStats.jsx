import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";

export default function DashboardStats() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-900">Statistika</h1>
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-lg">Ətraflı statistika</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-700">Bu bölmə hazırlanır.</p>
        </CardContent>
      </Card>
    </div>
  );
}
