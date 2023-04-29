const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Header from './Header';
import MemoryViewButton from './buttons/MemoryViewButton';
import LoadingCircle from './LoadingCircle';
import TripMemoryWrapper from './TripMemoryWrapper';
import CategoryButtonWrapper from './buttons/CategoryButtonWrapper';
import styles from '../styles/TripView.module.css';

export default function IndividualDay({ trip, date, category, loadingMemories, tripMemories, setTripMemories, router }) {
  const [dayMemories, setDayMemories] = useState(null);
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
        filter='day'
        params={params}
        title={memory.title}
        image={memory.image}
      />
    );
  }

  // TODO: Add a useEffect that relies on the router to search through the passed in memories to grab all the ones for the specified day.
  useEffect(() => {
    const findDayMemories = async () => {
      if (tripMemories) {
        console.log('trip memories: ', tripMemories);
        console.log('finding day memories');
        let params = {
          'day': date
        };
        let validCategory = (category && category !== "All Categories");
        // If a category was specified, add it to the params.
        if (validCategory) {
          params['category'] = category;
        }
        let memoryList = [];
        if (trip) {
          for (let memory of tripMemories) {
            if (validCategory) {
              if (memory.date === date && memory.category === category.toLowerCase()) {
                let curMemory = createMemoryButton(memory, params);
                memoryList = memoryList.concat(curMemory);
              }
            } else {
              if (memory.date === date) {
                let curMemory = createMemoryButton(memory, params);
                memoryList = memoryList.concat(curMemory);
              }
            }
          }
          console.log('memory list in day', memoryList);
          setDayMemories(memoryList);
        }
      }
    }
    findDayMemories();
  }, [tripMemories, trip, router]);

  if (trip && dayMemories) {
    console.log('date in individual day: ', date);

    let curDate = new Date(date);
    let month = curDate.getMonth();
    let day = curDate.getDate();
    let curDateStr = `${months[month]} ${day}`;

    let prevUrl = `/trips/${trip._id}`;
    if (category && category !== "All Categories") {
      // prevUrl = `/trips/${trip._id}/day?day=${date}`;
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
            <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6`}>
              <br></br>
              <>{dayMemories}</>
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
