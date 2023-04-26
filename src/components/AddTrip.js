import React, { useState } from "react";
import styles from '../styles/AddTrip.module.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function AddTrip({ addTrip, closeModal }) {
    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        console.log('form json: ', formJson);

        // Separate the month and the year from the form month input.
        let startData = formJson.startMonth.split('-');
        let monthIdx = parseInt(startData[1]) - 1;
        console.log(months[monthIdx]);

        // let newStart = new Date(formJson.startDate.replace(/-/g, '\/'));
        // let newEnd = new Date(formJson.endDate.replace(/-/g, '\/'));

        let newTrip = {
            tripName: formJson.tripName,
            startMonth: months[monthIdx],
            startYear: startData[0],
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
                    <h4 className="text-l font-bold" id="createTripHeader">What month did you go?</h4>
                    <input
                        type="month"
                        className="bg-gray-200 p-2 rounded-md w-full"
                        placeholder="Start Month"
                        name="startMonth"
                        maxLength={20}
                        required
                    ></input>
                </div>
                {/* <div className="p-4 end-date-container">
                    <h4 className="text-l font-bold" id="createTripHeader">End Date</h4>
                    <input 
                        type="date"
                        className="border-2 border-slate-600 w-full"
                        placeholder="End Date"
                        name="endDate"
                        required
                    ></input>
                </div> */}
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