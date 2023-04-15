import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/TripMemory.module.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function TripMemory() {
    return (
        <>
        <h1 className={"text-xl font-bold"}>Add Memory</h1>
        <div className={styles.tripMemoryContainer}>
            <div className={styles.photoButtons}>
                <button className="ml-3 px-2 py-2 font-semibold text-m bg-cyan-500 text-white rounded-full shadow-sm" id="takePic">Take Pic</button>
                <p>or</p>
                <input type="file" class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                "/>
            </div>
        </div>
        </>
      )
}