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
        try {
          if (userId) {
            const token = await getToken({template: "codehooks"});
            
            const response = await fetch(backend_base + `tripFolders/${tripID}`, {
              'method': 'PUT',
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
        }
        catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    editTrip();
  }, [isLoaded, editedTrip]);
  
  return (
    <>
      <button
        type="button"
        className="text-white hover:text-black rounded-full  px-3 pb-2 pt-2.5 text-s leading-normal  transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200  "
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
        <button onClick={closeModal}>Close</button>
        <DeleteTrip tripID={tripID} tripName={tripName} closeModal={closeModal}/>
      </Modal>
    </>
    );
  }