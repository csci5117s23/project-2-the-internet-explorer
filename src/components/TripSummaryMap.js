import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
const MAP_API = process.env.NEXT_PUBLIC_MAP_API
const libraries = ["places"];
const mapContainerStyle = {
  height: "300px",
  width: "100%"
};

export default function TripSummaryMap({ coordinatesDict, currentCoordinate, zoom}) { 
  const [mapInstance, setMapInstance] = useState(null);
  const [parsedCoord, setParsedCoord] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'example-map',
    googleMapsApiKey: MAP_API,
    libraries: libraries
  });

  useEffect(() => {
    if (mapInstance && currentCoordinate) {
      const parsedCoord = {
        lat: parseFloat(currentCoordinate.lat),
        lng: parseFloat(currentCoordinate.lng),
      };
      mapInstance.panTo(parsedCoord);
      setParsedCoord(parsedCoord);
    }
  }, [mapInstance, currentCoordinate,isLoaded]);

  return (
    <>
      <div className="p-3 flex-col bg-blue-200 flex justify-center rounded-md">
        <h4 className="bg-blue-300 text-white text-lg font-bold mb-3 p-2 rounded-md">Locations Visited</h4>
        {isLoaded && (
          Object.keys(coordinatesDict).length > 0 ? (
            <GoogleMap
              id="example-map"
              mapContainerStyle={mapContainerStyle}
              zoom={zoom}
              center={parsedCoord}
              onLoad={setMapInstance}
            >
              {coordinatesDict && Object.values(coordinatesDict).map((coordinate, index) => (
                <MarkerF
                  key={index}
                  position={{ lat: parseFloat(coordinate.lat), lng: parseFloat(coordinate.lng) }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="bg-gray-200 rounded-md p-2 text-center">
              <p>You don't have any visited locations.</p>
            </div>
          )
        )}
      </div>
    </>
  );
}