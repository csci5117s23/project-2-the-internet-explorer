const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import moment from "moment";
import TripSummaryMap from "./TripSummaryMap";
import styles from '../styles/TripSummary.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faClock, faMapLocationDot, faPerson, faCalendarDay, faGifts} from "@fortawesome/free-solid-svg-icons";

export default function TripSummary({parentId, tripMemories, setTripMemories}) { 
    const [coordinatesList, setCoordinatesList] = useState();
    const [memoriesCategoryCount, setMemoriesCategoryCount] = useState(null);
    const [tripDuration, setTripDuration] = useState();

    // console.log(("these are tripMemories: " + JSON.stringify(tripMemories)))

    useEffect(() => {
        let memoryDict = {};
        let coordinatesList = [];
        let minDate = null;
        let maxDate = null;
        if (tripMemories) {
            for (let memory of tripMemories) {
                if (!(memory.category in memoryDict)){
                    memoryDict[memory.category] = 1;
                } else {
                    memoryDict[memory.category] += 1;
                }

                if (memory.latitude && memory.longitude){
                    coordinatesList.push({lat: memory.latitude, long: memory.longitude})
                }

                const memoryDate = moment(memory.date);
                if (!minDate || memoryDate.isBefore(minDate)) {
                    minDate = memoryDate;
                }
                if (!maxDate || memoryDate.isAfter(maxDate)) {
                    maxDate = memoryDate;
                }
            }
            if (minDate && maxDate) {
                const tripDuration = maxDate.diff(minDate, 'days') + 1;
                setTripDuration(tripDuration);
            }
        }
        setMemoriesCategoryCount(memoryDict);
        setCoordinatesList(coordinatesList)
    }, [tripMemories]);

    return (
        <>
         <h1 className={`text-xl font-bold ${styles.tripSummaryHeader}`}>Trip Summary</h1>
            <div className={styles.tripSummaryContainer}>
                <TripSummaryMap 
                    coordinatesList={coordinatesList}
                    setCoordinatesList={setCoordinatesList}
                />
                <div className="p-4">
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}><FontAwesomeIcon icon={faClock} /> Duration of Trip: {tripDuration ? `${tripDuration} days` : "N/A"}</h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faMapLocationDot} /> # of Places: {memoriesCategoryCount && memoriesCategoryCount.places ? memoriesCategoryCount.places : "You have no places"} </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faPerson} /> # of People: {memoriesCategoryCount && memoriesCategoryCount.people ? memoriesCategoryCount.people : "You have no people"} </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faCalendarDay} /> # of Events: {memoriesCategoryCount && memoriesCategoryCount.events ? memoriesCategoryCount.events : "no current events"} </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faGifts} /> # of Souvenirs: {memoriesCategoryCount && memoriesCategoryCount.souvenirs ? memoriesCategoryCount.souvenirs : "You have no souvenirs"} </h1>
                    <h1 className={`text-l font-bold ${styles.tripSummaryData}`}><FontAwesomeIcon icon={faCameraRetro} /> # of Photos: {memoriesCategoryCount && memoriesCategoryCount.photos ? memoriesCategoryCount.photos : "You have no photos"}</h1>
                </div>
            </div>
        </>
    )
}