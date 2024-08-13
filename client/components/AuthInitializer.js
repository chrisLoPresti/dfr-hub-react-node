"use client";

import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

const AuthInitializer = ({ children, session }) => {
  useUserStore.setState({ user: session.user });
  useEffect(() => {
    if (!session.user && session.sessionCookie) {
      const { logout } = useUserStore.getState();
      logout();
    }
  }, []);

  return children;
};

export default AuthInitializer;
