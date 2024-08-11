"use client";

import { useContext } from "react";
import { MapContext } from "@/providers/map/MapContext";

export const useMap = () => {
  const {
    map,
    setMap,
    center,
    setCenter,
    isLoaded,
    elevator,
    setElevator,
    markers,
  } = useContext(MapContext);

  return {
    map,
    setMap,
    center,
    setCenter,
    isLoaded,
    elevator,
    setElevator,
    markers,
  };
};
