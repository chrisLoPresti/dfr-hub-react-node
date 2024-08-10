"use client";

import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const login = useCallback(
    async (credentials) => {
      if (isLoading) {
        return;
      }
      setLoading(true);
      const res = await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login`,
          credentials,
          {
            withCredentials: true,
          }
        )
        .catch(() => setLoading(false));

      if (res?.data) {
        setUser(res.data);
      }

      setLoading(false);
      return res?.data;
    },
    [isLoading]
  );

  const refreshToken = async () => {
    setLoading(true);
    const res = await axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/refreshtoken`, {
        withCredentials: true,
      })
      .catch(() => setLoading(false));
    if (res?.data) {
      setUser(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
