const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import { useRouter } from "next/router";
import styles from '../../styles/TripView.module.css'
import DayViewButton from "@/components/buttons/DayViewButton";
import EditTripButton from "@/components/buttons/EditTripButton";
import DeleteTripButton from "@/components/buttons/DeleteFileButton";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { LoadScript } from "@react-google-maps/api";
const libraries = ["places"];

const TripView = () => {
    const MAP_API = process.env.NEXT_PUBLIC_MAP_API

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
        <h1>LOADING TRIP...</h1>
    ) : (
        <>
        <Header
            title={curTrip.tripName}
            back={true}
            prevUrl='/trips'
        />
        <div className={styles.buttonGroup + "flex flex-wrap space-y-2 space-x-2"}>
            <br></br>
            <CategoryButton
                name={"Places"}
            />
            <CategoryButton
                name={"People"}
            />
            <CategoryButton
                name={"Events"}
            />
            <CategoryButton
                name={"Souvenirs"}
            />
        </div>
        <div className={styles.dayButtonGroup + " flex flex-wrap space-y-6 space-x-6"}>
            <br></br>
            <>
                {daysList}
            </>
            {/* <DayViewButton
                title={"June 1"}
                color={"bg-custom-blue"}
            />
            <DayViewButton
                title={"June 2"}
                color={"bg-teal-500"}
            />
            <DayViewButton
                title={"June 3"}
                color={"bg-amber-400"}
            />
            <DayViewButton
                title={"June 4"}
                color={"bg-violet-500"}
            />
            <DayViewButton
                title={"June 4"}
                color={"bg-violet-500"}
            />
            <DayViewButton
                title={"June 4"}
                color={"bg-violet-500"}
            />
            <DayViewButton
                title={"June 4"}
                color={"bg-violet-500"}
            />
            <DayViewButton
                title={"June 4"}
                color={"bg-violet-500"}
            /> */}
        </div>
        {/* <LoadScript
          libraries={libraries}
          googleMapsApiKey={MAP_API}
        > */}
        <TripMemoryWrapper parentId={tripID}></TripMemoryWrapper>
        {/* </LoadScript> */}
        </>
    ))

    //commented out because they are duplicate codes
    
    // return (
    //     <>
    //     <Header
    //         title={title}
    //     />
    //     <div className={styles.buttonGroup + " flex flex-wrap space-y-2 space-x-2"}>
    //         <br></br>
    //         <CategoryButton
    //             name={"Places"}
    //         />
    //         <CategoryButton
    //             name={"People"}
    //         />
    //         <CategoryButton
    //             name={"Events"}
    //         />
    //         <CategoryButton
    //             name={"Souvenirs"}
    //         />
    //     </div>
    //     <div className={styles.dayButtonGroup + " flex flex-wrap space-y-6 space-x-6"}>
    //         <br></br>
    //         <DayViewButton
    //             title={"June 1"}
    //             color={"bg-custom-blue"}
    //         />
    //         <DayViewButton
    //             title={"June 2"}
    //             color={"bg-teal-500"}
    //         />
    //         <DayViewButton
    //             title={"June 3"}
    //             color={"bg-amber-400"}
    //         />
    //         <DayViewButton
    //             title={"June 4"}
    //             color={"bg-violet-500"}
    //         />
    //         <DayViewButton
    //             title={"June 4"}
    //             color={"bg-violet-500"}
    //         />
    //         <DayViewButton
    //             title={"June 4"}
    //             color={"bg-violet-500"}
    //         />
    //         <DayViewButton
    //             title={"June 4"}
    //             color={"bg-violet-500"}
    //         />
    //         <DayViewButton
    //             title={"June 4"}
    //             color={"bg-violet-500"}
    //         />
    //     </div>
    //     <TripMemoryWrapper></TripMemoryWrapper>
    //     </>
    // )
}

export default TripView;