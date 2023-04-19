import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from '../styles/TripMemory.module.css';
import Map from "./Map";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faRotate } from "@fortawesome/free-solid-svg-icons";

export default function TripMemory({ addMemory, closeModal, parentId }) {
    const [memoryTitle, setMemoryTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [memoryType, setMemoryType] = useState("");
    const [showWebCamera, setShowWebCamera] = useState(false);
    const [camera, setCamera] = useState(false); // front is false. back is true.
    const [image, setImage] = useState('');
    const [location, setLocation] = useState("Loading...");
    const [coordinates, setCoordinates] = useState(null);

    const frontCamera = useCallback(() => {
        setCamera(false);
    }, [setCamera]);

    const backCamera = useCallback(() => {
        setCamera(true);
    }, [setCamera]);

    let videoConstraints;
    if (camera) {
        videoConstraints = {
            width: 200,
            height: 200,
            facingMode: "environment"
        };
    } else {
        videoConstraints = {
            width: 200,
            height: 200,
            facingMode: "user"
        };
    }

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log('image: ', imageSrc);
        setImage(imageSrc);
    }, [webcamRef]);

    const handleButtonClick = () => {
        setShowWebCamera(!showWebCamera);
    };

    const handleMemoryTypeChange = (e) => {
        setMemoryType(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        let memoryImage;
        if (formJson.uploadImage.name != '') {
            console.log('image was uploaded: ', formJson.uploadImage);
            // TODO: Resize the uploaded image and base64 encode it.

            alert('Unsupported file transfer. Currently we can only accept taken images. Refresh the page. This message will self destruct in five seconds (JK)');
            return;
            memoryImage = formJson.uploadImage;
        } else if (image) {
            console.log('image was taken');
            memoryImage = image; // This is already base64 encoded.
        } else {
            alert('Please upload or take an image');
            console.log('no image');
            return;
        }

        if (!location || !coordinates) {
            alert('Please select a location');
            return;
        }

        let newDate = new Date(formJson.date.replace(/-/g, '\/'));

        let newMemory = {
            parentTripId: parentId,
            title: formJson.title,
            description: formJson.description,
            date: newDate,
            location: location,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            category: formJson.folders,
            image: memoryImage
        }

        console.log('new memory: ', newMemory);

        addMemory(newMemory);
        e.target.reset();
        closeModal();
    }

    return (
        <>
        <form method='post' onSubmit={handleSubmit}>
            <h1 className={`text-xl font-bold ${styles.tripMemoryHeader}`}>Add Memory</h1>
            <div className={styles.tripMemoryContainer}>
                <div className="p-4">
                    <h4 className="text-l font-bold">Title</h4>
                    <input 
                        className="border-2 border-slate-600 w-full"
                        placeholder="Title"
                        id="title"
                        name="title"
                        // value={memoryTitle}
                        // onChange={(e) => setMemoryTitle(e.target.value)}
                    ></input>
                </div>
                <div className="p-4">
                    <h4 className="text-l font-bold">Date</h4>
                    <input
                        type="date"
                        className="border-2 border-slate-600 w-full"
                        placeholder="Date"
                        id="date"
                        name="date"
                        // value={date}
                        // onChange={(e) => setDate(e.target.value)}
                    ></input>
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
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                        name="folders" 
                        id="folders"
                        value={memoryType}
                        onChange={handleMemoryTypeChange}
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="place">Place</option>
                        <option value="event">Event</option>
                        <option value="food">Food</option>
                        <option value="souvenirs">Souvenirs</option>
                        <option value="people">People</option>
                    </select>
                </div>
                <div className={styles.photoButtons}>
                    {showWebCamera ? (
                        <button className="w-20 ml-3 px-2 py-1.5 font-semibold text-m bg-gray-300 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-full shadow-sm"
                            id="takePic"
                            onClick={handleButtonClick}
                            type='button'
                        >Cancel</button>
                    ) : (
                        <button className="w-20 ml-3 px-2 py-1.5 font-semibold text-m bg-custom-blue hover:bg-blue-700 text-white rounded-full shadow-sm" 
                            id="takePic" 
                            onClick={handleButtonClick}
                            type='button'
                        >Take Pic</button> 
                    )}
                    
                    <span> or </span>
                    <input type="file" id="uploadImage" name="uploadImage" 
                        className="text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-custom-blue file:text-white"
                    />
                </div>
                {showWebCamera ? (
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
                                <button onClick={frontCamera} className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><FontAwesomeIcon icon={faRotate}></FontAwesomeIcon></button>
                            ) : (
                                <button onClick={backCamera} className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><FontAwesomeIcon icon={faRotate}></FontAwesomeIcon></button>
                            )}
                            <button onClick={(e) =>{e.preventDefault(); capture();}} className={`${styles.captureImage} bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full`}><FontAwesomeIcon icon={faCamera}></FontAwesomeIcon></button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {/* {showWebCamera && <Webcam />} */}
                <div className="p-4">
                    <h4 className="text-l font-bold">Brief Description</h4>
                    <textarea 
                        className="border-2 border-slate-600 w-full h-20"
                        placeholder="Brief Description"
                        id="description"
                        name="description"
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type='submit' className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="addMemory">Add Memory</button>
            </div>
        </form>
        </>
      )
}