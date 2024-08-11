"use client";

import { useEffect, useCallback, useState } from "react";
import { GoogleMap, StandaloneSearchBox } from "@react-google-maps/api";
import { FaSpinner } from "react-icons/fa6";
import { useMap } from "@/hooks/useMap";
import MapMarker from "./MapMarker";
import CreatePinPointButton from "./CreatePinPointButton";
import LockMarkersButton from "./LockMarkersButton";
import SelectedMarkerDrawer from "./SelectedMarkerDrawer";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = () => {
  const {
    isLoading,
    map,
    setMap,
    center,
    isLoaded,
    elevator,
    setElevator,
    markers,
    createNewMapMarker,
  } = useMap();

  const [searchBox, setSearchBox] = useState(null);
  const [enablePinPoints, setEnablePinPoints] = useState(false);
  const [lockMarkerDrag, setLockMarkerDrag] = useState(true);
  const [mapTypeId, setMapTypeId] = useState(null);
  const [defaultMarkerColor, setDefaultMarkerColor] = useState("blue");
  //   const [liveStreamLink, setLiveStreamLink] = useState(null);

  //   const { selectedDevice } = useDeviceContext();

  const onMapLoad = useCallback((map) => {
    map.setZoom(15);
    setMap(map);
    const newElevator = new google.maps.ElevationService();
    setElevator(newElevator);
  }, []);

  const onSearchBoxLoad = useCallback((newSearchBox) => {
    setSearchBox(newSearchBox);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    setElevator(null);
  }, []);

  const toggleEnablePinPoints = () => {
    if (enablePinPoints) {
      map.setOptions({ draggableCursor: "" });
    } else {
      map.setOptions({ draggableCursor: "crosshair" });
    }
    setEnablePinPoints(!enablePinPoints);
  };

  const onAddressFound = useCallback(
    (e) => {
      const address = searchBox.getPlaces();

      createNewMapMarker({
        name: address[0].name,
        latLng: address[0].geometry.location,
        color: defaultMarkerColor,
        // selectedDevice,
      });
    },
    [
      searchBox,
      createNewMapMarker,
      defaultMarkerColor,
      // selectedDevice
    ]
  );

  const dropMarker = useCallback(
    async ({ latLng, name }) => {
      if (enablePinPoints && !isLoading) {
        const marker = {
          name: name || `new pin ${new Date().toLocaleString()}`, // `new pin ${uuidv4()}`,
          position: {
            lat: latLng.lat(),
            lng: latLng.lng(),
          },
          color: defaultMarkerColor,
          // selectedDevice: selectedDevice,
        };
        const { results } = await elevator.getElevationForLocations({
          locations: [marker.position],
        });

        const elevation = results[0].elevation;
        createNewMapMarker({ ...marker, elevation });
      }
    },
    [
      createNewMapMarker,
      defaultMarkerColor,
      enablePinPoints,
      isLoading,
      elevator,
      // selectedDevice,
    ]
  );

  const storeMapTypeId = useCallback(() => {
    const newMapTypeId = map?.getMapTypeId() ?? mapTypeId;
    if (newMapTypeId !== mapTypeId) {
      localStorage.setItem("mapTypeId", newMapTypeId);
      setMapTypeId(newMapTypeId);
    }
  }, [map, mapTypeId]);

  const toggleLockMarkerDrag = () => {
    setLockMarkerDrag(!lockMarkerDrag);
  };

  //   const closeLiveStreamLink = () => {
  //     setLiveStreamLink(null);
  //   };

  const changeDefaultMarkerColor = (color) => {
    setDefaultMarkerColor(color);
  };

  useEffect(() => {
    const storedMapTypeId = localStorage?.getItem("mapTypeId") ?? "hybrid";
    setMapTypeId(storedMapTypeId);
  }, []);

  return isLoaded ? (
    <div className="relative w-full h-full flex">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={dropMarker}
        onMapTypeIdChanged={storeMapTypeId}
        options={{
          fullscreenControl: false,
          mapTypeId: mapTypeId,
          rotateControl: true,
          streetViewControl: false,
          // disableDefaultUI: true
        }}
      >
        <>
          {markers.map((marker) => (
            <MapMarker
              key={marker._id}
              marker={marker}
              lockMarkerDrag={lockMarkerDrag}
            />
          ))}
          <CreatePinPointButton
            enablePinPoints={enablePinPoints}
            toggleEnablePinPoints={toggleEnablePinPoints}
            color={defaultMarkerColor}
            changeColor={changeDefaultMarkerColor}
            defaultMarkerColor={defaultMarkerColor}
          />
        </>
        <LockMarkersButton
          toggleLockMarkerDrag={toggleLockMarkerDrag}
          lockMarkerDrag={lockMarkerDrag}
        />
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
    </div>
  ) : (
    <div className="flex w-full h-full items-center justify-center gap-3">
      <FaSpinner className="animate-spin h-5 w-5" />
      <p>Loading map...</p>
    </div>
  );
};
