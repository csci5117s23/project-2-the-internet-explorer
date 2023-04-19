import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const BackButton = () => {
  const router = useRouter();
  const handleBackClick = (event) => {
    event.preventDefault();
    console.log("back!");
    router.back();
  };
  return (
    <button type="button" onClick={handleBackClick}>
      <FontAwesomeIcon
        className="text-4xl"
        style={{ color: "#c6d2ec" }}
        icon={faChevronLeft}
      />
    </button>
  );
};
export default BackButton;
