import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useAuth } from "@clerk/nextjs";
import MemoryEditButton from "./MemoryEditButton";
import MemoryDeleteButton from "./MemoryDeleteButton";
Modal.setAppElement("body");

import { updateMemories, updateMemory } from "@/modules/Data";

export default function MemoryEditButtonWrapper({ router, curMemory, setCurMemory, tripMemories, setTripMemories, calculateIndices }) {
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

            const result = await updateMemory(token, curMemory._id, updatedMemory);
            if (!result) {
              router.push("/404");
              return;
            }
            setCurMemory(result);

            // Re-sort the memories list in case the category or date got updated.
            let tripMemoriesCopy = [...tripMemories];
            let memory = tripMemoriesCopy.find(memory => memory._id === curMemory._id);
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

            // Re-find the index after sort so the cycling doesn't get messed up.
            memory = tripMemoriesCopy.find(memory => memory._id === curMemory._id);
            memIndex = tripMemoriesCopy.indexOf(memory);
            calculateIndices(memIndex);

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
        className="px-4 py-2 sm:px-6 sm:py-3 sm:text-lg ml-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
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
          setDataUrl={setDataUrl}
          curMemory={curMemory}
        />

        
        <MemoryDeleteButton
          memoryID={curMemory._id}
          title={curMemory.title}
          router={router}
          tripid={curMemory.parentTripId}
        ></MemoryDeleteButton>
      </Modal>
    </>
  );
}
