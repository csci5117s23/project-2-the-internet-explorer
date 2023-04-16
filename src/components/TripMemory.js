import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from '../styles/TripMemory.module.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import Webcam from "react-webcam";
import dynamic from 'next/dynamic';

export default function TripMemory() {
    const [memoryTitle, setMemoryTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [showDateCalendar, setShowDateCalendar] = useState(false);
    const [memoryType, setMemoryType] = useState("");
    const [location, setLocation] = useState("");
    const [showLocation, setShowLocation] = useState(false);
    const [showWebCamera, setShowWebCamera] = useState(false);


    const [showMinimap, setShowMinimap] = useState(false);
    const [feature, setFeature] = useState();
   
    const dateInputRef = useRef();
    const dateCalendarRef = useRef();

    const AddressAutofill = dynamic(
        () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
        { ssr: false }
    );

    const AddressMinimap = dynamic(
        () => import("@mapbox/search-js-react").then((mod) => mod.AddressMinimap),
        { ssr: false }
    );

    const handleButtonClick = () => {
        setShowWebCamera(!showWebCamera);
      };

    const handleRetrieve = useCallback(
        (res) => {
        const feature = res.features[0];
        console.log("this is feature: " + JSON.stringify(feature))
        // const coordinates = feature.geometry.coordinates;
        // console.log("Coordinates: " + coordinates)
        const place_name = feature.properties.place_name;
        console.log("Place Name: " + place_name)
        setLocation(feature.properties.place_name);
        setShowLocation(true);
        setFeature(feature);
        setShowMinimap(true);
        },
        [setFeature, setShowMinimap]
    ); 
 
    const handleDateChange = (date) => {
        // Format the selected date as a string (e.g., "YYYY-MM-DD")
        const formattedDate = date.toISOString().split("T")[0];
        setDate(formattedDate);
    };

    const handleMemoryTypeChange = (e) => {
        setMemoryType(e.target.value);
    };

    const handleClickOutside = (e) => {
        if (
          !dateInputRef.current.contains(e.target) &&
          !dateCalendarRef.current?.contains(e.target)
        ) {
          setShowDateCalendar(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
        <h1 className={`text-xl font-bold ${styles.tripMemoryHeader}`}>Add Memory</h1>
        <div className={styles.tripMemoryContainer}>
            <div className="p-4">
                <h4 className="text-l font-bold">Title</h4>
                <input 
                    className="border-2 border-slate-600"
                    placeholder="Title"
                    value={memoryTitle}
                    onChange={(e) => setMemoryTitle(e.target.value)}
                ></input>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold">Date</h4>
                <input
                    ref={dateInputRef} 
                    className="border-2 border-slate-600"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onFocus={() => setShowDateCalendar(true)}
                ></input>
                {showDateCalendar && (
                    <div className= "calendarDiv" ref={dateCalendarRef}>
                        <Calendar onChange={handleDateChange} />
                    </div>
                )}
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold">Location</h4>
                <div>
                    {showLocation && (
                    <input
                        className="border-2 border-slate-600 mb-6"
                        placeholder="Location"
                        value={location}
                    ></input>
                    )}
                </div>
                <AddressAutofill 
                    accessToken={"pk.eyJ1IjoibmF0MDEiLCJhIjoiY2xnMTNmZ3c3MWQxbDNkbWsybHNwcmloZSJ9.iVf2PxUsEathxWTmiKGO7w"} 
                    onRetrieve={handleRetrieve}
                >
                    <input
                    className="border-2 border-slate-600"
                    placeholder="Search address..."
                    autoComplete="address-line1"
                    id="mapbox-autofill"
                    />
                </AddressAutofill>
                <div id="minimap-container" className="w-full h-80" style={{ display: showMinimap ? 'block' : 'none' }}>
                    <AddressMinimap
                        accessToken={"pk.eyJ1IjoibmF0MDEiLCJhIjoiY2xnMTNmZ3c3MWQxbDNkbWsybHNwcmloZSJ9.iVf2PxUsEathxWTmiKGO7w"}
                        satelliteToggle={true}
                        feature={feature}
                        show={showMinimap}
                    />
                </div>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold">What kind of memory is this?</h4>
                <select 
                    className="inline-flex w-1/2 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                    name="folders" 
                    id="folders"
                    value={memoryType}
                    onChange={handleMemoryTypeChange}
                >
                    <option value="" disabled>Select an option</option>
                    <option value="place">Place</option>
                    <option value="event">Event</option>
                    <option value="food">Food</option>
                    <option value="souvenirs">Souvenirs</option>
                    <option value="people">People</option>
                </select>
            </div>
            <div className={styles.photoButtons}>
                <button className="block w-40 ml-3 px-2 py-1.5 font-semibold text-m bg-cyan-500 text-white rounded-full shadow-sm" 
                    id="takePic" 
                    onClick={handleButtonClick}
                >Take Pic</button>
                <p>or</p>
                <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-500 file:text-white
                hover:file:bg-cyan-600
                "/>
            </div>
            {showWebCamera && <Webcam />}
            <div className="p-4">
                <h4 className="text-l font-bold">Brief Description</h4>
                <input 
                    className="border-2 border-slate-600 w-full h-20"
                    placeholder="Brief Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
            </div>
            <button className="ml-3 px-2 py-2 font-semibold text-m bg-cyan-500 text-white rounded-full shadow-sm" id="addMemory">Add Memory</button>
        </div>
        </>
      )
}