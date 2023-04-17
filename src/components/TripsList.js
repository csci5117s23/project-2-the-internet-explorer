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
    <div className="flex flex-wrap justify-center space-y-5 space-x-5 mx-10" style={{paddingTop: "0.2em"}}>
      <br></br>
      {tripsList}
      <BlankTrip></BlankTrip>
    </div>
  )
}