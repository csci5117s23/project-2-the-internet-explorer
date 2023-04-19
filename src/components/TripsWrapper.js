const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import TripsList from "./TripsList";
import { useAuth } from "@clerk/clerk-react";
import LoadingCircle from "./LoadingCircle";


export default function TripsWrapper({ uploadedTrip }) {
  // This is the wrapper for the trips list.

  // TODO: Add the trips list component here.

  // This would probably be where our database request is to get the trips.
  // We'll just hardcode them for now.
  // let sampleTrips = [
  //   {
  //     tripName: "Sample Trip 1",
  //     startDate: "4/13/2023",
  //     endDate: "4/23/2023"
  //   },
  //   {
  //     tripName: "Sample Trip 2",
  //     startDate: "4/13/2023",
  //     endDate: "4/23/2023"
  //   },
  //   {
  //     tripName: "Sample Trip 3",
  //     startDate: "4/13/2023",
  //     endDate: "4/23/2023"
  //   },
  //   {
  //     tripName: "Sample Trip 4",
  //     startDate: "4/13/2023",
  //     endDate: "4/23/2023"
  //   }
  // ];

  const [allTrips, setAllTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const getAllTrips = async () => {
      if (userId) {
        try {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + '/getAllTrips', {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });

          const data = await response.json();
          console.log('all data: ', data);
          setAllTrips(data);
          setLoadingTrips(false);
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    getAllTrips();
  }, []);

  useEffect(() => {
    // Update allTrips with a new trip, then sort the new list by start date.
    const updateTrips = () => {
      if (uploadedTrip) {
        let mutableTrips = [...allTrips];
        mutableTrips = mutableTrips.concat(uploadedTrip);
        mutableTrips.sort((a, b) => {
          if (a.startDate < b.startDate) {
            return -1;
          } 
          if (a.startDate > b.startDate) {
            return 1;
          }
          return 0;
        });
        setAllTrips(mutableTrips);
      }
    }
    updateTrips();
  }, [uploadedTrip]);

  console.log('loading: ', loadingTrips);

  return (loadingTrips ? (
    <LoadingCircle></LoadingCircle>
  ) : (
    <TripsList trips={allTrips}></TripsList>
  ));

  // return (
  //   <TripsList trips={allTrips}></TripsList>
  // )
}