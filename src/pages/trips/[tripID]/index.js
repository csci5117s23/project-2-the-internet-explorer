import LoadingCircle from "@/components/LoadingCircle";
import IndividualTrip from "@/components/IndividualTrip";
import { useRouter } from "next/router";

export default function TripId() {
  const router = useRouter();
  const { tripID } = router.query;

  console.log('tripID: ', tripID);

  if (tripID) {
    return <IndividualTrip tripID={tripID} router={router}></IndividualTrip>
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}