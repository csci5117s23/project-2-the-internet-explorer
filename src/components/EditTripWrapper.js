const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const backend_base = 'http://localhost:3002'; // Use for codehooks localserver dev.

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@clerk/clerk-react";
import EditTrip from "./EditTrip";
import DeleteTrip from "./DeleteTrip";
import { updateCurrentTrip, updateTripsData } from "@/modules/Data";

Modal.setAppElement("body");

export default function EditTripWrapper({ tripID, tripName, startMonth, startYear, description, allTrips, setAllTrips }) {
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
      if(editedTrip) {
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
            console.log('Success after update: ', result);
            updateCurrentTrip(result);

            // Update the allTrips state variable in somewhat real time. Has to wait for the
            // patch request to complete.
            // Can't update it above the database request in case all the data isn't full, and 
            // to ensure the database request works properly.
            let mutableAllTrips = [...allTrips];
            let originalTrip = mutableAllTrips.find(trip => trip._id === tripID);
            let origMonth = originalTrip.startMonth;
            let origYear = originalTrip.startYear;
            let tripIndex = mutableAllTrips.indexOf(originalTrip);
            mutableAllTrips[tripIndex] = result; // Update the index of the original trip.

            if (origMonth != result.startMonth || origYear != result.startYear) {
              // Resort the trips list since the year or month changed.
              mutableAllTrips.sort((a, b) => {
                // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474
                if (a.startYear === b.startYear) {
                  return a.startMonth < b.startMonth ? -1 : 1;
                } else {
                  return a.startYear < b.startYear ? -1 : 1;
                }
              });
            }
            updateTripsData(mutableAllTrips);
            setAllTrips(mutableAllTrips);

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
        <button 
          onClick={closeModal}
          className="px-4 py-2 font-semibold text-m bg-gray-400 border-black text-white rounded-full shadow-sm"
        >Close</button>
        <DeleteTrip tripID={tripID} tripName={tripName} closeModal={closeModal} allTrips={allTrips} setAllTrips={setAllTrips}/>
      </Modal>
    </>
    );
  }