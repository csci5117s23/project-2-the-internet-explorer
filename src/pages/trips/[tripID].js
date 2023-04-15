import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import styles from '../../styles/TripView.module.css'
import DayViewButton from "@/components/buttons/DayViewButton";

const TripView = () => {

    const router = useRouter();
    const title = router.query.tripID

    return (
        <>
        <Header
            title={title}
        />
        <div className={styles.buttonGroup}>
            <CategoryButton
                name={"Places"}
            />
        </div>
        <div className={styles.dayButtonGroup}>
            <DayViewButton
                title={"June 1"}
            />
        </div>
        
        </>
    )
}

export default TripView;