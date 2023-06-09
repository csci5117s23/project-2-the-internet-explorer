import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import LoadingCircle from "@/components/LoadingCircle";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import MemoryViewButtonWrapper from "./buttons/MemoryViewButtonWrapper";
import Head from "next/head";
import { currentTrip, currentTripMemories, getIndividualTrip, getAllMemories } from "@/modules/Data";
import Splash from "@/pages";

export default function IndividualTrip({ tripID, router }) {
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
          const token = await getToken({ template: "codehooks" });
          
          let curTrip = await getIndividualTrip(token, tripID);
          if (!curTrip) {
            router.push("/404");
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
          const token = await getToken({ template: "codehooks" });

          let curMemories = await getAllMemories(token, tripID);
          if (!curMemories) {
            router.push("/404");
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
        <SignedIn>
          <Head>
            <title>{trip.tripName}</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Header 
            title={trip.tripName}
            back={true}
            prevUrl="/trips"
          />
          {loadingMemories ? (
            <LoadingCircle></LoadingCircle>
          ) : (
            <>
              <CategoryButtonWrapper day="All Days" curCategory="All Categories" trip={trip} tripMemories={tripMemories} router={router}></CategoryButtonWrapper>
              <MemoryViewButtonWrapper tripMemories={tripMemories}></MemoryViewButtonWrapper>
              <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} tripMemories={tripMemories} setTripMemories={setTripMemories} router={router}></TripMemoryWrapper>
            </>
          )}
        </SignedIn>
        <SignedOut>
          <Splash></Splash>
        </SignedOut>
      </>
    );
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}
