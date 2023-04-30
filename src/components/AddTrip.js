import React, { useState } from "react";
import styles from '../styles/AddTrip.module.css';

export default function AddTrip({ addTrip, closeModal }) {
    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        // Separate the month and the year from the form month input.
        let startData = formJson.startMonth.split('-');

        let newTrip = {
            tripName: formJson.tripName,
            startMonth: parseInt(startData[1]),
            startYear: parseInt(startData[0]),
            description: formJson.description
        };

        console.log('new trip: ', newTrip);

        addTrip(newTrip);
        e.target.reset();
        closeModal(); // Close the pop-up after submitting.
    }

    return (
        <>
        <form method='post' onSubmit={handleSubmit}>
            <div className="p-20 max-md:px-5 pt-36 -mt-16">
            <h1 className={"text-xl font-bold pl-3.5"}>Create Trip</h1>
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Trip Name</h4>
                    <input 
                        className="bg-gray-200 p-2 rounded-md w-full"
                        placeholder="Trip Name"
                        name="tripName"
                        required
                    ></input>
                </div>
                <div className="p-4 start-date-container">
                    <h4 className="text-l font-bold" id="createTripHeader">When did you go?</h4>
                    <input
                        type="month"
                        pattern="(20[0-9]{2})-(0[1-9]|1[012])"
                        placeholder="yyyy-mm"
                        title="yyyy-mm"
                        className="bg-gray-200 p-2 rounded-md w-full"
                        name="startMonth"
                        required
                    ></input>
                </div>
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Brief Description</h4>
                    <textarea 
                        className="bg-gray-200 p-2 rounded-md w-full h-20"
                        placeholder="Brief Description"
                        name="description"
                    ></textarea>
                </div>

                <button type='submit' className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="add-trip">Add Trip</button>
                <button className="ml-3 px-2 py-2 font-semibold text-m bg-gray-400 text-white rounded-full shadow-sm" onClick={closeModal}>Cancel</button>
            </div>
        </form>
        </>
    );
}