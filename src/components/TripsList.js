import Trip from "./Trip";
import styles from '../styles/Trips.module.css';

export default function TripsList({ trips }) {
  // This is the component for the list of trips.

  // TODO: Use Array.map to map a list of trip data to a list of Trip components.

  let tripsList = trips.map(
    (trip) => (
      <Trip
        key={trip.title}
        title={trip.title}
        startDate={trip.startDate}
        endDate={trip.endDate}
      />
    )
  );

  return (
    <div>
      {tripsList}
    </div>
  )
}