const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingCircle from "./LoadingCircle";
import Header from "./Header";
import MemoryMap from "./MemoryMap";
import moment from "moment";
import Modal from "react-modal";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MemoryDeleteButton from "./buttons/MemoryDeleteButton";
import MemoryEditButton from "./buttons/MemoryEditButton";
import styles from '../styles/TripMemory.module.css';
Modal.setAppElement("body");

const imageScales = ['50vw', '55vw', '60vw', '65vw', '70vw', '75vw', '80vw', '85vw', '90vw'];

export default function IndividualMemory({
  trip,
  memoryID,
  filter,
  params,
  router,
}) {
  const [memory, setMemory] = useState(null);
  const [loadingMemory, setLoadingMemory] = useState(true);
  const [scaleIndex, setScaleIndex] = useState(0);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const getIndividualMemory = async () => {
      try {
        setLoadingMemory(true);
        if (userId) {
          const token = await getToken({ tempalte: "codehooks" });

          const response = await fetch(
            backend_base + `/tripMemories/${memoryID}`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          if (!response.ok) {
            router.push("/404");
            return;
          }
          const data = await response.json();
          setMemory(data);
          console.log(data);
          setLoadingMemory(false);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    getIndividualMemory();
  }, [isLoaded, router]);

  function handleIndex(e) {
    e.preventDefault();

    let newIndex = e.target.value;
    if (newIndex) {
      setScaleIndex(newIndex);
    } else {
      setScaleIndex(0);
    }
  }

  let prevUrl = "";
  if (filter === "category") {
    if (!params.has("category")) {
      router.push("/404"); // Search query missing.
      return;
    }
    let category = params.get("category");
    prevUrl = `/trips/${trip._id}/category?category=${category}`;
  } else if (filter === "day") {
    if (!params.has("day")) {
      router.push("/404"); // Search query missing.
      return;
    }
    let day = params.get("day");
    prevUrl = `/trips/${trip._id}/day?day=${day}`;
    if (params.has("category")) {
      console.log("has category param");
      prevUrl += `&category=${params.get("category")}`;
    }
  } else {
    // Handle unaccepted filters.
    prevUrl = `/trips/${trip._id}`;
  }

  return loadingMemory ? (
    <LoadingCircle></LoadingCircle>
  ) : (
    <>
      <Header title={memory.title} back={true} prevUrl={prevUrl} />
      <div className={`${styles.memoryDiv} grid gap-1 place-items-center`}>
        <label for="imgScale">Resize Image:  
          <input type="range" className={styles.imgScale} id="imgScale" name="imgScale" min="0" max="8" onChange={handleIndex} defaultValue="0"></input>
        </label>
        <div className="flex p-2 justify-center">
          <TransformWrapper>
            <TransformComponent>
              <img
                style={{ width: imageScales[scaleIndex]}}
                // className={styles.imgContainer}
                src={memory.image}
                alt={memory.title}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        
        <div className="flex p-2">
          <div className="rounded-lg bg-blue-400 text-white p-2 mr-2">
            {moment(memory.date).format("YYYY-MM-DD")}
          </div>
          <div className="rounded-lg bg-sky-400 text-white p-2 mr-2">
            {memory.category}
          </div>
        </div>
        <div>
          <MemoryMap lat={memory.latitude} lng={memory.longitude}></MemoryMap>
        </div>
        {/* <div>description</div> */}
        <div
          className="flex justify-center bg-blue-100 border-4 border-blue-300 rounded-lg shadow-sm p-4 mt-2 mb-4"
          style={{ width: "90vw" }}
        >
          {memory.description}
        </div>
        <div>
          {/* edit and delete buttons here */}
          <MemoryDeleteButton
            memoryID={memoryID}
            title={memory.title}
            router={router}
            tripid={trip._id}
          ></MemoryDeleteButton>
          <MemoryEditButton
            memoryID={memoryID}
            title={memory.title}
            router={router}
            tripid={trip._id}
          ></MemoryEditButton>
        </div>
      </div>
    </>
  );
}
