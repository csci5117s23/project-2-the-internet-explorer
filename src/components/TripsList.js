import Trip from "./Trip";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function TripsList({ allTrips, setAllTrips }) {
  let tripsList = allTrips.map(
    (trip, i) => (
      <Trip
        key={trip._id}
        id={trip._id}
        title={trip.tripName}
        month={months[trip.startMonth - 1]}
        year={trip.startYear}
        index={i}
        description={trip.description}
        allTrips={allTrips}
        setAllTrips={setAllTrips}
      />
    )
  );

  return (
    <div className="mt-6">
      {tripsList}
    </div>
  );
}