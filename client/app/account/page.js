"use client";

import { Map } from "@/components/map/Map";
import { useUser } from "@/hooks/useUser";
import { MapContextProvider } from "@/providers/map/MapContext";

const Account = () => {
  const { user } = useUser();
  return (
    <div className="w-screen h-screen">
      <MapContextProvider>
        <Map />
      </MapContextProvider>
    </div>
  );
};

export default Account;
