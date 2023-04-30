const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AddTrip from "./AddTrip";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@clerk/clerk-react";
import { addTrip } from "@/modules/Data";
import { useRouter } from "next/router";

Modal.setAppElement("body");

export default function AddTripWrapper({ setUploadedTrip }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newTrip, setNewTrip] = useState(null);
  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const addNewTrip = async () => {
      if (newTrip) { // Only run if newTrip is defined.
        if (userId) {
          try {
            const token = await getToken({ template: "codehooks" });

            const result = await addTrip(token, newTrip);
            if (!result) {
              router.push('/404');
              return;
            }

            setUploadedTrip(result);
          } catch (error) {
            console.error('Error: ', error);
          } 
        }
      }
    }
    addNewTrip();
  }, [isLoaded, newTrip]);

  return (
    <>
      <button
        className="float-right right-4 sticky bottom-4 mt-6 ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
        id="addTrip"
        onClick={openModal}
        style={{fontSize: "large"}}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Trip
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Trip Modal"
      >
        <AddTrip 
          addTrip={setNewTrip}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}