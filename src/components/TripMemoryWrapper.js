import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TripMemory from "./TripMemory";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/TripMemory.module.css';
import { useAuth } from "@clerk/nextjs";
import { addMemory, updateMemories } from "@/modules/Data";
import { useRouter } from "next/router";

Modal.setAppElement("body");

export default function TripMemoryWrapper({ parentId, category, date, tripMemories, setTripMemories }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newMemory, setNewMemory] = useState(null);
  const [dataUrl, setDataUrl] = useState("");

  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const addNewMemory = async () => {
      if (newMemory && dataUrl) { // Only run if newMemory and dataUrl are defined.
        if (userId) {
          try {
            let updatedMemory = newMemory;
            updatedMemory["image"] = dataUrl;
            const token = await getToken({ template: "codehooks" });

            const result = await addMemory(token, updatedMemory);
            if (!result) {
              router.push('/404');
              return;
            }

            const updatedMemories = tripMemories.concat(result);
            updatedMemories.sort((a, b) => {
              if (a.category === b.category) {
                return a.date < b.date ? -1 : 1;
              } else {
                return a.category < b.category ? -1 : 1;
              }
            });
            updateMemories(updatedMemories); // Update the cached memories.
            setTripMemories(updatedMemories); // Update the state memories.
            setNewMemory(null);
            setDataUrl("");
          } catch (error) {
            console.error('Error: ', error);
          }
        }
      }
    }
    addNewMemory();
  }, [isLoaded, newMemory, dataUrl]);

  return (
    <>
      <button
        className="bottom-5 float-right sticky right-12 px-4 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
        onClick={openModal}
      >
        <span className={styles.plusIcon}><FontAwesomeIcon icon={faPlus} /></span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Memory Modal"
      >
        <TripMemory 
          addMemory={setNewMemory}
          closeModal={closeModal}
          parentId={parentId}
          setDataUrl={setDataUrl}
          category={category}
          date={date}
        />
      </Modal>
    </>
  );
}