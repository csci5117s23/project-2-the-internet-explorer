import { UserButton } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Trips.module.css';

export default function Header({title}) {

  return (
    <div className={`${styles.headerDiv} grid grid-cols-6 gap-4`}>
      <h1 className={`${styles.headerTitle} col-span-5`}>{title}</h1>
      <h1 className={`${styles.headerUser}`} ><UserButton appearance={{elements: {rootBox: 'scale-150'}}}/></h1>
    </div>
  );
}