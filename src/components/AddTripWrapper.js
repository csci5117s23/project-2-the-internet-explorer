import React, { useState } from "react";
import Modal from "react-modal";
import AddTrip from "./AddTrip";

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
        className="ml-3 px-2 py-2 font-semibold text-m bg-cyan-500 text-white rounded-full shadow-sm"
        id="addTrip"
        onClick={openModal}
      >
        Add Trip
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