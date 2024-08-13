"use client";

import SideNavigation from "@/components/map/SideNavigation";
import { MapContextProvider } from "@/providers/map/MapContext";
import { SocketContextProvider } from "@/providers/socket/SocketContext";
import { useUserStore } from "@/stores/userStore";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MapLayout({ children }) {
  const { user } = useUserStore();
  const rotuer = useRouter();

  if (!user) {
    redirect("/login");
  }

  useEffect(() => {
    if (!user) {
      rotuer.push("/login");
    }
  }, [user]);

  return (
    user && (
      <SocketContextProvider>
        <MapContextProvider>
          <header className="sticky top-0 z-20 h-16 bg-slate-900">
            <div className="flex items-center w-full h-full">
              <p className="text-white ml-auto mr-2.5">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          </header>
          <div className="flex h-[calc(100vh_-_64px)] relative overflow-hidden bg-slate-700">
            <SideNavigation />
            {children}
          </div>
        </MapContextProvider>
      </SocketContextProvider>
    )
  );
}
