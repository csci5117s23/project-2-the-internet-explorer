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

  // this might be a bad way to fix the last element being centered on the page as opposed to left aligned
  // might be a way to do it with tailwind but not sure
  const BlankTrip = () => {
    if (tripsList.length % 2 !== 0) {
      return (
        <Trip>
       </Trip>
      )
    }
    else return null;
  }

  return (
    <div className="flex flex-wrap justify-center space-y-1 space-x-5 mx-5" style={{paddingTop: "0.2em"}}>
      <br></br>
      {tripsList}
      <BlankTrip></BlankTrip>
    </div>
  )
}