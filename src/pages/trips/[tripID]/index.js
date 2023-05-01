import LoadingCircle from "@/components/LoadingCircle";
import IndividualTrip from "@/components/IndividualTrip";
import { useRouter } from "next/router";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Splash from "@/pages";

export default function TripId() {
  const router = useRouter();
  const { tripID } = router.query;

  if (router.isReady) {
    return (
      <>
        <SignedIn>
          <IndividualTrip tripID={tripID} router={router}></IndividualTrip>
        </SignedIn>
        <SignedOut>
          <Splash></Splash>
        </SignedOut>
      </>
    );     
  } else {
    return (
      <>
        <SignedIn>
          <LoadingCircle></LoadingCircle>
        </SignedIn>
        <SignedOut>
          <Splash></Splash>
        </SignedOut>
      </>
    );
  }
}