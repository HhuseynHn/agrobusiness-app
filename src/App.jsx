import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { CartFavoritesProvider } from "./context/CartFavoritesContext";
import { LazyRoutes } from "./routes/LazyRoutes";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartFavoritesProvider>
          <BrowserRouter>
            <LazyRoutes />
          </BrowserRouter>
        </CartFavoritesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
