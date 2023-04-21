import CategoryButton from './CategoryButton.js';
import styles from '../../styles/TripView.module.css';

export default function CategoryButtonWrapper({ tripID }) {
  return (
    <div className={styles.buttonGroup + "flex flex-wrap space-y-2 space-x-2"}>
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
    </div>
  )
}