const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import TripSummaryMap from "./TripSummaryMap";
import styles from '../styles/TripSummary.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faClock, faPen, faMapLocationDot, faPerson, faCalendarDay, faGifts, faUtensils, faSquareCaretRight, faSquareCaretLeft} from "@fortawesome/free-solid-svg-icons";

export default function TripSummary({parentId, trip, tripMemories, setTripMemories}) { 
    const [coordinatesDict, setCoordinatesDict] = useState({});
    const [memoriesCategoryCount, setMemoriesCategoryCount] = useState(null);
    const [tripDuration, setTripDuration] = useState();
    const [totalMemories, setTotalMemories] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLocationKey, setCurrentLocationKey] = useState(null);

    const handleLeftClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentLocationKey(Object.keys(coordinatesDict)[currentIndex - 1]);
        }
    };
      
    const handleRightClick = () => {
        if (currentIndex < Object.keys(coordinatesDict).length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentLocationKey(Object.keys(coordinatesDict)[currentIndex + 1]);
        }
    };

    useEffect(() => {
        let memoryDict = {};
        let coordinatesDict = {};
        let minDate = null;
        let maxDate = null;
        if (tripMemories) {
            for (let memory of tripMemories) {
                if (!(memory.category in memoryDict)){
                    memoryDict[memory.category] = 1;
                } else {
                    memoryDict[memory.category] += 1;
                }

                if (memory.latitude && memory.longitude && memory.location){
                    if (!(memory.location in memoryDict)) {
                        coordinatesDict[memory.location] = {lat: memory.latitude, lng: memory.longitude}
                    }
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
        setTotalMemories(tripMemories.length)
        setCoordinatesDict(coordinatesDict)
        if (Object.keys(coordinatesDict).length > 0) {
            setCurrentLocationKey(Object.keys(coordinatesDict)[0]);
        }
    }, [tripMemories]);

    return (
        <>
         <h1 className={`text-xl font-bold ${styles.tripSummaryHeader}`}>Trip Summary</h1>
            <div className={`p-2 ${styles.tripSummaryContainer}`}>
                <TripSummaryMap 
                    coordinatesDict={coordinatesDict}
                    setCoordinatesDict={setCoordinatesDict}
                    currentCoordinate={coordinatesDict[currentLocationKey]}
                />
                <div className={styles.tripSummaryPaging}>
                    <span>
                        <button
                            style={{fontSize: "1.5em", paddingRight: "2%"}}
                            onClick={handleLeftClick}
                        >
                            <FontAwesomeIcon icon={faSquareCaretLeft} />
                        </button>
                        <span style={{fontSize: "1.5em"}}>{currentIndex + 1}</span>
                        <button
                            style={{fontSize: "1.5em", paddingLeft: "2%"}}
                            onClick={handleRightClick}
                        >
                            <FontAwesomeIcon icon={faSquareCaretRight} />
                        </button>
                    </span>
                </div>
                <div className="p-4">
                    <div className="bg-gray-200 rounded-lg shadow-sm p-2 mt-2 mb-4">
                        <h1 className={`text-lg font-bold mb-2 bg-gray-300 p-2 m-1 rounded-md ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faPen} /> Description of Trip: {trip && trip.description ? trip.description: "No trip description"}</h1>
                    </div>
                    <div className="bg-gray-200 rounded-lg shadow-sm p-2 mt-2 mb-4">
                        <div className="text-lg font-bold mb-2 bg-gray-300 p-2 m-1 rounded-md">
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faClock} /> Duration of Trip: {tripDuration ? `${tripDuration} days` : "N/A"}</h1>
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faMapLocationDot} /> # of Places: {memoriesCategoryCount && memoriesCategoryCount.places ? memoriesCategoryCount.places : "You have no places"} </h1>
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faGifts} /> # of Souvenirs: {memoriesCategoryCount && memoriesCategoryCount.souvenirs ? memoriesCategoryCount.souvenirs : "You have no souvenirs"} </h1>
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faUtensils} /> # of Food: {memoriesCategoryCount && memoriesCategoryCount.food ? memoriesCategoryCount.food : "You have no food"}</h1>
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faCalendarDay} /> # of Events: {memoriesCategoryCount && memoriesCategoryCount.events ? memoriesCategoryCount.events : "no current events"} </h1>
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faPerson} /> # of People: {memoriesCategoryCount && memoriesCategoryCount.people ? memoriesCategoryCount.people : "You have no people"} </h1>
                            <h1 className={`text-l font-bold ${styles.tripSummaryData}`}> <FontAwesomeIcon icon={faCameraRetro} /> # of Photos: {totalMemories ? totalMemories : "You have no photos"}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}