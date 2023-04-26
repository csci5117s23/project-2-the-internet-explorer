const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import styles from '../styles/AddTrip.module.css';
import { useAuth } from "@clerk/nextjs";
import DeleteTrip from "./DeleteTrip";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function EditTrip({ tripID, closeModal, tripName, startMonth, startYear, description }) {

    const [curTripName, setCurTripName] = useState(tripName);
    const [curStartMonth, setCurStartMonth] = useState(startMonth);
    const [curStartYear, setCurStartYear] = useState(startYear);
    const [curDescription, setCurDescription] = useState(description);

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    let monthIdx = months.indexOf(startMonth) + 1;
    let startData = startYear;
    let monthStr = '';
    if (monthIdx < 10) {
        monthStr = `0${monthIdx}`;
    } else {
        monthStr = monthIdx.toString();
    }

    let dateStr = `${startData}-${monthStr}`;
    // startData = startData.join('-');
    // console.log(startData);
    // startData = startData.append(monthIdx);

    useEffect(() => {
        const updateTripName = async () => {
            if (curTripName != tripName) {
                try {
                    if (userId) {
                        const token = await getToken({template: "codehooks"});

                        const response = await fetch(backend_base + `tripFolders/${tripID}`, {
                            'method': 'PATCH',
                            'headers': {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            'body': JSON.stringify({
                                tripName: curTripName
                            })
                        });
                        const result = await response.json();
                        console.log('Success: ', result);
                    }
                }
                catch (error) {
                    console.error('Error: ', error);
                }
            }
        }
        updateTripName();
    }, [isLoaded, curTripName]);

    useEffect(() => {
        const updateStartMonth = async () => {
            if (curStartMonth != startMonth) {
                try {
                    if (userId) {
                        const token = await getToken({template: "codehooks"});

                        const response = await fetch(backend_base + `tripFolders/${tripID}`, {
                            'method': 'PATCH',
                            'headers': {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            'body': JSON.stringify({
                                startMonth: curStartMonth
                            })
                        });
                        const result = await response.json();
                        console.log('Success: ', result);
                    }
                }
                catch (error) {
                    console.error('Error: ', error);
                }
            }
        }
        updateStartMonth();
    }, [isLoaded, curStartMonth]);

    useEffect(() => {
        const updateStartYear = async () => {
            if (curStartYear != startYear) {
                try {
                    if (userId) {
                        const token = await getToken({template: "codehooks"});

                        const response = await fetch(backend_base + `tripFolders/${tripID}`, {
                            'method': 'PATCH',
                            'headers': {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            'body': JSON.stringify({
                                startYear: curStartYear
                            })
                        });
                        const result = await response.json();
                        console.log('Success: ', result);
                    }
                }
                catch (error) {
                    console.error('Error: ', error);
                }
            }
        }
        updateStartYear();
    }, [isLoaded, curStartYear]);

    useEffect(() => {
        const updateDescription = async () => {
            if (curDescription != description) {
                try {
                    if (userId) {
                        const token = await getToken({template: "codehooks"});

                        const response = await fetch(backend_base + `tripFolders/${tripID}`, {
                            'method': 'PATCH',
                            'headers': {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            'body': JSON.stringify({
                                description: curDescription
                            })
                        });
                        const result = await response.json();
                        console.log('Success: ', result);
                    }
                }
                catch (error) {
                    console.error('Error: ', error);
                }
            }
        }
        updateDescription();
    }, [isLoaded, curDescription]);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        console.log('form json: ', formJson);

        setCurTripName(formJson.tripName);
        setCurStartMonth(formJson.startMonth);
        setCurStartYear(formJson.startYear);
;        setCurDescription(formJson.description);

        e.target.reset();
        closeModal(); // Close the pop-up after submitting.
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1 className={`text-xl font-bold ${styles.createTripHeader}`}>Edit Trip</h1>
            <div className={styles.addTripContainer}>
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Trip Name</h4>
                    <input 
                        className="border-2 border-slate-600 w-full"
                        defaultValue={curTripName}
                        id="tripName"
                        name="tripName"
                    ></input>
                </div>
                <div className="p-4 start-date-container">
                    <h4 className="text-l font-bold" id="createTripHeader">Start Month</h4>
                    <input
                        type="month"
                        className="border-2 border-slate-600 w-full"
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
                        className="border-2 border-slate-600 w-full h-20"
                        defaultValue={curDescription}
                        id="description"
                        name="description"
                    ></textarea>
                </div>

                <button type='submit' className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="add-trip">Edit Trip</button>
            </div>
        </form>
        
        </>
    );
}