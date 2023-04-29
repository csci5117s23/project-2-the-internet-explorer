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
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import MemoryDeleteButton from "./buttons/MemoryDeleteButton";
import EditMemoryWrapper from "./buttons/MemoryEditButtonWrapper";
import styles from "../styles/TripMemory.module.css";
Modal.setAppElement("body");

const imageScales = [
  "50vw",
  "55vw",
  "60vw",
  "65vw",
  "70vw",
  "75vw",
  "80vw",
  "85vw",
  "90vw",
];

export default function IndividualMemory({
  trip,
  memoryID,
  filter,
  params,
  router,
  tripMemories,
  setTripMemories,
}) {

  // const [memory, setMemory] = useState(null);
  // const [loadingMemory, setLoadingMemory] = useState(true);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [curMemory, setCurMemory] = useState(null);
  const [curIndex, setCurIndex] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (tripMemories) {
      // let memory = tripMemories.find(memory => memory._id === memoryID);
      let memoryIndex = tripMemories.findIndex(memory => memory._id === memoryID);
      setCurIndex(memoryIndex);
      
      // Set the index for the previous trip in the list.
      if (memoryIndex <= 0) {
        setPrevIndex(tripMemories.length - 1);
      } else {
        setPrevIndex(memoryIndex - 1);
      }

      // Set the index for the next trip in the list.
      if (memoryIndex >= tripMemories.length - 1) {
        setNextIndex(0);
      } else {
        setNextIndex(memoryIndex + 1);
      }

      setCurMemory(tripMemories[memoryIndex]);
    }
  }, [tripMemories, router]);

  // useEffect(() => {
  //   if (curIndex !== null) {
  //     setCurMemory(tripMemories[curIndex]);
  //   }
  // }, [curIndex]);

  // console.log('cur index: ', curIndex);

  function constructCycleUrl(memoryID, tripID) {
    let url = '';
    if (filter === 'category') {
      // No need for error checking here since it gets error checked before, which 
      // would occur prior to this function running.
      let category = params.get('category');
      url = `/trips/${tripID}/category/${memoryID}?category=${category}`;
      if (params.has('day')) {
        url += `&day=${params.get('day')}`;
      }
    } else if (filter === 'day') {
      let day = params.get('day');
      url = `/trips/${tripID}/day/${memoryID}?category=${category}`;
      if (params.has('category')) {
        url += `&category=${params.get('category')}`;
      }
    } else if (filter === 'memory') {
      url = `/trips/${tripID}/memory/${memoryID}`;
    }

    return url;
  }
  

  if (curMemory && trip) {
    // console.log('cur index: ', curIndex);
    // console.log('memory id: ', curMemory._id);
    // console.log('previous memory: ', tripMemories[curIndex - 1]._id);
    // console.log('next memory: ', tripMemories[curIndex + 1]._id);
    let prevUrl = "";
    if (filter === "category") {
      if (!params.has("category")) {
        router.push("/404"); // Search query missing.
        return;
      }
      let category = params.get("category");
      prevUrl = `/trips/${trip._id}/category?category=${category}`;
      if (params.has('day')) {
        prevUrl += `&day=${params.get('day')}`;
      }
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
    } else if (filter === "memory") {
      prevUrl = `/trips/${trip._id}`;
    } else {
      // Handles any unaccepted filters.
      router.push('/404');
      return;
    }

    return (
      <>
        <Header title={trip.tripName} back={true} prevUrl={prevUrl} />

        

        <div className={`${styles.memoryDiv} grid gap-1 place-items-center`}>
          <div
            className="flex flex-col bg-blue-200 rounded-lg shadow-sm p-4 mt-2 mb-4"
            style={{ width: "90vw" }}
          >
            
            <h1 className="flex justify-between text-lg font-bold mb-2 bg-blue-300 p-3 m-1 rounded-md text-center">
              {/* <Link href={constructCycleUrl(tripMemories[curIndex - 1]._id, trip._id)}>  */}
              <Link href={`/trips/${trip._id}/memory/${tripMemories[prevIndex]._id}`}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ float: "left", fontSize: "1.5em" }} /> 
              </Link>
              {curMemory.title}
              {/* <Link href={constructCycleUrl(tripMemories[curIndex + 1]._id, trip._id)}>  */}
              <Link href={`/trips/${trip._id}/memory/${tripMemories[nextIndex]._id}`}>
                <FontAwesomeIcon icon={faChevronRight} style={{ float: "right", fontSize: "1.5em" }} /> 
              </Link>
            </h1>
            
          </div>
          <div className="p-3 px-4 rounded-md bg-gray-200 mr-7 ml-7">
            <div className="flex p-2 justify-center">
              <img
                // style={{ width: imageScales[scaleIndex] }}
                className={`${styles.imgContainer} rounded-md`}
                src={curMemory.image}
                alt={curMemory.title}
                style={{ width: "90vw", height: "auto" }}
              />
            </div>
          </div>
          <div
            className="flex flex-col bg-gray-200 rounded-lg shadow-sm p-4 mt-2 mb-4"
            style={{ width: "90vw" }}
          >
            <h1 className="text-lg font-bold mb-2 bg-gray-300 p-3 m-1 rounded-md">
              Description
            </h1>
            <span className="mt-2 bg-gray-300 p-3 m-1">{curMemory.description}</span>
          </div>
          <div className="flex p-2">
            <div className="rounded-lg bg-blue-400 text-white p-2 mr-2">
              {moment(curMemory.date).format("YYYY-MM-DD")}
            </div>
            <div className="rounded-lg bg-sky-300 text-white p-2 mr-2">
              {curMemory.category.charAt(0).toUpperCase() + curMemory.category.slice(1)}
            </div>
          </div>

          <div></div>
          <div
            style={{ width: "90vw" }}
            className="flex-col bg-blue-200 flex justify-center rounded-md"
          >
            <h1 className="bg-blue-300 text-white text-lg font-bold m-5 mb-0 p-3 rounded-md">
              Location
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 bg-blue-300 p-5 m-5 rounded-md">
              <div className="text-white text-lg font-bold bg-sky-400 p-2 rounded-md">
                {curMemory.location}
              </div>
              <MemoryMap
                lat={curMemory.latitude}
                lng={curMemory.longitude}
              ></MemoryMap>
            </div>
          </div>

          <div>
            <EditMemoryWrapper
              parentId={trip._id}
              startDate={trip.startDate}
              category={curMemory.category}
              date={curMemory.date}
              memoryID={memoryID}
              title={curMemory.title}
              router={router}
              tripid={trip._id}
              curMemory={curMemory}
              setCurMemory={setCurMemory}
              tripMemories={tripMemories}
              setTripMemories={setTripMemories}
            ></EditMemoryWrapper>
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}
