const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Header from './Header';
import MemoryViewButton from './buttons/MemoryViewButton';
import LoadingCircle from './LoadingCircle';
import TripMemoryWrapper from './TripMemoryWrapper';
import CategoryButtonWrapper from './buttons/CategoryButtonWrapper';
import styles from '../styles/TripView.module.css';
import Head from 'next/head';
import { currentTrip, currentTripMemories, getIndividualTrip, getAllMemories } from '@/modules/Data';

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function IndividualDay({ tripID, date, category, router }) {
  const [dayMemories, setDayMemories] = useState(null);

  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);

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

  function createMemoryButton(memory) {
    return (
      <MemoryViewButton
        key={memory._id}
        tripID={trip._id}
        memoryID={memory._id}
        title={memory.title}
        image={memory.image}
      />
    );
  }

  useEffect(() => {
    function findDayMemories() {
      if (!loadingMemories && !loadingTrip) { // Only run when both the memories and trip are loaded.
        let memoryList = [];
        for (let memory of tripMemories) {
          if (category && category !== 'All Categories') {
            if (memory.date === date && memory.category === category.toLowerCase()) {
              let curMemory = createMemoryButton(memory);
              memoryList = memoryList.concat(curMemory);
            }
          } else {
            if (memory.date === date) {
              let curMemory = createMemoryButton(memory);
              memoryList = memoryList.concat(curMemory);
            }
          }
        }
        setDayMemories(memoryList);
      }
    }
    findDayMemories();
  }, [loadingMemories, loadingTrip, tripMemories, router]);

  if (trip && dayMemories) {
    let curDate = new Date(date);
    let month = curDate.getMonth();
    let day = curDate.getDate();
    let curDateStr = `${months[month]} ${day}`;

    let prevUrl = `/trips/${trip._id}`;

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
            <CategoryButtonWrapper day={curDateStr} trip={trip} date={date} curr_category={category} tripMemories={tripMemories}></CategoryButtonWrapper>
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
