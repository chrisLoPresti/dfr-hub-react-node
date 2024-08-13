"use client";

import { useContext } from "react";
import { MapContext } from "@/providers/map/MapContext";

export const useMap = () => {
  const {
    isLoading,
    map,
    setMap,
    center,
    centerMap,
    isLoaded,
    elevator,
    setElevator,
    markers,
    markerColors,
    createNewMapMarker,
    selectedMapMarker,
    selectMapMarker,
    deleteMapMarker,
    updateMapMarker,
  } = useContext(MapContext);

  return {
    isLoading,
    map,
    setMap,
    center,
    centerMap,
    isLoaded,
    elevator,
    setElevator,
    markers,
    markerColors,
    createNewMapMarker,
    createNewMapMarker,
    selectedMapMarker,
    selectMapMarker,
    deleteMapMarker,
    updateMapMarker,
  };
};
