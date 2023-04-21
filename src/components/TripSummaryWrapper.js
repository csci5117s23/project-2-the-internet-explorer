const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TripSummary from "./TripSummary";
import { useAuth } from "@clerk/nextjs";
import styles from '../styles/TripView.module.css'

Modal.setAppElement("body");

export default function TripSummaryWrapper() {

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
        className={styles.buttonGroup + "flex flex-wrap space-y-2 space-x-2"}
        onClick={openModal}
      > View Trip Summary
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel=" Modal"
      >
        
        <TripSummary />
        
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}