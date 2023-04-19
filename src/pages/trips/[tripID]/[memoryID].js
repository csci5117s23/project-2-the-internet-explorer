const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const MAP_API = process.env.NEXT_PUBLIC_MAP_API;
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import TripMemoryWrapper from "@/components/TripMemoryWrapper";
import DayViewButton from "@/components/buttons/DayViewButton";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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


  //   parentTripId: string().required(),  // The id of the parent trip
  // title: string().required(),         // The title of the memory
  // description: string(),              // An optional description of the memory.
  // date: date().required,              // The date of the memory.
  // address: string().required,         // The address/location of the memory.
  // category: string().required,        // The category of the memory.
  // image: string().required,           // An image of the memory.
  // user: string().required,  

  return isLoading ? (
    <h1>LOADING Memory...</h1>
  ) : (
    <>
      <Header title={"memory title"} />
      <div className="grid gap-1 place-items-center m-8">
        <div style={{ width: "400px" }} className="p-2">
          <img src="https://project50017.s3.us-east-2.amazonaws.com/winter.jpeg" />
        </div>
        {/* <DayViewButton title={"June 1"} color={"bg-custom-blue"} /> */}
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
              {center && <Marker position={center} />}
            </GoogleMap>
          </LoadScript>
        </div>
        <div>description:</div>
        <div className="flex justify-center bg-blue-100 border-4 border-blue-300 rounded-lg shadow-sm p-4 mb-4">
          MN: wdym summer?
        </div>
      </div>
    </>
  );
}
