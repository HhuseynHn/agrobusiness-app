import { createContext, useContext, useMemo } from "react";
import { useAuthState } from "./authState";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const state = useAuthState();
  const value = useMemo(() => state, [
    state.user,
    state.token,
    state.isAuthenticated,
    state.isLoading,
    state.login,
    state.register,
    state.logout,
  ]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
