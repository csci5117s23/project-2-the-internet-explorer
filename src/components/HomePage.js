import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useState } from "react";
import Header from "./Header";
import TripsWrapper from "./TripsWrapper";
import AddTripWrapper from "./AddTripWrapper";
import LoadingCircle from "./LoadingCircle";


export default function HomePage({ loadingTrips, allTrips, setAllTrips }) {
  const [uploadedTrip, setUploadedTrip] = useState(null);

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