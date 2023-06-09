import React from "react";
import { UserButton } from "@clerk/nextjs";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Trips.module.css";
import BackButton from "./buttons/BackButton";
import Link from "next/link";

export default function Header({ title, back, prevUrl }) {
  return (
    <div className={`${styles.headerDiv} flex w-full m-0 p-0`}>
      <div className="flex items-center pl-3 gap-3">
        {back ? <BackButton prevUrl={prevUrl} /> : <div></div>}
      </div>
      <div className="flex items-center ml-4">
        <Link href="/trips">
          <FontAwesomeIcon
            icon={faHouse}
            style={{ color: "#f5f5f5", height: "2em" }}
          />
        </Link>
      </div>
      <div className="flex justify-center flex-grow py-1 ">
        <h1 className={`${styles.headerTitle}`}>{title}</h1>
      </div>
      <div className="flex justify-end items-center pr-2">
        <div className=" justify-center ml-4">
          <UserButton appearance={{ elements: { rootBox: "scale-150" } }} />
        </div>
      </div>
    </div>
  );
}