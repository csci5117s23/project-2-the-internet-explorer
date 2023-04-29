const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import Header from "./Header";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "./LoadingCircle";
import TripMemoryWrapper from "./TripMemoryWrapper";
import MemoryViewButton from "./buttons/MemoryViewButton";
import styles from '../styles/TripView.module.css';

export default function IndividualCategory({ trip, date, category, loadingMemories, tripMemories, setTripMemories, router }) {
  const [categoryMemories, setCategoryMemories] = useState(null);
  // const [loadingCategoryMemories, setLoadingCategoryMemories] = useState(true);
  // const [tripMemories, setTripMemories] = useState(null);
  // const [loadingMemories, setLoadingMemories] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

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

  // TODO: Add a useEffect that relies on the router to search through the passed in memories to grab all the ones for the specified category.
  useEffect(() => {
    const findCategoryMemories = async () => {
      if (tripMemories) {
        let params = {
          'category': category
        };

        let validDate = (date && date !== "All Days");
        if (validDate) {
          params['day'] = date;
        }
        let memoryList = [];
        if (trip) {
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
    }
    findCategoryMemories();
  }, [tripMemories, trip, router]);

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
            <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
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
