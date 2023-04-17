import React, { useState } from "react";
import Modal from "react-modal";
import TripMemory from "./TripMemory";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/TripMemory.module.css';

Modal.setAppElement("body");

export default function TripMemoryWrapper() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        <TripMemory />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}