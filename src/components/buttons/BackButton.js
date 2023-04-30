import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Trips.module.css';

const BackButton = ({ prevUrl }) => {
  return (
    <Link className={styles.backButton} href={prevUrl}><FontAwesomeIcon className="text-4xl text-white" icon={faChevronLeft}/></Link>
  );
};
export default BackButton;
