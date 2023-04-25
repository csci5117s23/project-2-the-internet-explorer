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
    const [mapCenter, setMapCenter] = useState(null);

    const { isLoaded } = useJsApiLoader({
      id: 'example-map',
      googleMapsApiKey: MAP_API,
      libraries: libraries
    });

    useEffect(() => {
        if (coordinatesList && coordinatesList.length > 0 ){
            setMapCenter({lat: coordinatesList[0].lat, lng: coordinatesList[0].long })
        }
    }, [coordinatesList]);

    return (
      <>
        <div className="p-4">
          <h4 className="text-l font-bold">Locations Visited</h4>
          {isLoaded && <GoogleMap
            id="example-map"
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={mapCenter}
            onLoad={setMapInstance}
          >
            {coordinatesList && coordinatesList.map((coordinate, index) => (
                <MarkerF
                    key={index}
                    position={{ lat: coordinate.lat, lng: coordinate.long }}
                />
            ))}
          </GoogleMap>}
        </div>
      </>
    );
}