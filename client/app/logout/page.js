"use client";

import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

const { useEffect } = require("react");

const Logout = () => {
  const { logout } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/login");
  }, []);

  return null;
};

export default Logout;
