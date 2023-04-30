import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Header from "./Header";
import TripsWrapper from "./TripsWrapper";
import AddTripWrapper from "./AddTripWrapper";
import LoadingCircle from "./LoadingCircle";

import { allTripsData, getAllTrips } from "@/modules/Data";

export default function HomePage() {
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [allTrips, setAllTrips]= useState(null);
  const [uploadedTrip, setUploadedTrip] = useState(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    async function retrieveTrips() {
      console.log('all trips data: ', allTripsData);
      setLoadingTrips(true);
      if (userId) {
        if (allTripsData.length > 0) {
          setAllTrips(allTripsData);
          setLoadingTrips(false);
        } else {
          const token = await getToken({ template: 'codehooks' });

          const trips = await getAllTrips(token);
          setAllTrips(trips);
          setLoadingTrips(false);
        }
        // if (!allTripsData) {
        //   const token = await getToken({ template: "codehooks" });
        //   const trips = await getAllTrips(token);

        //   setAllTrips(trips);
        //   setLoadingTrips(false);
        // } else {
        //   setAllTrips(allTripsData);
        //   setLoadingTrips(false);
        // }
      }
    }
    retrieveTrips();
  }, [isLoaded]);

  return (
    <>
      <SignedIn>
        <Header 
          title='Your Trips'
          back={false}
        />
        {loadingTrips ? (
          <LoadingCircle></LoadingCircle>
        ) : (
          <>
            <TripsWrapper
              uploadedTrip={uploadedTrip}
              allTrips={allTrips}
              setAllTrips={setAllTrips}
            />
            <AddTripWrapper
              setUploadedTrip={setUploadedTrip}
            />
          </>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
    </>
  )
}