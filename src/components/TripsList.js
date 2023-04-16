import Trip from "./Trip";
import styles from '../styles/Trips.module.css';

export default function TripsList({ trips }) {
  // This is the component for the list of trips.

  // TODO: Use Array.map to map a list of trip data to a list of Trip components.

  let tripsList = trips.map(
    (trip, i) => (
      <Trip
        key={trip.title}
        title={trip.title}
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