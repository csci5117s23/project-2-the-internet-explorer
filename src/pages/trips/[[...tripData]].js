import IndividualTrip from "@/components/IndividualTrip";
import IndividualCategory from "@/components/IndividualCategory";
import LoadingCircle from "@/components/LoadingCircle";
import { useRouter } from "next/router";
import IndividualWrapper from "@/components/IndividualWrapper";


export default function tripData() {
  const router = useRouter();

  if (router.isReady) {
    return (
      <IndividualWrapper router={router}></IndividualWrapper>
    )
  // } else {
  //   return <LoadingCircle></LoadingCircle>
  }
}