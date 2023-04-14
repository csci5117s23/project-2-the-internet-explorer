import TripsList from "./TripsList";


export default function TripsWrapper() {
  // This is the wrapper for the trips list.

  // TODO: Add the trips list component here.

  // This would probably be where our database request is to get the trips.
  // We'll just hardcode them for now.
  let sampleTrips = [
    {
      title: "Sample Trip 1",
      startDate: "4/13/2023",
      endDate: "4/23/2023"
    },
    {
      title: "Sample Trip 2",
      startDate: "4/13/2023",
      endDate: "4/23/2023"
    },
    {
      title: "Sample Trip 3",
      startDate: "4/13/2023",
      endDate: "4/23/2023"
    },
    {
      title: "Sample Trip 4",
      startDate: "4/13/2023",
      endDate: "4/23/2023"
    }
  ];

  return (
    <TripsList trips={sampleTrips}></TripsList>
  )
}