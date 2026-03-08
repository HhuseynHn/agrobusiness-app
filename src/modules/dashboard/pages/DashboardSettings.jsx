import { useSelector, useDispatch } from "react-redux";
import { selectTheme, toggleTheme } from "../../../store/slices/uiSlice";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function DashboardSettings() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-900">Ayarlar</h1>
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-lg">Görünüş</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-emerald-700">Cari tema: {theme}</p>
          <Button className="mt-2" variant="outline" onClick={() => dispatch(toggleTheme())}>
            Temani dəyiş
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
