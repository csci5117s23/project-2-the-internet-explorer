const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import TripSummaryWrapper from "@/components/TripSummaryWrapper";
import { useRouter } from "next/router";
import styles from '../../../styles/TripView.module.css'
import DayViewButton from "@/components/buttons/DayViewButton";
import EditTripButton from "@/components/buttons/EditTripButton";
import DeleteTripButton from "@/components/buttons/DeleteFileButton";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "@/components/LoadingCircle";
import CategoryButtonWrapper from "@/components/buttons/CategoryButtonWrapper";

const TripView = () => {
    const [tripMemories, setTripMemories] = useState(null);
    const [loadingTripMemories, setLoadingTripMemories] = useState(true);
    const [tripDays, setTripDays] = useState({});
    const [curTrip, setCurTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    let { tripID } = router.query;

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const getIndividualTrip = async () => {
            try {
                if (userId) {
                    const token = await getToken({ template: "codehooks" });

                    const response = await fetch(backend_base + `/tripFolders/${tripID}`, {
                        'method': 'GET',
                        'headers': {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    if (!response.ok) {
                        router.push('/404');
                        return;
                    }
                    const data = await response.json();
                    setCurTrip(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        getIndividualTrip();
    }, [isLoaded, router]);

    useEffect(() => {
        const getTripMemories = async () => {
            try {
                if (userId) {
                    const token = await getToken({ template: "codehooks" });

                    const response = await fetch(backend_base + `/getTripMemories?trip=${tripID}`, {
                        'method': 'GET',
                        'headers': {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    if (!response.ok) {
                        router.push('/404');
                        return;
                    }
                    const data = await response.json();
                    console.log('data: ', data);
                    setTripMemories(data);
                    setLoadingTripMemories(false);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        getTripMemories();
    }, [isLoaded, router]);

    let daysList = [];
    if (!loadingTripMemories) {
        for (let memory of tripMemories) {
            if (tripDays[memory.date]) {
                continue;
            } else {
                let currentMemories = tripDays;
                currentMemories[memory.date] = memory;
                setTripDays(currentMemories);
            }
        }
        for (const [date, memory] of Object.entries(tripDays)) {
            // console.log(memory);
            let curDate = new Date(date);
            let month = curDate.getMonth();
            let day = curDate.getDate();
            let curDateStr = `${months[month]} ${day}`;
            let curView = (
                <DayViewButton 
                    key={curDateStr}
                    title={curDateStr}
                    color={"bg-custom-blue"}
                ></DayViewButton>
            )

            daysList = daysList.concat(curView);
        }
    }

    return (isLoading ? (
        <LoadingCircle></LoadingCircle>
    ) : (
        <>
        <Header
            title={curTrip.tripName}
            back={true}
            prevUrl='/trips'
        />
        <CategoryButtonWrapper></CategoryButtonWrapper>
        {/* <div className={styles.buttonGroup + "flex flex-wrap space-y-2 space-x-2"}>
            <br></br>
            <CategoryButton
              name={"Places"}
              tripId={tripID}
            />
            <CategoryButton
              name={"Events"}
              tripId={tripID}
            />
            <CategoryButton
              name={"Food"}
              tripId={tripID}
            />
            <CategoryButton
              name={"Souvenirs"}
              tripId={tripID}
            />
            <CategoryButton
              name={"People"}
              tripId={tripID}
            />
<<<<<<< HEAD
        </div> */}
=======
            <TripSummaryWrapper />
        </div>
>>>>>>> main
        <div className={styles.dayButtonGroup + " flex flex-wrap space-y-6 space-x-6"}>
            <br></br>
            <>
                {daysList}
            </>
        </div>
        <TripMemoryWrapper parentId={tripID} startDate={curTrip.startDate}></TripMemoryWrapper>
        </>
    ))
}

export default TripView;