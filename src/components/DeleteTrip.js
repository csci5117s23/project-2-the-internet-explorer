import React, { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@clerk/nextjs";
import Modal from "react-modal";
import { deleteDesiredTrip, deleteTripMemories, updateTripsData } from "@/modules/Data";

export default function DeleteTrip({ tripID, tripName, closeModal, allTrips, setAllTrips, router }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [deleteModal, setDeleteModal] = useState(false);
    
  async function deleteTrip() {
    try {
      if (userId) {
        const token = await getToken({ template: "codehooks" });

        // Delete the trip.
        const tripResult = await deleteDesiredTrip(token, tripID);
        if (!tripResult) {
          router.push("/404");
          return;
        }

        // Remove the deleted trip from the cache and the state.
        let mutableTrips = [...allTrips];
        const index = mutableTrips.findIndex(trip => trip._id === tripResult._id);
        mutableTrips.splice(index, 1);
        updateTripsData(mutableTrips);
        setAllTrips(mutableTrips);

        // Delete the memories in that trip.
        const memoryResult = await deleteTripMemories(token, tripID);
        if (!memoryResult) {
          router.push("/404");
          return;
        }
        alert("Successfully deleted trip");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  function handleDeleteTripButton() {
    deleteTrip();
    closeModal();
  }

  function openDeleteTripModal() {
    setDeleteModal(true);
  }

  function closeDeleteTripModal() {
    setDeleteModal(false);
  }

  return (
    <>
      <button
        type="button"
        className="float-right px-4 py-2 font-semibold text-m bg-red-500 text-white rounded-full shadow-sm"
        onClick={openDeleteTripModal}
      >
        <FontAwesomeIcon icon={faTrash} />
        &nbsp; Delete
      </button>
      <Modal
        isOpen={deleteModal}
        onRequestClose={closeDeleteTripModal}
        contentLabel="Trip Delete Modal"
      >
        <button onClick={closeDeleteTripModal}>Cancel</button>
        <div className="grid place-items-center mt-20">
          <div className="text-lg">Are you sure you want to delete the trip</div>
          <div className="text-lg"><em>"{tripName}"</em>?</div>
          <button
            className="m-10 px-2 py-2 font-semibold text-m bg-red-500 text-white rounded-full shadow-sm"
            onClick={handleDeleteTripButton}
          >
            <FontAwesomeIcon icon={faTrash} />
            &nbsp; Delete
          </button>
        </div>
      </Modal>
    </>
  );
}