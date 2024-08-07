import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

const libraries = ["places"];

const Map = () => {
  const [center, setCenter] = useState({});

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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API || "",
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.setZoom(15);
    // setMap(map);
    // const newElevator = new google.maps.ElevationService();
    // setElevator(newElevator);
  }, []);

  useEffect(() => {
    setCenter({
      lat: coords?.latitude,
      lng: coords?.longitude,
    });
  }, [coords, setCenter]);
  console.log("here");
  return (
    isLoaded && (
      <div className="relative w-screen h-screen flex">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={center}
          zoom={1}
          onLoad={onMapLoad}
          // onUnmount={onUnmount}
          // onClick={dropMarker}
          // onMapTypeIdChanged={storeMapTypeId}
          options={{
            fullscreenControl: false,
            //   mapTypeId: mapTypeId,
            rotateControl: true,
            streetViewControl: false,
            // disableDefaultUI: true
          }}
        >
          {/* <StandaloneSearchBox
        onPlacesChanged={onAddressFound}
        onLoad={onSearchBoxLoad}
      >
        <input
          type="text"
          placeholder="Search for an address"
          className="overflow-ellipses outline-none w-96 h-27 absolute top-2.5 p-2 rounded-sm shadow-lg right-2 z-20"
        />
      </StandaloneSearchBox>
      {markers.map((marker, index) => (
        <MapMarker
          key={marker._id}
          marker={marker}
          index={index}
          elevator={elevator}
          selectMapMarker={selectMapMarker}
          selectedMapMarker={selectedMapMarker}
          updateMapMarker={updateMapMarker}
          lockMarkerDrag={lockMarkerDrag}
        />
      ))}
      <CreatePinPointButton
        enablePinPoints={enablePinPoints}
        toggleEnablePinPoints={toggleEnablePinPoints}
        color={defaultMarkerColor}
        changeColor={changeDefaultMarkerColor}
      />
      <button
        className={classNames(
          "rounded-sm p-2 shadow-lg bg-white border-2 ml-2 absolute top-32 right-2.5 flex",
          {
            "text-blue-annotation border-blue-annotation bg-gradient-to-tr from-white from-80% to-blue-annotation to-90%":
              !lockMarkerDrag,
            "border-white": lockMarkerDrag,
          }
        )}
        onClick={toggleLockMarkerDrag}
        data-tooltip-id="tooltip"
        data-tooltip-content={`${
          lockMarkerDrag ? "Unlock" : "Lock"
        } marker dragging`}
      >
        {lockMarkerDrag ? (
          <FaArrowDownUpLock />
        ) : (
          <FaArrowDownUpAcrossLine />
        )}
      </button>
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
      )} */}
          {/* <LiveStream
        endPoint={liveStreamLink}
        closeEndpoint={closeLiveStreamLink}
      /> */}
        </GoogleMap>
      </div>
    )
  );
};

export default Map;
