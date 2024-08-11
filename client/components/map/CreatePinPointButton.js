import classNames from "classnames";
import { useState } from "react";
import { TbDiamonds } from "react-icons/tb";
import ColorButtons from "./ColorButtons";

const CreatePinPointButton = ({
  enablePinPoints,
  toggleEnablePinPoints,
  color,
  changeColor,
  defaultMarkerColor,
}) => {
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const showColorPicker = () => {
    setOpenColorPicker(true);
  };

  const hideColorPicker = () => {
    setOpenColorPicker(false);
  };

  return (
    <div
      className="absolute top-20 right-2.5 flex"
      onMouseEnter={showColorPicker}
      onMouseLeave={hideColorPicker}
    >
      {openColorPicker && (
        <ColorButtons color={color} changeColor={changeColor} />
      )}
      <button
        className={classNames(
          "rounded-sm p-2 shadow-lg bg-white border-2 ml-2",
          {
            [`text-${defaultMarkerColor}-annotation border-${defaultMarkerColor}-annotation bg-gradient-to-tr from-white from-80% to-${defaultMarkerColor}-annotation to-90%`]:
              enablePinPoints,
            "border-white": !enablePinPoints,
          }
        )}
        onClick={toggleEnablePinPoints}
        data-tooltip-id="tooltip"
        data-tooltip-content={`${
          enablePinPoints ? "Disable" : "Enable"
        } click to create markers`}
      >
        <TbDiamonds />
      </button>
    </div>
  );
};
export default CreatePinPointButton;
