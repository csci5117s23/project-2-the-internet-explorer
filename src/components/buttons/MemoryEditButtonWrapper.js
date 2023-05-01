const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/TripMemory.module.css";
import { useAuth } from "@clerk/nextjs";
import MemoryEditButton from "./MemoryEditButton";
import MemoryDeleteButton from "./MemoryDeleteButton";
Modal.setAppElement("body");

import { updateCurrentMemory, updateMemories, updateMemory } from "@/modules/Data";

export default function EditMemoryWrapper(
  { parentId,
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
    setTripMemories }) {
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
            const token = await getToken({ template: "codehooks" });

            const result = await updateMemory(token, memoryID, updatedMemory);
            if (!result) {
              router.push('/404');
              return;
            }
            setCurMemory(result);

            // Re-sort the memories list in case the category or date got updated.
            let tripMemoriesCopy = [...tripMemories];
            let memory = tripMemoriesCopy.find(memory => memory._id === memoryID);
            let memIndex = tripMemoriesCopy.indexOf(memory);
            // Update the list of trip memories in real time.
            tripMemoriesCopy[memIndex] = result;
            tripMemoriesCopy.sort((a, b) => {
              if (a.category === b.category) {
                return a.date < b.date ? -1 : 1;
              } else {
                return a.category < b.category ? -1 : 1;
              }
            });
            updateMemories(tripMemoriesCopy); // Update the memories list cache.
            setTripMemories(tripMemoriesCopy); // Update the state variable.

            // Reset the state variables for the next update.
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
