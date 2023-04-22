import CategoryButton from './CategoryButton.js';
import styles from '../../styles/TripView.module.css';
import TripSummaryWrapper from '../TripSummaryWrapper.js';

export default function CategoryButtonWrapper({ tripID, date }) {
  return (
    <div className={styles.buttonGroup + "flex flex-wrap space-y-2 space-x-2"}>
      <br></br>
      <CategoryButton
        name={"Places"}
        tripId={tripID}
        date={date}
      />
      <CategoryButton
        name={"Events"}
        tripId={tripID}
        date={date}
      />
      <CategoryButton
        name={"Food"}
        tripId={tripID}
        date={date}
      />
      <CategoryButton
        name={"Souvenirs"}
        tripId={tripID}
        date={date}
      />
      <CategoryButton
        name={"People"}
        tripId={tripID}
        date={date}
      />
      <TripSummaryWrapper />
    </div>
  )
}