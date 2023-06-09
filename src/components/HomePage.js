import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import TripsWrapper from "./TripsWrapper";
import AddTripWrapper from "./AddTripWrapper";
import LoadingCircle from "./LoadingCircle";
import { allTripsData, getAllTrips } from "@/modules/Data";
import Splash from "@/pages";

export default function HomePage({ router }) {
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [allTrips, setAllTrips]= useState(null);
  const [uploadedTrip, setUploadedTrip] = useState(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    async function retrieveTrips() {
      setLoadingTrips(true);
      if (userId) {
        if (allTripsData.length > 0) {
          setAllTrips(allTripsData);
          setLoadingTrips(false);
        } else {
          const token = await getToken({ template: "codehooks" });

          const trips = await getAllTrips(token);
          if (!trips) {
            router.push("/404");
            return;
          }
          setAllTrips(trips);
          setLoadingTrips(false);
        }
      }
    }
    retrieveTrips();
  }, [isLoaded]);

  return (
    <>
      <SignedIn>
        <Header 
          title="Your Trips"
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
              router={router}
            />
            <AddTripWrapper
              setUploadedTrip={setUploadedTrip}
              router={router}
            />
          </>
        )}
      </SignedIn>
      <SignedOut>
        <Splash></Splash>
      </SignedOut>
    </>
  );
}