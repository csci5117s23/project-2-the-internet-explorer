const MAP_API = process.env.NEXT_PUBLIC_MAP_API;

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import LoadingCircle from "./LoadingCircle";
import { useState } from 'react';
const libraries = ['places'];

export default function MemoryMap() {
  // TODO: Set the lat and lng to be the actual location of the memory. This will require it to
  // TODO: be set either inside the getIndividualMemory function in the useEffect, or after the 
  // TODO: function. Probably inside the function.
  const [center, setCenter] = useState({ lat: 44.9718, lng: -93.2338 });

  const { isLoaded } = useJsApiLoader({
    id: 'example-map',
    googleMapsApiKey: MAP_API,
    libraries: libraries
  });

  return (isLoaded ? (
    <GoogleMap
      id='example-map'
      center={center}
      zoom={10}
      mapContainerStyle={{ height: '400px', width: '400px' }}
    >
      {center && <MarkerF position={center} />}
    </GoogleMap>
  ) : (
    <LoadingCircle></LoadingCircle>
  ))
}