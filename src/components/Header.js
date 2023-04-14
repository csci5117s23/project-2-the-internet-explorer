import { UserButton } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Trips.module.css';

export default function Header() {
  return (
    <div className='grid grid-cols-6 gap-4'>
      <h1 className={styles.headerBar}><FontAwesomeIcon icon={faBars} /></h1>
      <h1 className={`${styles.headerBar} col-span-4`}>Your Trips</h1>
      <h1 className={styles.headerBar}><UserButton></UserButton></h1>
    </div>
  )
}