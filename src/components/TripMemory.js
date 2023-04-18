import React, { useState, useEffect, useCallback } from "react";
import styles from '../styles/TripMemory.module.css';
import Map from "./Map";
import Webcam from "react-webcam";

export default function TripMemory() {
    const [memoryTitle, setMemoryTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [memoryType, setMemoryType] = useState("");
    const [showWebCamera, setShowWebCamera] = useState(false);

    const handleButtonClick = () => {
        setShowWebCamera(!showWebCamera);
    };

    const handleMemoryTypeChange = (e) => {
        setMemoryType(e.target.value);
    };

    return (
        <>
        <h1 className={`text-xl font-bold ${styles.tripMemoryHeader}`}>Add Memory</h1>
        <div className={styles.tripMemoryContainer}>
            <div className="p-4">
                <h4 className="text-l font-bold">Title</h4>
                <input 
                    className="border-2 border-slate-600 w-full"
                    placeholder="Title"
                    value={memoryTitle}
                    onChange={(e) => setMemoryTitle(e.target.value)}
                ></input>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold">Date</h4>
                <input
                    type="date"
                    className="border-2 border-slate-600 w-full"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                ></input>
            </div>
            <Map></Map>
            <div className="p-4">
                <h4 className="text-l font-bold">What kind of memory is this?</h4>
                <select 
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
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
                <button className="block w-40 ml-3 px-2 py-1.5 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" 
                    id="takePic" 
                    onClick={handleButtonClick}
                >Take Pic</button>
                <p>or</p>
                <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-custom-blue file:text-white
                "/>
            </div>
            {showWebCamera && <Webcam />}
            <div className="p-4">
                <h4 className="text-l font-bold">Brief Description</h4>
                <textarea 
                    className="border-2 border-slate-600 w-full h-20"
                    placeholder="Brief Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="addMemory">Add Memory</button>
        </div>
        </>
      )
}