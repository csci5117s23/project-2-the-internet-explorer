import React, { useState, useEffect } from "react";
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
                    className="border-2 border-slate-600"
                    placeholder="Trip Name"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                ></input>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold" id="createTripHeader">Start Date</h4>
                <input 
                    className="border-2 border-slate-600"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                ></input>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold" id="createTripHeader">End Date</h4>
                <input 
                    className="border-2 border-slate-600"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                ></input>
            </div>
            <div className="p-4">
                <h4 className="text-l font-bold" id="createTripHeader">Brief Description</h4>
                <input 
                    className="border-2 border-slate-600 w-full h-20"
                    placeholder="Brief Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
            </div>

            <button class="ml-3 px-2 py-2 font-semibold text-m bg-cyan-500 text-white rounded-full shadow-sm" id="add-trip">Add Trip</button>
        </div>
        </>
    );
}