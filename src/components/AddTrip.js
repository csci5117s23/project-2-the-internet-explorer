import React, { useState } from "react";
import styles from '../styles/AddTrip.module.css';

export default function AddTrip() {
    const [tripName, setTripName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
        <h1 className={`text-xl font-bold ${styles.createTripHeader}`}>Create Trip</h1>
        <div className={styles.addTripContainer}>
            <div className="p-4">
                <h4 className="text-l font-bold" id="createTripHeader">Trip Name</h4>
                <input 
                    className="border-2 border-slate-600 w-full"
                    placeholder="Trip Name"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                ></input>
            </div>
            <div className="p-4 start-date-container">
                <h4 className="text-l font-bold" id="createTripHeader">Start Date</h4>
                <input
                    type="date"
                    className="border-2 border-slate-600 w-full"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                ></input>
            </div>
            <div className="p-4 end-date-container">
                <h4 className="text-l font-bold" id="createTripHeader">End Date</h4>
                <input 
                    type="date"
                    className="border-2 border-slate-600 w-full"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                ></input>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold" id="createTripHeader">Brief Description</h4>
                <textarea 
                    className="border-2 border-slate-600 w-full h-20"
                    placeholder="Brief Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            <button className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="add-trip">Add Trip</button>
        </div>
        </>
    );
}