const MAP_API = process.env.NEXT_PUBLIC_MAP_API;

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import LoadingCircle from "./LoadingCircle";
import React from "react";
import styles from "../styles/TripMemory.module.css";
const libraries = ["places"];

export default function MemoryMap({ lat, lng }) {
  const center = { lat, lng };

  const { isLoaded } = useJsApiLoader({
    id: "example-map",
    googleMapsApiKey: MAP_API,
    libraries: libraries,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={styles.mapContainer}
      id="example-map"
      center={center}
      zoom={10}
    >
      {center && <MarkerF position={center} />}
    </GoogleMap>
  ) : (
    <LoadingCircle></LoadingCircle>
  );
}