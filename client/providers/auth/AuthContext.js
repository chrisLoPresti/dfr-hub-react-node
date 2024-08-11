"use client";

import { createContext, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { apiInstance } from "@/lib/api";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  isLoading: true,
});

export const AuthContextProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const login = useCallback(
    async (credentials) => {
      if (isLoading) {
        return;
      }
      setLoading(true);
      const res = await apiInstance
        .post("/api/auth/login", credentials, {
          withCredentials: true,
        })
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
    await apiInstance
      .post(
        "/api/auth/logout",
        { _id: user?._id },
        {
          withCredentials: true,
        }
      )
      .catch(() => {});

    setUser(null);

    router.push(
      `/login${pathname.includes("logout") ? "" : `?redirect=${pathname}`}`
    );
  }, [user, pathname]);

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
