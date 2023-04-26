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
  const [editedTrip, setEditedTrip] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }
  
  useEffect(() => {
    const editTrip = async () => {
      if(editedTrip){
        if (userId) {
          try {
            const token = await getToken({template: "codehooks"});
            
            const response = await fetch(backend_base + `/tripFolders/${tripID}`, {
              'method': 'PATCH',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify(editedTrip),
            });
            const result = await response.json();
            console.log('Success: ', result);
            setEditedTrip(null);
          }
          catch (error) {
            console.error('Error: ', error);
          }
        }
      }
    };
    editTrip();
  }, [isLoaded, editedTrip]);
  
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
          editTrip={setEditedTrip}
          closeModal={closeModal}
          tripName={tripName}
          startMonth={startMonth}
          startYear={startYear}
          description={description}
        />
        <button 
          onClick={closeModal}
          className="px-2 py-2 font-semibold text-m bg-gray-400 border-black text-white rounded-full shadow-sm"
        >Close</button>
        <DeleteTrip tripID={tripID} tripName={tripName} closeModal={closeModal}/>
      </Modal>
    </>
    );
  }