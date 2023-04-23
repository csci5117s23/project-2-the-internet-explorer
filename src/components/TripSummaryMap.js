import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
const MAP_API = process.env.NEXT_PUBLIC_MAP_API
const libraries = ["places"];
const mapContainerStyle = {
    height: "300px",
    width: "100%"
};

const center = {
    lat: -3.745,
    lng: -38.523
  };

export default function TripSummaryMap({ coordinatesList, setCoordinatesList }) { 
    const [mapInstance, setMapInstance] = useState(null);

    const { isLoaded } = useJsApiLoader({
      id: 'searchbox-example',
      googleMapsApiKey: MAP_API,
      libraries: libraries
    });

    return (
      <>
        <div className="p-4">
          <h4 className="text-l font-bold">Locations Visited</h4>
          {isLoaded && <GoogleMap
            id="searchbox-example"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            onLoad={setMapInstance}
          >
          </GoogleMap>}
        </div>
      </>
    );
}