const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import Header from "./Header";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "./LoadingCircle";
import TripMemoryWrapper from "./TripMemoryWrapper";
import MemoryViewButton from "./buttons/MemoryViewButton";
import styles from '../styles/TripView.module.css';
import Head from "next/head";
import { currentTrip, currentTripMemories, getIndividualTrip, getAllMemories } from "@/modules/Data";

export default function IndividualCategory({ tripID, date, category, router }) {
  const [categoryMemories, setCategoryMemories] = useState(null);

  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);
  // const [loadingCategoryMemories, setLoadingCategoryMemories] = useState(true);
  // const [tripMemories, setTripMemories] = useState(null);
  // const [loadingMemories, setLoadingMemories] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    async function findTrip() {
      if (userId) {
        if (currentTrip && currentTrip._id === tripID) {
          setTrip(currentTrip);
          setLoadingTrip(false);
        } else {
          const token = await getToken({ template: 'codehooks' });

          let curTrip = await getIndividualTrip(token, tripID);
          if (!curTrip) {
            router.push('/404');
            return;
          }
          setTrip(curTrip);
          setLoadingTrip(false);
        }
      }
    }
    findTrip();
  }, [isLoaded, tripID]);

  useEffect(() => {
    async function retrieveMemories() {
      if (userId) {
        if (currentTripMemories.length > 0 && currentTripMemories[0].parentTripId === tripID) {
          setTripMemories(currentTripMemories);
          setLoadingMemories(false);
        } else {
          const token = await getToken({ template: 'codehooks' });

          let curMemories = await getAllMemories(token, tripID);
          if (!curMemories) {
            router.push('/404');
            return;
          }
          setTripMemories(curMemories);
          setLoadingMemories(false);
        }
      }
    }
    retrieveMemories();
  }, [isLoaded, tripID]);

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function createMemoryButton(memory, params) {
    return (
      <MemoryViewButton
        key={memory._id}
        tripID={trip._id}
        memoryID={memory._id}
        filter='category'
        params={params}
        title={memory.title}
        image={memory.image}
      />
    );
  }

  useEffect(() => {
    function findCategoryMemories() {
      if (!loadingMemories && !loadingTrip) { // Only run when both the memories and trip are loaded.
        let params = {
          'category': category
        };

        let validDate = (date && date !== 'All Days');
        if (validDate) {
          params['day'] = date;
        }
        let memoryList = [];
        for (let memory of tripMemories) {
          if (validDate) {
            if (memory.category === category.toLowerCase() && memory.date === date) {
              let curMemory = createMemoryButton(memory, params);
              memoryList = memoryList.concat(curMemory);
            }
          } else {
            if (memory.category === category.toLowerCase()) {
              let curMemory = createMemoryButton(memory, params);
              memoryList = memoryList.concat(curMemory);
            }
          }
        }
        setCategoryMemories(memoryList);
      }
    }
    findCategoryMemories();
  }, [loadingMemories, loadingTrip, tripMemories, router]);

  // TODO: Add a useEffect that relies on the router to search through the passed in memories to grab all the ones for the specified category.
  // useEffect(() => {
  //   const findCategoryMemories = async () => {
  //     if (tripMemories) {
  //       let params = {
  //         'category': category
  //       };

  //       let validDate = (date && date !== "All Days");
  //       if (validDate) {
  //         params['day'] = date;
  //       }
  //       let memoryList = [];
  //       if (trip) {
  //         for (let memory of tripMemories) {
  //           if (validDate) {
  //             if (memory.category === category.toLowerCase() && memory.date === date) {
  //               let curMemory = createMemoryButton(memory, params);
  //               memoryList = memoryList.concat(curMemory);
  //             }
  //           } else {
  //             if (memory.category === category.toLowerCase()) {
  //               let curMemory = createMemoryButton(memory, params);
  //               memoryList = memoryList.concat(curMemory);
  //             }
  //           }
  //         }
  //         setCategoryMemories(memoryList);
  //       }
  //     }
  //   }
  //   findCategoryMemories();
  // }, [tripMemories, trip, router]);

  if (trip && categoryMemories) {
    let prevUrl = `/trips/${trip._id}`;
    let curDateStr = 'All Days';
    if (date && date !== "All Days") {
      // prevUrl = `/trips/${trip._id}/category?category=${category}`;

      let curDate = new Date(date);
      let month = curDate.getMonth();
      let day = curDate.getDate();
      curDateStr = `${months[month]} ${day}`;
    }

    return (
      <>
        <Head>
          <title>{trip.tripName}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header 
          title={trip.tripName}
          back={true}
          prevUrl={prevUrl}
        />
        {loadingMemories ? (
          <LoadingCircle></LoadingCircle>
        ) : (
          <>
            <CategoryButtonWrapper tripID={trip._id} day={curDateStr} trip={trip} date={date} curr_category={category} tripMemories={tripMemories} setTripMemories={setTripMemories}></CategoryButtonWrapper>
            <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6`}>
              <br></br>
              <>{categoryMemories}</>
            </div>
            <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} category={category} date={date} tripMemories={tripMemories} setTripMemories={setTripMemories}></TripMemoryWrapper>
          </>
        )}
      </>
    );
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}
