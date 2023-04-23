const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Header from './Header';
import MemoryViewButton from './buttons/MemoryViewButton';
import LoadingCircle from './LoadingCircle';
import TripMemoryWrapper from './TripMemoryWrapper';
import CategoryButtonWrapper from './buttons/CategoryButtonWrapper';
import styles from '../styles/TripView.module.css';

export default function IndividualDay({ trip, date, category, router }) {
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const getMemories = async () => {
      try {
        setLoadingMemories(true);
        let url = `${backend_base}/getTripMemories?trip=${trip._id}`;
        // Check if a category has been specified.
        if (category) {
          url = `${backend_base}/getCategoryMemories?trip=${trip._id}&category=${category}`;
        }
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(url, {
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

          setTripMemories(data);
          setLoadingMemories(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    getMemories();
  }, [isLoaded, router]);

  let dayMemoriesList = [];
  if (!loadingMemories) {
    let params = {
      'day': date
    };
    // If a category was specified, add it to the params.
    if (category) {
      params['category'] = category;
    }
    let dayMemories= [];
    for (let memory of tripMemories) {
      if (memory.date === date) {
        dayMemories = dayMemories.concat(memory);
      }
    }

    dayMemoriesList = dayMemories.map(
      (memory) => 
        <MemoryViewButton
          key={memory._id}
          tripID={trip._id}
          memoryID={memory._id}
          filter='day'
          params={params}
          title={memory.title}
          color={'bg-emerald-400'}
        />
    );
  }

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
      <CategoryButtonWrapper tripID={trip._id} date={date} curr_category={category}></CategoryButtonWrapper>
      {loadingMemories ? (
        <LoadingCircle></LoadingCircle>
      ) : (
        <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
          <br></br>
          <>{dayMemoriesList}</>
        </div>
      )}
      <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate}></TripMemoryWrapper>
    </>
  )
}