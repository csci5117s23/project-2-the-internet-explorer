import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/AddTrip.module.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function AddTrip() {
    const [tripName, setTripName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

    const startDateInputRef = useRef();
    const startDateCalendarRef = useRef();
    const endDateInputRef = useRef();
    const endDateCalendarRef = useRef();
    
    const handleStartDateChange = (date) => {
        // Format the selected date as a string (e.g., "YYYY-MM-DD")
        const formattedDate = date.toISOString().split("T")[0];
        setStartDate(formattedDate);
    };

    const handleEndDateChange = (date) => {
        // Format the selected date as a string (e.g., "YYYY-MM-DD")
        const formattedDate = date.toISOString().split("T")[0];
        setEndDate(formattedDate);

        // Check if the end date is before the start date
        if (new Date(formattedDate) < new Date(startDate)) {
            setEndDateError("End date cannot be before the start date.");
        } else {
            setEndDateError(""); // Clear the error message if the end date is valid
        }
    };

    const handleClickOutside = (e) => {
        if (
          !startDateInputRef.current.contains(e.target) &&
          !startDateCalendarRef.current?.contains(e.target)
        ) {
          setShowStartDateCalendar(false);
        }

        if (
          !endDateInputRef.current.contains(e.target) &&
          !endDateCalendarRef.current?.contains(e.target)
        ) {
          setShowEndDateCalendar(false);
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
            <div className="p-4 start-date-container">
                <h4 className="text-l font-bold" id="createTripHeader">Start Date</h4>
                <input
                    ref={startDateInputRef} 
                    className="border-2 border-slate-600"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onFocus={() => setShowStartDateCalendar(true)}
                ></input>
                {showStartDateCalendar && (
                    <div className= "calendarDiv" ref={startDateCalendarRef}>
                        <Calendar onChange={handleStartDateChange} />
                    </div>
                )}
            </div>
            <div className="p-4 end-date-container">
                <h4 className="text-l font-bold" id="createTripHeader">End Date</h4>
                <input 
                    ref={endDateInputRef}
                    className="border-2 border-slate-600"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onFocus={() => setShowEndDateCalendar(true)} 
                ></input>
                {endDateError && <p className="text-red-500">{endDateError}</p>}
                {showEndDateCalendar && (
                    <div className= "calendarDiv" ref={endDateCalendarRef}>
                        <Calendar ref={endDateCalendarRef} onChange={handleEndDateChange} />
                    </div>
                )}
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

            <button className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="add-trip">Add Trip</button>
        </div>
        </>
    );
}