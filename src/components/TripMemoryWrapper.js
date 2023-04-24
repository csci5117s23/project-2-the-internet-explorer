const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TripMemory from "./TripMemory";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/TripMemory.module.css';
import { useAuth } from "@clerk/nextjs";
import { LoadScript } from "@react-google-maps/api";
// const libraries = ["places"];

Modal.setAppElement("body");

export default function TripMemoryWrapper({ parentId, startDate, category, date, tripMemories, setTripMemories }) {
  // const MAP_API = process.env.NEXT_PUBLIC_MAP_API
  
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newMemory, setNewMemory] = useState(null);
  const [dataUrl, setDataUrl] = useState("");

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const addNewMemory = async () => {
      if (newMemory && dataUrl) { // Only run if newMemory and dataUrl are defined.
        if (userId) {
          try {
            let updatedMemory = newMemory;
            updatedMemory["image"] = dataUrl;
            console.log('updated memory: ', updatedMemory);
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(backend_base + '/addMemory', {
              'method': 'POST',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify(updatedMemory)
            });

            const result = await response.json();
            console.log('Success: ', result);
            setNewMemory(null);
            setDataUrl("");

            // Updates the state variable for what memories are displayed on the page when a new 
            // memories is added.
            setTripMemories(tripMemories.concat(result));

            // TODO: Update a state variable to possibly update the day-by-day view
            // TODO: in real time.
          } catch (error) {
            console.error('Error: ', error);
          }
        }
      }
    }
    addNewMemory();
  }, [isLoaded, newMemory, dataUrl]);

  return (
    <>
      <button
        className="bottom-5 float-right sticky right-12 px-4 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
        onClick={openModal}
      >
        <span className={styles.plusIcon}><FontAwesomeIcon icon={faPlus} /></span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Memory Modal"
      >
        
        <TripMemory 
          addMemory={setNewMemory}
          closeModal={closeModal}
          parentId={parentId}
          setDataUrl={setDataUrl}
          startDate={startDate}
          category={category}
          date={date}
        />
        
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}