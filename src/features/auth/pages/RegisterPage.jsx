import MainLayout from "../../../components/layout/mainLayout";
import { RegisterFormFeature } from "../components/RegisterFormFeature";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <RegisterFormFeature />
    </MainLayout>
  );
}
