"use client";

import { useEffect, useCallback, useState } from "react";
import {
  GoogleMap,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FaSpinner } from "react-icons/fa6";
import MapMarker from "./MapMarker";
import CreatePinPointButton from "./CreatePinPointButton";
import LockMarkersButton from "./LockMarkersButton";
import SelectedMarkerDrawer from "./SelectedMarkerDrawer";
import { useGeolocated } from "react-geolocated";
import { useMapStore } from "@/stores/mapStore";
import useMapMarkers from "@/hooks/useMapMarkers";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = () => {
  const {
    setMap,
    setElevator,
    setMapTypeId,
    mapTypeId,
    centerMap,
    center,
    elevator,
  } = useMapStore();

  const {
    createNewMapMarker,
    selectMapMarker,
    defaultMarkerColor,
    markers,
    isLoading,
    canCreateMapMarkers,
  } = useMapMarkers();

  const [searchBox, setSearchBox] = useState(null);
  //   const [liveStreamLink, setLiveStreamLink] = useState(null);

  //   const { selectedDevice } = useDeviceContext();

  const onMapLoad = (map) => {
    setMap(map);
    const newElevator = new google.maps.ElevationService();
    setElevator(newElevator);
  };

  const onSearchBoxLoad = (newSearchBox) => {
    setSearchBox(newSearchBox);
  };

  const onUnmount = () => {
    setMap(null);
    setElevator(null);
  };

  const onAddressFound = useCallback(() => {
    const address = searchBox.getPlaces();
    const latLng = address[0].geometry.location;
    createNewMapMarker({
      name: address[0].name,
      position: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
      workspace_id: "030a6a94-3c84-11ef-8ace-570f0d051196",
      // selectedDevice,
    });
  }, [
    searchBox,
    createNewMapMarker,
    // selectedDevice
  ]);

  const dropMarker = useCallback(
    async ({ latLng, name }) => {
      if (canCreateMapMarkers && !isLoading) {
        const marker = {
          name: name || `new pin ${new Date().toLocaleString()}`, // `new pin ${uuidv4()}`,
          position: {
            lat: latLng.lat(),
            lng: latLng.lng(),
          },
          workspace_id: "030a6a94-3c84-11ef-8ace-570f0d051196",
          // selectedDevice: selectedDevice,
        };

        const newMarker = await createNewMapMarker(marker);
        if (newMarker) {
          selectMapMarker(newMarker);
        }
      }
    },
    [
      createNewMapMarker,
      canCreateMapMarkers,
      isLoading,
      elevator,
      // selectedDevice,
    ]
  );

  //   const closeLiveStreamLink = () => {
  //     setLiveStreamLink(null);
  //   };

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
    centerMap({
      lat: coords?.latitude,
      lng: coords?.longitude,
    });
  }, [coords, centerMap]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={dropMarker}
        onMapTypeIdChanged={setMapTypeId}
        options={{
          fullscreenControl: false,
          mapTypeId: mapTypeId,
          rotateControl: true,
          streetViewControl: false,
          minZoom: 5,
          draggableCursor: canCreateMapMarkers ? "crosshair" : "",
        }}
      >
        <>
          {markers.map((marker) => (
            <MapMarker key={marker._id} marker={marker} />
          ))}
          <CreatePinPointButton />
        </>
        <LockMarkersButton />
        <StandaloneSearchBox
          onPlacesChanged={onAddressFound}
          onLoad={onSearchBoxLoad}
        >
          <input
            type="text"
            placeholder="Search for an address"
            className="overflow-ellipses outline-none w-96 h-27 absolute top-2.5 p-2 rounded-sm shadow-lg right-2 z-20"
          />
        </StandaloneSearchBox>
        {/* <>
  
       
       
         
          {selectedDevice && (
            <div
              className="absolute top-24 left-2.5 text-xs text-white w-30 flex gap-y-2 items-center justify-center flex-col bg-slate-700 bg-opacity-90  rounded-md p-5"
              key={selectedDevice?.serial_number}
            >
              <p className="underline w-full  mb-2">Active Device</p>
              <p>{selectedDevice?.agency}</p>
              <Image
                src={selectedDevice?.image}
                alt={selectedDevice?.device}
                width={80}
                height={80}
              />
              <div className="text-neutral-300 w-full">
                <p className="underline">Device: </p>
                <p>{selectedDevice?.device}</p>
              </div>
              <div className="text-neutral-300 w-full">
                <p className="underline">Serial Number: </p>
                {selectedDevice?.serial_number}
              </div>
              <button
                className="rounded-md bg-tertiary p-2 w-full"
                onClick={() =>
                  setLiveStreamLink(
                    `https://unmannedar.com/getlive.html?key=${selectedDevice?.stream_id}`
                  )
                }
              >
                Start Live Steam
              </button>
            </div>
          )}
          <LiveStream
            endPoint={liveStreamLink}
            closeEndpoint={closeLiveStreamLink}
          />
        </> */}
      </GoogleMap>
      <SelectedMarkerDrawer />
    </>
  ) : (
    <div
      className="flex w-full h-full items-center justify-center gap-3 bg-cover bg-center h-screen text-white text-2xl"
      style={{ backgroundImage: "url('/map_placeholder.jpg')" }}
    >
      <FaSpinner className="animate-spin h-5 w-5" />
      <p>Loading map...</p>
    </div>
  );
};
