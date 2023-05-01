import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "../../styles/TripMemory.module.css";
import Map from "../Map";
import Webcam from "react-webcam";
import Resizer from "react-image-file-resizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faRotate } from "@fortawesome/free-solid-svg-icons";

export default function MemoryEditButton(
  { editMemory,
    closeModal,
    parentId,
    setDataUrl,
    startDate,
    category,
    date,
    curMemory }
) {
  const [showWebCamera, setShowWebCamera] = useState(false);
  const [camera, setCamera] = useState(false); // front is false. back is true.
  const [image, setImage] = useState(curMemory.image);
  const [resizedImage, setResizedImage] = useState(null);
  const [location, setLocation] = useState(curMemory.location);
  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(curMemory.latitude),
    lng: parseFloat(curMemory.longitude),
  });
  const webcamRef = useRef(null);

  const frontCamera = useCallback(() => {
    setCamera(false);
  }, [setCamera]);

  const backCamera = useCallback(() => {
    setCamera(true);
  }, [setCamera]);

  let videoConstraints;
  if (camera) {
    videoConstraints = {
      width: 600,
      height: 400,
      facingMode: "environment",
    };
  } else {
    videoConstraints = {
      width: 600,
      height: 400,
      facingMode: "user",
    };
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 600,
      height: 400,
    });
    setImage(imageSrc);
  }, [webcamRef]);

  const handleButtonClick = () => {
    setShowWebCamera(!showWebCamera);
  };

  const cancelCamera = () => {
    setShowWebCamera(!showWebCamera);
    setImage("");
  };

  function handleImageChange(e) {
    const file = e.target.files[0];

    Resizer.imageFileResizer(
      file,
      600, // width
      400, // height
      "JPEG",
      100,
      0,
      (resizedFile) => {
        setResizedImage(resizedFile);
      },
      "file"
    );
  }

  function base64EncodeImage() {
    const uploadedImage = resizedImage;
    let reader = new FileReader();
    reader.onloadend = function () {
      setDataUrl(reader.result);
    };
    reader.readAsDataURL(uploadedImage);
  }

  function handleSubmit(e) {
    e.preventDefault();

    document.getElementById("date").disabled = false;
    document.getElementById("folders").disabled = false;

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    if (formJson.uploadImage.name != "") {
      base64EncodeImage();
    } else if (image) {
      setDataUrl(image);
    } else {
      alert("Please upload or take an image");
      return;
    }

    if (!location || !coordinates) {
      alert("Please select a location");
      return;
    }

    let newDate = new Date(formJson.date.replace(/-/g, "/"));

    let newMemory = {
      parentTripId: parentId,
      title: formJson.title,
      description: formJson.description,
      date: newDate.toISOString(),
      location: location,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      category: formJson.folders,
    };

    editMemory(newMemory);
    e.target.reset();
    closeModal();
  }

  let newDate = new Date(curMemory.date);
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();

  let yearStr = year.toString();
  let monthStr = "";
  if (month < 10) {
    monthStr = `0${month.toString()}`;
  } else {
    monthStr = month.toString();
  }
  let dayStr = "";
  if (day < 10) {
    dayStr = `0${day.toString()}`;
  } else {
    dayStr = day.toString();
  }

  let defaultDate = `${yearStr}-${monthStr}-${dayStr}`;

  let options = (
    <>
      <option value="" disabled hidden>
        Select an option
      </option>
      <option value="places">Place</option>
      <option value="events">Event</option>
      <option value="food">Food</option>
      <option value="souvenirs">Souvenirs</option>
      <option value="people">People</option>
    </>
  );

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className="p-20 max-md:px-5 pt-36 -mt-16">
        <h1 className="text-xl font-bold pl-3.5">
          Edit Memory
        </h1>
        
          <div className="p-4">
            <h4 className="text-l font-bold">Title</h4>
            <input
              className="bg-gray-200 p-2 rounded-md w-full"
              placeholder="Title"
              id="title"
              name="title"
              maxLength={30}
              defaultValue={curMemory.title}
              required
            ></input>
          </div>
          <div className="p-4">
            <h4 className="text-l font-bold">Date</h4>
            <input 
              type='date'
              className='bg-gray-200 p-2 rounded-md w-full'
              id='date'
              name='date'
              defaultValue={defaultDate}
            />
          </div>
          <Map
            location={location}
            setLocation={setLocation}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
          ></Map>
          <div className="p-4">
            <h4 className="text-l font-bold">What type of memory is this?</h4>
            <select 
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              name='folders'
              id='folders'
              defaultValue={curMemory.category}
            >
              {options}
            </select>
          </div>
          <div className={styles.photoButtons}>
            {showWebCamera ? (
              <button
                className="w-20 ml-3 px-2 py-1.5 font-semibold text-m bg-gray-300 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-full shadow-sm"
                id="takePic"
                onClick={cancelCamera}
                type="button"
              >
                Cancel
              </button>
            ) : (
              <button
                className="w-20 ml-3 px-2 py-1.5 font-semibold text-m bg-custom-blue hover:bg-blue-700 text-white rounded-full shadow-sm"
                id="takePic"
                onClick={handleButtonClick}
                type="button"
              >
                Take Pic
              </button>
            )}

            <span> or </span>
            <input
              type="file"
              onChange={handleImageChange}
              id="uploadImage"
              name="uploadImage"
              className="text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-custom-blue file:text-white"
            />
          </div>
          {showWebCamera ? (
            image ? (
              <>
                <img
                  className={styles.webcam}
                  src={image}
                  alt="Your Image"
                ></img>
                <div className={styles.cameraButtons}>
                  <button
                    onClick={() => {
                      setImage("");
                    }}
                    className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Retake
                  </button>
                </div>
              </>
            ) : (
              <>
                <Webcam
                  className={styles.webcam}
                  mirrored={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                <div className={styles.cameraButtons}>
                  {camera ? (
                    <button
                      type="button"
                      onClick={frontCamera}
                      className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <FontAwesomeIcon icon={faRotate}></FontAwesomeIcon>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={backCamera}
                      className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <FontAwesomeIcon icon={faRotate}></FontAwesomeIcon>
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                    className={`${styles.captureImage} bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full`}
                  >
                    <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                  </button>
                </div>
              </>
            )
          ) : (
            <></>
          )}
          <div className="p-4">
            <h4 className="text-l font-bold">Brief Description</h4>
            <textarea
              className="bg-gray-200 p-2 rounded-md w-full h-20"
              placeholder="Brief Description"
              id="description"
              name="description"
              defaultValue={curMemory.description}
            ></textarea>
          </div>
          <button
            type="submit"
            className="ml-3 mb-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm"
            id="updateMemory"
          >
            Update Memory
          </button>
          <button 
          onClick={closeModal}
          className="ml-3 px-4 py-2 font-semibold text-m bg-gray-400 text-white rounded-full shadow-sm"
        >Close</button>
        </div>
      </form>
    </>
  );
}
