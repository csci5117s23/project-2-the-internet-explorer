const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Modal from "react-modal";
export default function MemoryDeleteButton({
  memoryID,
  title,
  router,
  tripid,
}) {
  const [deleteModelOpen, setDeleteOpen] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const deleteIndividualMemory = async () => {
    try {
      if (userId) {
        const token = await getToken({ tempalte: "codehooks" });
        const response = await fetch(
          backend_base + `/tripMemories/${memoryID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
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
    // setConfirmed(!confirmed);
    console.log("clicked delete");
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
        className="px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-lg shadow-sm"
        onClick={openDeleteModal}
      >
        Delete
      </button>
      <Modal
        isOpen={deleteModelOpen}
        // onAfterOpen={afteropenDeleteModal}
        onRequestClose={closeDeleteModal}
        contentLabel="Memory Delete Modal"
      >
        <button onClick={closeDeleteModal}>Cancel</button>
        <div className="grid place-items-center mt-20">
          <div className="text-lg">Are you sure to delete the memory</div>
          <div className="text-lg">"{title}"?</div>
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
