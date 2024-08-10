"use client";

import { useUser } from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountLayout({ children }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [user, isLoading, pathname]);

  return children;
}
