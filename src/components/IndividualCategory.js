const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import Header from "./Header";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "./LoadingCircle";
import TripMemoryWrapper from "./TripMemoryWrapper";
import MemoryViewButton from "./buttons/MemoryViewButton";
import styles from '../styles/TripView.module.css';

export default function IndividualCategory({ trip, category, tripMemories, setTripMemories, router }) {
  const [categoryMemories, setCategoryMemories] = useState(null);
  // const [loadingCategoryMemories, setLoadingCategoryMemories] = useState(true);
  // const [tripMemories, setTripMemories] = useState(null);
  // const [loadingMemories, setLoadingMemories] = useState(true);
  
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // TODO: Add a useEffect that relies on the router to search through the passed in memories to grab all the ones for the specified category.
  useEffect(() => {
    const findCategoryMemories = async () => {
      if (tripMemories) {
        let params = {
          'category': category
        };
        let memoryList = [];
        for (let memory of tripMemories) {
          if (memory.category === category.toLowerCase()) {
            let curMemory = (
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
            memoryList = memoryList.concat(curMemory);
          }
        }
        setCategoryMemories(memoryList);
      }
    }
    findCategoryMemories();
  }, [tripMemories, router]);

  return (
    <>
      <Header
        title={`${trip.tripName}`}
        back={true}
        prevUrl={`/trips/${trip._id}`}
        day={"All Days"}
      />
      <CategoryButtonWrapper tripID={trip._id} curr_category={category}></CategoryButtonWrapper>
      <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6 space-x-6`}>
        <br></br>
        <>{categoryMemories}</>
      </div>
      <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} category={category} tripMemories={tripMemories} setTripMemories={setTripMemories}></TripMemoryWrapper>
    </>
  );
}