import React, { useState } from "react";
import styles from '../styles/AddTrip.module.css';

export default function EditTrip({ editTrip, closeModal }) {
    function handleSubmit(e) {
        e.preventDefault();

        editTrip()
        e.target.reset();
        closeModal(); // Close the pop-up after submitting.
    }

    return (
        <>
        <button>Edit trip</button>
        </>
    );
}