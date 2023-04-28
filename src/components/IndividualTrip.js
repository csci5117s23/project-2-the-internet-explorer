const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import CategoryButton from "@/components/buttons/CategoryButton";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import { useRouter } from "next/router";
import styles from '../styles/TripView.module.css';
import DayViewButton from "@/components/buttons/DayViewButton";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import LoadingCircle from "@/components/LoadingCircle";
import CategoryButtonWrapper from "./buttons/CategoryButtonWrapper";
import DayViewButtonWrapper from "./buttons/DayViewButtonWrapper";
import MemoryViewButtonWrapper from "./buttons/MemoryViewButtonWrapper";

export default function IndividualTrip({ trip, loadingMemories, tripMemories, setTripMemories, router }) {
  if (trip) {
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
            {/* <DayViewButtonWrapper tripID={trip._id} router={router} tripMemories={tripMemories} setTripMemories={setTripMemories}></DayViewButtonWrapper> */}
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
