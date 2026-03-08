import MainLayout from "../components/layout/mainLayout";
import { LoginFormFeature } from "../features/auth/components/LoginFormFeature";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <LoginFormFeature />
    </MainLayout>
  );
}
