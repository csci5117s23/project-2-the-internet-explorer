const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const MAP_API = process.env.NEXT_PUBLIC_MAP_API;
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import DayViewButton from "@/components/buttons/DayViewButton";
import Link from "next/link";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

export default function MemoryView({}) {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // const memoryId = router.query.memoryID;
  const [center, setCenter] = useState({ lat: 44.9718, lng: -93.2338 });
  // const tripId = router.query.tripID;

  const [memory, setMemory] = useState(null);
//get the memory from database
  // useEffect(() => {
  //   const getIndividualMemory = async () => {
  //     if (router.isReady) {
  //       const memoryId = router.query.memoryID;
  //       const tripId = router.query.tripID;
  //       try {
  //         if (userId) {
  //           const token = await getToken({ template: "codehooks" });
  //           const response = await fetch(
  //             backend_base + `/tripMemories/${tripId}/${memoryId}`,
  //             {
  //               method: "GET",
  //               headers: {
  //                 Authorization: "Bearer " + token,
  //               },
  //             }
  //           );
  //           if (!response.ok) {
  //             router.push("/404");
  //             return;
  //           }
  //           const data = await response.json();
  //           setMemory(data);
  //           setIsLoading(false);
  //         }
  //       } catch (error) {
  //         console.error("Error: ", error);
  //       }
  //     }
  //   };
  //   getIndividualMemory();
  // }, [isLoaded, router.isReady]);

  // return <div>[memoryID]: {memoryId} [parentTripId]: {tripId}</div>;

  // useEffect(() => {
  //   // get the location from the database
  //   const userLocation = // user location
  //     // set the center
  //     setCenter({
  //       lat: userLocation.latitude,
  //       lng: userLocation.longitude,
  //     });
  // }, []);

  return isLoading ? (
    <h1>LOADING Memory...</h1>
  ) : (
    <>
      <Header title={"memory title"} />
      <div className="grid gap-1 place-items-center m-8">
        <div style={{ width: "400px" }} className="p-2">
          <img src="https://project50017.s3.us-east-2.amazonaws.com/winter.jpeg" />
        </div>
        <div className="flex p-2">
          <div className="rounded-lg bg-blue-400 text-white p-2 mr-2">
            <Link href="/">
              {/* {date} */}
              June 1
            </Link>
          </div>
          <div className="rounded-lg bg-sky-400 text-white p-2 mr-2">
            <Link href="/">places</Link>
          </div>
          <div className="rounded-lg bg-cyan-400 text-white p-2">
            <Link href="/">user</Link>
          </div>
        </div>
        <div>
          <LoadScript googleMapsApiKey={MAP_API}>
            <GoogleMap
              id="example-map"
              center={center}
              zoom={10}
              mapContainerStyle={{ height: "400px", width: "400px" }}
            >
              {center && <MarkerF position={center} />}
            </GoogleMap>
          </LoadScript>
        </div>
        <div>description:</div>
        <div
          className="flex justify-center bg-blue-100 border-4 border-blue-300 rounded-lg shadow-sm p-4 mb-4"
          style={{ width: "400px" }}
        >
          MN: wdym summer?
        </div>
        <div>
          {/* edit and delete buttons here */}
          <button className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-lg shadow-sm">
            Delete
          </button>
          <button className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-lg shadow-sm">
            Edit
          </button>
        </div>
      </div>
    </>
  );
}
