"use client";

import { Map } from "@/components/map/Map";
import { MapContextProvider } from "@/providers/map/MapContext";

const Account = () => {
  return (
    <MapContextProvider>
      <Map />
    </MapContextProvider>
  );
};

export default Account;
