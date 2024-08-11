"use client";

import axios from "axios";
import { createContext, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  isLoading: true,
});

export const AuthContextProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setLoading] = useState(initialUser);
  const router = useRouter();

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

  const logout = useCallback(async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/logout`,
        { _id: user._id },
        {
          withCredentials: true,
        }
      )
      .catch(() => {});

    setUser(null);
    router.push("/login");
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
