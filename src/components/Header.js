import { UserButton } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Trips.module.css';
import BackButton from "./buttons/BackButton";
import DayDropdown from "./buttons/DayDropdown";
export default function Header({title, back, prevUrl, day}) {

  return (
    <div className={`${styles.headerDiv} grid grid-cols-7`}>
      <div className="col-start-1 col-span-2 flex items-center pl-3">
        { back ? <BackButton prevUrl={prevUrl}/> : <div></div> }
        <DayDropdown
          day={day}
        />
      </div>
      
      <h1 className={`${styles.headerTitle} col-start-4 text-center flex items-center py-1`}>
        {title}
      </h1>
      <h1 className={`${styles.headerUser} col-start-7 pr-2`}>
        <UserButton appearance={{ elements: { rootBox: "scale-150" } }} />
      </h1>
    </div>
  );
}