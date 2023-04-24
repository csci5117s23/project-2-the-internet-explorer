const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import Header from "./Header";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "./LoadingCircle";
import TripMemoryWrapper from "./TripMemoryWrapper";
import MemoryViewButton from "./buttons/MemoryViewButton";
import styles from '../styles/TripView.module.css';

export default function IndividualCategory({ trip, category, router }) {
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);
  
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const getCategoryMemories = async () => {
      try {
        setLoadingMemories(true);
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/getCategoryMemories?trip=${trip._id}&category=${category}`, {
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
          console.log('memories: ', data);

          setTripMemories(data);
          setLoadingMemories(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    getCategoryMemories();
  }, [isLoaded, router]);

  let memoryList = [];
  if (!loadingMemories) {
    let params = {
      'category': category
    }
    memoryList = tripMemories.map(
      (memory) => 
        <MemoryViewButton
          key={memory._id}
          tripID={trip._id}
          memoryID={memory._id}
          filter='category'
          params={params}
          title={memory.title}
          color={'bg-emerald-400'}
        />
    );
  } 
  console.log('memory list: ', memoryList);

  return (
    <>
      <Header
        title={`${trip.tripName}`}
        back={true}
        prevUrl={`/trips/${trip._id}`}
        day={"All Days"}
      />
      <CategoryButtonWrapper tripID={trip._id} curr_category={category}></CategoryButtonWrapper>
      {loadingMemories ? (
        <LoadingCircle></LoadingCircle>
      ) : (
        <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
          <br></br>
          <>{memoryList}</>
        </div>
      )}
      <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} category={category}></TripMemoryWrapper>
    </>
  );
}