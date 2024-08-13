import { create } from "zustand";

const initialState = {
  map: null,
  elevator: null,
  center: null,
  selectedMapMarker: null,
};

export const useMapStore = create((set) => ({
  ...initialState,
  setMap: (map) => set((state) => ({ ...state, map })),
  setElevator: (elevator) => set((state) => ({ ...state, elevator })),
  centerMap: (position) =>
    set((state) => {
      state.map?.setZoom(15);
      const { lat, lng } = position;
      if (lat && lng) {
        return {
          ...state,
          center: position,
        };
      }
      state.map?.setCenter(state.selectedMapMarker?.position);
      return {
        ...state,
        center: state.selectedMapMarker?.position,
      };
    }),
  selectMapMarker: (selectedMapMarker) =>
    set((state) => {
      state.centerMap(selectedMapMarker.position);
      state.map?.setZoom(15);
      return { ...state, selectedMapMarker };
    }),
}));
