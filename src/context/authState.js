import { useState, useEffect, useCallback } from "react";
import {
  getAccessToken,
  login as loginRequest,
  register as registerRequest,
  logout as logoutService,
} from "../features/auth/services/authService";

export function useAuthState() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getAccessToken());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingToken = getAccessToken();
    if (existingToken) {
      setToken(existingToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = useCallback(() => {
    logoutService();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  const handleLogin = useCallback(async (credentials) => {
    const data = await loginRequest(credentials);
    const accessToken = data?.accessToken ?? getAccessToken();
    setToken(accessToken);
    setIsAuthenticated(!!accessToken);
    return data;
  }, []);

  const handleRegister = useCallback(async (payload) => {
    return registerRequest(payload);
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
