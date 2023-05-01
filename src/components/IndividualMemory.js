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
import Head from "next/head";
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

import { currentTrip, currentMemory, currentTripMemories, getIndividualTrip, getAllMemories, getIndividualMemory } from '@/modules/Data';

export default function IndividualMemory({
  tripID,
  memoryID,
  filter,
  day,
  category,
  router,
}) {

  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);
  const [memory, setMemory] = useState(null);
  const [loadingMemory, setLoadingMemory] = useState(true);

  // const [memory, setMemory] = useState(null);
  // const [loadingMemory, setLoadingMemory] = useState(true);
  const [scaleIndex, setScaleIndex] = useState(0);
  // const [curMemory, setCurMemory] = useState(null);
  const [curIndex, setCurIndex] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);
  const [loadingIndices, setLoadingIndices] = useState(true);

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
        if (currentTripMemories.length > 0 && currentTripMemories[0].parentTripId === tripID) {
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

  useEffect(() => {
    async function findMemory() {
      console.log('trip memories state: ', tripMemories);
      console.log('trip memories cache: ', currentTripMemories);
      if (userId) {
        if (!loadingMemories) {
          if (currentMemory && currentMemory._id === memoryID) {
            console.log('memory is cached: ', currentMemory);
            let curIndex = tripMemories.findIndex(memory => memory._id === memoryID);
            console.log('cur index: ', curIndex);
            calculateIndices(curIndex);

            setMemory(currentMemory);
            setLoadingMemory(false);
          } else {
            const token = await getToken({ template: 'codehooks' });

            let curMemory = await getIndividualMemory(token, memoryID);
            if (!curMemory) {
              router.push('/404');
              return;
            }

            let curIndex = tripMemories.findIndex(memory => memory._id === memoryID);
            console.log('cur index: ', curIndex);
            calculateIndices(curIndex);

            setMemory(curMemory);
            setLoadingMemory(false);
          }
        }
      }
    }
    findMemory();
  }, [isLoaded, memoryID, loadingMemories]);

  function calculateIndices(curIndex) {
    if (curIndex <= 0) {
      setPrevIndex(tripMemories.length-1);
    } else {
      setPrevIndex(curIndex - 1);
    }

    if (curIndex >= tripMemories.length-1) {
      setNextIndex(0);
    } else {
      setNextIndex(curIndex + 1);
    }
  }

  // useEffect(() => {
  //   function findNextPrev() {
  //     if (!loadingMemories && !loadingMemory) {
  //       let curIndex = tripMemories.findIndex(memory => memory._id === memoryID);
  //       if (curIndex <= 0) {
  //         setPrevIndex(tripMemories.length - 1);
  //       } else {
  //         setPrevIndex(curIndex - 1);
  //       }

  //       if (curIndex >= tripMemories.length -1) {
  //         setNextIndex(0);
  //       } else {
  //         setNextIndex(curIndex + 1);
  //       }
  //     }
  //   }
  //   findNextPrev();
  // }, [loadingMemories, loadingMemory, router]);

  // useEffect(() => {
  //   if (tripMemories) {
  //     // let memory = tripMemories.find(memory => memory._id === memoryID);
  //     let memoryIndex = tripMemories.findIndex(memory => memory._id === memoryID);
  //     setCurIndex(memoryIndex);
      
  //     // Set the index for the previous trip in the list.
  //     if (memoryIndex <= 0) {
  //       setPrevIndex(tripMemories.length - 1);
  //     } else {
  //       setPrevIndex(memoryIndex - 1);
  //     }

  //     // Set the index for the next trip in the list.
  //     if (memoryIndex >= tripMemories.length - 1) {
  //       setNextIndex(0);
  //     } else {
  //       setNextIndex(memoryIndex + 1);
  //     }

  //     setCurMemory(tripMemories[memoryIndex]);
  //   }
  // }, [tripMemories, router]);

  // useEffect(() => {
  //   if (curIndex !== null) {
  //     setCurMemory(tripMemories[curIndex]);
  //   }
  // }, [curIndex]);

  // console.log('cur index: ', curIndex);

  // function constructCycleUrl(memoryID, tripID) {
  //   let url = '';
  //   if (filter === 'category') {
  //     // No need for error checking here since it gets error checked before, which 
  //     // would occur prior to this function running.
  //     let category = params.get('category');
  //     url = `/trips/${tripID}/category/${memoryID}?category=${category}`;
  //     if (params.has('day')) {
  //       url += `&day=${params.get('day')}`;
  //     }
  //   } else if (filter === 'day') {
  //     let day = params.get('day');
  //     url = `/trips/${tripID}/day/${memoryID}?category=${category}`;
  //     if (params.has('category')) {
  //       url += `&category=${params.get('category')}`;
  //     }
  //   } else if (filter === 'memory') {
  //     url = `/trips/${tripID}/memory/${memoryID}`;
  //   }

  //   return url;
  // }
  

  if (!loadingMemories && !loadingMemory && !loadingTrip) {
    console.log('prev index: ', prevIndex);
    console.log('next index: ', nextIndex);
    console.log('memories: ', tripMemories);

    let prevUrl = `/trips/${trip._id}`;
    // if (filter === "category") {
    //   if (!category) {
    //     router.push("/404"); // Search query missing.
    //     return;
    //   }
    //   prevUrl = `/trips/${trip._id}/category?category=${category}`;
    //   if (day) {
    //     prevUrl += `&day=${day}`;
    //   }
    // } else if (filter === "day") {
    //   if (!day) {
    //     router.push("/404"); // Search query missing.
    //     return;
    //   }
    //   prevUrl = `/trips/${trip._id}/day?day=${day}`;
    //   if (category) {
    //     console.log("has category param");
    //     prevUrl += `&category=${category}`;
    //   }
    // } else if (filter === "memory") {
    //   prevUrl = `/trips/${trip._id}`;
    // } else {
    //   // Handles any unaccepted filters.
    //   router.push('/404');
    //   return;
    // }

    return (
      <>
        <Head>
          <title>{trip.tripName}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header title={trip.tripName} back={true} prevUrl={prevUrl} />

        

        <div className={`${styles.memoryDiv} grid gap-1 place-items-center`}>
          <div
            className="flex flex-col bg-blue-300 rounded-lg shadow-sm p-4 mt-2 mb-4 text-white"
            style={{ width: "90vw" }}
          >
            
            <h1 className="flex justify-between text-lg font-bold mb-2 bg-blue-400 p-3 m-1 rounded-md text-center">
              <Link href={`/trips/${trip._id}/memory/${tripMemories[prevIndex]._id}`}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ float: "left", fontSize: "1.5em" }} /> 
              </Link>
              {memory.title}
              <Link href={`/trips/${trip._id}/memory/${tripMemories[nextIndex]._id}`}>
                <FontAwesomeIcon icon={faChevronRight} style={{ float: "right", fontSize: "1.5em" }} /> 
              </Link>
            </h1>
            
          </div>

          <div className="flex p-2">
            <div className="rounded-lg bg-blue-400 text-white p-2 mr-2">
              {moment(memory.date).format("YYYY-MM-DD")}
            </div>
            <div className="rounded-lg bg-sky-300 text-white p-2 mr-2">
              {memory.category.charAt(0).toUpperCase() + memory.category.slice(1)}
            </div>
          </div>

          <div className="p-3 px-4 rounded-md bg-gray-200 mr-7 ml-7">
            <div className="flex p-2 justify-center">
              <img
                // style={{ width: imageScales[scaleIndex] }}
                className={`${styles.imgContainer} rounded-md`}
                src={memory.image}
                alt={memory.title}
                style={{ width: "90vw", height: "auto" }}
              />
            </div>
          </div>
          {memory.description ? (
            <div
              className="flex flex-col bg-emerald-300 text-white rounded-lg shadow-sm p-4 mt-2 mb-4"
              style={{ width: "90vw" }}
            >
              <h1 className="text-lg font-bold mb-2 bg-emerald-400 p-3 m-1 rounded-md">
                Description
              </h1>
              <span className="mt-2 bg-emerald-400 p-3 m-1">{memory.description}</span>
            </div>
          ) : (
            <></>
          )}
          

          <div></div>
          <div
            style={{ width: "90vw" }}
            className="flex-col bg-blue-300 flex justify-center rounded-md"
          >
            <h1 className="bg-blue-400 text-white text-lg font-bold m-5 mb-0 p-3 rounded-md">
              Location
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 bg-blue-400 p-5 m-5 rounded-md">
              <div className="text-white text-lg font-bold bg-sky-400 p-2 rounded-md">
                {memory.location}
              </div>
              <MemoryMap
                lat={memory.latitude}
                lng={memory.longitude}
              ></MemoryMap>
            </div>
          </div>

          <div>
            <EditMemoryWrapper
              parentId={trip._id}
              startDate={trip.startDate}
              category={memory.category}
              date={memory.date}
              memoryID={memoryID}
              title={memory.title}
              router={router}
              tripid={trip._id}
              curMemory={memory}
              setCurMemory={setMemory}
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
