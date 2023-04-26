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

export default function IndividualTrip({ trip, tripMemories, setTripMemories, router }) {
  // const [tripDays, setTripDays] = useState({});
  // const [tripMemories, setTripMemories] = useState(null);

  return (
    <>
      <Header 
        title={trip.tripName}
        back={true}
        prevUrl='/trips'
        day="All Days"
      />
      <CategoryButtonWrapper tripID={trip._id} trip={trip} tripMemories={tripMemories} setTripMemories={setTripMemories}></CategoryButtonWrapper>
      <DayViewButtonWrapper tripID={trip._id} router={router} tripMemories={tripMemories} setTripMemories={setTripMemories}></DayViewButtonWrapper>
      <TripMemoryWrapper parentId={trip._id} startDate={trip.startDate} tripMemories={tripMemories} setTripMemories={setTripMemories}></TripMemoryWrapper>
    </>
  );
}