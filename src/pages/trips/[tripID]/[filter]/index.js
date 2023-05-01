import { useRouter } from "next/router";

import { currentTrip, currentTripMemories, getIndividualTrip, getAllMemories } from "@/modules/Data";
import IndividualCategory from "@/components/IndividualCategory";
import IndividualDay from "@/components/IndividualDay";
import LoadingCircle from "@/components/LoadingCircle";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Splash from "@/pages";
export default function FilterPage() {
  const router = useRouter();
  const { filter, tripID, category, day } = router.query;

  if (router.isReady) {

    if (filter === 'category') {
      if (!category) {
        router.push('/404'); // Missing the search query.
        return;
      }

      let curDay = 'All Days';
      if (day) {
        curDay = day;
      }
      
      return (
        <IndividualCategory tripID={tripID} date={curDay} category={category} router={router}></IndividualCategory>
      );
    } else if (filter === 'day') {
      if (!day) {
        router.push('/404'); // Missing the search query.
        return;
      }

      let curCategory = 'All Categories';
      if (category) {
        curCategory = category;
      }
      
      return (
        <>
          <SignedIn>
            <IndividualDay
              tripID={tripID}
              date={day}
              category={curCategory}
              router={router}
            ></IndividualDay>
          </SignedIn>
          <SignedOut>
            <Splash></Splash>
          </SignedOut>
        </>
      );
    } else {
      // Unaccepted route.
      router.push('/404');
      return;
    }
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