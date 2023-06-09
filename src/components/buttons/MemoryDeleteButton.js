import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteMemory } from "@/modules/Data";

export default function MemoryDeleteButton({ memoryID, title, router, tripid }) {
  const [deleteModelOpen, setDeleteOpen] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  async function deleteIndividualMemory() {
    try {
      if (userId) {
        const token = await getToken({ tempalte: "codehooks" });

        const response = await deleteMemory(token, memoryID);
        if (!response) {
          router.push("/404");
          return;
        }
        alert("Successfully deleted");
        router.push(`/trips/${tripid}`);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  function handleMemoryDeleteButton() {
    deleteIndividualMemory();
  }

  function openDeleteModal() {
    setDeleteOpen(true);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);
  }
  return (
    <>
      <button
        className="float-right px-4 py-2 font-semibold text-m bg-red-500 text-white rounded-full shadow-sm"
        onClick={openDeleteModal}
      >
        <FontAwesomeIcon icon={faTrash} />
        &nbsp; Delete
      </button>
      <Modal
        isOpen={deleteModelOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Memory Delete Modal"
      >
        <button onClick={closeDeleteModal}>Cancel</button>
        <div className="grid place-items-center mt-20">
          <div className="text-lg">Are you sure you want to delete the memory</div>
          <div className="text-lg"><em>"{title}"</em>?</div>
          <button
            className="m-10 px-2 py-2 font-semibold text-m bg-red-500 text-white rounded-lg shadow-sm"
            onClick={handleMemoryDeleteButton}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
