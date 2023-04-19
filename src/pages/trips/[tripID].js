const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import { useRouter } from "next/router";
import styles from '../../styles/TripView.module.css'
import DayViewButton from "@/components/buttons/DayViewButton";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";


const TripView = () => {
    const [curTrip, setCurTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    let { tripID } = router.query;
    // const tripId = router.query.tripID

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    // console.log('backend url: ', backend_base + `/tripFolders/${tripId}`);

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

    return (isLoading ? (
        <h1>LOADING TRIP...</h1>
    ) : (
        <>
        <Header
            title={curTrip.tripName}
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
            <DayViewButton
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
            />
        </div>
        <TripMemoryWrapper parentId={tripID}></TripMemoryWrapper>
        </>
    ))

    return (
        <>
        <Header
            title={title}
        />
        <div className={styles.buttonGroup + " flex flex-wrap space-y-2 space-x-2"}>
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
            <DayViewButton
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
            />
        </div>
        <TripMemoryWrapper></TripMemoryWrapper>
        </>
    )
}

export default TripView;