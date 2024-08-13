"use client";

import { apiInstance } from "@/lib/api";
import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import themeConfig from "@/tailwind.config";
import { errorToast, successToast } from "@/components/atoms/Toast";
import { useSocket } from "@/hooks/useSocket";
import { useMapStore } from "@/stores/mapStore";

const libraries = ["places"];

export const MapContext = createContext({
  map: null,
  center: null,
  isLoaded: true,
  markers: [],
});

export const markerColors = {
  blue: themeConfig.theme.extend.colors["blue-annotation"],
  yellow: themeConfig.theme.extend.colors["yellow-annotation"],
  purple: themeConfig.theme.extend.colors["purple-annotation"],
  green: themeConfig.theme.extend.colors["green-annotation"],
  red: themeConfig.theme.extend.colors["red-annotation"],
};

const fetcher = async (url) => {
  const { data } = await apiInstance.get(url);
  return data;
};

export const MapContextProvider = ({ children }) => {
  const {
    map,
    setMap,
    center,
    centerMap,
    elevator,
    setElevator,
    selectedMapMarker,
    selectMapMarker,
  } = useMapStore();

  const [isLoading, setLoading] = useState(false);
  const { socket } = useSocket();

  const { data: markers = [], mutate } = useSWR(
    "/api/markers/getmarkers",
    (url) => fetcher(url)
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
    libraries,
  });

  const createNewMapMarker = useCallback(
    async ({ selectedDevice, ...marker }) => {
      try {
        setLoading(true);

        // const res = await axios.post(
        //   "https://nj.unmannedlive.com/dfr/newcall",
        //   {
        //     ...marker,
        //     lat: marker.position.lat,
        //     lon: marker.position.lng,
        //     z: elevation,
        //     workspaceid: selectedDevice.workspace_id,
        //     sn: selectedDevice.serial_number,
        //   },
        //   {
        //     withCredentials: false,
        //   }
        // );
        // if (res.status === 201) {
        const { data } = await apiInstance.post(`/api/markers/createmarker`, {
          ...marker,
          socket: socket?.id,
        });
        successToast(`Successfully created Map Marker: ${data.name}!`);
        mutate(data);
        setLoading(false);
        return data;
      } catch ({
        response: {
          data: { message },
        },
      }) {
        setLoading(false);
        errorToast(message);
        return null;
      }
    },
    [setLoading, markers, socket]
  );

  const deleteMapMarker = useCallback(
    async (marker) => {
      try {
        setLoading(true);

        const { data } = await apiInstance.delete(`/api/markers/deletemarker`, {
          data: { ...marker, socket: socket?.id },
        });
        successToast(`Successfully deleted Map Marker: ${marker.name}`);
        mutate([...markers.filter(({ name }) => name !== marker.name)]);
        selectMapMarker(null);
        setLoading(false);
        return data;
      } catch ({
        response: {
          data: { message },
        },
      }) {
        errorToast(message);
        setLoading(false);
        return null;
      }
    },
    [setLoading, markers, selectMapMarker, socket]
  );

  const updateMapMarker = useCallback(
    async (marker) => {
      try {
        setLoading(true);
        const { data: updatedMarker } = await apiInstance.put(
          `/api/markers/updatemarker`,
          { ...marker, socket: socket?.id }
        );
        successToast(`Successfully updated Map Marker: ${updatedMarker.name}`);

        const index = markers.findIndex(
          ({ name }) => name === updatedMarker.name
        );

        if (selectedMapMarker.name === updatedMarker.name) {
          selectMapMarker(updatedMarker);
        }

        markers[index] = updatedMarker;
        mutate([...markers]);

        setLoading(false);
        return updatedMarker;
      } catch ({
        response: {
          data: { message },
        },
      }) {
        errorToast(message);
        setLoading(false);
        return null;
      }
    },
    [setLoading, markers, selectedMapMarker, selectMapMarker, socket]
  );

  useEffect(() => {
    if (selectedMapMarker) {
      const markerStillExists = markers.find(
        ({ _id }) => selectedMapMarker._id === _id
      );
      if (!markerStillExists) {
        selectMapMarker(null);
      }
    }
  }, [markers, selectedMapMarker, selectMapMarker]);

  const forceUpdateMarkers = () => {
    mutate();
  };

  useEffect(() => {
    socket?.on("markers-updated", forceUpdateMarkers);

    return () => {
      socket?.off("markers-updated", forceUpdateMarkers);
    };
  }, []);

  return (
    <MapContext.Provider
      value={{
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
