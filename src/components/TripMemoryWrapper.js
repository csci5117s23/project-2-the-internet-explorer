const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TripMemory from "./TripMemory";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/TripMemory.module.css';
import { useAuth } from "@clerk/nextjs";

Modal.setAppElement("body");

export default function TripMemoryWrapper({ parentId }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newMemory, setNewMemory] = useState(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const addNewMemory = async () => {
      if (newMemory) { // Only run if newMemory is defined.
        if (userId) {
          try {
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(backend_base + '/tripMemories', {
              'method': 'POST',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify(newMemory)
            });

            const result = await response.json();
            console.log('Success: ', result);

            // TODO: Update a state variable to possibly update the day-by-day view
            // TODO: in real time.
          } catch (error) {
            console.error('Error: ', error);
          }
        }
      }
    }
    addNewMemory();
  }, [isLoaded, newMemory]);

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
        />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}