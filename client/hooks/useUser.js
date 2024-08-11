"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/auth/AuthContext";

export const useUser = () => {
  const { user, login, logout, isLoading } = useContext(AuthContext);

  return { user, login, isLoading, logout };
};
