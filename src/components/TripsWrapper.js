const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import TripsList from "./TripsList";
import { useAuth } from "@clerk/clerk-react";


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
    <div role="status" className="flex flex-wrap justify-center my-20">
      <br></br>
    <svg aria-hidden="true" className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-custom-blue" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  ) : (
    <TripsList trips={allTrips}></TripsList>
  ));

  // return (
  //   <TripsList trips={allTrips}></TripsList>
  // )
}