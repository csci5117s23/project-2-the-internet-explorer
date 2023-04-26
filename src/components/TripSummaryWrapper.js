const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TripSummary from "./TripSummary";
import { useAuth } from "@clerk/nextjs";
import styles from '../styles/TripView.module.css'

Modal.setAppElement("body");

export default function TripSummaryWrapper({ parentId, tripMemories, setTripMemories}) {

  const [modalIsOpen, setIsOpen] = useState(false);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className={"float-right right-4 sticky bottom-4 ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"}
        onClick={openModal}
      >Trip Summary
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel=" Modal"
      >
        
        <TripSummary 
            parentId={parentId}
            tripMemories={tripMemories}
            setTripMemories={setTripMemories}
        />
        
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}