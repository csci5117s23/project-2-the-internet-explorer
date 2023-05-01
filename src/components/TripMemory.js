import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from '../styles/TripMemory.module.css';
import Map from "./Map";
import Webcam from "react-webcam";
import Resizer from 'react-image-file-resizer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faRotate } from "@fortawesome/free-solid-svg-icons";

export default function TripMemory({ addMemory, closeModal, parentId, setDataUrl, category, date }) {
    const [showWebCamera, setShowWebCamera] = useState(false);
    const [camera, setCamera] = useState(false); // front is false. back is true.
    const [image, setImage] = useState('');
    const [resizedImage, setResizedImage] = useState(null);
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState(null);
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
            width: 300,
            height: 200,
            facingMode: "environment"
        };
    } else {
        videoConstraints = {
            width: 300,
            height: 200,
            facingMode: "user"
        };
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: 300, height: 200});
        setImage(imageSrc);
    }, [webcamRef]);

    const handleButtonClick = () => {
        setShowWebCamera(!showWebCamera);
    };

    const cancelCamera = () => {
        setShowWebCamera(!showWebCamera);
        setImage('');
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        Resizer.imageFileResizer(
            file,
            300, // width
            200, // height
            "JPEG",
            100,
            0,
            (resizedFile) => {
                setResizedImage(resizedFile);
            },
            "file"
        );
    };

    function base64EncodeImage() {
        const uploadedImage = resizedImage;
        let reader = new FileReader();
        reader.onloadend = function() {
            setDataUrl(reader.result);
        }
        reader.readAsDataURL(uploadedImage);
    }

    function handleSubmit(e) {
        e.preventDefault();

        document.getElementById('date').disabled = false;
        document.getElementById('folders').disabled = false;

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        if (formJson.uploadImage.name != '') {
            base64EncodeImage();
        } else if (image) {
            setDataUrl(image);
        } else {
            alert('Please upload or take an image');
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
            date: newDate.toISOString(),
            location: location,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            category: formJson.folders,
        }

        addMemory(newMemory);
        e.target.reset();
        closeModal();
    }

    let defaultDate = '';
    if (date && date !== "All Days") {
        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();

        let yearStr = year.toString();
        let monthStr = '';
        if (month < 10) {
            monthStr = `0${month.toString()}`;
        } else {
            monthStr = month.toString();
        }
        let dayStr = '';
        if (day < 10) {
            dayStr = `0${day.toString()}`;
        } else {
            dayStr = day.toString();
        }

        defaultDate = `${yearStr}-${monthStr}-${dayStr}`;
    }

    let options = (
        <>
            <option value="" disabled hidden>Select an option</option>
            <option value="places">Place</option>
            <option value="events">Event</option>
            <option value="food">Food</option>
            <option value="souvenirs">Souvenirs</option>
            <option value="people">People</option>
        </>
    );

    return (
        <>
        <form method='post' onSubmit={handleSubmit}>
            <div className="p-20 max-md:px-5 pt-36 -mt-16">
            <h1 className={`text-xl font-bold pl-3.5`}>Add Memory</h1>

                <div className="p-4">
                    <h4 className="text-l font-bold">Title</h4>
                    <input 
                        className="bg-gray-200 p-2 rounded-md w-full"
                        placeholder="Title"
                        id="title"
                        name="title"
                        maxLength={30}
                        required
                    ></input>
                </div>
                <div className="p-4">
                    <h4 className="text-l font-bold">Date</h4>
                    {date && date !== 'All Days' ? (
                        <input 
                            type='date'
                            className='bg-gray-200 p-2 rounded-md w-full'
                            id='date'
                            name='date'
                            disabled
                            defaultValue={defaultDate}
                        ></input>
                    ) : (
                        <input
                            type="date"
                            className="bg-gray-200 p-2 rounded-md w-full"
                            placeholder="Date"
                            id="date"
                            name="date"
                            required
                        ></input>
                    )}
                    
                </div>
                <Map
                    location={location}
                    setLocation={setLocation}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                ></Map>
                <div className="p-4">
                    <h4 className="text-l font-bold">What type of memory is this?</h4>
                    {category && category !== 'All Categories' ? (
                        <select 
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            name="folders"
                            id="folders"
                            disabled
                            defaultValue={category.toLowerCase()}
                        >
                            {options}
                        </select>
                    ) : (
                        <select 
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                            name="folders" 
                            id="folders"
                            required
                            defaultValue=""
                        >
                            {options}
                        </select>
                    )}
                </div>
                <div className={styles.photoButtons}>
                    {showWebCamera ? (
                        <button className="w-20 ml-3 px-2 py-1.5 font-semibold text-m bg-gray-300 text-red-500 hover:bg-red-500 hover:text-white border border-red-500 rounded-full shadow-sm"
                            id="takePic"
                            onClick={cancelCamera}
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
                    <input type="file" onChange={handleImageChange} id="uploadImage" name="uploadImage" 
                        className="text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-custom-blue file:text-white"
                    />
                </div>
                {showWebCamera ? (
                    (image ? (
                        <>
                            <img className={styles.webcam} src={image} alt="Your Image"></img>
                            <div className={styles.cameraButtons}>
                                <button onClick={() => {setImage('')}} className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Retake</button>
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
                                    <button type='button' onClick={frontCamera} className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><FontAwesomeIcon icon={faRotate}></FontAwesomeIcon></button>
                                ) : (
                                    <button type='button' onClick={backCamera} className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><FontAwesomeIcon icon={faRotate}></FontAwesomeIcon></button>
                                )}
                                <button onClick={(e) =>{e.preventDefault(); capture();}} className={`${styles.captureImage} bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full`}><FontAwesomeIcon icon={faCamera}></FontAwesomeIcon></button>
                            </div>
                        </> 
                    ))
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
                    ></textarea>
                </div>
                <button type='submit' className="ml-3 px-2 py-2 font-semibold text-m bg-custom-blue text-white rounded-full shadow-sm" id="addMemory">Add Memory</button>
                <button className="ml-3 px-2 py-2 font-semibold text-m bg-gray-400 text-white rounded-full shadow-sm" onClick={closeModal}>Cancel</button>

            </div>
        </form>
        </>
      )
}