const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/AddTrip.module.css';
import { useAuth } from "@clerk/nextjs";
import Modal from "react-modal";
import { removeTrip, updateTripsData } from "@/modules/Data";

export default function DeleteTrip({ tripID, tripName, closeModal, allTrips, setAllTrips }) {

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [deleteModal, setDeleteModal] = useState(false);
    
    const deleteTrip = async () => {
        try {
            if (userId) {
                const token = await getToken({template: "codehooks"});
                const response = await fetch(backend_base + `/tripFolders/${tripID}`, {
                    'method': 'DELETE',
                    'headers': {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (!response.ok) {
                    console.log('Error, 404 most likely')
                    return;
                }
                const result = await response.json();
                console.log(result);
                let mutableTrips = [...allTrips];
                const index = mutableTrips.findIndex(trip => trip._id === result._id);
                mutableTrips.splice(index, 1);
                updateTripsData(mutableTrips);
                setAllTrips(mutableTrips);
                alert("Successfully deleted main trip");
            }
            
        }
        catch (error) {
            console.error('Error: ', error);
        }

        // to delete trip emmories
        try {
            if (userId) {
                const token = await getToken({template: "codehooks"});
                const responseMemory = await fetch(backend_base + `/deleteMemories?trip=${tripID}`, {
                    'method': 'DELETE',
                    'headers': {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (!responseMemory.ok) {
                    console.log('Error deleting memory, 404 most likely')
                    return;
                }
                console.log(await responseMemory.json());
                alert("Successfully deleted trip memories");
            }
            
        }
        catch (error) {
            console.error('Error: ', error);
        }
    }

    function handleDeleteTripButton() {
        console.log("Clicked delete");
        deleteTrip();
        closeModal();
    }

    function openDeleteTripModal() {
        setDeleteModal(true);
    }

    function closeDeleteTripModal() {
        setDeleteModal(false);
    }

    return (
        <>
        <button
            type="button"
            className="float-right px-4 py-2 font-semibold text-m bg-red-500 text-white rounded-full shadow-sm"
            onClick={openDeleteTripModal}
            >
            <FontAwesomeIcon icon={faTrash} />
            &nbsp; Delete
        </button>
        <Modal
            isOpen={deleteModal}
            onRequestClose={closeDeleteTripModal}
            contentLabel="Trip Delete Modal"
        >
            <button onClick={closeDeleteTripModal}>Cancel</button>
                <div className="grid place-items-center mt-20">
                <div className="text-lg">Are you sure to delete the trip</div>
                <div className="text-lg">"{tripName}"?</div>
                <button
                    className="m-10 px-2 py-2 font-semibold text-m bg-red-500 text-white rounded-full shadow-sm"
                    onClick={handleDeleteTripButton}
                >
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp; Delete
                </button>
                </div>
        </Modal>
        </>
    );
}