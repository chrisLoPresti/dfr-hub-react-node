"use client";

import SideNavigation from "@/components/map/SideNavigation";
import { useUser } from "@/hooks/useUser";
import { MapContextProvider } from "@/providers/map/MapContext";
import { SocketContextProvider } from "@/providers/socket/SocketContext";
import { useEffect } from "react";

export default function MapLayout({ children }) {
  const { user, logout, isLoading } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      logout();
    }
  }, [user, isLoading]);

  return (
    <SocketContextProvider>
      <MapContextProvider>
        {user && (
          <header className="sticky top-0 z-20 h-16 bg-slate-900">
            <div className="flex items-center w-full h-full">
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
        <div className="flex h-[calc(100vh_-_64px)] relative">
          <SideNavigation />
          {children}
        </div>
      </MapContextProvider>
    </SocketContextProvider>
  );
}
