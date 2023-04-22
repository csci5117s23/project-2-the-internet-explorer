import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Trips.module.css';

const BackButton = ({ prevUrl }) => {
  const router = useRouter();
  const handleBackClick = (event) => {
    event.preventDefault();
    console.log("back!");
    router.back();
  };
  return (
    <Link className={styles.backButton} href={prevUrl}><FontAwesomeIcon className="text-4xl" style={{ color: "#c6d2ec" }} icon={faChevronLeft}/></Link>
    // <button type="button" onClick={handleBackClick}>
    //   <Link href={prevUrl}><FontAwesomeIcon className="text-4xl" style={{ color: "#c6d2ec" }} icon={faChevronLeft}/></Link>
    //   <FontAwesomeIcon
    //     className="text-4xl"
    //     style={{ color: "#c6d2ec" }}
    //     icon={faChevronLeft}
    //   />
    // </button>
  );
};
export default BackButton;
