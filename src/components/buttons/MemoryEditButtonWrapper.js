const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/TripMemory.module.css";
import { useAuth } from "@clerk/nextjs";
import MemoryEditButton from "./MemoryEditButton";
Modal.setAppElement("body");

export default function EditMemoryWrapper({
  parentId,
  startDate,
  category,
  date,
  ori_memory,
  load_memory,
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
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(
              backend_base + `/tripMemories/${ori_memory._id}`,
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
            setNewMemory(null);
            setDataUrl("");
            load_memory();
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
        className="px-2 py-2 ml-2 font-semibold text-m bg-custom-blue text-white rounded-lg shadow-sm"
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
          ori_memory={ori_memory}
        />

        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}
