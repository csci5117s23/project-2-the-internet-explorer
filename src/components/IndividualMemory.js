const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingCircle from "./LoadingCircle";
import Header from "./Header";
import MemoryMap from "./MemoryMap";
import moment from "moment";
import Modal from "react-modal";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MemoryDeleteButton from "./buttons/MemoryDeleteButton";
import MemoryEditButton from "./buttons/MemoryEditButton";
Modal.setAppElement("body");

export default function IndividualMemory({
  trip,
  memoryID,
  filter,
  params,
  router,
}) {
  const [memory, setMemory] = useState(null);
  const [loadingMemory, setLoadingMemory] = useState(true);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const getIndividualMemory = async () => {
      try {
        setLoadingMemory(true);
        if (userId) {
          const token = await getToken({ tempalte: "codehooks" });

          const response = await fetch(
            backend_base + `/tripMemories/${memoryID}`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          if (!response.ok) {
            router.push("/404");
            return;
          }
          const data = await response.json();
          setMemory(data);
          setLoadingMemory(false);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    getIndividualMemory();
  }, [isLoaded, router]);

  let prevUrl = "";
  if (filter === "category") {
    if (!params.has("category")) {
      router.push("/404"); // Search query missing.
      return;
    }
    let category = params.get("category");
    prevUrl = `/trips/${trip._id}/category?category=${category}`;
  } else if (filter === "day") {
    if (!params.has("day")) {
      router.push("/404"); // Search query missing.
      return;
    }
    let day = params.get("day");
    prevUrl = `/trips/${trip._id}/day?day=${day}`;
    if (params.has("category")) {
      console.log("has category param");
      prevUrl += `&category=${params.get("category")}`;
    }
  } else {
    // Handle unaccepted filters.
    prevUrl = `/trips/${trip._id}`;
  }

  return loadingMemory ? (
    <LoadingCircle></LoadingCircle>
  ) : (
    <>
      <Header title={memory.title} back={true} prevUrl={prevUrl} />
      <div className="grid gap-1 place-items-center m-8">
        <div className="flex p-2 justify-center">
          <TransformWrapper>
            <TransformComponent>
              <img
                style={{ width: "400px" }}
                src={memory.image}
                alt={memory.title}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="flex p-2">
          <div className="rounded-lg bg-blue-400 text-white p-2 mr-2">
            <Link href="/">{moment(memory.date).format("YYYY-MM-DD")}</Link>
          </div>
          <div className="rounded-lg bg-sky-400 text-white p-2 mr-2">
            <Link href="/">{memory.category}</Link>
          </div>
        </div>
        <div>
          <MemoryMap></MemoryMap>
        </div>
        {/* <div>description</div> */}
        <div
          className="flex justify-center bg-blue-100 border-4 border-blue-300 rounded-lg shadow-sm p-4 mb-4"
          style={{ width: "400px" }}
        >
          {memory.description}
        </div>
        <div>
          {/* edit and delete buttons here */}
          <MemoryDeleteButton
            memoryID={memoryID}
            title={memory.title}
            router={router}
            tripid={trip._id}
          ></MemoryDeleteButton>
          <MemoryEditButton
            memoryID={memoryID}
            title={memory.title}
            router={router}
            tripid={trip._id}
          ></MemoryEditButton>
        </div>
      </div>
    </>
  );
}
