import { useRouter } from "next/router";

import { currentTrip, currentTripMemories, getIndividualTrip, getAllMemories } from "@/modules/Data";
import IndividualCategory from "@/components/IndividualCategory";
import IndividualDay from "@/components/IndividualDay";
import LoadingCircle from "@/components/LoadingCircle";


export default function FilterPage() {
  const router = useRouter();
  const { filter, tripID, category, day } = router.query;

  console.log('filter: ', filter);
  console.log('tripID: ', tripID);
  console.log('category: ', category);
  console.log('day: ', day);

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
        <IndividualDay tripID={tripID} date={day} category={curCategory} router={router}></IndividualDay>
      );
    } else {
      // Unaccepted route.
      router.push('/404');
      return;
    }
  } else {
    return <LoadingCircle></LoadingCircle>
  }

  // return <IndividualCategory></IndividualCategory>

  // console.log('router query: ', router.query);
  // console.log('window: ', window.location);

  // return <h1>category page</h1>
}