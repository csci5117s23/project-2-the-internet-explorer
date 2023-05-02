import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingCircle from "./LoadingCircle";
import Header from "./Header";
import MemoryMap from "./MemoryMap";
import moment from "moment";
import Modal from "react-modal";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import MemoryEditButtonWrapper from "./buttons/MemoryEditButtonWrapper";
import styles from "../styles/TripMemory.module.css";
import { currentTrip, currentMemory, currentTripMemories, getIndividualTrip, getAllMemories, getIndividualMemory } from "@/modules/Data";

Modal.setAppElement("body");

export default function IndividualMemory({ tripID, memoryID, router }) {
  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [tripMemories, setTripMemories] = useState(null);
  const [loadingMemories, setLoadingMemories] = useState(true);
  const [memory, setMemory] = useState(null);
  const [loadingMemory, setLoadingMemory] = useState(true);
  const [prevIndex, setPrevIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);

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

  useEffect(() => {
    async function findMemory() {
      if (userId) {
        if (!loadingMemories) {
          if (currentMemory && currentMemory._id === memoryID) {
            let curIndex = tripMemories.findIndex(memory => memory._id === memoryID);
            calculateIndices(curIndex);

            setMemory(currentMemory);
            setLoadingMemory(false);
          } else {
            const token = await getToken({ template: "codehooks" });

            let curMemory = await getIndividualMemory(token, memoryID);
            if (!curMemory) {
              router.push("/404");
              return;
            }

            let curIndex = tripMemories.findIndex(memory => memory._id === memoryID);
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
  

  if (!loadingMemories && !loadingMemory && !loadingTrip) {
    let prevUrl = `/trips/${trip._id}`;

    return (
      <>
        <Head>
          <title>{trip.tripName}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header 
          title={trip.tripName} 
          back={true} 
          prevUrl={prevUrl} 
        />

        <div className={`${styles.memoryDiv} grid gap-2 sm:gap-4 place-items-center`}>
          <div
            className="flex flex-col bg-blue-300 rounded-lg shadow-sm p-4 mt-2 mb-4 text-white"
            style={{ width: "90vw" }}
          >
            <h1 className="flex justify-between text-xl sm:text-2xl font-bold mb-2 bg-blue-400 p-3 m-1 rounded-md text-center">
              <Link href={`/trips/${trip._id}/memory/${tripMemories[prevIndex]._id}`}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ float: "left", fontSize: "1.5em" }} /> 
              </Link>
              {memory.title}
              <Link href={`/trips/${trip._id}/memory/${tripMemories[nextIndex]._id}`}>
                <FontAwesomeIcon icon={faChevronRight} style={{ float: "right", fontSize: "1.5em" }} /> 
              </Link>
            </h1>
          </div>

          <div className="flex p-2 text-md sm:text-lg">
            <div className="rounded-lg bg-blue-400 text-white p-2 mr-2">
              {moment(memory.date).format("YYYY-MM-DD")}
            </div>
            <div className="rounded-lg bg-sky-300 text-white p-2 mr-2">
              {memory.category.charAt(0).toUpperCase() + memory.category.slice(1)}
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 rounded-md bg-gray-200 mx-auto w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12">
            <img
              className={`${styles.imgContainer} rounded-md`}
              src={memory.image}
              alt={memory.title}
              style={{ objectFit: "cover", margin: "auto", width: "100%" }}
            />
          </div>
          {memory.description ? (
            <div
              className="flex flex-col bg-emerald-300 text-white rounded-lg shadow-sm p-4 mt-2 mb-4"
              style={{ width: "90vw" }}
            >
              <h1 className="text-lg font-bold mb-2 bg-emerald-400 p-3 m-1 rounded-md">
                Description
              </h1>
              <span className="mt-2 bg-emerald-400 p-3 m-1 rounded-md" style={{ whiteSpace: "pre-wrap"}}>{memory.description}</span>
            </div>
          ) : (
            <></>
          )}
          
          <div
            style={{ width: "90vw" }}
            className="flex-col bg-blue-300 flex justify-center rounded-md"
          >
            <h1 className="bg-blue-400 text-white text-lg font-bold m-5 mb-0 p-3 rounded-md">
              Location
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 bg-blue-400 p-5 m-5 rounded-md">
              <div className="text-white text-lg font-bold bg-blue-500 p-2 rounded-md">
                {memory.location}
              </div>
              <MemoryMap
                lat={parseFloat(memory.latitude)}
                lng={parseFloat(memory.longitude)}
              ></MemoryMap>
            </div>
          </div>

          <div>
            <MemoryEditButtonWrapper
              router={router}
              curMemory={memory}
              setCurMemory={setMemory}
              tripMemories={tripMemories}
              setTripMemories={setTripMemories}
              calculateIndices={calculateIndices}
            ></MemoryEditButtonWrapper>
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingCircle></LoadingCircle>
  }
}
