"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/Auth";

export const useUser = () => {
  const { user, login, isLoading } = useContext(AuthContext);

  return { user, login, isLoading };
};
