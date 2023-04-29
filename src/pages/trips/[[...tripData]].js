import IndividualTrip from "@/components/IndividualTrip";
import IndividualCategory from "@/components/IndividualCategory";
import LoadingCircle from "@/components/LoadingCircle";
import { useRouter } from "next/router";
import IndividualWrapper from "@/components/IndividualWrapper";


export default function TripData() {
  const router = useRouter();

  // Wait for the router to be ready before loading any components. We need the router ready
  // to ensure we can retrieve the query from the router.
  if (router.isReady) {
    return (
      <IndividualWrapper router={router}></IndividualWrapper>
    )
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}