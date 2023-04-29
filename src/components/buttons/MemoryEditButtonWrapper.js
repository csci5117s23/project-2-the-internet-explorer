const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const backend_base = 'http://localhost:3002'; // Use for codehooks localserver dev.

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/TripMemory.module.css";
import { useAuth } from "@clerk/nextjs";
import MemoryEditButton from "./MemoryEditButton";
import MemoryDeleteButton from "./MemoryDeleteButton";
Modal.setAppElement("body");

export default function EditMemoryWrapper({
  parentId,
  startDate,
  category,
  date,
  memoryID,
  title,
  router,
  tripid,
  curMemory,
  setCurMemory,
  tripMemories,
  setTripMemories
}) {
  // const MAP_API = process.env.NEXT_PUBLIC_MAP_API

  const [modalIsOpen, setIsOpen] = useState(false);
  const [newMemory, setNewMemory] = useState(null);
  const [dataUrl, setDataUrl] = useState("");

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const editMemory = async () => {
      if (newMemory && dataUrl) {
        // Only run if newMemory and dataUrl are defined.
        if (userId) {
          try {
            let updatedMemory = newMemory;
            updatedMemory["image"] = dataUrl;
            // setCurMemory(updatedMemory);
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(
              backend_base + `/tripMemories/${memoryID}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMemory),
              }
            );

            const result = await response.json();
            console.log("Success: ", result);
            setCurMemory(result);

            let tripMemoriesCopy = tripMemories;
            let memory = tripMemoriesCopy.find(memory => memory._id === memoryID);
            let memIndex = tripMemoriesCopy.indexOf(memory);
            // Update the list of trip memories in real time.
            tripMemoriesCopy[memIndex] = result;
            setTripMemories(tripMemoriesCopy);
            // console.log('mem index: ', memIndex);

            setNewMemory(null);
            setDataUrl("");
          } catch (error) {
            console.error("Error: ", error);
          }
        }
      }
    };
    editMemory();
  }, [isLoaded, newMemory, dataUrl]);

  // console.log('cur memory: ', curMemory);

  return (
    <>
      <button
        className="px-4 py-2 ml-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
        onClick={openModal}
      >
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Memory Modal"
      >
        <MemoryEditButton
          editMemory={setNewMemory}
          closeModal={closeModal}
          parentId={parentId}
          setDataUrl={setDataUrl}
          startDate={startDate}
          category={category}
          date={date}
          curMemory={curMemory}
        />

        <button 
          onClick={closeModal}
          className="px-4 py-2 font-semibold text-m bg-gray-400 border-black text-white rounded-full shadow-sm"
        >Close</button>
        <MemoryDeleteButton
            memoryID={memoryID}
            title={title}
            router={router}
            tripid={tripid}
          ></MemoryDeleteButton>
      </Modal>
    </>
  );
}
