const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import TripSummaryMap from "./TripSummaryMap";
import styles from '../styles/TripSummary.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faClock, faMapLocationDot, faPerson, faCalendarDay, faGifts} from "@fortawesome/free-solid-svg-icons";

export default function TripSummary(parentId) { 
    const [coordinatesList, setCoordinatesList] = useState(null);
    const [memoriesCategoryCount, setMemoriesCategoryCount] = useState(null);
    const [tripMemories, setTripMemories] = useState({});

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        const getTripMemories = async () => {
            if (userId) {
              try {
                const token = await getToken({ template: "codehooks" });
                console.log("this is parentId: " + parentId.parentId)
                const response = await fetch(`${backend_base}/getTripMemories?trip=${parentId.parentId}}`, {
                    'method': 'GET',
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                });
    
                const result = await response.json();
                //setTripMemories();
                console.log("this is tripSummary result: " + JSON.stringify(result))
               
              } catch (error) {
                console.error('Error: ', error);
              }
            }
          }
          getTripMemories();
      }, [isLoaded]);

    return (
        <>
         <h1 className={`text-xl font-bold ${styles.tripSummaryHeader}`}>Trip Summary</h1>
            <div className={styles.tripSummaryContainer}>
                <TripSummaryMap 
                    coordinatesList={coordinatesList}
                    setCoordinatesList={setCoordinatesList}
                />
                <div className="p-4">
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}><FontAwesomeIcon icon={faClock} /> Duration of Trip: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faMapLocationDot} /> # of Places: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faPerson} /> # of People: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faCalendarDay} /> # of Events: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faGifts} /> # of Souvenirs: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}><FontAwesomeIcon icon={faCameraRetro} /> # of Photos: </h1>
                </div>
            </div>
        </>
    )
}