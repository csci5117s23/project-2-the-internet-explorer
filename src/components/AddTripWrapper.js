import React, { useState } from "react";
import Modal from "react-modal";
import AddTrip from "./AddTrip";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Modal.setAppElement("body");

export default function AddTripWrapper() {
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
        className="absolute right-12 mt-6 ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
        id="addTrip"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faPlus} />Add Trip
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Trip Modal"
      >
        <AddTrip />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}