import { UserButton } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Trips.module.css';

export default function Header() {
  // TODO: Update this so that instead of saying 'Your Trips', it takes in a prop to indicate
  // TODO: what the "header message" should say.

  return (
    <div className={`${styles.headerDiv} grid grid-cols-6 gap-4`}>
      <h1 className={`${styles.headerTitle} col-span-5`}>Your Trips</h1>
      <h1><UserButton /></h1>
    </div>
  );
}