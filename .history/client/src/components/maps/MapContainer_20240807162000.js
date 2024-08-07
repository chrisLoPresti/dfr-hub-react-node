import Map from "./Map";
import SideNavigation from "./SideNavigation";

const MapContainer = () => {
  return (
    <div className="flex">
      <SideNavigation />
      <Map />
    </div>
  );
};

export default MapContainer;
