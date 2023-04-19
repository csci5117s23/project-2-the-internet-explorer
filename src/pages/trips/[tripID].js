import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import styles from '../../styles/TripView.module.css'
import DayViewButton from "@/components/buttons/DayViewButton";
import EditTripButton from "@/components/buttons/EditTripButton";
import DeleteTripButton from "@/components/buttons/DeleteFileButton";

const TripView = () => {

    const router = useRouter();
    const title = router.query.tripID

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
        </div>
        
        </>
    )
}

export default TripView;