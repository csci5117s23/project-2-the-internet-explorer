const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import styles from '../styles/AddTrip.module.css';
import { useAuth } from "@clerk/nextjs";

export default function EditTrip({ tripID, closeModal, tripName, startDate, discription }) {

    const [curTripName, setCurTripName] = useState(tripName);
    const [curStartDate, setCurStartDate] = useState(startDate);
    const [curDiscription, setCurDiscription] = useState(discription);

    const { isLoaded, userId, sessionId, getToken } = useAuth();

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
        const updateStartDate = async () => {
            if (curStartDate != startDate) {
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
                                startDate: curStartDate
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
        updateStartDate();
    }, [isLoaded, curStartDate]);

    useEffect(() => {
        const updateDiscription = async () => {
            if (curDiscription != discription) {
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
                                discription: curDiscription
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
        updateDiscription();
    }, [isLoaded, curDiscription]);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        console.log('form json: ', formJson);

        setCurTripName(formJson.tripName);
        setCurStartDate(formJson.startDate);
        setCurDiscription(formJson.discription);

        e.target.reset();
        closeModal(); // Close the pop-up after submitting.
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1 className={`text-xl font-bold ${styles.createTripHeader}`}>Create Trip</h1>
            <div className={styles.addTripContainer}>
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Trip Name</h4>
                    <input 
                        className="border-2 border-slate-600 w-full"
                        placeholder={curTripName}
                        id="tripName"
                        name="tripName"
                        required
                    ></input>
                </div>
                <div className="p-4 start-date-container">
                    <h4 className="text-l font-bold" id="createTripHeader">Start Date</h4>
                    <input
                        type="date"
                        className="border-2 border-slate-600 w-full"
                        placeholder={curStartDate}
                        id="startDate"
                        name="startDate"
                        required
                    ></input>
                </div>
                <div className="p-4">
                    <h4 className="text-l font-bold" id="createTripHeader">Brief Description</h4>
                    <textarea 
                        className="border-2 border-slate-600 w-full h-20"
                        placeholder={curDiscription}
                        id="description"
                        name="description"
                    ></textarea>
                </div>

                <button type='submit' className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="add-trip">Add Trip</button>
            </div>
        </form>
        </>
    );
}