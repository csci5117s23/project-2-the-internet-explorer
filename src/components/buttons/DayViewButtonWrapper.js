const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { ClerkLoaded, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import LoadingCircle from "../LoadingCircle";
import DayViewButton from "./DayViewButton";
import styles from '../../styles/TripView.module.css';

export default function DayViewButtonWrapper({ tripID, router, tripMemories, setTripMemories }) {
  console.log('trip id: ', tripID);
  // const [tripMemories, setTripMemories] = useState(null);
  const [loadingTripMemories, setLoadingTripMemories] = useState(true);
  const [tripDays, setTripDays] = useState([]);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // useEffect(() => {
  //   const getTripMemories = async () => {
  //     try {
  //       if (userId) {
  //         const token = await getToken({ template: "codehooks" });

  //         const response = await fetch(backend_base + `/getTripMemories?trip=${tripID}`, {
  //           'method': 'GET',
  //           'headers': {
  //             'Authorization': 'Bearer ' + token
  //           }
  //         });
  //         if (!response.ok) {
  //           router.push('/404');
  //           return;
  //         }
  //         const data = await response.json();

  //         setTripMemories(data);
  //         setLoadingTripMemories(false);
  //       }
  //     } catch (error) {
  //       console.error('Error: ', error);
  //     }
  //   }
  //   getTripMemories();
  // }, [isLoaded]);

  useEffect(() => {
    const findDaysList = async () => {
      if (tripMemories) {
        let days = {};
        for (let memory of tripMemories) {
          if (days[memory.date]) {
            continue; // We already have this date represented.
          } else {
            days[memory.date] = memory;
          }
        }
        let daysList = [];
        for (const [date, memory] of Object.entries(days)) {
          let curDate = new Date(date);
          let month = curDate.getMonth();
          let day = curDate.getDate();
          let curDateStr = `${months[month]} ${day}`;
          let curView = (
            <DayViewButton
              key={curDateStr}
              tripID={tripID}
              title={curDateStr}
              ISOString={date}
              color={'bg-custom-blue'}
              image={memory.image}
            />
          );

          daysList = daysList.concat(curView);
        }

        setTripDays(daysList);
      }
    }
    findDaysList();
  }, [router]);

  return (
    <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6`}>
      <br></br>``
      <>{tripDays}</>
    </div>
  )

  // if (loadingTripMemories) {
  //   return <LoadingCircle></LoadingCircle>
  // } else {
  //   let daysList = [];
  //   for (let memory of tripMemories) {
  //     if (tripDays[memory.date]) {
  //       continue; // We already have this date represented.
  //     } else {
  //       let currentMemories = tripDays;
  //       currentMemories[memory.date] = memory;
  //       setTripDays(currentMemories);
  //     }
  //   }
  //   for (const [date, memory] of Object.entries(tripDays)) {
  //     let curDate = new Date(date);
  //     let month = curDate.getMonth();
  //     let day = curDate.getDate();
  //     let curDateStr = `${months[month]} ${day}`;
  //     let curView = (
  //       <DayViewButton
  //         key={curDateStr}
  //         tripID={tripID}
  //         title={curDateStr}
  //         ISOString={date}
  //         color={'bg-custom-blue'}
  //         image={memory.image}
  //       />
  //     )

  //     daysList = daysList.concat(curView);
  //   }

  //   return (
  //     <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
  //       <br></br>
  //       <>{daysList}</>
  //     </div>
  //   );
  // }
}