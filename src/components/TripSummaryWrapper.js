import React, { useState } from "react";
import Modal from "react-modal";
import TripSummary from "./TripSummary";
import { useAuth } from "@clerk/nextjs";

Modal.setAppElement("body");

export default function TripSummaryWrapper({ trip, tripMemories }) {
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
        className="float-right right-4 sticky bottom-4 ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
        onClick={openModal}
      >
        Trip Summary
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel=" Modal"
      >
        <TripSummary
          className="mb-20"
          trip={trip}
          tripMemories={tripMemories}
          closeModal={closeModal}
        /> 
      </Modal>
    </>
  );
}