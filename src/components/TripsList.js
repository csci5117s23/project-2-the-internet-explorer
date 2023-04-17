import Trip from "./Trip";
import styles from '../styles/Trips.module.css';

export default function TripsList({ trips }) {
  // This is the component for the list of trips.
  let tripsList = trips.map(
    (trip, i) => (
      <Trip
        key={trip.tripName}
        title={trip.tripName}
        startDate={trip.startDate}
        endDate={trip.endDate}
        index={i}
      />
    )
  );

  return (
    <div className="flex flex-wrap justify-around space-y-5 mx-4" style={{paddingTop: "0.2em"}}>
      {tripsList}
    </div>
  )
}