import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";

// import { PlaceAutocompleteClassic } from "./autocomplete-classic";
// import { AutocompleteCustomHybrid } from "./autocomplete-custom-hybrid";
import { AutocompleteCustom } from "./autocomplete-custom";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({ controlPosition, onPlaceSelect }: CustomAutocompleteControlProps) => {
  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        {/* <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} /> */}

        <AutocompleteCustom onPlaceSelect={onPlaceSelect} />

        {/* <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} /> */}
      </div>
    </MapControl>
  );
};
