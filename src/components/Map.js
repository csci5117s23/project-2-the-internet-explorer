
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, MarkerF } from '@react-google-maps/api';
const MAP_API = process.env.NEXT_PUBLIC_MAP_API
const libraries = ["places"];
const mapContainerStyle = {
    height: "300px",
    width: "100%"
};

export default function Map({ location, setLocation, coordinates, setCoordinates }) { 
    const [searchBox, setSearchBox] = useState(null);
    // const [coordinates, setCoordinates] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [userPosition, setUserPosition] = useState(null);

    const onLoad = (ref) => setSearchBox(ref);

    useEffect(() => {
        
        if (!userPosition) {
          // Get the user's current location
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserPosition({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error("Error getting user location:", error);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
          );
        } else {
            setCoordinates(userPosition);
        }
      
    }, [userPosition]);

    const onPlacesChanged =() => {
        const place = searchBox.getPlaces()[0];
        setLocation(place.name);
        let coordinates = { 
            lat: place.geometry.location.lat(), 
            lng: place.geometry.location.lng() 
        };
        setCoordinates(coordinates);
        mapInstance.panTo(coordinates);
        console.log(place);
    }

    return (
      <>
        <div className="p-4">
          <h4 className="text-l font-bold">Location</h4>
          <div>
            <input
              className="border-2 border-slate-600 mb-6 w-full"
              placeholder="Current Location"
              value={location}
              readOnly
            ></input>
          </div>
          <GoogleMap
            id="searchbox-example"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={userPosition}
            onLoad={setMapInstance}
          >
            {coordinates && <MarkerF position={coordinates} />}
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Begin typing location..."
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `40vw`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-25vw",
                  marginRight: "25vw",
                  marginTop: "250px"
                }}
              />
            </StandaloneSearchBox>
          </GoogleMap>
        </div>
      </>
    );
}