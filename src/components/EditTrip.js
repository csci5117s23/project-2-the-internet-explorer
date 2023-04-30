const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import styles from '../styles/AddTrip.module.css';
import { useAuth } from "@clerk/nextjs";
import DeleteTrip from "./DeleteTrip";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function EditTrip({ editTrip, closeModal, tripName, startMonth, startYear, description }) {

    const [curTripName, setCurTripName] = useState(tripName);
    // const [curStartMonth, setCurStartMonth] = useState(startMonth);
    // const [curStartYear, setCurStartYear] = useState(startYear);
    const [curDescription, setCurDescription] = useState(description);

    let monthIdx = months.indexOf(startMonth) + 1;
    let yearStr = startYear.toString();
    let monthStr = monthIdx.toString();
    // if (monthIdx < 10) {
    //     monthStr = `0${monthIdx}`;
    // } else {
    //     monthStr = monthIdx.toString();
    // }

    if (monthIdx < 10) {
        monthStr=`0${monthIdx}`;
    }

    let dateStr = `${yearStr}-${monthStr}`;
    console.log('date string: ', dateStr);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        console.log('form json: ', formJson);

        let startData = formJson.startMonth.split('-');
        // let monthIdx = parseInt(startData[1]) - 1;
        // console.log(months[monthIdx]);

        let editedTrip = {
            tripName: formJson.tripName,
            startMonth: parseInt(startData[1]),
            startYear: parseInt(startData[0]),
            description: formJson.description
        }
        
        console.log('edited trip: ', editedTrip);
        editTrip(editedTrip);
        e.target.reset();
        closeModal(); // Close the pop-up after submitting.
    }

    return (
        <>
        <form method='post' onSubmit={handleSubmit}>
            <div className="p-20 max-md:px-5 pt-36 -mt-16">

            
            <h1 className="text-xl font-bold pl-3.5">Edit Trip</h1>
            
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Trip Name</h4>
                    <input 
                        className="bg-gray-200 p-2 rounded-md w-full"
                        defaultValue={curTripName}
                        id="tripName"
                        name="tripName"
                    ></input>
                </div>
                <div className="p-4 start-date-container">
                    <h4 className="text-l font-bold" id="createTripHeader">Start Month</h4>
                    <input
                        type="month"
                        className="bg-gray-200 p-2 rounded-md w-full"
                        pattern="(20[0-9]{2})-(0[1-9]|1[012])"
                        placeholder="yyyy-mm"
                        title="yyyy-mm"
                        defaultValue={dateStr}
                        id="startMonth"
                        name="startMonth"
                    ></input>
                </div>
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Brief Description</h4>
                    <textarea 
                        className="bg-gray-200 p-2 rounded-md w-full h-20"
                        defaultValue={curDescription}
                        id="description"
                        name="description"
                    ></textarea>
                </div>

                <button type='submit' className="ml-3 mb-3 px-4 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="add-trip">Edit Trip</button>
                <button 
          onClick={closeModal}
          className="ml-3 px-4 py-2 font-semibold text-m bg-gray-400 text-white rounded-full shadow-sm"
        >Cancel</button>
            </div>
        </form>
        
        </>
    );
}