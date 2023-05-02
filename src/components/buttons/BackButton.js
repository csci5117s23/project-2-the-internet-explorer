import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton({ prevUrl }) {
  return (
    <Link href={prevUrl}><FontAwesomeIcon className="text-4xl text-white" icon={faChevronLeft}/></Link>
  );
};