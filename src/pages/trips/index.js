import AddTripWrapper from "@/components/AddTripWrapper";
import Header from "@/components/Header";
import TripsWrapper from "@/components/TripsWrapper";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";


export default function Trips() {
  const [uploadedTrip, setUploadedTrip] = useState(null);

  return (
    <>
      <SignedIn>
        <Header></Header>
        <TripsWrapper
          uploadedTrip={uploadedTrip}
        ></TripsWrapper>
        <AddTripWrapper
          setUploadedTrip={setUploadedTrip}
        ></AddTripWrapper>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
    </>
  )
}