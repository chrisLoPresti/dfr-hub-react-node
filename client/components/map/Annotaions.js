import { useMap } from "@/hooks/useMap";
import classNames from "classnames";
import { useCallback } from "react";
import Checkbox from "react-custom-checkbox";
import { TbDiamonds } from "react-icons/tb";

const Annotations = ({ visible }) => {
  const { markers, selectMapMarker, centerMap, selectedMapMarker, map } =
    useMap();

  const handleSelectMapMarker = useCallback(
    (marker) => () => {
      map.setZoom(15);
      centerMap(marker.position);
      selectMapMarker(marker);
    },
    [map, selectMapMarker]
  );
  return visible ? (
    <div className="flex flex-col truncate">
      <p className="my-5 ml-5">Map Annotations</p>
      {markers?.map((currMarker) => {
        const { _id, name, color } = currMarker;
        return (
          <div
            key={_id}
            data-tooltip-id="tooltip"
            data-tooltip-content={name}
            className={classNames(
              "flex justify-left items-center gap-x-2 text-xl py-2 cursor-pointer p-5",
              {
                "bg-white bg-opacity-10": selectedMapMarker?._id === _id,
              }
            )}
            onClick={handleSelectMapMarker(currMarker)}
          >
            <Checkbox className="border-white" borderColor="white" size={16} />
            <TbDiamonds className={`text-${color}-annotation`} />
            <p className="overflow-hidden text-ellipsis text-sm">{name}</p>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Annotations;
