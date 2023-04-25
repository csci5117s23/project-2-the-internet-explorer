const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@clerk/clerk-react";
import EditTrip from "./EditTrip";
import DeleteTrip from "./DeleteTrip";

Modal.setAppElement("body");

export default function EditTripWrapper({ tripID, tripName, startMonth, startYear, description }) {
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
        type="button"
        className="inline-block border border-gray text-black rounded-full bg-neutral-50 border-black-50 px-6 pb-2 pt-2.5 text-s leading-normal shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
        onClick={openModal}
      >
         <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Trip Modal"
      >
        <EditTrip
          tripID={tripID}
          closeModal={closeModal}
          tripName={tripName}
          startMonth={startMonth}
          startYear={startYear}
          description={description}
        />
        <button onClick={closeModal}>Close</button>
        <DeleteTrip tripID={tripID} closeModal={closeModal}/>
      </Modal>
    </>
  );
}