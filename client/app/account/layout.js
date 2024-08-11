"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

export default function AccountLayout({ children }) {
  const { user, logout, isLoading } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      logout();
    }
  }, [user, isLoading]);

  return (
    <>
      {user && (
        <header>
          <div className="bg-slate-700 flex items-center w-full h-16">
            <button
              onClick={logout}
              className="bg-slate-400 rounded-md p-2 text-white ml-2.5"
            >
              Logout
            </button>
            <p className="text-white ml-auto mr-2.5">
              {user.first_name} {user.last_name}
            </p>
          </div>
        </header>
      )}
      {children}
    </>
  );
}
