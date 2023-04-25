const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import LoadingCircle from "./LoadingCircle";
import IndividualTrip from "./IndividualTrip";
import IndividualCategory from "./IndividualCategory";
import IndividualDay from "./IndividualDay";
import IndividualMemory from "./IndividualMemory";

// This wraps all individual pages, such as an individual trip, individual category,
// individual day, and individual memory. The page that it renders depends on the 
// url. This wrapper is used when the url looks like '/trips/[tripID]', 
// '/trips/[tripID]/[category/day]', or '/trips/[tripID]/[category/day]/[memoryID]'.
// If rendering an individual category or day, there should also be a query param
// indicating what category or day to render.
export default function IndividualWrapper({ router }) {
  const [curTrip, setCurTrip] = useState(null);
  const [loadingCurTrip, setLoadingCurTrip] = useState(true);
  let { tripData } = router.query;
  let tripID = tripData[0];

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const getIndividualTrip = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/tripFolders/${tripID}`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });
          if (!response.ok) {
            router.push('/trips');
            return;
          }
          const data = await response.json();

          setCurTrip(data);
          setLoadingCurTrip(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    getIndividualTrip();
  }, [isLoaded]);

  console.log('cur trip: ', curTrip);

  if (loadingCurTrip) {
    return <LoadingCircle></LoadingCircle>
  } else {
    console.log('trip data: ', tripData);
    if (tripData.length == 1) {
      console.log('cur trip: ', curTrip);
      return (
        <>
          <IndividualTrip trip={curTrip} router={router}></IndividualTrip>
        </>
      );
    } else if (tripData.length == 2) {
      const urlParams = new URLSearchParams(location.search);
      let filter = tripData[1]
      if (filter === 'category') {
        // Check if the correct query param is present.
        if (!urlParams.has('category')) {
          router.push('/404'); // Missing the search query.
          return;
        }

        let category = urlParams.get('category');
        return (
          <IndividualCategory trip={curTrip} category={category} router={router}></IndividualCategory>
        );
      } else if (filter === 'day') {
        // Check if the correct query param is present.
        if (!urlParams.has('day')) {
          router.push('/404'); // Missing the search query.
          return;
        }

        let day = urlParams.get('day');
        let category = '';
        if (urlParams.has('category')) {
          category = urlParams.get('category');
        }
        return (
          <IndividualDay trip={curTrip} date={day} category={category} router={router}></IndividualDay>
        );
      } else {
        // Unaccepted second route.
        router.push('/404');
        return;
      }
    } else if (tripData.length === 3) {
      let filter = tripData[1]; // Get the category/day filter for going back to the previous page.
      const urlParams = new URLSearchParams(location.search);
      let memoryID = tripData[2];
      return (
        <IndividualMemory 
          trip={curTrip} 
          memoryID={memoryID}
          filter={filter}
          params={urlParams}
          router={router}
        ></IndividualMemory>
      );
    }
  }

  return <h1>this is the wrapper for individual content with {tripData}</h1>
}