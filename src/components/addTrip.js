import React, { useState, useEffect } from "react";

export default function AddTrip() {
    const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

    return (
        <div id="add-trip-container">
            <h1>Create Trip</h1>
            <div>
                <input 
                    placeholder="Trip Name"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                ></input>
            </div>
            <div>
                <input 
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                ></input>
            </div>
            <div>
                <input 
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                ></input>
            </div>
            <div>
                <input 
                    placeholder="Brief Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
            </div>

            <button id="add-trip">Add Trip</button>
        </div>
      );
}