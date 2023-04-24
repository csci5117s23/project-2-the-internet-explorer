import React, { useState, useEffect, useCallback } from "react";
import TripSummaryMap from "./TripSummaryMap";
import styles from '../styles/TripSummary.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faClock, faMapLocationDot, faPerson, faCalendarDay, faGifts} from "@fortawesome/free-solid-svg-icons";

export default function TripSummary() { 
    const [coordinatesList, setCoordinatesList] = useState(null);

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
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faMapLocationDot} /> # of Places Visited: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faPerson} /> # of People: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faCalendarDay} /> # of Events: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faGifts} /> # of Souvenirs: </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}><FontAwesomeIcon icon={faCameraRetro} /> # of Photos: </h1>
                </div>
            </div>
        </>
    )
}