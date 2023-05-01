const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import TripsList from "./TripsList";
import { useAuth } from "@clerk/clerk-react";
import LoadingCircle from "./LoadingCircle";

import { updateTripsData } from "@/modules/Data";


export default function TripsWrapper({ uploadedTrip, allTrips, setAllTrips }) {
  useEffect(() => {
    // Update allTrips with a new trip, then sort the new list by start date.
    const updateTrips = () => {
      if (uploadedTrip) {
        let mutableTrips = [...allTrips];
        mutableTrips = mutableTrips.concat(uploadedTrip);
        mutableTrips.sort((a, b) => {
          // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474
          if (a.startYear === b.startYear) {
            return a.startMonth < b.startMonth ? -1 : 1;
          } else {
            return a.startYear < b.startYear ? -1 : 1;
          }
        });
        updateTripsData(mutableTrips);
        setAllTrips(mutableTrips);
      }
    }
    updateTrips();
  }, [uploadedTrip]);

  return (
    <TripsList allTrips={allTrips} setAllTrips={setAllTrips}></TripsList>
  );
}