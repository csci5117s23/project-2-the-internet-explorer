import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, MarkerF, useJsApiLoader } from '@react-google-maps/api';
const MAP_API = process.env.NEXT_PUBLIC_MAP_API
const libraries = ["places"];
const mapContainerStyle = {
    height: "300px",
    width: "100%",
    marginTop: "2%"
};

export default function Map({ location, setLocation, coordinates, setCoordinates }) { 
    const [searchBox, setSearchBox] = useState(null);
    // const [coordinates, setCoordinates] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [geocoder, setGeocoder] = useState(null);
    const [showCurrentDiv, setShowCurrentDiv] = useState(false);

    const onLoad = (ref) => setSearchBox(ref);

    console.log("this is mem coordinates: " + JSON.stringify(coordinates));

    const { isLoaded } = useJsApiLoader({
      id: 'example-map',
      googleMapsApiKey: MAP_API,
      libraries: libraries
    });

    useEffect(() => {
      if (isLoaded && !geocoder) {
        setGeocoder(new window.google.maps.Geocoder());
      }
    }, [isLoaded, geocoder]);

    useEffect(() => {
      if (!userPosition && !coordinates) {
        // Get the user's current location
        console.log("getting user's location")
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const pos = { lat: latitude, lng: longitude }
            setUserPosition(pos);
          },
          (error) => {
            console.error("Error getting user location:", error);
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
      } else if (userPosition){
        setCoordinates(userPosition);
        reverseGeocode(userPosition);
      }
    }, [userPosition]);

    const reverseGeocode = (pos) => {
      if (geocoder) {
        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              console.log("this is results: " + JSON.stringify(results[0]))
              const locationName = results[0].address_components
                .filter(addressComponent => addressComponent.types.includes('street_number') || addressComponent.types.includes('route'))
                .map(addressComponent => addressComponent.long_name)
                .join(' ');
              setLocation(locationName);
              setShowCurrentDiv(true);
            } else {
              console.error("No results found");
            }
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        });
      }
    };

    const onPlacesChanged =() => {
      setShowCurrentDiv(false);
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
              className="bg-gray-200 p-2 rounded-md w-full"
              placeholder="Current Location"
              value={location}
              readOnly
            ></input>
            {showCurrentDiv && <div className="text-sm">(Current Location)</div>}
          </div>
          {isLoaded && <GoogleMap
            id="example-map"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={coordinates || userPosition}
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
          </GoogleMap>}
        </div>
      </>
    );
}