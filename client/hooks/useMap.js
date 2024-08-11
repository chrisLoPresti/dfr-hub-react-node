"use client";

import { useContext } from "react";
import { MapContext } from "@/providers/map/MapContext";

export const useMap = () => {
  const {
    isLoading,
    map,
    setMap,
    center,
    setCenter,
    isLoaded,
    elevator,
    setElevator,
    markers,
    markerColors,
    createNewMapMarker,
    selectedMapMarker,
    setSelectedMapMarker,
    deleteMapMarker,
    updateMapMarker,
  } = useContext(MapContext);

  return {
    isLoading,
    map,
    setMap,
    center,
    setCenter,
    isLoaded,
    elevator,
    setElevator,
    markers,
    markerColors,
    createNewMapMarker,
    createNewMapMarker,
    selectedMapMarker,
    setSelectedMapMarker,
    deleteMapMarker,
    updateMapMarker,
  };
};
