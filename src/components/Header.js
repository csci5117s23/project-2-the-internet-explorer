import { UserButton } from "@clerk/nextjs";
import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Trips.module.css';
import BackButton from "./buttons/BackButton";
import DayDropdown from "./buttons/DayDropdown";
import Link from "next/link";
export default function Header({title, back, prevUrl, day}) {
  return (
    <div className={`${styles.headerDiv} grid grid-cols-12`}>
      <div className="col-start-1 col-span-1 flex items-center pl-3 gap-3">
        {back ? <BackButton prevUrl={prevUrl} /> : <div></div>}
      </div>
      <div className="col-start-2 col-span-2 flex items-center gap-3 justify-center">
        <Link href="/trips">
          <FontAwesomeIcon
            icon={faHouse}
            style={{ color: "#f5f5f5", height: "2em" }}
          />
        </Link>
      </div>
      <div className="col-start-4 col-end-10 flex justify-center py-1 ">
        <h1 className={`${styles.headerTitle}`}>{title}</h1>
      </div>
      {/* <div className="col-start-9 col-end-10"></div> */}
      <div class="flex col-start-10 col-span-3 pr-2 justify-center items-center w-full h-full pl-1">
        <div class=" justify-center ml-4">
          <UserButton appearance={{ elements: { rootBox: "scale-150" } }} />
        </div>
      </div>
    </div>
  );
}