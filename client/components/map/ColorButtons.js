import { BsCheck } from "react-icons/bs";
import classNames from "classnames";
import { useMap } from "@/hooks/useMap";

const ColorButtons = ({ className, color, changeColor, disabled }) => {
  const { markerColors } = useMap();

  const handleChangeColor = (color) => () => {
    changeColor(color);
  };

  return (
    <div
      className={classNames("bg-white flex shadow-sm rounded-sm p-2 gap-x-2", {
        [className]: className,
      })}
      data-tooltip-id="tooltip"
      data-tooltip-content="Change default marker color"
    >
      {Object.keys(markerColors).map((key) => (
        <button
          key={key}
          className={`bg-${key}-annotation w-5 h-5 flex justify-center items-center`}
          onClick={changeColor ? handleChangeColor(key) : null}
          disabled={disabled}
        >
          {color === key ? <BsCheck className="text-white text-xl" /> : ""}
        </button>
      ))}
    </div>
  );
};

export default ColorButtons;
