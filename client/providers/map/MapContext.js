"use client";

import { apiInstance } from "@/lib/api";
import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import useSWR from "swr";
import themeConfig from "@/tailwind.config";
import { errorToast, successToast } from "@/components/atoms/Toast";
import { useSocket } from "@/hooks/useSocket";

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

export const MapContextProvider = ({ children, initialUser }) => {
  const [map, setMap] = useState(initialUser);
  const [center, setCenter] = useState(initialUser);
  const [elevator, setElevator] = useState(initialUser);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedMapMarker, setSelectedMapMarker] = useState(null);
  const { socket } = useSocket();

  const { data: allMarkers = [], mutate: getAllMarkers } = useSWR(
    "/api/markers/getmarkers",
    (url) => fetcher(url)
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
        const { data } = await apiInstance.post(
          `/api/markers/createmarker`,
          marker
        );
        successToast(`Successfully created Map Marker: ${data.name}!`);
        setMarkers([...markers, data]);
        setLoading(false);
        return data;
        // } else {
        //   errorToast(`Unable to create map marker: ${marker.name}`);
        // }
      } catch (error) {
        setLoading(false);
        errorToast(`Unable to create map marker: ${marker.name}`);
        return { error };
      }
    },
    [setLoading, markers]
  );

  const deleteMapMarker = useCallback(
    async (marker) => {
      try {
        setLoading(true);

        const { data } = await apiInstance.delete(`/api/markers/deletemarker`, {
          data: { marker },
        });
        successToast(`Successfully deleted Map Marker: ${marker.name}`);
        setMarkers([...markers.filter(({ name }) => name !== marker.name)]);
        setSelectedMapMarker(null);
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        return { error };
      }
    },
    [setLoading, markers, setMarkers, setSelectedMapMarker]
  );

  const updateMapMarker = useCallback(
    async (marker) => {
      try {
        setLoading(true);
        const { data: updatedMarker } = await apiInstance.put(
          `/api/markers/updatemarker`,
          marker
        );
        successToast(`Successfully updated Map Marker: ${updatedMarker.name}`);

        const index = markers.findIndex(
          ({ name }) => name === updatedMarker.name
        );

        if (selectedMapMarker.name === updatedMarker.name) {
          setSelectedMapMarker(updatedMarker);
        }

        markers[index] = updatedMarker;
        setMarkers([...markers]);

        setLoading(false);
        return data;
      } catch ({
        response: {
          data: { message },
        },
      }) {
        errorToast(message);
        setLoading(false);
        return { error: { message } };
      }
    },
    [setLoading, markers, setMarkers, selectedMapMarker, setSelectedMapMarker]
  );

  useEffect(() => {
    if (selectedMapMarker) {
      const markerStillExists = markers.find(
        ({ _id }) => selectedMapMarker._id === _id
      );
      if (!markerStillExists) {
        setSelectedMapMarker(null);
      }
    }
  }, [markers, selectedMapMarker, setSelectedMapMarker]);

  useEffect(() => {
    setCenter({
      lat: coords?.latitude,
      lng: coords?.longitude,
    });
  }, [coords, setCenter]);

  useEffect(() => {
    setMarkers(allMarkers);
  }, [allMarkers]);

  useEffect(() => {
    if (socket) {
      socket.on("markers-updated", () => {
        console.log("update the data");
        getAllMarkers();
      });
    }
  }, [socket]);

  return (
    <MapContext.Provider
      value={{
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
