const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Modal from "react-modal";
export default function MemoryEditButton({ memoryID, title, router, tripid }) {
  const [editModelOpen, setEditOpen] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const editIndividualMemory = async () => {
    try {
      if (userId) {
        // const token = await getToken({ tempalte: "codehooks" });
        // const response = await fetch(
        //   backend_base + `/tripMemories/${memoryID}`,
        //   {
        //     method: "PATCH",
        //     headers: {
        //       Authorization: "Bearer " + token,
        //     },
        //   }
        // );
        // if (!response.ok) {
        //   router.push("/404");
        //   return;
        // }
        alert("Successfully updated");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  function handleMemoryEditButton() {
    // setConfirmed(!confirmed);
    console.log("clicked edit");
    editIndividualMemory();
  }

  function openEditModal() {
    setEditOpen(true);
  }

  function closeEditModal() {
    setEditOpen(false);
  }

  return (
    <>
      <button
        className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-lg shadow-sm"
        onClick={openEditModal}
      >
        Edit
      </button>

      <Modal
        isOpen={editModelOpen}
        // onAfterOpen={afteropenDeleteModal}
        onRequestClose={closeEditModal}
        contentLabel="Memory Delete Modal"
      >
        <button onClick={closeEditModal}>Cancel</button>
        <div className="grid place-items-center mt-20">
          <div className="text-lg">Are you sure to update the memory</div>
          <div className="text-lg">"{title}"?</div>
          <button
            className="m-10 px-2 py-2 font-semibold text-m bg-red-500 text-white rounded-lg shadow-sm"
            onClick={handleMemoryEditButton}
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
}
