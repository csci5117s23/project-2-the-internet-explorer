import Trip from "./Trip";
import styles from '../styles/Trips.module.css';
import { tileProps } from "react-calendar/dist/cjs/shared/propTypes";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function TripsList({ trips }) {
  // This is the component for the list of trips.
  let tripsList = trips.map(
    (trip, i) => (
      <Trip
        key={trip._id}
        id={trip._id}
        title={trip.tripName}
        month={months[trip.startMonth - 1]}
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