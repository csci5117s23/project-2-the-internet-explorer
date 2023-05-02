import React from "react";
import MemoryViewButton from "./MemoryViewButton";
import styles from "../../styles/TripView.module.css";

export default function MemoryViewButtonWrapper({ tripMemories }) {
  let memoriesList = tripMemories.map(
    (memory) => (
      <MemoryViewButton 
        key={memory._id}
        tripID={memory.parentTripId}
        memoryID={memory._id}
        title={memory.title}
        image={memory.image}
      />
    )
  );

  return (
    <div className={`${styles.dayButtonGroup} flex flex-wrap space-y-6`}>
      <br></br>
      {memoriesList}
    </div>
  );
}