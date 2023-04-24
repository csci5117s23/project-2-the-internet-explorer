import Trip from "./Trip";
import styles from '../styles/Trips.module.css';
import { tileProps } from "react-calendar/dist/cjs/shared/propTypes";


export default function TripsList({ trips }) {
  // This is the component for the list of trips.
  let tripsList = trips.map(
    (trip, i) => (
      <Trip
        key={trip._id}
        id={trip._id}
        title={trip.tripName}
        startDate={trip.startDate}
        endDate={trip.endDate}
        index={i}
      />
    )
  );

  console.log('trips list: ', tripsList);


  return (
    <div className="mt-6">

      {tripsList}
      {/* <BlankTrip></BlankTrip> */}
    </div>
  )
}