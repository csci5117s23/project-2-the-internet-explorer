import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
const libraries = ["places"];

export default function Map() { 
    const [location, setLocation] = useState("");
    const [showLocation, setShowLocation] = useState(false);
    const [searchBox, setSearchBox] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);

    const onLoad = (ref) => setSearchBox(ref);

    const mapContainerStyle = {
        height: "300px",
        width: "100%"
    };
      
    const center = {
        lat: 38.685,
        lng: -115.234
    };

    const onPlacesChanged =() => {
        setShowLocation(true);
        const place = searchBox.getPlaces()[0];
        setLocation(place.name);
        const coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        console.log("this are coordinates: " + JSON.stringify(coordinates))
        setCoordinates(coordinates);
        mapInstance.panTo(coordinates);
        console.log(place);

    }

    return (
        <>
        <div className="p-4">
                <h4 className="text-l font-bold">Location</h4>
                <div>
                    {showLocation && (
                    <input
                        className="border-2 border-slate-600 mb-6 w-full"
                        placeholder="Location"
                        value={location}
                        readOnly
                    ></input>
                    )}
                </div>
                <LoadScript
                    libraries={libraries}
                    googleMapsApiKey="AIzaSyAkEL1AN_a39czxEWTrYv0gamecdTS3iN8"
                >
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={2.5}
                    center={center}
                    onLoad={setMapInstance}
                >
                    {coordinates && (
                     <Marker
                        position={coordinates}
                        />
                    )}
                    <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={
                        onPlacesChanged
                    }
                    >
                    <input
                        type="text"
                        placeholder="Begin typing location..."
                        style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                        }}
                    />
                    </StandaloneSearchBox>
                </GoogleMap>
                </LoadScript>
            </div>
        </>
    )
}