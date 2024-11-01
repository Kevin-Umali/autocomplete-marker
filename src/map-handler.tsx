import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";

interface Props {
  place: google.maps.places.PlaceResult | null;
  location: google.maps.LatLng | null;
}

const MapHandler = ({ place, location }: Props) => {
  const map = useMap();
  const markerLib = useMapsLibrary("marker");
  // const geocoderLib = useMapsLibrary("geocoding");
  const markerRef = useRef<google.maps.Marker | null>(null);

  const prevPlaceRef = useRef<google.maps.places.PlaceResult | null>(null);
  const prevLocationRef = useRef<google.maps.LatLng | null>(null);

  useEffect(() => {
    if (
      !map ||
      !markerLib
      // || !geocoderLib
    )
      return;

    const placeChanged = place !== prevPlaceRef.current;
    const locationChanged = location !== prevLocationRef.current;

    let position: google.maps.LatLng;
    if (placeChanged && place?.geometry?.location) {
      position = place.geometry.location;
    } else if (locationChanged && location) {
      position = location;
    } else {
      return; // No meaningful change, so exit
    }

    // const geocoder = new geocoderLib.Geocoder();
    // const results = await geocoder.geocode({location: position});

    // Remove the existing marker if there is one
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Create a new marker at the updated position
    markerRef.current = new markerLib.Marker({
      position: position,
      map,
      animation: markerLib.Animation.DROP,
    });

    // Adjust the map view based on place viewport or location
    if (placeChanged && place?.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(position);
      // map.setZoom(15);
    }

    // Update previous values
    prevPlaceRef.current = place;
    prevLocationRef.current = location;

    // Cleanup marker on unmount
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [map, place, location, markerLib]);

  return null;
};

export default React.memo(MapHandler);
