"use client";

import { apiInstance } from "@/lib/api";
import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import useSWR from "swr";

const libraries = ["places"];

export const MapContext = createContext({
  map: null,
  center: null,
  isLoaded: true,
  markers: [],
});

const fetcher = async (url) => {
  const { data } = await apiInstance.get(url);
  return data;
};

export const MapContextProvider = ({ children, initialUser }) => {
  const [map, setMap] = useState(initialUser);
  const [center, setCenter] = useState(initialUser);
  const [elevator, setElevator] = useState(initialUser);
  const { data: markers = [] } = useSWR("/api/markers/getmarkers", (url) =>
    fetcher(url)
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
    libraries,
  });

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity,
    },
    watchPosition: false,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    // geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true,
    watchLocationPermissionChange: false,
  });

  useEffect(() => {
    setCenter({
      lat: coords?.latitude,
      lng: coords?.longitude,
    });
  }, [coords, setCenter]);
  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        center,
        setCenter,
        isLoaded,
        elevator,
        setElevator,
        markers,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
