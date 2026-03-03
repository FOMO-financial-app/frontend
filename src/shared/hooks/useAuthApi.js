import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../index";

export const useAuthApi = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    const interceptor = api.interceptors.request.use(
      async (config) => {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    setReady(true);

    return () => {
      api.interceptors.request.eject(interceptor);
      setReady(false);
    };
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return ready;
};