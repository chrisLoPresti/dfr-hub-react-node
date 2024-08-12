"use client";

import { useMap } from "@/hooks/useMap";
import classNames from "classnames";
import ColorButtons from "./ColorButtons";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineCenterFocusWeak, MdOutlineDelete } from "react-icons/md";
import { useCallback } from "react";
import Input from "../atoms/Input";

const SelectedMarkerDrawer = () => {
  const {
    selectedMapMarker,
    setSelectedMapMarker,
    map,
    deleteMapMarker,
    updateMapMarker,
  } = useMap();

  const handleDeselectMapMarker = () => {
    setSelectedMapMarker(null);
  };

  const updateMapMarkerColor = useCallback(
    (color) => {
      updateMapMarker({ ...selectedMapMarker, color });
    },
    [selectedMapMarker]
  );

  const handleDeleteMarker = useCallback(() => {
    deleteMapMarker(selectedMapMarker);
  }, [selectedMapMarker, deleteMapMarker]);

  const handleRecenterMap = useCallback(() => {
    map.setCenter(selectedMapMarker.position);
    map.setZoom(15);
  }, [map, selectedMapMarker]);

  return (
    <div
      className={classNames("transition-all ease-in-out duration-500", {
        "w-0  opacity-0": !selectedMapMarker,
        "w-72 opacity-100": selectedMapMarker,
      })}
    >
      <div className="h-full p-5 w-72 bg-tertiary flex flex-col gap-y-2 bg-slate-700">
        <div className="flex justify-center items-center">
          <label className="text-white" htmlFor="selected-marker-name">
            Selected Map Marker
          </label>
          <button
            onClick={handleDeselectMapMarker}
            className="text-white ml-auto"
            data-tooltip-id="tooltip"
            data-tooltip-content="Close Marker"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <Input
            id="selected-marker-name"
            type="text"
            value={selectedMapMarker?.name || "marker name..."}
            className="w-full shadow-inner text-sm p-2 rounded-sm"
          />
          <div className="flex items-center justify-center gap-x-2 ml-2">
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content=" Recenter"
              onClick={handleRecenterMap}
            >
              <MdOutlineCenterFocusWeak className="text-white text-xl" />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content=" Delete"
              onClick={handleDeleteMarker}
            >
              <MdOutlineDelete className="text-white text-xl" />
            </button>
          </div>
        </div>
        <ColorButtons
          color={selectedMapMarker?.color}
          changeColor={updateMapMarkerColor}
          className="bg-transparent"
        />
        <div className="text-sm w-full flex flex-col gap-y-2">
          <div className="flex items-center w-full justify-between">
            <p className="w-1/3 text-white"> Longitude:</p>
            <Input
              type="text"
              value={selectedMapMarker?.position?.lng || "longitude..."}
              className="w-2/3 p-2 shadow-inner text-sm rounded-sm"
            />
          </div>
          <div className="flex items-center w-full justify-between">
            <p className="w-1/3 text-white"> Latitude: </p>
            <Input
              type="text"
              value={selectedMapMarker?.position?.lat || "latitude..."}
              className="w-2/3 p-2 shadow-inner text-sm rounded-sm"
            />
          </div>
          <div className="flex items-center w-full justify-between">
            <p className="w-1/3 text-white"> Elevation: </p>
            <Input
              type="text"
              value={selectedMapMarker?.position?.elevation || "elevation..."}
              className="w-2/3 p-2 shadow-inner text-sm rounded-sm"
            />
          </div>
          <hr className="my-2" />
          <div className="text-white">
            <p className="mb-2">Created By:</p>
            <p>{selectedMapMarker?.created_by?.name}</p>
            <p>{selectedMapMarker?.created_by?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMarkerDrawer;
