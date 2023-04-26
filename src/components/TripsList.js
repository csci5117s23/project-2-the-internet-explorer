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
        month={trip.startMonth}
        year={trip.startYear}
        index={i}
        description={trip.description}
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