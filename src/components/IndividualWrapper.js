const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingCircle from "./LoadingCircle";
import IndividualTrip from "./IndividualTrip";
import IndividualCategory from "./IndividualCategory";


export default function IndividualWrapper({ router }) {
  const [curTrip, setCurTrip] = useState(null);
  const [loadingCurTrip, setLoadingCurTrip] = useState(true);
  // const router = useRouter();
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
            // router.push('/trips');
            router.push('/updated_trips');
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
    if (tripData.length == 1) {
      return (
        <>
          <IndividualTrip trip={curTrip} router={router}></IndividualTrip>
        </>
      )
    } else if (tripData.length == 2) {
      const urlParams = new URLSearchParams(location.search);
      let filter = tripData[1]
      if (filter === 'category') {
        if (!urlParams.has('category')) {
          router.push('/404'); // Missing the search query.
        }

        let category = urlParams.get('category');
        return (
          <IndividualCategory trip={curTrip} category={category} router={router}></IndividualCategory>
        );
      } else if (filter === 'day') {
        if (!urlParams.has('day')) {
          router.push('/404'); // Missing the search query.
        }

        let day = urlParams.get('day');
        return (
          <></>
        );
      }
    }
  }

  return <h1>this is the wrapper for individual content with {tripData}</h1>
}