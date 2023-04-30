const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import { useRouter } from "next/router";
import styles from '../styles/TripView.module.css';
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "@/components/LoadingCircle";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import MemoryViewButtonWrapper from "./buttons/MemoryViewButtonWrapper";

import { allTripsData, currentTrip, currentTripMemories, getIndividualTrip, getAllMemories } from "@/modules/Data";

export default function IndividualTrip({ tripID, router }) {
  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);
  
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    async function findTrip() {
      if (userId) {
        // console.log('current trip from data: ', currentTrip._id === tripID);
        if (currentTrip && currentTrip._id === tripID) {
          console.log('current trip exists');
          setTrip(currentTrip);
          setLoadingTrip(false);
        } else {
          const token = await getToken({ template: 'codehooks' });
          // if (allTripsData) {
            // let curTrip = allTripsData.find(trip => trip._id === tripID);
            // if (curTrip) {
            //   console.log('found cur trip by .find');
            //   setTrip(curTrip);
            //   setLoadingTrip(false);
            // } else {
            //   console.log('have to attempt a database access and all trips data exists');
            //   let curTrip = await getIndividualTrip(token, tripID);
            //   if (!curTrip) {
            //     router.push('/404');
            //     return;
            //   }
            //   setTrip(curTrip);
            //   setLoadingTrip(false);
            // }
          // } else {
            // console.log('have to attempt a database access when all trips data does not exist');
          let curTrip = await getIndividualTrip(token, tripID);
          if (!curTrip) {
            router.push('/404');
            return;
          }
          setTrip(curTrip);
          setLoadingTrip(false);
          // }
        }
      }
    }
    findTrip();
  }, [isLoaded, tripID]);

  useEffect(() => {
    async function retrieveMemories() {
      if (userId) {
        console.log('current trip memories: ', currentTripMemories.length);
        // console.log('current trip id bool: ', currentTrip._id === tripID);
        if (currentTripMemories.length > 0 && currentTripMemories[0].parentTripId === tripID) {
          console.log('retrieving cached data');
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


  if (!loadingTrip) {
    return (
      <>
        <Header 
          title={trip.tripName}
          back={true}
          prevUrl='/trips'
        />
        {loadingMemories ? (
          <LoadingCircle></LoadingCircle>
        ) : (
          <>
            <CategoryButtonWrapper day="All Days" curr_category="All Categories" tripID={trip._id} trip={trip} tripMemories={tripMemories} setTripMemories={setTripMemories} router={router}></CategoryButtonWrapper>
            <MemoryViewButtonWrapper tripMemories={tripMemories}></MemoryViewButtonWrapper>
            <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} tripMemories={tripMemories} setTripMemories={setTripMemories}></TripMemoryWrapper>
          </>
        )}
      </>
    );
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}
