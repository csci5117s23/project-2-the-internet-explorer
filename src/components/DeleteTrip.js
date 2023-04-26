const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/AddTrip.module.css';
import { useAuth } from "@clerk/nextjs";

export default function DeleteTrip({ tripID, closeModal }) {

    const [curTrip, setCurTrip] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        const deleteTrip = async () => {
            try {
                if (userId) {
                    const token = await getToken({template: "codehooks"});
                    const response = await fetch(backend_base + `tripFolders/${tripID}`, {
                        'method': 'DELETE',
                        'headers': {
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                }
            }
            catch (error) {
                console.error('Error: ', error);
            }
        }
        deleteTrip();
        // closeModal();
    }, [isLoaded]);

    return (
        <>
        <button
            type="button"
            className="float-right inline-block border border-red text-black rounded-full bg-neutral-50 border-black-50 px-6 pb-2 pt-2.5 text-s leading-normal shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            // className={styles.deleteButton}
            >
            <FontAwesomeIcon icon={faTrash} />
            &nbsp; Delete
        </button>
        </>
    );
}