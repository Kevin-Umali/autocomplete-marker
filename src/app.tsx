import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { APIProvider, ControlPosition, Map, MapMouseEvent } from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";

const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLng | null>(null);

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      setSelectedLocation(new google.maps.LatLng(event.detail.latLng));
    }
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={handleMapClick}
      />

      <CustomMapControl controlPosition={ControlPosition.TOP} onPlaceSelect={setSelectedPlace} />

      <MapHandler place={selectedPlace} location={selectedLocation} />
    </APIProvider>
  );
};

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(<App />);
}
