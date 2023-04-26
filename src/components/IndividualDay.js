const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Header from './Header';
import MemoryViewButton from './buttons/MemoryViewButton';
import LoadingCircle from './LoadingCircle';
import TripMemoryWrapper from './TripMemoryWrapper';
import CategoryButtonWrapper from './buttons/CategoryButtonWrapper';
import styles from '../styles/TripView.module.css';

export default function IndividualDay({ trip, date, category, tripMemories, setTripMemories, router }) {
  const [dayMemories, setDayMemories] = useState(null);
  // const [tripMemories, setTripMemories] = useState(null);
  // const [loadingMemories, setLoadingMemories] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // useEffect(() => {
  //   const getMemories = async () => {
  //     try {
  //       setLoadingMemories(true);
  //       let url = `${backend_base}/getTripMemories?trip=${trip._id}`;
  //       // Check if a category has been specified.
  //       if (category) {
  //         url = `${backend_base}/getCategoryMemories?trip=${trip._id}&category=${category}`;
  //       }
  //       if (userId) {
  //         const token = await getToken({ template: "codehooks" });

  //         const response = await fetch(url, {
  //           'method': 'GET',
  //           'headers': {
  //             'Authorization': 'Bearer ' + token
  //           }
  //         });
  //         if (!response.ok) {
  //           router.push('/trips');
  //           return;
  //         }
  //         const data = await response.json();

  //         setTripMemories(data);
  //         setLoadingMemories(false);
  //       }
  //     } catch (error) {
  //       console.error('Error: ', error);
  //     }
  //   }
  //   getMemories();
  // }, [isLoaded, router]);

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
        // If a category was specified, add it to the params.
        if (category) {
          params['category'] = category;
        }
        let memoryList = [];
        for (let memory of tripMemories) {
          if (category) {
            if (memory.date === date && memory.category === category) {
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
    findDayMemories();
  }, [router]);

  // let dayMemoriesList = [];
  // if (!loadingMemories) {
  //   let params = {
  //     'day': date
  //   };
  //   // If a category was specified, add it to the params.
  //   if (category) {
  //     params['category'] = category;
  //   }
  //   let dayMemories= [];
  //   for (let memory of tripMemories) {
  //     if (memory.date === date) {
  //       dayMemories = dayMemories.concat(memory);
  //     }
  //   }

  //   dayMemoriesList = dayMemories.map(
  //     (memory) => 
  //       <MemoryViewButton
  //         key={memory._id}
  //         tripID={trip._id}
  //         memoryID={memory._id}
  //         filter='day'
  //         params={params}
  //         title={memory.title}
  //         color={'bg-emerald-400'}
  //         image={memory.image}
  //       />
  //   );
  // }

  let curDate = new Date(date);
  let month = curDate.getMonth();
  let day = curDate.getDate();
  let curDateStr = `${months[month]} ${day}`;

  let prevUrl = `/trips/${trip._id}`;
  if (category) {
    prevUrl = `/trips/${trip._id}/day?day=${date}`;
  }

  return (
    <>
      <Header
        title={`${trip.tripName}`}
        back={true}
        prevUrl={prevUrl}
        day={`${curDateStr}`}
      />
      <CategoryButtonWrapper tripID={trip._id} trip={trip} date={date} curr_category={category} tripMemories={tripMemories}></CategoryButtonWrapper>
      {/* {loadingMemories ? (
        <LoadingCircle></LoadingCircle>
      ) : (
        <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
          <br></br>
          <>{dayMemoriesList}</>
        </div>
      )} */}
      <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
        <br></br>
        <>{dayMemories}</>
      </div>
      <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} category={category} date={date} tripMemories={tripMemories} setTripMemories={setTripMemories}></TripMemoryWrapper>
    </>
  )
}